from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Ingredient, FoodProduct
from .views import normalize_text

class NutritionEngineTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.jmaf = Ingredient.objects.create(
            name="Jarabe de Maíz de Alta Fructosa (JMAF/HFCS)",
            aliases="jarabe de glucosa-fructosa, isoglucosa, sirope de maiz",
            is_hidden_fructose=True,
            risk_level="RED",
            clinical_mechanism="Inducción acelerada de lipogénesis de novo en el hepatocito.",
            suggested_alternative="Fruta entera o endulzante sin calorías puro."
        )
        self.avena = Ingredient.objects.create(
            name="Avena Integral Laminada",
            aliases="hojuelas de avena",
            is_hidden_fructose=False,
            risk_level="GREEN",
            clinical_mechanism="Fibra soluble rica en betaglucanos que mejora la sensibilidad a la insulina.",
            suggested_alternative="Mantener consumo habitual."
        )

    def test_normalize_text_removes_accents(self):
        texto = "Kétchup con Azúcar y Jarabe de Maíz"
        normalizado = normalize_text(texto)
        self.assertEqual(normalizado, "ketchup con azucar y jarabe de maiz")

    def test_analyze_ingredients_detects_jmaf_returns_red(self):
        url = reverse('analyze-ingredients')
        payload = {
            "product_name": "Kétchup Procesado",
            "ingredients_text": "Tomate, jarabe de maíz de alta fructosa (JMAF), vinagre, sal."
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data['traffic_light'], 'RED')
        self.assertIn("ALERTA HEPÁTICA", data['verdict_title'])
        self.assertTrue(any(item['name'] == self.jmaf.name for item in data['harmful_items']))

    def test_analyze_ingredients_clean_product_returns_green(self):
        url = reverse('analyze-ingredients')
        payload = {
            "product_name": "Avena Pura",
            "ingredients_text": "Avena integral laminada, semillas de chía, canela en polvo."
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        self.assertEqual(data['traffic_light'], 'GREEN')
        self.assertIn("APROBADO", data['verdict_title'])
