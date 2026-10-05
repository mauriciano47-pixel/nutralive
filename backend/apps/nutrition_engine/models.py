from django.db import models
import re

class Ingredient(models.Model):
    RISK_CHOICES = [
        ('GREEN', 'Seguro / Protector Hepático'),
        ('YELLOW', 'Precaución / Consumo Moderado'),
        ('RED', 'Alerta Hepática / Prohibido en MASLD'),
    ]

    name = models.CharField(max_length=150, unique=True, verbose_name="Nombre del Ingrediente")
    aliases = models.TextField(
        blank=True, 
        verbose_name="Sinónimos y Nombres Comerciales",
        help_text="Separados por comas. Ej: JMAF, jarabe de maíz alto en fructosa, HFCS-55, isoglucosa"
    )
    is_hidden_fructose = models.BooleanField(
        default=False, 
        verbose_name="¿Es Fructosa Oculta o Derivado?"
    )
    risk_level = models.CharField(
        max_length=10, 
        choices=RISK_CHOICES, 
        default='GREEN', 
        verbose_name="Nivel de Riesgo Hepático"
    )
    clinical_mechanism = models.TextField(
        blank=True, 
        verbose_name="Mecanismo Fisiopatológico",
        help_text="Por qué afecta o beneficia al hígado (ej. estimula lipogénesis de novo)"
    )
    suggested_alternative = models.CharField(
        max_length=200, 
        blank=True, 
        verbose_name="Alternativa Saludable Segura"
    )

    class Meta:
        verbose_name = "Ingrediente Clínico"
        verbose_name_plural = "Ingredientes Clínicos"
        ordering = ['name']

    def __str__(self):
        return f"{self.name} [{self.get_risk_level_display()}]"


class FoodProduct(models.Model):
    TRAFFIC_LIGHT_CHOICES = [
        ('GREEN', '🟢 Apto & Seguro'),
        ('YELLOW', '🟡 Consumo con Moderación'),
        ('RED', '🔴 Alerta Hepática (Fructosa / Ultraprocesado)'),
    ]

    barcode = models.CharField(
        max_length=50, 
        blank=True, 
        null=True, 
        unique=True, 
        verbose_name="Código de Barras EAN/UPC"
    )
    name = models.CharField(max_length=200, verbose_name="Nombre del Producto")
    brand = models.CharField(max_length=100, blank=True, verbose_name="Marca")
    category = models.CharField(
        max_length=100, 
        default="General", 
        verbose_name="Categoría"
    )
    traffic_light = models.CharField(
        max_length=10, 
        choices=TRAFFIC_LIGHT_CHOICES, 
        default='GREEN', 
        verbose_name="Semáforo Hepático"
    )
    ingredients_raw = models.TextField(verbose_name="Lista Completa de Ingredientes")
    detected_harmful_ingredients = models.JSONField(
        default=list, 
        blank=True, 
        verbose_name="Ingredientes de Riesgo Detectados"
    )
    suggested_swap_product = models.CharField(
        max_length=200, 
        blank=True, 
        verbose_name="Cambio Seguro (Producto Sustituto)"
    )
    swap_reasoning = models.TextField(
        blank=True, 
        verbose_name="Explicación del Cambio Culinario"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Alimento Analizado"
        verbose_name_plural = "Alimentos Analizados"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.brand}) — {self.get_traffic_light_display()}"
