import React, { useState } from 'react';

const PRESETS = [
  {
    name: "Kétchup Comercial",
    brand: "Marca Estándar",
    ingredients: "Concentrado de tomate, jarabe de maíz de alta fructosa (JMAF), vinagre destilado, jarabe de maíz, sal, especias.",
  },
  {
    name: "Galletas Dulces Rellenas",
    brand: "Snack Clásico",
    ingredients: "Harina de trigo enriquecida, azúcar, aceite de palma parcialmente hidrogenado, jarabe de glucosa-fructosa, cacao, lecitina de soya.",
  },
  {
    name: "Yogur Frutilla 'Light'",
    brand: "Lácteo Comercial",
    ingredients: "Leche descremada, almidón modificado, concentrado de fruta, maltodextrina, sucralosa, colorante carmín.",
  },
  {
    name: "Avena con Chía y Canela",
    brand: "Desayuno Protector",
    ingredients: "Copos de avena integral, semillas de chía, canela en polvo, aceite de oliva virgen extra.",
  }
];

export default function SemaforoEscaneo({ apiBaseUrl }) {
  const [inputText, setInputText] = useState(PRESETS[0].ingredients);
  const [productName, setProductName] = useState(PRESETS[0].name);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activePreset, setActivePreset] = useState(0);

  const handleSelectPreset = (index) => {
    setActivePreset(index);
    setProductName(PRESETS[index].name);
    setInputText(PRESETS[index].ingredients);
    setResult(null);
  };

  const analizarIngredientes = async () => {
    if (!inputText.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(`${apiBaseUrl}/analyze/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients_text: inputText,
          product_name: productName || "Producto Analizado"
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        throw new Error("Respuesta no OK");
      }
    } catch {
      // Fallback Offline-First Autónomo
      const textLower = inputText.toLowerCase();
      const hasFructose = textLower.includes("jarabe de ma") || textLower.includes("fructosa") || textLower.includes("jmaf");
      const hasTrans = textLower.includes("hidrogenado") || textLower.includes("trans");
      const hasMaltodextrin = textLower.includes("maltodextrina");

      let trafficLight = "GREEN";
      let title = "APROBADO & SEGURO — Libre de Fructosa Oculta";
      let advice = "No se detectaron ingredientes que sobrecarguen el metabolismo hepático.";
      const harmful = [];

      if (hasFructose) {
        trafficLight = "RED";
        title = "ALERTA HEPÁTICA — No Recomendado en Hígado Graso";
        advice = "Contiene jarabe de maíz de alta fructosa o fructosa libre, inductor directo de lipogénesis de novo en el hígado.";
        harmful.push({
          name: "Jarabe de Maíz de Alta Fructosa",
          risk_level: "RED",
          mechanism: "El hígado metaboliza la fructosa libre como grasa de forma inmediata.",
          alternative: "Fruta entera fresca o endulzantes no calóricos como Stevia pura."
        });
      }
      if (hasTrans) {
        trafficLight = "RED";
        title = "ALERTA HEPÁTICA — No Recomendado en Hígado Graso";
        harmful.push({
          name: "Grasas Vegetales Hidrogenadas / Trans",
          risk_level: "RED",
          mechanism: "Generan inflamación sistémica y estrés celular en el hepatocito.",
          alternative: "Aceite de oliva virgen extra o aceite de aguacate."
        });
      }
      if (hasMaltodextrin && trafficLight !== "RED") {
        trafficLight = "YELLOW";
        title = "PRECAUCIÓN — Carga Glucémica Elevada";
        advice = "La maltodextrina dispara picos de glucosa e insulina que estimulan acumulación de grasa.";
        harmful.push({
          name: "Maltodextrina",
          risk_level: "YELLOW",
          mechanism: "Índice glucémico superior a 110.",
          alternative: "Avena o harinas integrales de grano entero."
        });
      }

      setResult({
        product_name: productName || "Producto Analizado",
        traffic_light: trafficLight,
        verdict_title: title,
        clinical_advice: advice,
        detected_harmful_count: harmful.length,
        harmful_items: harmful,
        beneficial_items: trafficLight === "GREEN" ? [{ name: "Ingredientes Naturales Protectores", mechanism: "Fibra soluble y antioxidantes saludables." }] : [],
        healthy_swap: trafficLight === "RED" ? {
          product: "Sustituto Natural Casero",
          reasoning: "Preparar la versión casera con ingredientes integrales sin jarabes industriales."
        } : null
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '1.5rem 1rem' }}>
      {/* Encabezado del módulo */}
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
          <span>🚦 Escáner de Supermercado & Filtro Hepático</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
          Semáforo Hepático Inteligente
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.25rem' }}>
          Identifica fructosa oculta (JMAF), grasas trans y aditivos pro-inflamatorios antes de que lleguen a la mesa de tu familia.
        </p>
      </div>

      {/* Selector de Presets Demostrativos */}
      <div style={{
        background: 'var(--bg-secondary)',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        marginBottom: '1.5rem'
      }}>
        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: '0.5rem' }}>
          Ejemplos rápidos de prueba (Toca uno para cargar):
        </label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {PRESETS.map((p, idx) => (
            <button
              key={p.name}
              onClick={() => handleSelectPreset(idx)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.85rem',
                fontWeight: 600,
                background: activePreset === idx ? 'var(--emerald-500)' : 'var(--bg-card)',
                color: activePreset === idx ? '#ffffff' : 'var(--text-main)',
                border: `1px solid ${activePreset === idx ? 'var(--emerald-400)' : 'var(--border-color)'}`,
                transition: 'all 0.2s ease'
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Formulario de Análisis */}
      <div style={{
        background: 'var(--bg-card)',
        padding: '1.25rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
        marginBottom: '1.5rem'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="prod-name-input" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
            Nombre del alimento o producto:
          </label>
          <input
            id="prod-name-input"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Ej: Kétchup, Galletas, Pan molde, Salsa..."
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-main)',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label htmlFor="ingredients-text-input" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-main)' }}>
            Lista de ingredientes (tal como aparece en la etiqueta):
          </label>
          <textarea
            id="ingredients-text-input"
            rows="4"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Pega aquí los ingredientes del producto..."
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              resize: 'vertical',
              outline: 'none'
            }}
          />
        </div>

        <button
          onClick={analizarIngredientes}
          disabled={loading || !inputText.trim()}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--emerald-500)',
            color: '#ffffff',
            fontWeight: 700,
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px var(--emerald-glow)',
            opacity: loading ? 0.7 : 1,
            transition: 'all 0.2s ease'
          }}
        >
          {loading ? (
            <span>Analizando con Motor Clínico Django...</span>
          ) : (
            <span>🔍 Evaluar Seguridad Hepática</span>
          )}
        </button>
      </div>

      {/* Tarjeta de Resultados */}
      {result && (
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: `2px solid ${
            result.traffic_light === 'RED' ? 'var(--red-alert)' :
            result.traffic_light === 'YELLOW' ? 'var(--yellow-caution)' :
            'var(--green-safe)'
          }`,
          padding: '1.5rem',
          animation: 'fadeIn 0.3s ease'
        }}>
          {/* Header del resultado con Semáforo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              background:
                result.traffic_light === 'RED' ? 'var(--red-bg)' :
                result.traffic_light === 'YELLOW' ? 'var(--yellow-bg)' :
                'var(--green-bg)'
            }}>
              {result.traffic_light === 'RED' ? '🔴' : result.traffic_light === 'YELLOW' ? '🟡' : '🟢'}
            </div>

            <div style={{ flex: 1, minWidth: '220px' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color:
                  result.traffic_light === 'RED' ? 'var(--red-alert)' :
                  result.traffic_light === 'YELLOW' ? 'var(--yellow-caution)' :
                  'var(--green-safe)'
              }}>
                {result.traffic_light === 'RED' ? 'Alerta Crítica' : result.traffic_light === 'YELLOW' ? 'Precaución' : 'Aprobado'}
              </span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                {result.verdict_title}
              </h3>
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            {result.clinical_advice}
          </p>

          {/* Ingredientes Peligrosos Detectados */}
          {result.harmful_items && result.harmful_items.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--red-alert)', fontWeight: 800, marginBottom: '0.6rem', letterSpacing: '0.03em' }}>
                ⚠️ Ingredientes Perjudiciales Identificados ({result.harmful_items.length}):
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {result.harmful_items.map((item, idx) => (
                  <div key={idx} style={{
                    background: 'var(--bg-secondary)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: `4px solid ${item.risk_level === 'RED' ? 'var(--red-alert)' : 'var(--yellow-caution)'}`
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {item.mechanism}
                    </div>
                    {item.alternative && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--emerald-400)', marginTop: '4px', fontWeight: 600 }}>
                        💡 Recomendación: {item.alternative}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ingredientes Protectores */}
          {result.beneficial_items && result.beneficial_items.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--green-safe)', fontWeight: 800, marginBottom: '0.6rem', letterSpacing: '0.03em' }}>
                🛡️ Ingredientes Protectores Encontrados:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {result.beneficial_items.map((item, idx) => (
                  <div key={idx} style={{
                    background: 'var(--bg-secondary)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: '4px solid var(--green-safe)'
                  }}>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                      {item.mechanism}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cambio Seguro (Healthy Swap Box) */}
          {result.healthy_swap && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.08) 100%)',
              border: '1px solid var(--border-emerald)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginTop: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-400)', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                <span>✨ CAMBIO SEGURO (Healthy Swap Recomendado):</span>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                {result.healthy_swap.product}
              </div>
              <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                {result.healthy_swap.reasoning}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
