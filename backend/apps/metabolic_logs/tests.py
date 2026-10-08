from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from datetime import date
from apps.patients.models import Patient
from .models import MetabolicLog

class MetabolicLogsTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.patient = Patient.objects.create(
            name="Sofía Maldonado",
            birth_date=date(2017, 3, 15),
            gender='F',
            diagnosis="Esteatosis Hepática Grado 1 (MASLD)",
            severity_stage='GRADE_1'
        )
        self.log1 = MetabolicLog.objects.create(
            patient=self.patient,
            date=date(2026, 8, 1),
            alt_tgp=54.0,
            ast_tgo=42.0,
            ggt=38.0,
            weight_kg=35.8,
            dietary_adherence_percent=70,
            notes="Inicio de intervención nutricional sin fructosa agregada."
        )

    def test_metabolic_log_creation_and_string_representation(self):
        self.assertEqual(self.log1.patient.name, "Sofía Maldonado")
        self.assertEqual(self.log1.alt_tgp, 54.0)
        self.assertIn("Sofía Maldonado", str(self.log1))

    def test_list_metabolic_logs_api(self):
        url = reverse('metabolic-log-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.json()
        results = data.get('results', data)
        self.assertTrue(len(results) >= 1)

    def test_create_metabolic_log_api(self):
        url = reverse('metabolic-log-list')
        payload = {
            "patient": self.patient.id,
            "date": "2026-09-01",
            "alt_tgp": 38.0,
            "ast_tgo": 31.0,
            "ggt": 29.0,
            "weight_kg": 35.1,
            "dietary_adherence_percent": 90,
            "notes": "Reducción significativa de transaminasas en 4 semanas."
        }
        response = self.client.post(url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(MetabolicLog.objects.filter(patient=self.patient).count(), 2)
