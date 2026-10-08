import test from 'node:test';
import assert from 'node:assert/strict';

import {
  normalizeClinicalText,
  detectHarmfulIngredients,
  calculateHepaticTrafficLight,
  analyzeTransaminaseDelta
} from '../src/utils/clinicalAlgorithms.js';

test('1. Normalización de texto clínico elimina tildes y diacríticos', () => {
  const entrada = 'Kétchup con Jarabe de Maíz de Alta Fructosa & Azúcar Añadido';
  const normalizado = normalizeClinicalText(entrada);
  assert.equal(normalizado, 'ketchup con jarabe de maiz de alta fructosa & azucar anadido');
  assert.equal(normalizeClinicalText(''), '');
  assert.equal(normalizeClinicalText(null), '');
});

test('2. Detección de Jarabe de Maíz de Alta Fructosa (JMAF/HFCS) en etiquetas', () => {
  const etiquetaKetchup = 'Concentrado de tomate, jarabe de maíz de alta fructosa (JMAF), vinagre, sal.';
  const detectados = detectHarmfulIngredients(etiquetaKetchup);
  
  assert.ok(detectados.length >= 1, 'Debe detectar al menos un ingrediente perjudicial');
  const jmaf = detectados.find(d => d.category === 'JMAF_FRUCTOSE');
  assert.ok(jmaf, 'Debe categorizar como JMAF_FRUCTOSE');
  assert.equal(jmaf.risk_level, 'RED');
  assert.match(jmaf.mechanism, /lipog[eé]nesis de novo/i);
});

test('3. Detección de Grasas Trans y Aceites Vegetales Hidrogenados', () => {
  const etiquetaGalleta = 'Harina de trigo, azúcar, aceite de palma parcialmente hidrogenado, cacao.';
  const detectados = detectHarmfulIngredients(etiquetaGalleta);
  
  const trans = detectados.find(d => d.category === 'TRANS_FATS');
  assert.ok(trans, 'Debe detectar aceite parcialmente hidrogenado');
  assert.equal(trans.risk_level, 'RED');
  assert.match(trans.mechanism, /estres oxidativo|esteatohepatitis/i);
});

test('4. Detección de Maltodextrina y clasificación de riesgo amarillo', () => {
  const etiquetaYogur = 'Leche descremada, almidón modificado, maltodextrina, sucralosa.';
  const detectados = detectHarmfulIngredients(etiquetaYogur);
  
  const malto = detectados.find(d => d.category === 'HIGH_GLYCEMIC');
  assert.ok(malto, 'Debe detectar maltodextrina');
  assert.equal(malto.risk_level, 'YELLOW');
  assert.match(malto.alternative, /avena|integrales/i);
});

test('5. Semáforo Hepático: Veredicto ROJO por fructosa industrial oculta', () => {
  const etiqueta = 'Jarabe de fructosa, agua, acidulante, saborizante.';
  const veredicto = calculateHepaticTrafficLight(etiqueta, 'Bebida de Fantasía');
  
  assert.equal(veredicto.traffic_light, 'RED');
  assert.match(veredicto.verdict_title, /ALERTA HEP[AÁ]TICA/i);
  assert.equal(veredicto.detected_harmful_count, 1);
  assert.ok(veredicto.healthy_swap, 'Debe sugerir sustituto saludable');
});

test('6. Semáforo Hepático: Veredicto AMARILLO por alta carga glucémica sin fructosa libre', () => {
  const etiqueta = 'Harina de arroz, dextrosa, maltodextrina, sal.';
  const veredicto = calculateHepaticTrafficLight(etiqueta, 'Galleta de Arroz Procesada');
  
  assert.equal(veredicto.traffic_light, 'YELLOW');
  assert.match(veredicto.verdict_title, /PRECAUCI[OÓ]N/i);
});

test('7. Semáforo Hepático: Veredicto VERDE para alimentos naturales protectores', () => {
  const etiqueta = 'Copos de avena integral laminada, semillas de chia, canela pura, aceite de oliva virgen extra.';
  const veredicto = calculateHepaticTrafficLight(etiqueta, 'Desayuno Protector Familiar');
  
  assert.equal(veredicto.traffic_light, 'GREEN');
  assert.match(veredicto.verdict_title, /APROBADO & SEGURO/i);
  assert.equal(veredicto.detected_harmful_count, 0);
  assert.ok(veredicto.beneficial_items.length > 0);
});

test('8. Análisis Delta de Transaminasas: Reducción y normalización pediátrica (ALT ≤ 25 U/L)', () => {
  const controles = [
    { date: '2026-08-01', alt_tgp: 54.0, ast_tgo: 42.0 },
    { date: '2026-09-01', alt_tgp: 38.0, ast_tgo: 31.0 },
    { date: '2026-10-01', alt_tgp: 24.5, ast_tgo: 23.0 }
  ];

  const resultado = analyzeTransaminaseDelta(controles);
  
  assert.equal(resultado.hasData, true);
  assert.equal(resultado.initialAlt, 54.0);
  assert.equal(resultado.currentAlt, 24.5);
  assert.equal(resultado.deltaAlt, -29.5);
  assert.equal(resultado.isPediatricNormal, true);
  assert.ok(resultado.percentReduction > 50, 'La reducción debe ser superior al 50%');
  assert.match(resultado.statusMessage, /Rango Pedi[aá]trico [OÓ]ptimo/i);
});

test('9. Análisis Delta de Transaminasas: Detección de elevación o recaída enzimática', () => {
  const controlesRecaida = [
    { date: '2026-08-01', alt_tgp: 30.0, ast_tgo: 25.0 },
    { date: '2026-09-01', alt_tgp: 48.0, ast_tgo: 40.0 }
  ];

  const resultado = analyzeTransaminaseDelta(controlesRecaida);
  
  assert.equal(resultado.isPediatricNormal, false);
  assert.ok(resultado.deltaAlt > 0, 'El delta debe ser positivo por aumento');
  assert.match(resultado.statusMessage, /Alerta/i);
});

test('10. Manejo de casos borde en análisis de transaminasas (array vacío o nulo)', () => {
  const vacio = analyzeTransaminaseDelta([]);
  assert.equal(vacio.hasData, false);
  assert.equal(vacio.currentAlt, null);

  const nulo = analyzeTransaminaseDelta(null);
  assert.equal(nulo.hasData, false);
});
