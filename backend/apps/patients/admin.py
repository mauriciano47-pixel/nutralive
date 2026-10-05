from django.contrib import admin
from .models import Patient

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ('name', 'age', 'gender', 'severity_stage', 'diagnosis', 'is_active', 'created_at')
    list_filter = ('severity_stage', 'gender', 'is_active')
    search_fields = ('name', 'diagnosis', 'guardian_contact')
    readonly_fields = ('created_at', 'updated_at')
