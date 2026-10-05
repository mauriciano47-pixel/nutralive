from django.contrib import admin
from .models import Ingredient, FoodProduct

@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    list_display = ('name', 'risk_level', 'is_hidden_fructose', 'suggested_alternative')
    list_filter = ('risk_level', 'is_hidden_fructose')
    search_fields = ('name', 'aliases', 'clinical_mechanism')

@admin.register(FoodProduct)
class FoodProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'brand', 'category', 'traffic_light', 'suggested_swap_product', 'barcode')
    list_filter = ('traffic_light', 'category')
    search_fields = ('name', 'brand', 'ingredients_raw', 'barcode')
