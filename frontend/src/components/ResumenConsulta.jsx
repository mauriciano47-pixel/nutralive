import React from 'react';
import { analyzeTransaminaseDelta } from '../utils/clinicalAlgorithms';

export default function ResumenConsulta({ usuarioActivo, logs: propLogs }) {
  // Obtener logs dinámicos de props o localStorage
  const logs = propLogs || (() => {
    try {
      const raw = localStorage.getItem('nutralive_metabolic_logs');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return [
      { id: 1, date: '2026-08-05', alt_tgp: 54.0, ast_tgo: 42.0, ggt: 38.0, weight_kg: 35.8, notes: 'Inicio dieta', adherence: 70 },
      { id: 2, date: '2026-09-04', alt_tgp: 38.0, ast_tgo: 31.0, ggt: 29.0, weight_kg: 35.1, notes: 'Descenso notable', adherence: 90 },
      { id: 3, date: '2026-10-03', alt_tgp: 24.5, ast_tgo: 23.0, ggt: 21.0, weight_kg: 34.6, notes: 'Normalización', adherence: 95 }
    ];
  })();

  const pacienteNombre = usuarioActivo?.paciente?.nombre || 'Sofía M.';
  const pacienteEdad = usuarioActivo?.paciente?.edad ? `${usuarioActivo.paciente.edad} años` : '9 años';
  const pacienteSexo = usuarioActivo?.tipo === 'especialista' ? 'Pediátrico General' : 'Pediátrico / Femenino';
  const diagnostico = usuarioActivo?.paciente?.diagnostico || 'MASLD (Esteatosis Hepática Grado 1)';
  const tutorResponsable = usuarioActivo?.nombre || 'Tutor Familiar Responsable';

  const deltaAnalysis = analyzeTransaminaseDelta(logs);
  const ultimoLog = logs[logs.length - 1] || {};
  const adherenciaPromedio = Math.round(
    logs.reduce((acc, curr) => acc + (curr.adherence || 90), 0) / Math.max(logs.length, 1)
  );

  const imprimirReporte = () => {
    window.print();
  };

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Header en Pantalla (Oculto en Impresión) */}
      <div className="no-print" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
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
          <span>🩺 Portal Clínico B2B & Consulta Médica</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Resumen para el Especialista en 30 Segundos
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Documento clínico estructurado para el pediatra, hepatólogo o nutricionista en consulta.
        </p>
      </div>

      {/* Hoja Clínica Estilizada A4 / Carta */}
      <div className="clinical-sheet" style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        padding: '2rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        marginBottom: '1.5rem'
      }}>
        {/* Cabecera del Documento Clínico */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '2px solid var(--border-emerald)',
          paddingBottom: '1.25rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.6rem' }}>🥗</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                NutraLive Clinical Report
              </h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 700, letterSpacing: '0.05em' }}>
              SISTEMA DE PRECISIÓN METABÓLICA & ESCUDO HEPÁTICO (MASLD)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="no-print" style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
              Emisión: {new Date().toLocaleDateString('es-CL')}
            </span>
            <button
              onClick={imprimirReporte}
              className="no-print"
              style={{
                padding: '8px 16px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--emerald-500)',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
              title="Generar PDF médico en formato carta / A4"
            >
              🖨️ Exportar / Imprimir PDF
            </button>
          </div>
        </div>

        {/* Ficha de Identificación del Paciente (Dinámica) */}
        <div style={{
          background: 'var(--bg-secondary)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.25rem',
          marginBottom: '1.5rem',
          border: '1px solid var(--border-color)'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
              Paciente:
            </span>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--text-main)' }}>
              {pacienteNombre}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Acompañado por: {tutorResponsable}
            </span>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
              Edad / Grupo:
            </span>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>
              {pacienteEdad} • {pacienteSexo}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
              Diagnóstico de Ingreso:
            </span>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--emerald-400)' }}>
              {diagnostico}
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700, display: 'block' }}>
              Adherencia Familiar:
            </span>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', color: 'var(--emerald-400)' }}>
              {adherenciaPromedio}% de Adherencia Diaria
            </div>
          </div>
        </div>

        {/* Resumen Clínico Automatizado de Impacto Enzimático */}
        <div style={{
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: deltaAnalysis.isPediatricNormal ? 'rgba(16, 185, 129, 0.12)' : 'rgba(245, 158, 11, 0.12)',
          border: `1px solid ${deltaAnalysis.isPediatricNormal ? 'var(--emerald-500)' : 'var(--yellow-caution)'}`,
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px'
        }}>
          <div>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: deltaAnalysis.isPediatricNormal ? 'var(--emerald-400)' : 'var(--yellow-caution)' }}>
              {deltaAnalysis.isPediatricNormal ? '🟢 DICTAMEN: RANGO PEDIÁTRICO ÓPTIMO ALCANZADO (ALT ≤ 25 U/L)' : '🟡 DICTAMEN: EN PROCESO DE REGRESIÓN INFLAMATORIA'}
            </span>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: '2px' }}>
              {deltaAnalysis.statusMessage}
            </div>
          </div>
          {deltaAnalysis.percentReduction > 0 && (
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--emerald-400)' }}>
                -{deltaAnalysis.percentReduction}%
              </span>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>Reducción Total ALT</div>
            </div>
          )}
        </div>

        {/* Tabla de Evolución Dinámica de Biomarcadores */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            📊 Registro Longitudinal de Biomarcadores:
          </h4>
          <div style={{ overflowX: 'auto' }}>
            <table className="clinical-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', color: 'var(--text-dim)', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)' }}>Fecha</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)' }}>ALT / TGP (U/L)</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)' }}>AST / TGO (U/L)</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)' }}>GGT (U/L)</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)' }}>Peso (kg)</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)' }}>Criterio Clínico NASPGHAN</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((item, idx) => {
                  const esUltimo = idx === logs.length - 1;
                  const esNormal = item.alt_tgp <= 25.0;
                  const esModerado = item.alt_tgp > 25.0 && item.alt_tgp <= 40.0;
                  return (
                    <tr key={item.id || idx} style={{
                      borderBottom: '1px solid var(--border-color)',
                      background: esUltimo && esNormal ? 'var(--emerald-glow)' : 'transparent'
                    }}>
                      <td style={{ padding: '10px 12px', fontWeight: esUltimo ? 700 : 500 }}>{item.date}</td>
                      <td style={{
                        padding: '10px 12px',
                        fontWeight: 800,
                        color: esNormal ? 'var(--emerald-400)' : (esModerado ? 'var(--yellow-caution)' : 'var(--red-alert)')
                      }}>
                        {item.alt_tgp.toFixed(1)}
                      </td>
                      <td style={{ padding: '10px 12px' }}>{item.ast_tgo ? item.ast_tgo.toFixed(1) : '—'}</td>
                      <td style={{ padding: '10px 12px' }}>{item.ggt ? item.ggt.toFixed(1) : '—'}</td>
                      <td style={{ padding: '10px 12px' }}>{item.weight_kg ? `${item.weight_kg.toFixed(1)} kg` : '—'}</td>
                      <td style={{
                        padding: '10px 12px',
                        fontWeight: 600,
                        color: esNormal ? 'var(--emerald-400)' : (esModerado ? 'var(--yellow-caution)' : 'var(--red-alert)')
                      }}>
                        {esNormal ? '🟢 Rango Óptimo (<25 U/L)' : (esModerado ? '🟡 Descenso Favorable' : '🔴 Inflamación Activa')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumen de Intervenciones Nutricionales y Adherencia */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--red-alert)', fontWeight: 800, marginBottom: '0.4rem' }}>
              🚫 Exclusiones Críticas Aplicadas:
            </h5>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', lineHeight: 1.5 }}>
              <li>Jarabe de Maíz de Alta Fructosa (JMAF/HFCS) en salsas, kétchups y néctares.</li>
              <li>Grasas trans y aceites vegetales parcialmente hidrogenados.</li>
              <li>Jugos de frutas prensados (eliminación de fructosa líquida sin fibra).</li>
            </ul>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--emerald-400)', fontWeight: 800, marginBottom: '0.4rem' }}>
              ✅ Terapia Nutricional de Soporte:
            </h5>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', lineHeight: 1.5 }}>
              <li>Avena integral en copos (betaglucanos reductores de resistencia a la insulina).</li>
              <li>Aceite de oliva virgen extra (AOVE) en crudo como grasa protectora.</li>
              <li>Aporte de colina dietaria (huevo de campo) para transporte de VLDL hepática.</li>
            </ul>
          </div>
        </div>

        {/* Firmas y Validación Médica (Visible en Papel/PDF) */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          marginTop: '1rem'
        }}>
          <div>
            <div style={{ borderBottom: '1px solid var(--border-color)', height: '40px', marginBottom: '6px' }}></div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600 }}>
              Firma Apoderado / Tutor: {tutorResponsable}
            </span>
          </div>

          <div>
            <div style={{ borderBottom: '1px solid var(--border-color)', height: '40px', marginBottom: '6px' }}></div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', fontWeight: 600 }}>
              Firma y Timbre Médico / Nutricionista Tratante
            </span>
          </div>
        </div>

        {/* Pie del Documento Clínico */}
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '0.75rem',
          borderTop: '1px dashed var(--border-color)',
          fontSize: '0.72rem',
          color: 'var(--text-dim)',
          textAlign: 'center'
        }}>
          NutraLive Clinical Platform • Propiedad de Mauricio Uribe Maldonado • Basado en guías ESPGHAN & EASL para MASLD Pediátrico.
        </div>
      </div>
    </div>
  );
}
