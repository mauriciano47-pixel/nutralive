from rest_framework import viewsets
from .models import TherapeuticRecipe
from .serializers import TherapeuticRecipeSerializer

class TherapeuticRecipeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TherapeuticRecipe.objects.all().order_by('-created_at')
    serializer_class = TherapeuticRecipeSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        kid_approved = self.request.query_params.get('kid_approved')
        if category:
            queryset = queryset.filter(category__icontains=category)
        if kid_approved is not None:
            queryset = queryset.filter(is_kid_approved=kid_approved.lower() == 'true')
        return queryset
