import React, { useState } from 'react';

const RECETAS_INIT = [
  {
    id: 1,
    title: "Hamburguesas Caseras de Pavo, Avena y Espinaca",
    category: "Almuerzos & Cenas",
    time: "25 min",
    servings: 4,
    difficulty: "Fácil",
    kidApproved: true,
    summary: "Jugosas, crujientes al horno y con sabor 100% aprobado por niños. Cero conservantes y ricas en colina y hierro.",
    ingredients: [
      "500g pechuga de pavo o pollo molida",
      "1/2 taza copos de avena finos (fibra soluble)",
      "1 huevo entero (aporte vital de colina)",
      "1 taza espinacas tiernas picadas",
      "1 cucharada aceite de oliva virgen extra",
      "Orégano, ajo en polvo y sal marina"
    ],
    steps: [
      "Mezclar la carne con el huevo batido y condimentos.",
      "Añadir la avena y la espinaca hasta compactar.",
      "Formar 4 hamburguesas sobre papel para hornear.",
      "Hornear a 190°C por 18 min (voltear a la mitad).",
      "Servir con palta/aguacate y rodajas de tomate fresco."
    ],
    hepaticBenefit: "Aporte de colina esencial para movilizar lípidos fuera del hígado y avena con bajo índice glucémico que previene picos de insulina."
  },
  {
    id: 2,
    title: "Nuggets Crocantes al Horno con Rebozado de Avena",
    category: "Almuerzos & Cenas",
    time: "30 min",
    servings: 4,
    difficulty: "Fácil",
    kidApproved: true,
    summary: "El plato favorito de los más pequeños en versión 100% terapéutica hepática. Dorados al horno sin frituras tóxicas.",
    ingredients: [
      "400g pechuga de pollo cortada en cubos tamaño bocado",
      "1 taza copos de avena procesados como harina gruesa",
      "1 huevo entero batido",
      "1 cucharadita pimentón dulce / paprika",
      "1 cucharada semillas de sésamo o chía molidas",
      "1 pizca de sal marina"
    ],
    steps: [
      "Combinar en un plato la avena, pimentón y semillas.",
      "Pasar cada cubo de pollo por huevo y luego por el rebozado.",
      "Disponer en bandeja con unas gotas de aceite de oliva virgen.",
      "Hornear a 200°C por 15 min hasta dorar.",
      "Acompañar con guacamole casero o salsa de yogur griego con limón."
    ],
    hepaticBenefit: "Elimina por completo las grasas trans de aceites recalentados en freidoras industriales. 100% libre de harinas refinadas ultraprocesadas."
  },
  {
    id: 3,
    title: "Smoothie Verde 'Super-Filtro' con Frutos del Bosque",
    category: "Desayunos & Meriendas",
    time: "5 min",
    servings: 2,
    difficulty: "Fácil",
    kidApproved: true,
    summary: "Bebida fresca y saciante ideal para desayunos o colaciones escolares. Antioxidantes puros que combaten el estrés oxidativo hepático.",
    ingredients: [
      "1 taza espinacas frescas",
      "1/2 taza arándanos frescos o congelados",
      "1 cucharada semillas de chía hidratadas",
      "1 vaso agua filtrada o leche de almendras sin azúcar",
      "1/4 manzana verde con cáscara (pectina saciante)"
    ],
    steps: [
      "Introducir todos los ingredientes en la licuadora.",
      "Licuar a máxima potencia durante 45 segundos.",
      "Servir inmediatamente con hielo para conservar sus antioxidantes activos."
    ],
    hepaticBenefit: "Las antocianinas de los arándanos frenan la peroxidación lipídica en los hepatocitos y la chía aporta omega-3 anti-inflamatorio."
  }
];

export default function RecetasFamiliares() {
  const [recetas] = useState(RECETAS_INIT);
  const [selectedReceta, setSelectedReceta] = useState(RECETAS_INIT[0]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('TODAS');

  const filtradas = categoriaFiltro === 'TODAS'
    ? recetas
    : recetas.filter(r => r.category === categoriaFiltro);

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
          <span>🍳 Cocina Terapéutica Anti-Frustración</span>
        </div>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>
          Recetario Familiar Apto para Niños
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Platos deliciosos y protectores para que toda la casa coma saludable sin sensación de castigo ni aislamiento.
        </p>
      </div>

      {/* Filtros de Categoría */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {['TODAS', 'Almuerzos & Cenas', 'Desayunos & Meriendas'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoriaFiltro(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: categoriaFiltro === cat ? 'var(--emerald-500)' : 'var(--bg-card)',
              color: categoriaFiltro === cat ? '#ffffff' : 'var(--text-main)',
              border: `1px solid ${categoriaFiltro === cat ? 'var(--emerald-400)' : 'var(--border-color)'}`,
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de Recetas y Detalle */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {filtradas.map((r) => (
          <div
            key={r.id}
            onClick={() => setSelectedReceta(r)}
            style={{
              background: selectedReceta.id === r.id ? 'var(--bg-secondary)' : 'var(--bg-card)',
              border: `2px solid ${selectedReceta.id === r.id ? 'var(--emerald-500)' : 'var(--border-color)'}`,
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--emerald-400)', textTransform: 'uppercase' }}>
                {r.category}
              </span>
              <span style={{ fontSize: '0.75rem', background: 'var(--emerald-glow)', color: 'var(--emerald-400)', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 600 }}>
                👶 100% Kids Approved
              </span>
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              {r.title}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '0.75rem' }}>
              {r.summary}
            </p>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              <span>⏱️ {r.time}</span>
              <span>👥 {r.servings} porciones</span>
            </div>
          </div>
        ))}
      </div>

      {/* Ficha Detallada de la Receta Seleccionada */}
      {selectedReceta && (
        <div style={{
          background: 'var(--bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-emerald)',
          padding: '1.5rem',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>
              {selectedReceta.title}
            </h3>
            <span style={{ background: 'var(--emerald-glow)', border: '1px solid var(--border-emerald)', color: 'var(--emerald-400)', padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 700 }}>
              {selectedReceta.time} • {selectedReceta.servings} Porciones
            </span>
          </div>

          {/* Beneficio Clínico Hepático */}
          <div style={{
            background: 'var(--emerald-glow)',
            borderLeft: '4px solid var(--emerald-500)',
            padding: '10px 14px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.25rem'
          }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--emerald-400)', display: 'block' }}>
              🛡️ Impacto Terapéutico en el Hígado:
            </span>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
              {selectedReceta.hepaticBenefit}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {/* Ingredientes */}
            <div>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 800, marginBottom: '0.6rem' }}>
                🛒 Ingredientes Requeridos:
              </h4>
              <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                {selectedReceta.ingredients.map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>
            </div>

            {/* Paso a Paso */}
            <div>
              <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 800, marginBottom: '0.6rem' }}>
                👩‍🍳 Preparación Paso a Paso:
              </h4>
              <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                {selectedReceta.steps.map((st, i) => (
                  <li key={i}>{st}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
