from rest_framework import serializers
from .models import MetabolicLog

class MetabolicLogSerializer(serializers.ModelSerializer):
    bmi = serializers.ReadOnlyField()
    alt_status = serializers.ReadOnlyField()
    patient_name = serializers.CharField(source='patient.name', read_only=True)

    class Meta:
        model = MetabolicLog
        fields = [
            'id', 'patient', 'patient_name', 'date', 
            'alt_tgp', 'ast_tgo', 'ggt', 'weight_kg', 
            'height_cm', 'bmi', 'dietary_adherence_percent', 
            'ultrasound_findings', 'notes', 'alt_status', 'created_at'
        ]
