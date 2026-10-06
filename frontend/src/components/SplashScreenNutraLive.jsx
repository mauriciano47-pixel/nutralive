import React, { useState, useEffect } from 'react';

export default function SplashScreenNutraLive({ onCompletado }) {
  const [progreso, setProgreso] = useState(0);
  const [faseTexto, setFaseTexto] = useState('Inicializando motor metabólico & analítica hepática...');

  useEffect(() => {
    const inicio = Date.now();
    const duracion = 3000; // 3 segundos exactos

    const intervalo = setInterval(() => {
      const transcurrido = Date.now() - inicio;
      const pct = Math.min(100, Math.round((transcurrido / duracion) * 100));
      setProgreso(pct);

      if (pct < 35) {
        setFaseTexto('Inicializando motor metabólico & analítica hepática...');
      } else if (pct < 75) {
        setFaseTexto('Calibrando semáforo clínico contra jarabes de fructosa (JMAF)...');
      } else {
        setFaseTexto('Listo para proteger la salud de tu familia ✨');
      }

      if (transcurrido >= duracion) {
        clearInterval(intervalo);
        setTimeout(onCompletado, 150);
      }
    }, 25);

    return () => clearInterval(intervalo);
  }, [onCompletado]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        background: 'radial-gradient(circle at 50% 38%, #0f1f3d 0%, #0b132b 65%, #060a17 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        userSelect: 'none',
        color: '#f8fafc'
      }}
      aria-label="Prepantalla de inicio NutraLive"
    >
      {/* Botón discreto para omitir si el usuario tiene prisa */}
      <button
        type="button"
        onClick={onCompletado}
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: 20,
          padding: '6px 14px',
          fontSize: 12,
          fontWeight: 700,
          color: '#94a3b8',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
          transition: 'all 0.2s ease'
        }}
        aria-label="Saltar bienvenida"
      >
        Saltar »
      </button>

      {/* Emblema Central y Animación */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: 400,
        width: '100%'
      }}>
        {/* Isotipo con Pulso */}
        <div style={{
          width: 96,
          height: 96,
          borderRadius: 28,
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 16px 40px rgba(16, 185, 129, 0.35)',
          marginBottom: 20,
          animation: 'pulse 2s infinite ease-in-out'
        }}>
          <span style={{ fontSize: '3rem' }}>🥗</span>
        </div>

        {/* Título y Subtítulo */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 900,
          letterSpacing: '-0.03em',
          color: '#ffffff',
          marginBottom: 4
        }}>
          Nutra<span style={{ color: '#34d399' }}>Live</span>
        </h1>

        <span style={{
          fontSize: '0.85rem',
          fontWeight: 600,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: 28
        }}>
          Nutrición Terapéutica & Escudo Hepático
        </span>

        {/* Barra de Progreso de 3 Segundos */}
        <div style={{
          width: '100%',
          maxWidth: 280,
          height: 6,
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 999,
          overflow: 'hidden',
          marginBottom: 16
        }}>
          <div style={{
            height: '100%',
            width: `${progreso}%`,
            background: 'linear-gradient(90deg, #10b981, #34d399)',
            borderRadius: 999,
            transition: 'width 0.05s linear'
          }} />
        </div>

        {/* Texto de Fase Dinámica */}
        <p style={{
          fontSize: '0.82rem',
          color: '#cbd5e1',
          fontWeight: 500,
          minHeight: 24,
          transition: 'opacity 0.2s ease'
        }}>
          {faseTexto}
        </p>

        {/* Sello Clínico de Autor */}
        <div style={{
          marginTop: 32,
          fontSize: '0.72rem',
          color: '#64748b',
          letterSpacing: '0.03em'
        }}>
          Suite de Salud • Mauricio Uribe Maldonado
        </div>
      </div>
    </div>
  );
}
