from django.db import models
from apps.patients.models import Patient

class MetabolicLog(models.Model):
    patient = models.ForeignKey(
        Patient, 
        on_delete=models.CASCADE, 
        related_name='metabolic_logs',
        verbose_name="Paciente"
    )
    date = models.DateField(verbose_name="Fecha de Toma de Muestra / Control")
    alt_tgp = models.FloatField(
        null=True, 
        blank=True, 
        verbose_name="ALT / TGP (U/L)", 
        help_text="Alanina Aminotransferasa. Normal óptimo: <25-30 U/L"
    )
    ast_tgo = models.FloatField(
        null=True, 
        blank=True, 
        verbose_name="AST / TGO (U/L)", 
        help_text="Aspartato Aminotransferasa. Normal óptimo: <35 U/L"
    )
    ggt = models.FloatField(
        null=True, 
        blank=True, 
        verbose_name="GGT (U/L)", 
        help_text="Gamma-Glutamil Transferasa. Normal: <30-50 U/L"
    )
    weight_kg = models.FloatField(
        null=True, 
        blank=True, 
        verbose_name="Peso (kg)"
    )
    height_cm = models.FloatField(
        null=True, 
        blank=True, 
        verbose_name="Estatura (cm)"
    )
    dietary_adherence_percent = models.IntegerField(
        default=100, 
        verbose_name="Adherencia a Dieta (%)",
        help_text="Estimación de cumplimiento de dieta baja en fructosa"
    )
    ultrasound_findings = models.TextField(
        blank=True, 
        verbose_name="Hallazgos Ecográficos / FibroScan"
    )
    notes = models.TextField(
        blank=True, 
        verbose_name="Observaciones Clínicas"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Registro Metabólico"
        verbose_name_plural = "Registros Metabólicos"
        ordering = ['-date']

    def __str__(self):
        return f"{self.patient.name} — {self.date} (ALT: {self.alt_tgp or 'N/A'})"

    @property
    def bmi(self):
        if self.weight_kg and self.height_cm and self.height_cm > 0:
            height_m = self.height_cm / 100.0
            return round(self.weight_kg / (height_m * height_m), 1)
        return None

    @property
    def alt_status(self):
        if self.alt_tgp is None:
            return "DESCONOCIDO"
        if self.alt_tgp <= 26:
            return "OPTIMO"
        elif self.alt_tgp <= 45:
            return "LEVEMENTE_ELEVADO"
        else:
            return "INFLAMACION_ACTIVA"
