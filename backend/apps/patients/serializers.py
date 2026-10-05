from rest_framework import serializers
from .models import Patient

class PatientSerializer(serializers.ModelSerializer):
    age = serializers.ReadOnlyField()
    severity_display = serializers.CharField(source='get_severity_stage_display', read_only=True)

    class Meta:
        model = Patient
        fields = [
            'id', 'name', 'birth_date', 'age', 'gender', 
            'diagnosis', 'severity_stage', 'severity_display', 
            'guardian_contact', 'clinical_notes', 'is_active', 
            'created_at', 'updated_at'
        ]
