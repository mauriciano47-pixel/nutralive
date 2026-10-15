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

// Sanitizadores contra Client-Side Storage Poisoning (SonarCloud S6079/S5147)
function sanitizarUsuario(u) {
  if (!u || typeof u !== 'object') return null;
  return {
    id: String(u.id || '').slice(0, 64),
    metodoAuth: String(u.metodoAuth || 'local').slice(0, 32),
    nombre: String(u.nombre || '').slice(0, 100),
    email: String(u.email || '').slice(0, 100),
    avatar: String(u.avatar || '').startsWith('https://') ? String(u.avatar).slice(0, 200) : '',
    tipo: String(u.tipo || 'familia').slice(0, 32),
    rolTitulo: String(u.rolTitulo || '').slice(0, 100),
    paciente: {
      nombre: String(u.paciente?.nombre || '').slice(0, 100),
      edad: Number(u.paciente?.edad) || 0,
      diagnostico: String(u.paciente?.diagnostico || '').slice(0, 120),
    },
    fechaVerificacion: String(u.fechaVerificacion || new Date().toISOString()).slice(0, 40),
    cuentaVerificada: Boolean(u.cuentaVerificada),
  };
}

function sanitizarLogs(logs) {
  if (!Array.isArray(logs)) return INITIAL_LOGS;
  return logs.slice(0, 100).map((l, idx) => ({
    id: Number(l.id) || idx + 1,
    date: String(l.date || '').slice(0, 10),
    alt_tgp: Number(l.alt_tgp) || 0,
    ast_tgo: Number(l.ast_tgo) || 0,
    ggt: Number(l.ggt) || 0,
    weight_kg: Number(l.weight_kg) || 0,
    notes: String(l.notes || '').slice(0, 250),
    adherence: Number(l.adherence) || 0,
  }));
}

  // Control de Verificación de Usuario Inicial (Google o Creación de Cuenta)
  const [usuarioActivo, setUsuarioActivo] = useState(() => {
    try {
      const guardado = localStorage.getItem('nutralive_usuario_sesion');
      if (guardado) {
        const parsed = JSON.parse(guardado);
        if (parsed && parsed.cuentaVerificada) {
          const esEspecialista = parsed.tipo === 'especialista';
          return {
            id: 'usr-local',
            metodoAuth: parsed.metodoAuth === 'google' ? 'google' : 'email',
            nombre: esEspecialista ? 'Especialista Clínico' : 'Tutor Familiar',
            email: 'familia@nutralive.cl',
            avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=NutraLive&backgroundColor=10b981',
            tipo: esEspecialista ? 'especialista' : 'familia',
            rolTitulo: esEspecialista ? 'Especialista Clínico Verificado' : 'Tutor Familiar',
            paciente: {
              nombre: 'Agustina',
              edad: 9,
              diagnostico: 'Esteatosis Hepática (MASLD Grado 1)',
            },
            fechaVerificacion: new Date().toISOString(),
            cuentaVerificada: true,
          };
        }
      }
      return null;
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
        if (Array.isArray(parsed) && parsed.length > 0) return sanitizarLogs(parsed);
      }
    } catch {}
    return INITIAL_LOGS;
  });

  const handleActualizarLogs = (nuevosLogs) => {
    const logsSeguros = sanitizarLogs(nuevosLogs);
    setLogs(logsSeguros);
    try {
      localStorage.setItem('nutralive_metabolic_logs', JSON.stringify(logsSeguros));
    } catch {}
  };

  const [mostrarLobby, setMostrarLobby] = useState(false);
  const [mostrarModalPlanes, setMostrarModalPlanes] = useState(false);
  const [suscripcion, setSuscripcion] = useState(() => getSubscriptionState());

  // Alternar tema y sincronizar con atributo en body/html
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Verificar estado del backend Django (solo en entorno local)
  useEffect(() => {
    const esLocal = typeof window !== 'undefined' && 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

    if (!esLocal) {
      setBackendStatus('offline');
      return;
    }

    async function checkBackend() {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1000);
        const res = await fetch(`${API_BASE_URL}/health/`, { 
          method: 'GET',
          signal: controller.signal 
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          setBackendStatus('online');
        } else {
          setBackendStatus('offline');
        }
      } catch {
        setBackendStatus('offline');
      }
    }

    void checkBackend();
    const interval = setInterval(() => { void checkBackend(); }, 15000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const manejarVerificacionExitosa = (nuevoUsuario) => {
    const usuarioSeguro = sanitizarUsuario(nuevoUsuario);
    setUsuarioActivo(usuarioSeguro);
    try {
      if (usuarioSeguro) {
        const sesionSegura = {
          metodoAuth: usuarioSeguro.metodoAuth === 'google' ? 'google' : 'email',
          tipo: usuarioSeguro.tipo === 'especialista' ? 'especialista' : 'familia',
          cuentaVerificada: true,
          ts: Date.now()
        };
        localStorage.setItem('nutralive_usuario_sesion', JSON.stringify(sesionSegura));
      }
    } catch {
      // Ignorar error de almacenamiento
    }
    setMostrarLobby(false);
  };

  const cerrarSesionOModificar = () => {
    setMostrarLobby(true);
  };

  const cerrarSesion = () => {
    try {
      localStorage.removeItem('nutralive_usuario_sesion');
    } catch {}
    setUsuarioActivo(null);
    setMostrarLobby(true);
  };

  const handleCerrarLobby = () => {
    if (!usuarioActivo) {
      const usuarioInvitado = {
        id: 'usr-invitado',
        metodoAuth: 'invitado',
        nombre: 'Familia Agustina',
        email: 'invitado@nutralive.health',
        avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Agustina&backgroundColor=10b981',
        tipo: 'familia',
        rolTitulo: 'Tutor Pediátrico (Caso Clínico de Agustina)',
        paciente: {
          nombre: 'Agustina',
          edad: 9,
          diagnostico: 'Esteatosis Hepática (MASLD Grado 1)'
        },
        fechaVerificacion: new Date().toISOString(),
        cuentaVerificada: true
      };
      manejarVerificacionExitosa(usuarioInvitado);
    } else {
      setMostrarLobby(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Verificación Inicial de Usuario (Prioritario e Inmediato en Segundo 0 si no hay sesión) */}
      {(!usuarioActivo || mostrarLobby) && (
        <LobbyNutraLive 
          onVerificacionExitosa={manejarVerificacionExitosa}
          onCerrar={handleCerrarLobby}
        />
      )}

      {/* 2. Pre-pantalla animada de bienvenida solo si el usuario ya validó su sesión */}
      {usuarioActivo && mostrarSplash && (
        <SplashScreenNutraLive onCompletado={() => setMostrarSplash(false)} />
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                  title={`Sesión activa: ${usuarioActivo.email || usuarioActivo.nombre}. Clic para ver perfil`}
                >
                  {usuarioActivo.metodoAuth === 'google' ? (
                    <span style={{ fontSize: '0.72rem', background: '#ffffff', color: '#1a73e8', padding: '1px 5px', borderRadius: 8, fontWeight: 900 }}>
                      G
                    </span>
                  ) : (
                    <span>{usuarioActivo.tipo === 'especialista' ? '🩺' : '👤'}</span>
                  )}
                  <span>{usuarioActivo.nombre}</span>
                  {usuarioActivo.paciente?.nombre && (
                    <span style={{ color: 'var(--emerald-400)', fontSize: '0.72rem' }}>
                      ({usuarioActivo.paciente.nombre})
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={cerrarSesion}
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-color)',
                    color: 'var(--text-dim)',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px 8px',
                    fontSize: '0.72rem',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                  title="Cerrar sesión y cambiar cuenta"
                >
                  Salir 🚪
                </button>
              </div>
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
