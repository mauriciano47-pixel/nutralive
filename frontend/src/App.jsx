import React, { useState, useEffect } from 'react';
import SemaforoEscaneo from './components/SemaforoEscaneo';
import BitacoraMarcadores from './components/BitacoraMarcadores';
import RecetasFamiliares from './components/RecetasFamiliares';
import ResumenConsulta from './components/ResumenConsulta';
import SplashScreenNutraLive from './components/SplashScreenNutraLive';
import LobbyNutraLive from './components/LobbyNutraLive';
import ModalPlanesNutraLive from './components/ModalPlanesNutraLive';
import ComparadorFrutaJugo from './components/ComparadorFrutaJugo';
import { getSubscriptionState } from './utils/stripeService';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const INITIAL_LOGS = [
  { id: 1, date: '2026-08-05', alt_tgp: 54.0, ast_tgo: 42.0, ggt: 38.0, weight_kg: 35.8, notes: 'Inicio formal de dieta baja en fructosa. Transaminasas elevadas.', adherence: 70 },
  { id: 2, date: '2026-09-04', alt_tgp: 38.0, ast_tgo: 31.0, ggt: 29.0, weight_kg: 35.1, notes: 'Descenso notable (-16 U/L). Gran adherencia a comidas caseras.', adherence: 90 },
  { id: 3, date: '2026-10-03', alt_tgp: 24.5, ast_tgo: 23.0, ggt: 21.0, weight_kg: 34.6, notes: '¡Normalización enzimática dentro de rango pediátrico óptimo (<25 U/L)!', adherence: 95 }
];

export default function App() {
  const [tab, setTab] = useState('semaforo');
  const [theme, setTheme] = useState('dark');
  const [backendStatus, setBackendStatus] = useState('checking');

  // Control de Pre-pantalla de 3 segundos
  const [mostrarSplash, setMostrarSplash] = useState(true);

  // Control de Verificación de Usuario
  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    try {
      const guardado = localStorage.getItem('nutralive_usuario_sesion');
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  });

  // Estado compartido y persistente de Bitácora Metabólica
  const [logs, setLogs] = useState(() => {
    try {
      const guardados = localStorage.getItem('nutralive_metabolic_logs');
      if (guardados) {
        const parsed = JSON.parse(guardados);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_LOGS;
  });

  const handleActualizarLogs = (nuevosLogs) => {
    setLogs(nuevosLogs);
    try {
      localStorage.setItem('nutralive_metabolic_logs', JSON.stringify(nuevosLogs));
    } catch {}
  };

  const [mostrarLobby, setMostrarLobby] = useState(false);
  const [mostrarModalPlanes, setMostrarModalPlanes] = useState(false);
  const [suscripcion, setSuscripcion] = useState(() => getSubscriptionState());

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

  const manejarVerificacionExitosa = (nuevoUsuario) => {
    setUsuarioActivo(nuevoUsuario);
    try {
      localStorage.setItem('nutralive_usuario_sesion', JSON.stringify(nuevoUsuario));
    } catch {
      // Ignorar error de almacenamiento
    }
    setMostrarLobby(false);
  };

  const cerrarSesionOModificar = () => {
    setMostrarLobby(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Pre-pantalla de iniciación de 3 segundos */}
      {mostrarSplash && (
        <SplashScreenNutraLive onCompletado={() => setMostrarSplash(false)} />
      )}

      {/* 2. Modal de Verificación de Usuario al inicio */}
      {(!mostrarSplash && (!usuarioActivo || mostrarLobby)) && (
        <LobbyNutraLive onVerificacionExitosa={manejarVerificacionExitosa} />
      )}

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

          {/* Usuario Verificado & Estado */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {usuarioActivo && (
              <button
                type="button"
                onClick={cerrarSesionOModificar}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-emerald)',
                  color: 'var(--text-main)',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                title="Hacer clic para cambiar de usuario o perfil"
              >
                <span>{usuarioActivo.tipo === 'especialista' ? '🩺' : '👤'}</span>
                <span>{usuarioActivo.nombre}</span>
                {usuarioActivo.paciente?.nombre && (
                  <span style={{ color: 'var(--emerald-400)', fontSize: '0.72rem' }}>
                    ({usuarioActivo.paciente.nombre})
                  </span>
                )}
                <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)' }}>⚙️</span>
              </button>
            )}

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
              onClick={() => setMostrarModalPlanes(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                background: suscripcion.isActive
                  ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)'
                  : 'linear-gradient(135deg, rgba(245, 158, 11, 0.2) 0%, rgba(217, 119, 6, 0.2) 100%)',
                border: suscripcion.isActive
                  ? '1px solid var(--border-emerald)'
                  : '1px solid rgba(245, 158, 11, 0.4)',
                color: suscripcion.isActive ? 'var(--emerald-400)' : '#f59e0b',
                fontSize: '0.78rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title="Ver planes de suscripción y licencia clínica"
            >
              <span>{suscripcion.isActive ? '⭐' : '🛡️'}</span>
              <span>{suscripcion.isActive ? 'PLAN PRO ACTIVO' : 'PLANES PRO'}</span>
            </button>

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
            { id: 'mitos', label: '🍊 Fruta vs Jugo', desc: 'Escudo Fibra' },
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
        {tab === 'bitacora' && <BitacoraMarcadores apiBaseUrl={API_BASE_URL} logs={logs} onActualizarLogs={handleActualizarLogs} />}
        {tab === 'recetas' && <RecetasFamiliares />}
        {tab === 'mitos' && <ComparadorFrutaJugo />}
        {tab === 'resumen' && <ResumenConsulta usuarioActivo={usuarioActivo} logs={logs} />}
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

      {/* 3. Modal de Planes de Suscripción Stripe */}
      <ModalPlanesNutraLive
        isOpen={mostrarModalPlanes}
        onClose={() => setMostrarModalPlanes(false)}
        onSubscriptionChanged={(nuevaSub) => setSuscripcion(nuevaSub)}
      />
    </div>
  );
}
