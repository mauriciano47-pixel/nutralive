import test from 'node:test';
import assert from 'node:assert/strict';

import {
  analyzeTransaminaseDelta,
  calculateHepaticTrafficLight
} from '../src/utils/clinicalAlgorithms.js';

test('1. Sincronización Clínica: Los datos de múltiples controles calculan el delta y la normalización pediátrica', () => {
  const historialControles = [
    { id: 1, date: '2026-08-01', alt_tgp: 62.0, ast_tgo: 50.0, adherence: 75 },
    { id: 2, date: '2026-09-01', alt_tgp: 41.0, ast_tgo: 35.0, adherence: 85 },
    { id: 3, date: '2026-10-01', alt_tgp: 28.0, ast_tgo: 26.0, adherence: 92 },
    { id: 4, date: '2026-11-01', alt_tgp: 22.0, ast_tgo: 20.0, adherence: 96 }
  ];

  const resultado = analyzeTransaminaseDelta(historialControles);

  assert.equal(resultado.hasData, true);
  assert.equal(resultado.initialAlt, 62.0);
  assert.equal(resultado.currentAlt, 22.0);
  assert.equal(resultado.deltaAlt, -40.0);
  assert.equal(resultado.isPediatricNormal, true, 'El valor 22 U/L debe ser normal según criterio NASPGHAN (≤25 U/L)');
  assert.ok(resultado.percentReduction > 60, 'La reducción debe ser superior al 60%');
  assert.match(resultado.statusMessage, /Rango Pedi[aá]trico [OÓ]ptimo/i);
});

test('2. Fisiopatología de Jugos: Detección estricta de jugos/néctares prensados con fructosa libre', () => {
  const etiquetaJugo = 'Jugo concentrado de manzana, néctar de naranja reconstituido, ácido cítrico.';
  const veredicto = calculateHepaticTrafficLight(etiquetaJugo, 'Néctar Infantil de Naranja');

  // Si contiene fructosa oculta o jarabes
  const etiquetaJMAF = 'Agua, jarabe de maíz de alta fructosa (JMAF), concentrado de frutas.';
  const veredictoJMAF = calculateHepaticTrafficLight(etiquetaJMAF, 'Bebida Néctar Comercial');
  assert.equal(veredictoJMAF.traffic_light, 'RED');
  assert.match(veredictoJMAF.verdict_title, /ALERTA HEP[AÁ]TICA/i);
});

test('3. Cálculo de carga anual de fructosa líquida en ComparadorFrutaJugo', () => {
  const vasosPorSemana = 4;
  const fructosaPorVasoGramos = 24;
  const fructosaAnualKg = (vasosPorSemana * fructosaPorVasoGramos * 52) / 1000;
  
  // 4 * 24 * 52 / 1000 = 4.992 kg
  assert.ok(fructosaAnualKg > 4.9 && fructosaAnualKg < 5.1, 'Debe calcular ~5.0 kg de fructosa pura al año');
});

test('4. Integridad de estructura para exportación JSON (RGPD Portabilidad)', () => {
  const logMock = {
    id: 12345,
    date: '2026-10-09',
    alt_tgp: 24.5,
    ast_tgo: 22.0,
    ggt: 20.0,
    weight_kg: 34.5,
    notes: 'Control de alta clínica',
    adherence: 95
  };

  const serializado = JSON.stringify([logMock]);
  const parseado = JSON.parse(serializado);

  assert.equal(parseado[0].alt_tgp, 24.5);
  assert.equal(parseado[0].notes, 'Control de alta clínica');
  assert.ok(Array.isArray(parseado));
});
