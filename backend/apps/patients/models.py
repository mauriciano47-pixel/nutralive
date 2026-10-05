from django.db import models
from datetime import date

class Patient(models.Model):
    GENDER_CHOICES = [
        ('F', 'Femenino'),
        ('M', 'Masculino'),
        ('O', 'Otro'),
    ]

    SEVERITY_CHOICES = [
        ('EVAL', 'En Evaluación Clínica'),
        ('GRADE_1', 'Grado 1 — Esteatosis Leve (<33% grasa)'),
        ('GRADE_2', 'Grado 2 — Esteatosis Moderada (33-66% grasa)'),
        ('GRADE_3', 'Grado 3 — Esteatosis Severa (>66% grasa)'),
        ('REVERSED', 'En Remisión / Valores Normalizados'),
    ]

    name = models.CharField(max_length=150, verbose_name="Nombre Completo")
    birth_date = models.DateField(verbose_name="Fecha de Nacimiento")
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='F', verbose_name="Sexo")
    diagnosis = models.CharField(
        max_length=200, 
        default="Hígado Graso Metabólico (MASLD)", 
        verbose_name="Diagnóstico Principal"
    )
    severity_stage = models.CharField(
        max_length=20, 
        choices=SEVERITY_CHOICES, 
        default='GRADE_1', 
        verbose_name="Estadio Clínico"
    )
    guardian_contact = models.CharField(
        max_length=150, 
        blank=True, 
        verbose_name="Contacto Apoderado / Padre"
    )
    clinical_notes = models.TextField(
        blank=True, 
        verbose_name="Notas Clínicas & Pautas del Nutricionista"
    )
    is_active = models.BooleanField(default=True, verbose_name="Expediente Activo")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Creación")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="Última Modificación")

    class Meta:
        verbose_name = "Paciente"
        verbose_name_plural = "Pacientes"
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} ({self.get_severity_stage_display()})"

    @property
    def age(self):
        today = date.today()
        years = today.year - self.birth_date.year - (
            (today.month, today.day) < (self.birth_date.month, self.birth_date.day)
        )
        return years
