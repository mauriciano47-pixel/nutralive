from django.db import models

class TherapeuticRecipe(models.Model):
    DIFFICULTY_CHOICES = [
        ('FACIL', 'Fácil (Menos de 20 min)'),
        ('MEDIA', 'Media (20 a 45 min)'),
        ('ELABORADA', 'Elaborada (Fin de semana)'),
    ]

    title = models.CharField(max_length=200, verbose_name="Título de la Receta")
    summary = models.TextField(verbose_name="Descripción Apetecible")
    category = models.CharField(
        max_length=100, 
        default="Almuerzo / Cena", 
        verbose_name="Categoría (Desayuno, Almuerzo, Snack)"
    )
    prep_time_minutes = models.PositiveIntegerField(default=25, verbose_name="Tiempo de Preparación (min)")
    servings = models.PositiveIntegerField(default=4, verbose_name="Porciones Familiares")
    difficulty = models.CharField(
        max_length=15, 
        choices=DIFFICULTY_CHOICES, 
        default='FACIL', 
        verbose_name="Dificultad"
    )
    is_kid_approved = models.BooleanField(
        default=True, 
        verbose_name="Aprobada por Niños / Sabor Familiar"
    )
    ingredients_list = models.JSONField(
        default=list, 
        verbose_name="Lista de Ingredientes y Cantidades"
    )
    instructions_steps = models.JSONField(
        default=list, 
        verbose_name="Paso a Paso de Preparación"
    )
    hepatic_benefits = models.TextField(
        verbose_name="Beneficio Clínico para el Hígado",
        help_text="Por qué esta receta es anti-esteatosis (colina, antioxidantes, fibra, etc.)"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Receta Terapéutica"
        verbose_name_plural = "Recetas Terapéuticas"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} ({self.category})"
