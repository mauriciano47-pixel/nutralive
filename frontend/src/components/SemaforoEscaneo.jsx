import React, { useState, useEffect, useRef } from 'react';
import { 
  CLINICAL_FOOD_CATALOG, 
  searchFoodCatalog, 
  classifyFoodSmart 
} from '../utils/clinicalFoodDatabase';

export default function SemaforoEscaneo({ apiBaseUrl }) {
  const [productName, setProductName] = useState('');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Estados del Buscador Inteligente & Autocompletado
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL'); // 'ALL', 'RED', 'YELLOW', 'GREEN'
  const searchContainerRef = useRef(null);

  // Cerrar sugerencias al hacer clic fuera del componente
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Actualizar sugerencias reactivas cuando el usuario escribe en el input
  const handleNameChange = (e) => {
    const val = e.target.value;
    setProductName(val);
    
    if (val.trim().length >= 1) {
      const matches = searchFoodCatalog(val, activeFilter);
      setSuggestions(matches.slice(0, 8)); // Top 8 resultados
      setShowSuggestions(true);
    } else {
      const defaultList = searchFoodCatalog('', activeFilter);
      setSuggestions(defaultList.slice(0, 8));
      setShowSuggestions(false);
    }
  };

  // Seleccionar un alimento del catálogo y clasificarlo de inmediato
  const handleSelectFood = (food) => {
    setProductName(food.name);
    setInputText(food.ingredients_raw || '');
    setShowSuggestions(false);

    // Clasificación inmediata con feedback visual
    setLoading(true);
    setTimeout(() => {
      const classified = classifyFoodSmart(food.name, food.ingredients_raw || '');
      setResult(classified);
      setLoading(false);
    }, 150);
  };

  // Clasificar el alimento (por nombre, por ingredientes o ambos)
  const ejecutarClasificacion = async () => {
    const nameClean = productName.trim();
    const textClean = inputText.trim();

    if (!nameClean && !textClean) return;

    setLoading(true);
    setShowSuggestions(false);

    // Intentar clasificar con el backend Django si está disponible
    try {
      const response = await fetch(`${apiBaseUrl}/analyze/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients_text: textClean || nameClean,
          product_name: nameClean || "Alimento Analizado"
        })
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
        setLoading(false);
        return;
      }
      throw new Error("Backend offline o error");
    } catch {
      // Motor de Clasificación Inteligente Autónomo (Offline-First)
      const clinicalResult = classifyFoodSmart(nameClean, textClean);
      setResult(clinicalResult);
      setLoading(false);
    }
  };

  // Filtrar catálogo por semáforo
  const cambiarFiltroSemaforo = (filtro) => {
    setActiveFilter(filtro);
    const updated = searchFoodCatalog(productName, filtro);
    setSuggestions(updated.slice(0, 8));
  };

  // Limpiar formulario para nuevo análisis
  const limpiarFormulario = () => {
    setProductName('');
    setInputText('');
    setResult(null);
    setShowSuggestions(false);
  };

  // Alimentos destacados para acceso rápido según el filtro activo
  const alimentosDestacados = searchFoodCatalog('', activeFilter).slice(0, 8);

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto', padding: '1.5rem 1rem' }}>
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
          <span>🚦 Escáner & Clasificador Hepático Inteligente</span>
        </div>
        <h2 style={{ fontSize: '1.85rem', fontWeight: 900, letterSpacing: '-0.02em', color: 'var(--text-main)', margin: 0 }}>
          Semáforo Hepático de Alimentos
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '0.4rem', maxWidth: '640px', margin: '0.4rem auto 0' }}>
          Busca cualquier alimento por su nombre o analiza la lista de ingredientes para detectar Jarabe de Maíz (JMAF), grasas trans y obtener sustitutos saludables.
        </p>
      </div>

      {/* Selector de Filtros Rápidos del Catálogo */}
      <div style={{
        background: 'var(--bg-secondary)',
        padding: '1rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        marginBottom: '1.5rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>
            Catálogo Clínico Rápido (Toca para seleccionar y clasificar):
          </label>
          {/* Píldoras de filtro */}
          <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
            <button
              onClick={() => cambiarFiltroSemaforo('ALL')}
              style={{
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: '1px solid var(--border-color)',
                background: activeFilter === 'ALL' ? 'var(--emerald-500)' : 'var(--bg-card)',
                color: activeFilter === 'ALL' ? '#ffffff' : 'var(--text-muted)',
                cursor: 'pointer'
              }}
            >
              Todos ({CLINICAL_FOOD_CATALOG.length})
            </button>
            <button
              onClick={() => cambiarFiltroSemaforo('RED')}
              style={{
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: '1px solid rgba(239, 68, 68, 0.4)',
                background: activeFilter === 'RED' ? 'var(--red-alert)' : 'rgba(239, 68, 68, 0.1)',
                color: activeFilter === 'RED' ? '#ffffff' : 'var(--red-alert)',
                cursor: 'pointer'
              }}
            >
              🔴 Alerta JMAF
            </button>
            <button
              onClick={() => cambiarFiltroSemaforo('YELLOW')}
              style={{
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: '1px solid rgba(245, 158, 11, 0.4)',
                background: activeFilter === 'YELLOW' ? 'var(--yellow-caution)' : 'rgba(245, 158, 11, 0.1)',
                color: activeFilter === 'YELLOW' ? '#040406' : 'var(--yellow-caution)',
                cursor: 'pointer'
              }}
            >
              🟡 Precaución
            </button>
            <button
              onClick={() => cambiarFiltroSemaforo('GREEN')}
              style={{
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: '1px solid rgba(16, 185, 129, 0.4)',
                background: activeFilter === 'GREEN' ? 'var(--green-safe)' : 'rgba(16, 185, 129, 0.1)',
                color: activeFilter === 'GREEN' ? '#ffffff' : 'var(--emerald-400)',
                cursor: 'pointer'
              }}
            >
              🟢 Protectores
            </button>
          </div>
        </div>

        {/* Chips de alimentos del catálogo */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {alimentosDestacados.map((item) => {
            const badgeColor = item.traffic_light === 'RED' ? '#ef4444' : item.traffic_light === 'YELLOW' ? '#f59e0b' : '#10b981';
            const isSelected = productName === item.name;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectFood(item)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 800 : 600,
                  background: isSelected ? 'var(--emerald-glow)' : 'var(--bg-card)',
                  color: isSelected ? 'var(--emerald-400)' : 'var(--text-main)',
                  border: `1px solid ${isSelected ? 'var(--emerald-400)' : 'var(--border-color)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: badgeColor,
                  display: 'inline-block'
                }} />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Formulario de Búsqueda, Ingreso y Clasificación */}
      <div style={{
        background: 'var(--bg-card)',
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 8px 28px rgba(0,0,0,0.15)',
        marginBottom: '1.5rem',
        position: 'relative'
      }}>
        {/* Campo de Nombre con Buscador en Tiempo Real y Dropdown */}
        <div ref={searchContainerRef} style={{ marginBottom: '1.25rem', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label htmlFor="prod-name-input" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
              1. Escribe o busca el nombre del alimento:
            </label>
            {productName && (
              <button
                type="button"
                onClick={limpiarFormulario}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Limpiar campos
              </button>
            )}
          </div>

          <div style={{ position: 'relative' }}>
            <input
              id="prod-name-input"
              type="text"
              autoComplete="off"
              value={productName}
              onChange={handleNameChange}
              onFocus={() => {
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  ejecutarClasificacion();
                }
              }}
              placeholder="Ej: Kétchup, Coca Cola, Galletas, Avena, Yogur, Pan, Salmón..."
              style={{
                width: '100%',
                padding: '12px 42px 12px 16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-main)',
                fontSize: '1rem',
                outline: 'none',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
              }}
            />
            <span style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontSize: '1.1rem',
              color: 'var(--text-dim)',
              pointerEvents: 'none'
            }}>
              🔍
            </span>
          </div>

          {/* Menú Desplegable de Sugerencias y Autocompletado */}
          {showSuggestions && suggestions.length > 0 && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 100,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-emerald)',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 12px 32px rgba(0,0,0,0.4)',
              marginTop: '6px',
              maxHeight: '320px',
              overflowY: 'auto'
            }}>
              <div style={{
                padding: '6px 12px',
                fontSize: '0.72rem',
                fontWeight: 800,
                color: 'var(--emerald-400)',
                background: 'rgba(16, 185, 129, 0.08)',
                borderBottom: '1px solid var(--border-color)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Alimentos encontrados en el catálogo clínico ({suggestions.length}) — Toca uno para seleccionar:
              </div>

              {suggestions.map((food) => {
                const dotColor = food.traffic_light === 'RED' ? 'var(--red-alert)' : food.traffic_light === 'YELLOW' ? 'var(--yellow-caution)' : 'var(--green-safe)';
                const badgeLabel = food.traffic_light === 'RED' ? 'Alerta' : food.traffic_light === 'YELLOW' ? 'Precaución' : 'Seguro';

                return (
                  <div
                    key={food.id}
                    onClick={() => handleSelectFood(food)}
                    style={{
                      padding: '10px 14px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottom: '1px solid var(--border-color)',
                      cursor: 'pointer',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        background: dotColor,
                        boxShadow: `0 0 8px ${dotColor}`
                      }} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                          {food.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {food.category} • {food.brand}
                        </div>
                      </div>
                    </div>

                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: food.traffic_light === 'RED' ? 'var(--red-bg)' : food.traffic_light === 'YELLOW' ? 'var(--yellow-bg)' : 'var(--green-bg)',
                      color: dotColor
                    }}>
                      {badgeLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Campo de Ingredientes (Ahora flexible y opcional si se ingresó el nombre) */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label htmlFor="ingredients-text-input" style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
              2. Lista de ingredientes:
            </label>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
              (Opcional si buscas por nombre, o pega la etiqueta de un paquete)
            </span>
          </div>

          <textarea
            id="ingredients-text-input"
            rows="3"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ej: Harina de trigo, azúcar, jarabe de maíz de alta fructosa (JMAF), aceite de palma parcialmente hidrogenado..."
            style={{
              width: '100%',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-main)',
              fontSize: '0.9rem',
              resize: 'vertical',
              outline: 'none',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
        </div>

        {/* Botón de Clasificación Hepática (Habilitado con Nombre o Ingredientes) */}
        <button
          type="button"
          onClick={ejecutarClasificacion}
          disabled={loading || (!productName.trim() && !inputText.trim())}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 'var(--radius-md)',
            background: (!productName.trim() && !inputText.trim())
              ? 'var(--bg-secondary)'
              : 'linear-gradient(135deg, var(--emerald-500) 0%, var(--emerald-600) 100%)',
            color: (!productName.trim() && !inputText.trim()) ? 'var(--text-dim)' : '#ffffff',
            fontWeight: 800,
            fontSize: '1.05rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: (!productName.trim() && !inputText.trim()) ? 'none' : '0 4px 16px var(--emerald-glow)',
            cursor: (!productName.trim() && !inputText.trim()) ? 'not-allowed' : 'pointer',
            border: 'none',
            transition: 'all 0.2s ease'
          }}
        >
          {loading ? (
            <span>Analizando y Clasificando Alimento...</span>
          ) : (
            <span>🔍 Evaluar y Clasificar Seguridad Hepática</span>
          )}
        </button>
      </div>

      {/* Tarjeta de Resultados del Semáforo Hepático */}
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
          animation: 'fadeIn 0.3s ease',
          boxShadow: `0 8px 30px ${
            result.traffic_light === 'RED' ? 'rgba(239, 68, 68, 0.15)' :
            result.traffic_light === 'YELLOW' ? 'rgba(245, 158, 11, 0.15)' :
            'rgba(16, 185, 129, 0.15)'
          }`
        }}>
          {/* Header del resultado con Semáforo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{
              width: '58px',
              height: '58px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              background:
                result.traffic_light === 'RED' ? 'var(--red-bg)' :
                result.traffic_light === 'YELLOW' ? 'var(--yellow-bg)' :
                'var(--green-bg)',
              boxShadow: `0 4px 14px ${
                result.traffic_light === 'RED' ? 'rgba(239, 68, 68, 0.3)' :
                result.traffic_light === 'YELLOW' ? 'rgba(245, 158, 11, 0.3)' :
                'rgba(16, 185, 129, 0.3)'
              }`
            }}>
              {result.traffic_light === 'RED' ? '🔴' : result.traffic_light === 'YELLOW' ? '🟡' : '🟢'}
            </div>

            <div style={{ flex: 1, minWidth: '220px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  background:
                    result.traffic_light === 'RED' ? 'var(--red-bg)' :
                    result.traffic_light === 'YELLOW' ? 'var(--yellow-bg)' :
                    'var(--green-bg)',
                  color:
                    result.traffic_light === 'RED' ? 'var(--red-alert)' :
                    result.traffic_light === 'YELLOW' ? 'var(--yellow-caution)' :
                    'var(--green-safe)'
                }}>
                  {result.traffic_light === 'RED' ? 'Alerta Crítica' : result.traffic_light === 'YELLOW' ? 'Precaución' : 'Aprobado'}
                </span>
                {result.category && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontWeight: 600 }}>
                    • {result.category}
                  </span>
                )}
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: 'var(--text-main)', marginTop: '4px', marginBottom: 0 }}>
                {result.product_name}
              </h3>
              <div style={{ fontSize: '0.85rem', color: 'var(--emerald-400)', fontWeight: 700, marginTop: '2px' }}>
                {result.verdict_title}
              </div>
            </div>
          </div>

          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            {result.clinical_advice}
          </p>

          {/* Ingredientes Peligrosos Detectados */}
          {result.harmful_items && result.harmful_items.length > 0 && (
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--red-alert)', fontWeight: 800, marginBottom: '0.6rem', letterSpacing: '0.03em' }}>
                ⚠️ Factores de Riesgo Hepático Identificados ({result.harmful_items.length}):
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {result.harmful_items.map((item, idx) => (
                  <div key={idx} style={{
                    background: 'var(--bg-secondary)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: `4px solid ${item.risk === 'RED' || item.risk_level === 'RED' ? 'var(--red-alert)' : 'var(--yellow-caution)'}`
                  }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.4 }}>
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
                🛡️ Mecanismo Protector Hepático:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {result.beneficial_items.map((item, idx) => (
                  <div key={idx} style={{
                    background: 'var(--bg-secondary)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: '4px solid var(--green-safe)'
                  }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-main)' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px', lineHeight: 1.4 }}>
                      {item.mechanism}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tarjeta de Cambio Seguro (Healthy Swap) */}
          {result.healthy_swap && (
            <div style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.08) 100%)',
              border: '1px solid var(--border-emerald)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginTop: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--emerald-400)', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.4rem' }}>
                <span>✨ CAMBIO SEGURO RECOMENDADO (Healthy Swap):</span>
              </div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
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
