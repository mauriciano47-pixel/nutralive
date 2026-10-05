import os
import django
from datetime import date, timedelta

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nutralive_server.settings')
django.setup()

from apps.patients.models import Patient
from apps.metabolic_logs.models import MetabolicLog
from apps.nutrition_engine.models import Ingredient, FoodProduct
from apps.culinary_recipes.models import TherapeuticRecipe

def seed():
    print("[INFO] Sembrando datos clinicos iniciales en NutraLive...")

    # 1. Ingredientes Clínicos
    ingredients_data = [
        {
            "name": "Jarabe de Maíz de Alta Fructosa (JMAF / HFCS)",
            "aliases": "JMAF, HFCS, HFCS-55, HFCS-42, jarabe de glucosa-fructosa, isoglucosa, fructosa de maíz",
            "is_hidden_fructose": True,
            "risk_level": "RED",
            "clinical_mechanism": "Inductor directo de lipogénesis de novo en los hepatocitos; acelera esteatosis y eleva triglicéridos.",
            "suggested_alternative": "Fruta entera fresca o endulzantes no calóricos puros como Stevia natural o Monk fruit."
        },
        {
            "name": "Maltodextrina",
            "aliases": "maltodextrin, polímero de glucosa, dextrina de maíz",
            "is_hidden_fructose": False,
            "risk_level": "RED",
            "clinical_mechanism": "Índice glucémico ultra-alto (110-130), dispara picos masivos de insulina estimulando el almacenamiento de grasa hepática.",
            "suggested_alternative": "Harina de avena integral o harina de almendras."
        },
        {
            "name": "Néctar o Jarabe de Agave",
            "aliases": "sirope de agave, néctar de agave azul, jarabe de maguey",
            "is_hidden_fructose": True,
            "risk_level": "RED",
            "clinical_mechanism": "Contiene entre 70% y 90% de fructosa libre concentrada, mayor que el azúcar común; altamente hepatotóxico en hígado graso.",
            "suggested_alternative": "Canela de Ceilán o extracto puro de vainilla sin azúcar."
        },
        {
            "name": "Grasas Vegetales Hidrogenadas / Trans",
            "aliases": "aceite vegetal parcialmente hidrogenado, manteca vegetal industrial, grasas trans",
            "is_hidden_fructose": False,
            "risk_level": "RED",
            "clinical_mechanism": "Generan inflamación sistémica, estrés en el retículo endoplásmico del hepatocito y fibrosis.",
            "suggested_alternative": "Aceite de oliva virgen extra (AOVE) o aceite de aguacate."
        },
        {
            "name": "Aceite de Oliva Virgen Extra (AOVE)",
            "aliases": "AOVE, extra virgin olive oil",
            "is_hidden_fructose": False,
            "risk_level": "GREEN",
            "clinical_mechanism": "Rico en ácido oleico y polifenoles antioxidantes; reduce esteatosis y disminuye resistencia a la insulina.",
            "suggested_alternative": "Consumir a diario en frío (1-2 cucharadas)."
        },
        {
            "name": "Avena Integral en Copos",
            "aliases": "oats, copos de avena enteros, betaglucano",
            "is_hidden_fructose": False,
            "risk_level": "GREEN",
            "clinical_mechanism": "Rica en betaglucano (fibra soluble); retarda la absorción de carbohidratos y estimula bacterias que producen butirato protector hepático.",
            "suggested_alternative": "Excelente base para desayunos y rebozados al horno."
        },
        {
            "name": "Semillas de Chía",
            "aliases": "chia seeds, salvia hispanica",
            "is_hidden_fructose": False,
            "risk_level": "GREEN",
            "clinical_mechanism": "Aporte elevado de ácido alfa-linolénico (Omega-3 vegetal) y mucílago saciante anti-esteatosis.",
            "suggested_alternative": "Hidratar en agua, kéfir o leche vegetal sin azúcar."
        },
        {
            "name": "Colina (Yema de Huevo / Pescado Azul)",
            "aliases": "choline, lecitina natural, fosfatidilcolina",
            "is_hidden_fructose": False,
            "risk_level": "GREEN",
            "clinical_mechanism": "Nutriente esencial requerido para la síntesis de VLDL; su deficiencia atrapa la grasa dentro del hígado.",
            "suggested_alternative": "Consumir 1 huevo entero al día o pescados como salmón, trucha o sardina."
        },
        {
            "name": "Arándanos y Frutos Rojos",
            "aliases": "blueberries, frambuesas, moras, frutos del bosque",
            "is_hidden_fructose": False,
            "risk_level": "GREEN",
            "clinical_mechanism": "Baja fructosa intrínseca y alta concentración de antocianinas protectoras frente a la peroxidación lipídica.",
            "suggested_alternative": "La mejor opción de fruta diaria para pacientes con hígado graso."
        },
    ]

    for item in ingredients_data:
        Ingredient.objects.get_or_create(name=item["name"], defaults=item)
    print(f"[OK] {len(ingredients_data)} ingredientes clinicos registrados.")

    # 2. Alimentos con Semáforo y Cambio Seguro
    foods_data = [
        {
            "name": "Kétchup Tradicional Comercial",
            "brand": "Marca Estándar",
            "category": "Salsas & Condimentos",
            "traffic_light": "RED",
            "barcode": "780000000001",
            "ingredients_raw": "Concentrado de tomate, jarabe de maíz de alta fructosa (JMAF), vinagre destilado, jarabe de maíz, sal, especias.",
            "detected_harmful_ingredients": ["Jarabe de maíz de alta fructosa", "Jarabe de maíz"],
            "suggested_swap_product": "Salsa Casera de Tomate Natural al Orégano",
            "swap_reasoning": "La versión casera utiliza tomates maduros triturados, aceite de oliva virgen extra y hierbas, eliminando el 100% de la fructosa libre concentrada."
        },
        {
            "name": "Galletas Dulces Rellenas",
            "brand": "Snack Clásico",
            "category": "Galletas & Golosinas",
            "traffic_light": "RED",
            "barcode": "780000000002",
            "ingredients_raw": "Harina de trigo enriquecida, azúcar, aceite de palma parcialmente hidrogenado, jarabe de glucosa-fructosa, cacao, lecitina de soya, saborizante artificial.",
            "detected_harmful_ingredients": ["Aceite de palma parcialmente hidrogenado", "Jarabe de glucosa-fructosa", "Azúcar añadido"],
            "suggested_swap_product": "Galletas Horneadas de Avena, Plátano y Cacao Puro",
            "swap_reasoning": "Hechas en casa en 15 minutos solo con copos de avena, puré de 1 plátano y cacao amargo al 100%. Sin grasas trans ni jarabes."
        },
        {
            "name": "Yogur Batido Sabor Frutilla 'Light'",
            "brand": "Lácteo Comercial",
            "category": "Lácteos & Postres",
            "traffic_light": "YELLOW",
            "barcode": "780000000003",
            "ingredients_raw": "Leche descremada, almidón modificado, concentrado de fruta, maltodextrina, sucralosa, colorante carmín.",
            "detected_harmful_ingredients": ["Maltodextrina", "Almidón modificado"],
            "suggested_swap_product": "Yogur Griego Natural Sin Azúcar + Arándanos Frescos",
            "swap_reasoning": "Aporta 10g de proteína saciante, probióticos vivos y antioxidantes sin picos de insulina por maltodextrina."
        },
        {
            "name": "Avena Integral en Copos Enteros",
            "brand": "NutraLive Pure",
            "category": "Cereales & Granos",
            "traffic_light": "GREEN",
            "barcode": "780000000004",
            "ingredients_raw": "100% copos de avena integral seleccionada.",
            "detected_harmful_ingredients": [],
            "suggested_swap_product": "Producto Óptimo (Consumo Recomendado)",
            "swap_reasoning": "Alimento protector hepático de primer orden. Contiene betaglucano que mejora el metabolismo lipídico."
        }
    ]

    for f in foods_data:
        FoodProduct.objects.get_or_create(name=f["name"], defaults=f)
    print(f"[OK] {len(foods_data)} alimentos catalogados con semaforo y sustitutos.")

    # 3. Recetas Familiares Deliciosas Anti-Fructosa
    recipes_data = [
        {
            "title": "Hamburguesas Caseras de Pavo, Avena y Espinaca",
            "summary": "Jugosas, crujientes al horno y con sabor 100% aprobado por niños. Cero conservantes y ricas en colina y hierro.",
            "category": "Almuerzos & Cenas Familiares",
            "prep_time_minutes": 25,
            "servings": 4,
            "difficulty": "FACIL",
            "is_kid_approved": True,
            "ingredients_list": [
                "500g de pechuga de pavo o pollo molida",
                "1/2 taza de copos de avena finos",
                "1 huevo entero (aporte esencial de colina)",
                "1 taza de espinacas finamente picadas",
                "1 cucharada de aceite de oliva virgen extra",
                "1 pizca de sal marina, orégano y ajo en polvo"
            ],
            "instructions_steps": [
                "En un tazón grande, mezclar la carne molida con el huevo y los condimentos.",
                "Incorporar la avena y la espinaca picada hasta obtener una masa homogénea.",
                "Formar 4 hamburguesas y colocarlas en una bandeja de horno con papel mantequilla.",
                "Hornear a 190°C durante 18-20 minutos, volteando a la mitad.",
                "Servir al plato o en pan 100% integral con rodajas de tomate y palta/aguacate."
            ],
            "hepatic_benefits": "Reemplaza las carnes procesadas ultra-grasas por proteína magra rica en aminoácidos esenciales y colina, favoreciendo el transporte de grasa fuera del hígado."
        },
        {
            "title": "Nuggets Crocantes al Horno con Rebozado de Avena",
            "summary": "El snack favorito de los niños en versión 100% terapéutica hepática. Dorados al horno sin frituras tóxicas.",
            "category": "Almuerzos & Cenas Familiares",
            "prep_time_minutes": 30,
            "servings": 4,
            "difficulty": "FACIL",
            "is_kid_approved": True,
            "ingredients_list": [
                "400g de pechuga de pollo cortada en cubos tamaño bocado",
                "1 taza de copos de avena triturados (harina gruesa)",
                "1 huevo batido",
                "1 cucharadita de pimentón dulce / paprika",
                "1 cucharada de semillas de sésamo o chía molidas",
                "1 pizca de sal marina"
            ],
            "instructions_steps": [
                "Mezclar en un plato la avena triturada con el pimentón, sésamo y sal.",
                "Pasar cada trozo de pollo por el huevo batido y luego rebozar bien en la mezcla de avena.",
                "Distribuir en bandeja de horno con unas gotas de aceite de oliva por encima.",
                "Hornear a 200°C por 15 minutos hasta que estén dorados y crocantes.",
                "Acompañar con guacamole casero o salsa de yogur natural con limón."
            ],
            "hepatic_benefits": "Cero grasas trans de freidoras industriales. Reemplaza el pan rallado ultraprocesado por fibra de avena con bajo índice glucémico."
        },
        {
            "title": "Smoothie Verde Protector 'Super-Filtro'",
            "summary": "Bebida fresca y saciante ideal para desayunos o colaciones. Antioxidantes puros que combaten el estrés oxidativo hepático.",
            "category": "Desayunos & Meriendas",
            "prep_time_minutes": 5,
            "servings": 2,
            "difficulty": "FACIL",
            "is_kid_approved": True,
            "ingredients_list": [
                "1 taza de espinacas tiernas frescas",
                "1/2 taza de arándanos frescos o congelados",
                "1 cucharada de semillas de chía",
                "1 taza de agua fresca o leche de almendras sin azúcar",
                "1/4 de manzana verde con cáscara (pectina)",
                "Gotas de limón al gusto"
            ],
            "instructions_steps": [
                "Colocar todos los ingredientes en la licuadora.",
                "Licuar a alta velocidad durante 45 segundos hasta obtener una textura suave y sedosa.",
                "Servir de inmediato con hielo si se desea bien frío."
            ],
            "hepatic_benefits": "Carga glucémica muy baja. Los polifenoles de los arándanos y la clorofila protegen las membranas de los hepatocitos contra la inflamación."
        }
    ]

    for r in recipes_data:
        TherapeuticRecipe.objects.get_or_create(title=r["title"], defaults=r)
    print(f"[OK] {len(recipes_data)} recetas terapeuticas familiares registradas.")

    # 4. Paciente Demostrativo ("Sofía M.", caso clínico realista)
    patient, created = Patient.objects.get_or_create(
        name="Sofía M.",
        defaults={
            "birth_date": date.today() - timedelta(days=365*9), # 9 años
            "gender": "F",
            "diagnosis": "Esteatosis Hepática Metabólica (MASLD Pediátrico)",
            "severity_stage": "GRADE_1",
            "guardian_contact": "Padre / Madre de Familia (+56 9 8765 4321)",
            "clinical_notes": "Prescripción nutricional estricta: Restricción absoluta de Jarabe de Maíz de Alta Fructosa (JMAF) y golosinas ultraprocesadas. Estimular dieta mediterránea adaptada a niños."
        }
    )

    # Registros de marcadores mostrando reversión favorable en los últimos 3 controles
    logs_data = [
        {
            "date": date.today() - timedelta(days=60),
            "alt_tgp": 54.0, # Inflamación activa inicial
            "ast_tgo": 42.0,
            "ggt": 38.0,
            "weight_kg": 35.8,
            "height_cm": 134.0,
            "dietary_adherence_percent": 70,
            "ultrasound_findings": "Ecografía abdominal: Aumento difuso de ecogenicidad compatible con esteatosis leve-moderada.",
            "notes": "Inicio formal de dieta baja en fructosa. La familia reporta dificultad inicial para identificar azúcares en colaciones escolares."
        },
        {
            "date": date.today() - timedelta(days=30),
            "alt_tgp": 38.0, # Disminución notable
            "ast_tgo": 31.0,
            "ggt": 29.0,
            "weight_kg": 35.1,
            "height_cm": 134.5,
            "dietary_adherence_percent": 90,
            "ultrasound_findings": "Control clínico intermedio: Mejoría clínica y tolerancia excelente a recetas familiares.",
            "notes": "Notable descenso de transaminasas (-16 U/L). Sofía acepta con agrado los nuggets de avena y hamburguesas caseras."
        },
        {
            "date": date.today() - timedelta(days=2),
            "alt_tgp": 24.5, # ¡Valor normalizado (< 25 U/L)!
            "ast_tgo": 23.0,
            "ggt": 21.0,
            "weight_kg": 34.6,
            "height_cm": 135.0,
            "dietary_adherence_percent": 95,
            "ultrasound_findings": "Transaminasas plenamente normalizadas dentro de rango óptimo (<25 U/L). Gran reversión enzimática.",
            "notes": "Hito alcanzado: Función hepática normalizada gracias a la eliminación total de fructosa oculta y adopción del menú familiar."
        }
    ]

    for log in logs_data:
        MetabolicLog.objects.get_or_create(patient=patient, date=log["date"], defaults=log)
    print("[OK] Paciente demostrativa 'Sofia M.' y 3 controles de transaminasas vinculados.")

    print("[EXITO] Sembrado clinico completado con exito absoluto.")

if __name__ == '__main__':
    seed()
