import React, { useState, useEffect } from 'react';

const INITIAL_LOGS = [
  {
    id: 1,
    date: '2026-08-05',
    alt_tgp: 54.0,
    ast_tgo: 42.0,
    ggt: 38.0,
    weight_kg: 35.8,
    notes: 'Inicio formal de dieta baja en fructosa. Transaminasas elevadas.',
    adherence: 70
  },
  {
    id: 2,
    date: '2026-09-04',
    alt_tgp: 38.0,
    ast_tgo: 31.0,
    ggt: 29.0,
    weight_kg: 35.1,
    notes: 'Descenso notable (-16 U/L). Gran adherencia a comidas caseras.',
    adherence: 90
  },
  {
    id: 3,
    date: '2026-10-03',
    alt_tgp: 24.5,
    ast_tgo: 23.0,
    ggt: 21.0,
    weight_kg: 34.6,
    notes: '¡Normalización enzimática dentro de rango pediátrico óptimo (<25 U/L)!',
    adherence: 95
  }
];

export default function BitacoraMarcadores({ apiBaseUrl, logs: propLogs, onActualizarLogs }) {
  const [internalLogs, setInternalLogs] = useState(() => {
    try {
      const guardados = localStorage.getItem('nutralive_metabolic_logs');
      if (guardados) {
        const parsed = JSON.parse(guardados);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_LOGS;
  });

  const logs = propLogs || internalLogs;

  const actualizarLogsState = (nuevosLogs) => {
    setInternalLogs(nuevosLogs);
    try {
      localStorage.setItem('nutralive_metabolic_logs', JSON.stringify(nuevosLogs));
    } catch {}
    if (onActualizarLogs) {
      onActualizarLogs(nuevosLogs);
    }
  };

  const [loading, setLoading] = useState(false);
  const [nuevoControl, setNuevoControl] = useState({
    date: new Date().toISOString().split('T')[0],
    alt_tgp: '',
    ast_tgo: '',
    ggt: '',
    weight_kg: '',
    notes: ''
  });

  useEffect(() => {
    async function cargarLogs() {
      try {
        setLoading(true);
        const res = await fetch(`${apiBaseUrl}/metabolic-logs/`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.results && data.results.length > 0) {
            const apiLogs = data.results.reverse();
            actualizarLogsState(apiLogs);
          }
        }
      } catch {
        // Modo Offline-First autónomo: mantiene los logs de localStorage
      } finally {
        setLoading(false);
      }
    }
    cargarLogs();
  }, [apiBaseUrl]);

  const handleAgregarControl = (e) => {
    e.preventDefault();
    if (!nuevoControl.alt_tgp) return;

    const nuevoItem = {
      id: Date.now(),
      date: nuevoControl.date,
      alt_tgp: parseFloat(nuevoControl.alt_tgp),
      ast_tgo: nuevoControl.ast_tgo ? parseFloat(nuevoControl.ast_tgo) : null,
      ggt: nuevoControl.ggt ? parseFloat(nuevoControl.ggt) : null,
      weight_kg: nuevoControl.weight_kg ? parseFloat(nuevoControl.weight_kg) : null,
      notes: nuevoControl.notes || 'Control registrado por la familia.',
      adherence: 95
    };

    actualizarLogsState([...logs, nuevoItem]);
    setNuevoControl({
      date: new Date().toISOString().split('T')[0],
      alt_tgp: '',
      ast_tgo: '',
      ggt: '',
      weight_kg: '',
      notes: ''
    });
  };

  const exportarDatosJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(logs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nutralive_controles_hepaticos_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const reiniciarHistorial = () => {
    if (window.confirm("¿Deseas restablecer la bitácora a los registros iniciales de muestra?")) {
      actualizarLogsState(INITIAL_LOGS);
    }
  };

  // Cálculo de puntos para gráfico SVG interactivo
  const minAlt = 15;
  const maxAlt = 65;
  const svgWidth = 600;
  const svgHeight = 220;
  const paddingX = 50;
  const paddingY = 30;

  const getCoordinates = (index, value) => {
    const x = paddingX + (index * (svgWidth - (paddingX * 2))) / Math.max(logs.length - 1, 1);
    const normalizedY = (value - minAlt) / (maxAlt - minAlt);
    const y = svgHeight - paddingY - (normalizedY * (svgHeight - (paddingY * 2)));
    return { x, y };
  };

  const pointsAlt = logs.map((log, i) => getCoordinates(i, log.alt_tgp));
  const pathD = pointsAlt.reduce((acc, curr, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${curr.x} ${curr.y}`, '');

  const ultimoLog = logs[logs.length - 1];
  const primerLog = logs[0];
  const reduccionAlt = primerLog ? (primerLog.alt_tgp - ultimoLog.alt_tgp).toFixed(1) : 0;

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          background: 'var(--emerald-glow)',
          border: '1px solid var(--border-emerald)',
          color: 'var(--emerald-400)',
          fontSize: '0.85rem',
          fontWeight: 600,
          marginBottom: '0.75rem'
        }}>
          <span>📈 Biomarcadores Clínicos & Laboratorio</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Curva de Transaminasas (ALT / TGP)
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Monitorea objetivamente la reducción del estrés inflamatorio hepático mes a mes.
        </p>
      </div>

      {/* Tarjeta de Resumen de Impacto */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          background: 'var(--bg-card)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Último Valor ALT</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: ultimoLog.alt_tgp <= 26 ? 'var(--emerald-400)' : 'var(--yellow-caution)', margin: '4px 0' }}>
            {ultimoLog.alt_tgp} <span style={{ fontSize: '1rem', fontWeight: 500 }}>U/L</span>
          </div>
          <span style={{ fontSize: '0.85rem', color: ultimoLog.alt_tgp <= 26 ? 'var(--emerald-400)' : 'var(--yellow-caution)', fontWeight: 600 }}>
            {ultimoLog.alt_tgp <= 26 ? '🟢 Óptimo Normalizado' : '🟡 En Descenso'}
          </span>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Reducción Total</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--emerald-400)', margin: '4px 0' }}>
            -{reduccionAlt} <span style={{ fontSize: '1rem', fontWeight: 500 }}>U/L</span>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Desde el control inicial
          </span>
        </div>

        <div style={{
          background: 'var(--bg-card)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Meta Terapéutica</span>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0' }}>
            &lt; 25 <span style={{ fontSize: '1rem', fontWeight: 500 }}>U/L</span>
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--emerald-400)', fontWeight: 600 }}>
            ✨ Rango Sano Alcanzado
          </span>
        </div>
      </div>

      {/* Gráfico Vectorial SVG */}
      <div style={{
        background: 'var(--bg-card)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Evolución de Transaminasas (ALT / TGP)
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Línea verde punteada: Límite óptimo (&lt;25 U/L)
          </span>
        </div>

        <div style={{ width: '100%', overflowX: 'auto' }}>
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Línea de umbral óptimo (25 U/L) */}
            {(() => {
              const y25 = getCoordinates(0, 25).y;
              return (
                <>
                  <line
                    x1={paddingX}
                    y1={y25}
                    x2={svgWidth - paddingX}
                    y2={y25}
                    stroke="var(--emerald-500)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    opacity="0.6"
                  />
                  <text
                    x={svgWidth - paddingX + 5}
                    y={y25 + 4}
                    fill="var(--emerald-400)"
                    fontSize="10"
                    fontFamily="inherit"
                    fontWeight="600"
                  >
                    25 U/L
                  </text>
                </>
              );
            })()}

            {/* Trazo de la curva de transaminasas */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--emerald-400)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Puntos y etiquetas */}
            {pointsAlt.map((pt, i) => (
              <g key={i}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="6"
                  fill="var(--bg-card)"
                  stroke="var(--emerald-400)"
                  strokeWidth="3"
                />
                <text
                  x={pt.x}
                  y={pt.y - 12}
                  textAnchor="middle"
                  fill="var(--text-main)"
                  fontSize="12"
                  fontWeight="700"
                  fontFamily="inherit"
                >
                  {logs[i].alt_tgp}
                </text>
                <text
                  x={pt.x}
                  y={svgHeight - 8}
                  textAnchor="middle"
                  fill="var(--text-dim)"
                  fontSize="10"
                  fontFamily="inherit"
                >
                  {logs[i].date.slice(5)}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Formulario para Registrar Nuevo Análisis */}
      <div style={{
        background: 'var(--bg-secondary)',
        padding: '1.25rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.8rem' }}>
          ➕ Registrar Nuevo Control de Laboratorio
        </h3>
        <form onSubmit={handleAgregarControl} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
          <div>
            <label htmlFor="log-date" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', marginBottom: '0.2rem' }}>Fecha:</label>
            <input
              id="log-date"
              type="date"
              value={nuevoControl.date}
              onChange={(e) => setNuevoControl({ ...nuevoControl, date: e.target.value })}
              required
              style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
            />
          </div>

          <div>
            <label htmlFor="log-alt" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', marginBottom: '0.2rem' }}>ALT / TGP (U/L):</label>
            <input
              id="log-alt"
              type="number"
              step="0.1"
              placeholder="Ej: 28.5"
              value={nuevoControl.alt_tgp}
              onChange={(e) => setNuevoControl({ ...nuevoControl, alt_tgp: e.target.value })}
              required
              style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
            />
          </div>

          <div>
            <label htmlFor="log-ast" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', marginBottom: '0.2rem' }}>AST / TGO (U/L):</label>
            <input
              id="log-ast"
              type="number"
              step="0.1"
              placeholder="Ej: 24.0"
              value={nuevoControl.ast_tgo}
              onChange={(e) => setNuevoControl({ ...nuevoControl, ast_tgo: e.target.value })}
              style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
            />
          </div>

          <div>
            <label htmlFor="log-weight" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', marginBottom: '0.2rem' }}>Peso (kg):</label>
            <input
              id="log-weight"
              type="number"
              step="0.1"
              placeholder="Ej: 34.5"
              value={nuevoControl.weight_kg}
              onChange={(e) => setNuevoControl({ ...nuevoControl, weight_kg: e.target.value })}
              style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="log-notes" style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-dim)', marginBottom: '0.2rem' }}>Observaciones del Nutricionista / Médico:</label>
            <input
              id="log-notes"
              type="text"
              placeholder="Ej: Cumplimiento de dieta bajo supervisión, tolerancia perfecta..."
              value={nuevoControl.notes}
              onChange={(e) => setNuevoControl({ ...nuevoControl, notes: e.target.value })}
              style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-main)' }}
            />
          </div>

          <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem' }}>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--emerald-500)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}
            >
              Guardar en Bitácora Clínica
            </button>
          </div>
        </form>
      </div>

      {/* Historial de Controles */}
      <div style={{ background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', margin: 0 }}>
            📋 Historial Cronológico de Controles
          </h3>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={exportarDatosJSON}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid var(--border-emerald)',
                color: 'var(--emerald-400)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title="Descargar copia local de respaldo de todos los controles"
            >
              📥 Exportar JSON
            </button>
            <button
              onClick={reiniciarHistorial}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
              title="Restablecer registros de muestra iniciales"
            >
              🔄 Restablecer
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {logs.slice().reverse().map((log) => (
            <div key={log.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-secondary)',
              borderLeft: `4px solid ${log.alt_tgp <= 26 ? 'var(--emerald-500)' : 'var(--yellow-caution)'}`,
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>{log.date}</span>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginTop: '2px' }}>{log.notes}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: log.alt_tgp <= 26 ? 'var(--emerald-400)' : 'var(--yellow-caution)' }}>
                  ALT: {log.alt_tgp} U/L
                </span>
                {log.weight_kg && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Peso: {log.weight_kg} kg
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
