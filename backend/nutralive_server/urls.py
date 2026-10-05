from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.response import Response
from rest_framework.decorators import api_view

from apps.patients.views import PatientViewSet
from apps.metabolic_logs.views import MetabolicLogViewSet
from apps.nutrition_engine.views import IngredientViewSet, FoodProductViewSet, analyze_ingredients
from apps.culinary_recipes.views import TherapeuticRecipeViewSet

router = DefaultRouter()
router.register(r'patients', PatientViewSet, basename='patient')
router.register(r'metabolic-logs', MetabolicLogViewSet, basename='metabolic-log')
router.register(r'ingredients', IngredientViewSet, basename='ingredient')
router.register(r'foods', FoodProductViewSet, basename='food')
router.register(r'recipes', TherapeuticRecipeViewSet, basename='recipe')

@api_view(['GET'])
def health_check(request):
    return Response({
        "status": "online",
        "service": "NutraLive Clinical API",
        "version": "1.0.0-alpha",
        "specialty": "Metabolic & Hepatic Precision Nutrition (MASLD)"
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/health/', health_check, name='health-check'),
    path('api/analyze/', analyze_ingredients, name='analyze-ingredients'),
    path('api/', include(router.urls)),
]

admin.site.site_header = "NutraLive — Consola Médica & Nutricional"
admin.site.site_title = "NutraLive Admin"
admin.site.index_title = "Gestión Clínica, Pacientes y Semáforo Hepático"
