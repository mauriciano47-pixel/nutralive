import React, { useState } from 'react';

export default function ComparadorFrutaJugo() {
  const [vasosPorSemana, setVasosPorSemana] = useState(4);

  // Cálculo clínico de sobrecarga anual de fructosa líquida
  const fructosaPorVasoGramos = 24; // ~4 naranjas o 3 manzanas prensadas
  const fructosaAnualKilos = ((vasosPorSemana * fructosaPorVasoGramos * 52) / 1000).toFixed(1);
  const equivalenciaAzucarKg = (fructosaAnualKilos * 1.0).toFixed(1);

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          color: 'var(--red-alert)',
          fontSize: '0.85rem',
          fontWeight: 700,
          marginBottom: '0.75rem'
        }}>
          <span>⚠️ Educación Clínica Anti-Mitos</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Fruta Entera vs Jugo Colado: El Escudo de la Fibra
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto' }}>
          El mito más peligroso en hígado graso infantil es creer que el jugo natural prensado es saludable. Descubre por qué la matriz de fibra cambia por completo el destino metabólico del azúcar.
        </p>
      </div>

      {/* Comparativa Cara a Cara */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.25rem',
        marginBottom: '2rem'
      }}>
        {/* Tarjeta 1: Jugo de Naranja (Peligro) */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid rgba(239, 68, 68, 0.4)',
          padding: '1.5rem',
          boxShadow: '0 8px 24px rgba(239, 68, 68, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>🧃</span>
            <span style={{
              background: 'rgba(239, 68, 68, 0.2)',
              color: '#ef4444',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 800
            }}>
              🔴 CHOQUE HEPÁTICO
            </span>
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            1 Vaso de Jugo Natural (250 ml)
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Equivale a exprimir 3 a 4 naranjas grandes eliminando todo el bagazo.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-dim)' }}>Fructosa Líquida Libre:</span>
              <strong style={{ color: 'var(--red-alert)' }}>~24 gramos (ALTO)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-dim)' }}>Fibra Protectora:</span>
              <strong style={{ color: 'var(--red-alert)' }}>0.2 g (Prácticamente nula)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-dim)' }}>Velocidad de Absorción:</span>
              <strong style={{ color: 'var(--red-alert)' }}>5 - 8 minutos (Inmediata)</strong>
            </div>
          </div>

          <div style={{
            background: 'rgba(239, 68, 68, 0.1)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            color: '#fca5a5',
            lineHeight: 1.4
          }}>
            <strong>Fisiopatología:</strong> Al no haber fibra, la fructosa llega de golpe a la vena porta. La fructoquinasa hepática la fosforila sin freno de retroalimentación, convirtiéndola en grasa intrahepática inmediata (lipogénesis de novo).
          </div>
        </div>

        {/* Tarjeta 2: Fruta Entera (Protectora) */}
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '2px solid rgba(16, 185, 129, 0.4)',
          padding: '1.5rem',
          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2rem' }}>🍊</span>
            <span style={{
              background: 'rgba(16, 185, 129, 0.2)',
              color: 'var(--emerald-400)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.75rem',
              fontWeight: 800
            }}>
              🟢 SEGURO & TERAPÉUTICO
            </span>
          </div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
            1 Naranja Entera con Pulpa
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Consumida en gajos con toda su pulpa natural y masticación lenta.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-dim)' }}>Fructosa Natural:</span>
              <strong style={{ color: 'var(--emerald-400)' }}>~6 gramos (Bajo impacto)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-dim)' }}>Fibra Protectora (Pectina):</span>
              <strong style={{ color: 'var(--emerald-400)' }}>3.2 g (Matriz Intacta)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--text-dim)' }}>Velocidad de Absorción:</span>
              <strong style={{ color: 'var(--emerald-400)' }}>45 - 60 minutos (Lenta)</strong>
            </div>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            padding: '10px 12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.8rem',
            color: '#a7f3d0',
            lineHeight: 1.4
          }}>
            <strong>Mecanismo Protector:</strong> La pectina crea un gel viscoelástico en el intestino que retarda el paso del azúcar. El hígado recibe dosis controladas que puede oxidar sin acumular triglicéridos. Aporta saciedad duradera.
          </div>
        </div>
      </div>

      {/* Calculadora Interactiva de Impacto Acumulado */}
      <div style={{
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        padding: '1.5rem',
        marginBottom: '2rem'
      }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
          🧮 Calculadora de Sobrecarga Hepática por Jugos
        </h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
          Calcula cuánta fructosa líquida libre ingresa al hígado de un niño según los vasos de jugo que consume por semana:
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <label htmlFor="juice-slider" style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600 }}>
            Vasos de jugo natural/envasado por semana: <strong>{vasosPorSemana} vasos</strong>
          </label>
          <input
            id="juice-slider"
            type="range"
            min="0"
            max="14"
            step="1"
            value={vasosPorSemana}
            onChange={(e) => setVasosPorSemana(parseInt(e.target.value) || 0)}
            style={{ flex: 1, minWidth: '180px', accentColor: 'var(--emerald-500)', cursor: 'pointer' }}
          />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          background: 'var(--bg-card)',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
              Fructosa Líquida al Año
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 900, color: vasosPorSemana > 2 ? 'var(--red-alert)' : 'var(--emerald-400)' }}>
              {fructosaAnualKilos} kg
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Directa al hepatocito</span>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
              Riesgo de Progresión MASLD
            </div>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, marginTop: '6px', color: vasosPorSemana === 0 ? 'var(--emerald-400)' : (vasosPorSemana <= 2 ? 'var(--yellow-caution)' : 'var(--red-alert)') }}>
              {vasosPorSemana === 0 ? '🟢 Escudo Hepático 100%' : (vasosPorSemana <= 2 ? '🟡 Precaución Moderada' : '🔴 Inflamación Activa')}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Guía ESPGHAN 2024</span>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
              Sustituto Recomendado
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--emerald-400)', marginTop: '8px' }}>
              Agua con Limón & Menta
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>0% Fructosa libre</span>
          </div>
        </div>
      </div>

      {/* 3 Alternativas Atractivas para Niños */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        padding: '1.5rem'
      }}>
        <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem' }}>
          ✨ 3 Bebidas Divertidas sin Fructosa Líquida Aprobadas por Niños:
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🍋🥒</div>
            <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
              Agua "Limonada Polar"
            </h5>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Agua helada con rodajas de pepino, hojas de menta machacadas y gotas de limón natural. Cero azúcar.
            </p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🍓🧊</div>
            <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
              Infusión Frutal Helada
            </h5>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Té de frutos rojos o rooibos infusionado en frío con cubos de hielo que contienen arándanos enteros congelados.
            </p>
          </div>

          <div style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '4px' }}>🫧🥤</div>
            <h5 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '4px' }}>
              "Bebida Fantástica" con Gas
            </h5>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Agua mineral con gas natural con rodaja de naranja fresca solo para aroma (sin exprimir) y unas gotas de stevia pura.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
