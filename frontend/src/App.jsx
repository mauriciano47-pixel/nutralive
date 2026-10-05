import React, { useState, useEffect } from 'react';
import SemaforoEscaneo from './components/SemaforoEscaneo';
import BitacoraMarcadores from './components/BitacoraMarcadores';
import RecetasFamiliares from './components/RecetasFamiliares';
import ResumenConsulta from './components/ResumenConsulta';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

export default function App() {
  const [tab, setTab] = useState('semaforo');
  const [theme, setTheme] = useState('dark');
  const [backendStatus, setBackendStatus] = useState('checking');

  // Alternar tema y sincronizar con atributo en body/html
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Verificar estado del backend Django
  useEffect(() => {
    async function checkBackend() {
      try {
        const res = await fetch(`${API_BASE_URL}/health/`, { method: 'GET' });
        if (res.ok) {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      } catch {
        setBackendStatus('offline');
      }
    }
    checkBackend();
    const interval = setInterval(checkBackend, 15000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Barra de Navegación Superior */}
      <header style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'blur(12px)',
        padding: '0.75rem 1rem'
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.75rem'
        }}>
          {/* Logo y Marca */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, var(--emerald-500) 0%, var(--emerald-600) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              boxShadow: '0 4px 12px var(--emerald-glow)'
            }}>
              🥗
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-main)', margin: 0 }}>
                  Nutra<span style={{ color: 'var(--emerald-400)' }}>Live</span>
                </h1>
                <span style={{
                  fontSize: '0.65rem',
                  background: 'var(--emerald-glow)',
                  border: '1px solid var(--border-emerald)',
                  color: 'var(--emerald-400)',
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: 800
                }}>
                  v1.0
                </span>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                Nutrición Clínica de Precisión & Escudo Hepático (MASLD)
              </span>
            </div>
          </div>

          {/* Estado de Conexión & Controles */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              background: backendStatus === 'online' ? 'var(--emerald-glow)' : 'rgba(245, 158, 11, 0.1)',
              border: `1px solid ${backendStatus === 'online' ? 'var(--border-emerald)' : 'rgba(245, 158, 11, 0.3)'}`,
              color: backendStatus === 'online' ? 'var(--emerald-400)' : 'var(--yellow-caution)'
            }}>
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: backendStatus === 'online' ? 'var(--emerald-400)' : 'var(--yellow-caution)',
                display: 'inline-block'
              }} />
              <span>{backendStatus === 'online' ? 'Django REST Activo' : 'Modo Offline-First'}</span>
            </div>

            <button
              onClick={toggleTheme}
              aria-label="Cambiar tema claro u oscuro"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                color: 'var(--text-main)',
                transition: 'all 0.2s ease'
              }}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Barra de Pestañas Principales */}
        <nav style={{
          maxWidth: '1100px',
          margin: '0.75rem auto 0 auto',
          display: 'flex',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '2px'
        }}>
          {[
            { id: 'semaforo', label: '🚦 Semáforo Hepático', desc: 'Filtro Fructosa' },
            { id: 'bitacora', label: '📈 Curva ALT / AST', desc: 'Biomarcadores' },
            { id: 'recetas', label: '🍳 Recetas Familiares', desc: 'Cero Frustración' },
            { id: 'resumen', label: '🩺 Resumen Médico', desc: 'Portal Consulta' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.85rem',
                fontWeight: 700,
                background: tab === t.id ? 'var(--emerald-500)' : 'transparent',
                color: tab === t.id ? '#ffffff' : 'var(--text-muted)',
                border: tab === t.id ? 'none' : '1px solid transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease'
              }}
            >
              <span>{t.label}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* Contenido Dinámico de la Pestaña Activa */}
      <main style={{ flex: 1, padding: '1rem 0' }}>
        {tab === 'semaforo' && <SemaforoEscaneo apiBaseUrl={API_BASE_URL} />}
        {tab === 'bitacora' && <BitacoraMarcadores apiBaseUrl={API_BASE_URL} />}
        {tab === 'recetas' && <RecetasFamiliares />}
        {tab === 'resumen' && <ResumenConsulta />}
      </main>

      {/* Pie de Página */}
      <footer style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '1.5rem 1rem',
        textAlign: 'center',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', fontSize: '0.82rem', color: 'var(--text-dim)' }}>
          <p style={{ fontWeight: 600, color: 'var(--text-muted)' }}>
            <strong>NutraLive</strong> — Suite de Salud & Nutrición Clínica Terapéutica
          </p>
          <p style={{ marginTop: '4px' }}>
            Propiedad exclusiva de <strong>Mauricio Uribe Maldonado</strong>. Desarrollado con Python 3.14 + Django REST Framework y React 19.
          </p>
          <p style={{ marginTop: '4px', fontSize: '0.75rem' }}>
            Diseñado para la protección hepática pediátrica y familiar. Basado en guías EASL y ESPGHAN para el manejo de MASLD.
          </p>
        </div>
      </footer>
    </div>
  );
}
