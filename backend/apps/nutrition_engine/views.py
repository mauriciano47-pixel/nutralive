import re
import unicodedata
from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Ingredient, FoodProduct
from .serializers import IngredientSerializer, FoodProductSerializer, IngredientAnalysisRequestSerializer

def normalize_text(text):
    if not text:
        return ""
    text = text.lower()
    return ''.join(c for c in unicodedata.normalize('NFD', text) if unicodedata.category(c) != 'Mn')

class IngredientViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Ingredient.objects.all().order_by('name')
    serializer_class = IngredientSerializer

class FoodProductViewSet(viewsets.ModelViewSet):
    queryset = FoodProduct.objects.all().order_by('-created_at')
    serializer_class = FoodProductSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        barcode = self.request.query_params.get('barcode')
        search = self.request.query_params.get('search')
        if barcode:
            queryset = queryset.filter(barcode=barcode)
        if search:
            queryset = queryset.filter(name__icontains=search)
        return queryset

@api_view(['POST'])
def analyze_ingredients(request):
    """
    Motor Algorítmico del Semáforo Hepático:
    Recibe el texto de ingredientes de una etiqueta y detecta:
    1. Jarabe de maíz de alta fructosa (JMAF) y sinónimos.
    2. Grasas trans y aceites hidrogenados.
    3. Azúcares ocultos y maltodextrinas.
    Devuelve Semáforo: GREEN / YELLOW / RED con sustitución culinaria.
    """
    serializer = IngredientAnalysisRequestSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    text_raw = serializer.validated_data['ingredients_text']
    text_norm = normalize_text(text_raw)
    product_name = serializer.validated_data.get('product_name', 'Producto Analizado')

    detected_risks = []
    has_hidden_fructose = False
    has_trans_fats = False
    has_high_glycemic = False

    # Obtener todos los ingredientes de la base de datos
    db_ingredients = Ingredient.objects.all()

    for ing in db_ingredients:
        # Chequear nombre principal, versiones sin paréntesis y sinónimos
        raw_terms = [ing.name]
        clean_name = re.sub(r'\(.*?\)', '', ing.name).strip()
        if clean_name and clean_name != ing.name:
            raw_terms.append(clean_name)
        
        # Extraer acrónimos dentro de paréntesis (ej. JMAF, HFCS, AOVE)
        for paren in re.findall(r'\((.*?)\)', ing.name):
            for part in paren.split('/'):
                p_clean = part.strip()
                if p_clean:
                    raw_terms.append(p_clean)

        if ing.aliases:
            for alias in ing.aliases.split(','):
                a_clean = alias.strip()
                if a_clean:
                    raw_terms.append(a_clean)
                    a_no_paren = re.sub(r'\(.*?\)', '', a_clean).strip()
                    if a_no_paren and a_no_paren != a_clean:
                        raw_terms.append(a_no_paren)

        for term in raw_terms:
            term_norm = normalize_text(term)
            if not term_norm:
                continue
            pattern = r'\b' + re.escape(term_norm) + r'\b'
            if re.search(pattern, text_norm) or term_norm in text_norm:
                detected_risks.append({
                    "name": ing.name,
                    "term_found": term,
                    "risk_level": ing.risk_level,
                    "is_hidden_fructose": ing.is_hidden_fructose,
                    "mechanism": ing.clinical_mechanism,
                    "alternative": ing.suggested_alternative
                })
                if ing.is_hidden_fructose:
                    has_hidden_fructose = True
                if ing.risk_level == 'RED':
                    if 'trans' in term_norm or 'hidrogenado' in term_norm:
                        has_trans_fats = True
                    if 'maltodextrina' in term_norm or 'jarabe' in term_norm:
                        has_high_glycemic = True
                break

    # Determinar Semáforo Hepático
    harmful_items = [r for r in detected_risks if r['risk_level'] in ('RED', 'YELLOW')]
    beneficial_items = [r for r in detected_risks if r['risk_level'] == 'GREEN']

    red_count = sum(1 for r in detected_risks if r['risk_level'] == 'RED')
    yellow_count = sum(1 for r in detected_risks if r['risk_level'] == 'YELLOW')

    if red_count > 0 or has_hidden_fructose or has_trans_fats:
        traffic_light = "RED"
        verdict_title = "ALERTA HEPÁTICA — No Recomendado en Hígado Graso"
        clinical_advice = "Este producto contiene inductores directos de lipogénesis hepática (acumulación de grasa en el hepatocito) o grasas pro-inflamatorias. Se recomienda activar el Cambio Seguro."
    elif yellow_count > 0:
        traffic_light = "YELLOW"
        verdict_title = "PRECAUCIÓN — Consumo Ocasional y Porción Controlada"
        clinical_advice = "No contiene jarabes tóxicos evidentes, pero posee ingredientes de moderada carga glucémica. Limitar su frecuencia."
    else:
        traffic_light = "GREEN"
        verdict_title = "APROBADO & SEGURO — Libre de Fructosa Oculta"
        clinical_advice = "No se detectaron ingredientes perjudiciales para el metabolismo hepático. Excelente para el plan terapéutico familiar."

    # Búsqueda o generación de "Cambio Seguro"
    swap_suggestion = None
    if traffic_light == "RED":
        # Buscar en base de datos si hay producto con sustituto
        matched_food = FoodProduct.objects.filter(traffic_light='RED').first()
        if matched_food and matched_food.suggested_swap_product:
            swap_suggestion = {
                "product": matched_food.suggested_swap_product,
                "reasoning": matched_food.swap_reasoning
            }
        else:
            swap_suggestion = {
                "product": "Alternativa casera sin ultraprocesar",
                "reasoning": "Reemplazar por alimentos enteros naturales preparados en casa con aceite de oliva virgen extra y endulzados solo con fruta fresca."
            }

    return Response({
        "product_name": product_name,
        "traffic_light": traffic_light,
        "verdict_title": verdict_title,
        "clinical_advice": clinical_advice,
        "has_hidden_fructose": has_hidden_fructose,
        "detected_harmful_count": len(harmful_items),
        "harmful_items": harmful_items,
        "beneficial_items": beneficial_items,
        "healthy_swap": swap_suggestion
    }, status=status.HTTP_200_OK)
