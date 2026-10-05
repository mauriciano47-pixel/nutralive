from rest_framework import serializers
from .models import TherapeuticRecipe

class TherapeuticRecipeSerializer(serializers.ModelSerializer):
    difficulty_display = serializers.CharField(source='get_difficulty_display', read_only=True)

    class Meta:
        model = TherapeuticRecipe
        fields = [
            'id', 'title', 'summary', 'category', 
            'prep_time_minutes', 'servings', 'difficulty', 
            'difficulty_display', 'is_kid_approved', 
            'ingredients_list', 'instructions_steps', 
            'hepatic_benefits', 'created_at'
        ]
