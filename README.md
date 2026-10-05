# 🥗 NutraLive — Plataforma de Nutrición Terapéutica & Escudo Hepático

> **Ecosistema:** Suite de Salud & Biotecnología (Aplicación Oficial Independiente)  
> **Versión:** v1.0.0-alpha  
> **Autor & Propietario:** Mauricio Uribe Maldonado  

---

## 🎯 Visión y Propósito

**NutraLive** es una solución de salud digital (HealthTech) diseñada para empoderar a personas y familias con dietas clínicas estrictas, con especial foco en la **Reversión del Hígado Graso (MASLD)** mediante:
1. **Semáforo Hepático Inteligente:** Detección de Jarabe de Maíz de Alta Fructosa (JMAF) y azúcares ocultos en segundos.
2. **Función "Cambio Seguro" (Healthy Swap):** Sugerencia inmediata de sustitutos no perjudiciales para el hepatocito.
3. **Chef Familiar Anti-Frustración:** Recetas sabrosas basadas en la dieta mediterránea modificada, sin sensación de castigo.
4. **Bitácora de Marcadores Clínicos:** Seguimiento interactivo de transaminasas (ALT, AST, GGT) y peso.
5. **Panel Clínico Profesional (B2B SaaS):** Portal con Django Admin y API REST para auditoría y monitoreo continuo por parte de médicos y nutricionistas.

---

## 🛠️ Arquitectura Técnica

- **Backend:** Python 3.14 + Django 5 + Django REST Framework + CORS Headers.
- **Frontend:** React 19 + Vite (PWA Offline-First).
- **Base de Datos:** SQLite (Desarrollo local) / PostgreSQL (Producción).
- **Gobernanza:** Bóveda Obsidian en `C:\Users\mauro\OneDrive\Desktop\Cerebros_Obsidian\cerebro_nutralive`.

---

## 🚀 Puesta en Marcha (Desarrollo Local)

### 1. Backend (Django)
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

### 2. Frontend (React + Vite)
```powershell
cd frontend
npm install
npm run dev
```
