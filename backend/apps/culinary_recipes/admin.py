from django.contrib import admin
from .models import TherapeuticRecipe

@admin.register(TherapeuticRecipe)
class TherapeuticRecipeAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'prep_time_minutes', 'difficulty', 'servings', 'is_kid_approved')
    list_filter = ('category', 'difficulty', 'is_kid_approved')
    search_fields = ('title', 'summary', 'hepatic_benefits')
