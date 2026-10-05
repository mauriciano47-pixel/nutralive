import React from 'react';

export default function ResumenConsulta() {
  const imprimirReporte = () => {
    window.print();
  };

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
          <span>🩺 Portal Clínico B2B & Consulta Médica</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Resumen para el Especialista en 30 Segundos
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Reporte estructurado para presentar al pediatra, gastroenterólogo o nutricionista clínico en consulta.
        </p>
      </div>

      {/* Hoja Clínica Estilizada */}
      <div style={{
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
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '1.25rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '1.4rem' }}>🥗</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)' }}>
                NutraLive Clinical Report
              </h3>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>
              SISTEMA DE PRECISIÓN METABÓLICA & HEPÁTICA (MASLD)
            </span>
          </div>

          <button
            onClick={imprimirReporte}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--emerald-500)',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            🖨️ Exportar / Imprimir PDF
          </button>
        </div>

        {/* Datos del Paciente */}
        <div style={{
          background: 'var(--bg-secondary)',
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Paciente:</span>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>Sofía M.</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Edad / Sexo:</span>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>9 años • Femenino</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Diagnóstico:</span>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--emerald-400)' }}>MASLD (Esteatosis Grado 1)</div>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>Tasa de Adherencia:</span>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--emerald-400)' }}>95% en los últimos 30 días</div>
          </div>
        </div>

        {/* Tabla de Evolución de Biomarcadores */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.03em' }}>
            📊 Evolución Enzimática & Antropométrica:
          </h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', color: 'var(--text-dim)', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)' }}>Fecha</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)' }}>ALT / TGP (U/L)</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)' }}>AST / TGO (U/L)</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)' }}>GGT (U/L)</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)' }}>Peso (kg)</th>
                  <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-color)' }}>Estado Clínico</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px 12px' }}>2026-08-05</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--red-alert)' }}>54.0</td>
                  <td style={{ padding: '10px 12px' }}>42.0</td>
                  <td style={{ padding: '10px 12px' }}>38.0</td>
                  <td style={{ padding: '10px 12px' }}>35.8</td>
                  <td style={{ padding: '10px 12px', color: 'var(--red-alert)', fontWeight: 600 }}>Inflamación Activa</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px 12px' }}>2026-09-04</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--yellow-caution)' }}>38.0</td>
                  <td style={{ padding: '10px 12px' }}>31.0</td>
                  <td style={{ padding: '10px 12px' }}>29.0</td>
                  <td style={{ padding: '10px 12px' }}>35.1</td>
                  <td style={{ padding: '10px 12px', color: 'var(--yellow-caution)', fontWeight: 600 }}>Descenso Favorable</td>
                </tr>
                <tr style={{ background: 'var(--emerald-glow)' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 700 }}>2026-10-03</td>
                  <td style={{ padding: '10px 12px', fontWeight: 800, color: 'var(--emerald-400)' }}>24.5</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700 }}>23.0</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700 }}>21.0</td>
                  <td style={{ padding: '10px 12px', fontWeight: 700 }}>34.6</td>
                  <td style={{ padding: '10px 12px', color: 'var(--emerald-400)', fontWeight: 800 }}>🟢 Rango Óptimo (&lt;25 U/L)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Resumen de Intervenciones Nutricionales Clave */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--red-alert)', fontWeight: 800, marginBottom: '0.4rem' }}>
              🚫 Eliminados al 100% en el Hogar:
            </h5>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', lineHeight: 1.5 }}>
              <li>Jarabe de Maíz de Alta Fructosa (JMAF) en salsas y néctares.</li>
              <li>Golosinas con grasas vegetales parcialmente hidrogenadas.</li>
              <li>Bebidas azucaradas y jugos envasados.</li>
            </ul>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <h5 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--emerald-400)', fontWeight: 800, marginBottom: '0.4rem' }}>
              ✅ Incorporaciones Exitosas:
            </h5>
            <ul style={{ fontSize: '0.85rem', color: 'var(--text-muted)', paddingLeft: '1.2rem', lineHeight: 1.5 }}>
              <li>Avena integral en copos en desayunos y rebozados al horno.</li>
              <li>Aceite de oliva virgen extra en frío como grasa principal.</li>
              <li>Consumo de colina (huevo entero) y omega-3 (semillas de chía).</li>
            </ul>
          </div>
        </div>

        {/* Firma y Conclusión Médica */}
        <div style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
              Reporte generado automáticamente por <strong>NutraLive Precision Core v1.0.0</strong>
            </span>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '2px' }}>
              Basado en guías de la EASL (European Association for the Study of the Liver) y ESPGHAN.
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--emerald-400)', fontWeight: 700 }}>
              ✓ Verificado Clínicamente
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
