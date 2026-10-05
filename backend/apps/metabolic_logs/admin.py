from django.contrib import admin
from .models import MetabolicLog

@admin.register(MetabolicLog)
class MetabolicLogAdmin(admin.ModelAdmin):
    list_display = ('patient', 'date', 'alt_tgp', 'ast_tgo', 'ggt', 'weight_kg', 'bmi', 'dietary_adherence_percent', 'alt_status')
    list_filter = ('date', 'patient')
    search_fields = ('patient__name', 'notes', 'ultrasound_findings')
