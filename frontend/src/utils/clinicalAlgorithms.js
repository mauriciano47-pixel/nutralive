/**
 * NutraLive - Algoritmos Clínicos de Nutrición Terapéutica & Escudo Hepático
 * Propiedad exclusiva de Mauricio Uribe Maldonado
 * 
 * Enfoque: Detección de inductores de Lipogénesis de Novo (JMAF/Fructosa),
 * aceites hidrogenados (Grasas Trans) y seguimiento longitudinal de marcadores ALT/AST.
 */

/**
 * Normaliza cadenas de texto eliminando tildes y diacríticos.
 * @param {string} text
 * @returns {string}
 */
export function normalizeClinicalText(text) {
  if (!text || typeof text !== 'string') return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

/**
 * Diccionario de ingredientes de alto impacto hepático (MASLD / Esteatosis Hepática).
 */
export const CLINICAL_RISK_PATTERNS = [
  {
    category: 'JMAF_FRUCTOSE',
    riskLevel: 'RED',
    name: 'Jarabe de Maíz de Alta Fructosa (JMAF / HFCS)',
    patterns: [
      'jarabe de maiz de alta fructosa',
      'jmaf',
      'hfcs',
      'jarabe de fructosa',
      'fructosa libre',
      'fructosa anhidra',
      'jarabe de glucosa-fructosa',
      'sirope de maiz'
    ],
    mechanism: 'El hepatocito metaboliza la fructosa no fosforilada por fructoquinasa, induciendo lipogénesis de novo acelerada y acumulación de triglicéridos intrahepáticos.',
    alternative: 'Frutas enteras frescas ricas en fibra o endulzantes no calóricos puros (Stevia / Monk Fruit).'
  },
  {
    category: 'TRANS_FATS',
    riskLevel: 'RED',
    name: 'Grasas Vegetales Hidrogenadas / Trans',
    patterns: [
      'parcialmente hidrogenado',
      'grasa hidrogenada',
      'aceite hidrogenado',
      'grasa vegetal hidrogenada',
      'grasa trans'
    ],
    mechanism: 'Promueven estrés oxidativo en el retículo endoplasmático del hepatocito y aceleran la progresión de esteatosis simple a esteatohepatitis (MASH).',
    alternative: 'Aceite de oliva virgen extra (AOVE), aceite de aguacate o frutos secos naturales.'
  },
  {
    category: 'HIGH_GLYCEMIC',
    riskLevel: 'YELLOW',
    name: 'Maltodextrina / Carga Glucémica Elevada',
    patterns: [
      'maltodextrina',
      'dextrosa',
      'jarabe de glucosa',
      'almidon modificado'
    ],
    mechanism: 'Índice glucémico ultra-alto (>100) que provoca hiperinsulinemia reactiva, bloqueando la beta-oxidación mitocondrial hepática de ácidos grasos.',
    alternative: 'Cereales integrales de grano entero como avena integral laminada o quinoa.'
  }
];

/**
 * Detecta ingredientes perjudiciales en el texto de una etiqueta nutricional.
 * @param {string} ingredientsText
 * @returns {Array<object>}
 */
export function detectHarmfulIngredients(ingredientsText) {
  const norm = normalizeClinicalText(ingredientsText);
  if (!norm) return [];

  const found = [];

  for (const risk of CLINICAL_RISK_PATTERNS) {
    const matchedPattern = risk.patterns.find(p => norm.includes(p));
    if (matchedPattern) {
      found.push({
        name: risk.name,
        category: risk.category,
        risk_level: risk.riskLevel,
        matched_term: matchedPattern,
        mechanism: risk.mechanism,
        alternative: risk.alternative
      });
    }
  }

  return found;
}

/**
 * Calcula el veredicto del Semáforo Hepático NutraLive para una etiqueta.
 * @param {string} ingredientsText
 * @param {string} productName
 * @returns {object}
 */
export function calculateHepaticTrafficLight(ingredientsText, productName = 'Producto Analizado') {
  const harmful = detectHarmfulIngredients(ingredientsText);

  const hasRed = harmful.some(h => h.risk_level === 'RED');
  const hasYellow = harmful.some(h => h.risk_level === 'YELLOW');

  if (hasRed) {
    return {
      product_name: productName,
      traffic_light: 'RED',
      verdict_title: 'ALERTA HEPÁTICA — No Recomendado en Esteatosis / Hígado Graso',
      clinical_advice: 'Contiene inductores directos de lipogénesis de novo o grasas hidrogenadas que saturan el hepatocito.',
      detected_harmful_count: harmful.length,
      harmful_items: harmful,
      beneficial_items: [],
      healthy_swap: {
        product: 'Sustituto Protector Casero',
        reasoning: 'Optar por alimentos naturales con fibra intacta para no disparar la fructosa libre hepática.'
      }
    };
  }

  if (hasYellow) {
    return {
      product_name: productName,
      traffic_light: 'YELLOW',
      verdict_title: 'PRECAUCIÓN — Carga Glucémica Elevada',
      clinical_advice: 'No contiene JMAF ni grasas trans, pero su índice glucémico eleva la insulina y favorece el almacenamiento graso.',
      detected_harmful_count: harmful.length,
      harmful_items: harmful,
      beneficial_items: [],
      healthy_swap: {
        product: 'Alternativa Integral',
        reasoning: 'Reemplazar con versiones de grano entero no refinadas.'
      }
    };
  }

  return {
    product_name: productName,
    traffic_light: 'GREEN',
    verdict_title: 'APROBADO & SEGURO — Libre de Fructosa Oculta',
    clinical_advice: 'No se detectaron ingredientes hepatotóxicos ni inductores de esteatosis en la etiqueta analizada.',
    detected_harmful_count: 0,
    harmful_items: [],
    beneficial_items: [
      {
        name: 'Ingredientes Protectores',
        mechanism: 'Aporte de antioxidantes y matriz alimentaria natural respetuosa con el metabolismo.'
      }
    ],
    healthy_swap: null
  };
}

/**
 * Analiza la evolución de marcadores de transaminasas (ALT / TGP y AST / TGO).
 * Umbral pediátrico estricto de ALT: < 25 U/L (criterio NASPGHAN para esteatosis pediátrica).
 * @param {Array<{alt_tgp: number, ast_tgo: number, date: string}>} logs
 * @returns {object}
 */
export function analyzeTransaminaseDelta(logs) {
  if (!logs || !Array.isArray(logs) || logs.length === 0) {
    return {
      hasData: false,
      currentAlt: null,
      initialAlt: null,
      deltaAlt: 0,
      percentReduction: 0,
      isPediatricNormal: false,
      statusMessage: 'Sin registros para analizar.'
    };
  }

  const validLogs = logs.filter(l => typeof l.alt_tgp === 'number' && !isNaN(l.alt_tgp));
  if (validLogs.length === 0) {
    return {
      hasData: false,
      currentAlt: null,
      initialAlt: null,
      deltaAlt: 0,
      percentReduction: 0,
      isPediatricNormal: false,
      statusMessage: 'Sin valores numéricos de ALT válidos.'
    };
  }

  const initial = validLogs[0].alt_tgp;
  const current = validLogs[validLogs.length - 1].alt_tgp;
  const delta = current - initial;
  const percentReduction = initial > 0 ? ((initial - current) / initial) * 100 : 0;
  const isPediatricNormal = current <= 25.0;

  let statusMessage = '';
  if (isPediatricNormal) {
    statusMessage = '¡Rango Pediátrico Óptimo alcanzado! ALT ≤ 25 U/L.';
  } else if (delta < 0) {
    statusMessage = `Excelente progresión: Reducción de ${Math.abs(delta).toFixed(1)} U/L (-${percentReduction.toFixed(1)}%).`;
  } else if (delta === 0) {
    statusMessage = 'Niveles enzimáticos estables respecto al inicio.';
  } else {
    statusMessage = `Alerta: Incremento de ${delta.toFixed(1)} U/L respecto al valor basal. Reforzar dieta estricta.`;
  }

  return {
    hasData: true,
    initialAlt: initial,
    currentAlt: current,
    deltaAlt: delta,
    percentReduction: parseFloat(percentReduction.toFixed(1)),
    isPediatricNormal,
    statusMessage
  };
}
