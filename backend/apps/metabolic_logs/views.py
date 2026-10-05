from rest_framework import viewsets
from .models import MetabolicLog
from .serializers import MetabolicLogSerializer

class MetabolicLogViewSet(viewsets.ModelViewSet):
    queryset = MetabolicLog.objects.all().order_by('-date')
    serializer_class = MetabolicLogSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        patient_id = self.request.query_params.get('patient')
        if patient_id:
            queryset = queryset.filter(patient_id=patient_id)
        return queryset
