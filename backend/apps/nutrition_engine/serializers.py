from rest_framework import serializers
from .models import Ingredient, FoodProduct

class IngredientSerializer(serializers.ModelSerializer):
    risk_display = serializers.CharField(source='get_risk_level_display', read_only=True)

    class Meta:
        model = Ingredient
        fields = [
            'id', 'name', 'aliases', 'is_hidden_fructose', 
            'risk_level', 'risk_display', 'clinical_mechanism', 
            'suggested_alternative'
        ]

class FoodProductSerializer(serializers.ModelSerializer):
    traffic_light_display = serializers.CharField(source='get_traffic_light_display', read_only=True)

    class Meta:
        model = FoodProduct
        fields = [
            'id', 'barcode', 'name', 'brand', 'category', 
            'traffic_light', 'traffic_light_display', 'ingredients_raw', 
            'detected_harmful_ingredients', 'suggested_swap_product', 
            'swap_reasoning', 'created_at'
        ]

class IngredientAnalysisRequestSerializer(serializers.Serializer):
    ingredients_text = serializers.CharField(required=True, allow_blank=False)
    product_name = serializers.CharField(required=False, allow_blank=True, default="Producto Analizado")
