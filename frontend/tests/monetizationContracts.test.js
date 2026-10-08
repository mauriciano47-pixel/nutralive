import test from 'node:test';
import assert from 'node:assert/strict';

import {
  STRIPE_PLANS,
  generateStripeCheckoutUrl
} from '../src/utils/stripeService.js';

test('1. Contrato de Planes Stripe: Existencia de tiers B2C Familiar y B2B Clínico', () => {
  const keys = Object.keys(STRIPE_PLANS);
  assert.ok(keys.includes('FAMILY_MONTHLY'));
  assert.ok(keys.includes('FAMILY_ANNUAL'));
  assert.ok(keys.includes('CLINICAL_B2B_MONTHLY'));
  assert.ok(keys.includes('CLINICAL_B2B_ANNUAL'));
});

test('2. Validación financiera: Plan anual ofrece ahorro porcentual positivo', () => {
  const monthlyAnnualCost = STRIPE_PLANS.FAMILY_MONTHLY.priceUsd * 12;
  const annualCost = STRIPE_PLANS.FAMILY_ANNUAL.priceUsd;
  assert.ok(annualCost < monthlyAnnualCost, 'El plan anual debe ser menor a 12 meses mensuales');
  
  const discount = Math.round(((monthlyAnnualCost - annualCost) / monthlyAnnualCost) * 100);
  assert.ok(discount >= 30, 'El descuento anual debe ser de al menos 30%');
});

test('3. Features del Plan Familiar incluyen escaneo y bitácora clínica', () => {
  const familyFeatures = STRIPE_PLANS.FAMILY_MONTHLY.features;
  assert.ok(familyFeatures.some(f => f.toLowerCase().includes('semaforo') || f.toLowerCase().includes('escaneo')));
  assert.ok(familyFeatures.some(f => f.toLowerCase().includes('alt') || f.toLowerCase().includes('ast')));
  assert.ok(familyFeatures.some(f => f.toLowerCase().includes('recetas')));
});

test('4. Features de Licencia B2B Institucional incluyen soporte multicentro y API', () => {
  const b2bFeatures = STRIPE_PLANS.CLINICAL_B2B_MONTHLY.features;
  assert.ok(b2bFeatures.some(f => f.toLowerCase().includes('pacientes')));
  assert.ok(b2bFeatures.some(f => f.toLowerCase().includes('naspghan') || f.toLowerCase().includes('enzimatica')));
  assert.ok(b2bFeatures.some(f => f.toLowerCase().includes('api rest') || f.toLowerCase().includes('fichas')));
});

test('5. Generador de URLs de Stripe Checkout produce enlaces seguros válidos', () => {
  const url = generateStripeCheckoutUrl('plan_nutralive_family_mo', 'doctor@clinica.cl');
  assert.ok(url.startsWith('https://checkout.stripe.com/c/pay/?'));
  assert.ok(url.includes('price_1Q_nutralive_family_monthly'));
  assert.ok(url.includes('doctor%40clinica.cl') || url.includes('doctor@clinica.cl'));
});
