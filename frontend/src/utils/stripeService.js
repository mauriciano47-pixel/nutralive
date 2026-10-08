/**
 * NutraLive - Servicio de Monetización y Facturación SaaS (Stripe Integration)
 * Propiedad exclusiva de Mauricio Uribe Maldonado
 * 
 * Modelos de Suscripción:
 * 1. B2C: Guardián Familiar Hepático (Monitoreo para familias con niños con esteatosis)
 * 2. B2B: Licencia Profesional Clínica (Pediatras, Hepatólogos, Centros Nutricionales)
 */

export const STRIPE_PLANS = {
  FAMILY_MONTHLY: {
    id: 'plan_nutralive_family_mo',
    name: 'Guardián Hepático Familiar — Mensual',
    tier: 'FAMILY',
    billingCycle: 'monthly',
    priceUsd: 4.99,
    priceClp: 4890,
    stripePriceId: 'price_1Q_nutralive_family_monthly',
    features: [
      'Escaneo de ingredientes y semáforo ilimitado',
      'Detección experta de JMAF / HFCS y grasas trans',
      'Bitácora histórica de ALT, AST y GGT con gráficos',
      'Exportación de informes clínicos para el pediatra (PDF)',
      'Acceso al catálogo de 50+ recetas familiares hepatoprotectoras',
      'Soporte prioritario para dudas de etiquetado'
    ]
  },
  FAMILY_ANNUAL: {
    id: 'plan_nutralive_family_yr',
    name: 'Guardián Hepático Familiar — Anual',
    tier: 'FAMILY',
    billingCycle: 'annual',
    priceUsd: 39.99,
    priceClp: 38990,
    stripePriceId: 'price_1Q_nutralive_family_annual',
    discountPercent: 33,
    badge: 'MÁS POPULAR (33% Dcto.)',
    features: [
      'Todo lo incluido en el plan mensual',
      'Ahorro equivalente a 4 meses gratis',
      'Guía descargable: "Protocolo Clínico Cero JMAF en 90 días"',
      'Alertas tempranas de riesgo glucémico'
    ]
  },
  CLINICAL_B2B_MONTHLY: {
    id: 'plan_nutralive_b2b_mo',
    name: 'Licencia Clínica Profesional — Mensual',
    tier: 'CLINICAL',
    billingCycle: 'monthly',
    priceUsd: 29.00,
    priceClp: 27900,
    stripePriceId: 'price_1Q_nutralive_b2b_monthly',
    features: [
      'Hasta 50 pacientes pediátricos en seguimiento simultáneo',
      'Panel de control de adherencia dietaria familiar',
      'Módulo de evolución enzimática ALT/AST con criterio NASPGHAN',
      'Generación de reportes clínicos con membrete del centro médico',
      'API REST de integración directa con fichas clínicas',
      'Soporte técnico y normativo SLA 12h'
    ]
  },
  CLINICAL_B2B_ANNUAL: {
    id: 'plan_nutralive_b2b_yr',
    name: 'Licencia Clínica Profesional — Anual',
    tier: 'CLINICAL',
    billingCycle: 'annual',
    priceUsd: 249.00,
    priceClp: 239000,
    stripePriceId: 'price_1Q_nutralive_b2b_annual',
    discountPercent: 28,
    badge: 'INSTITUCIONAL (28% Dcto.)',
    features: [
      'Todo lo incluido en la licencia clínica mensual',
      'Pacientes ilimitados y multi-profesional (hasta 3 nutricionistas/pediatras)',
      'Acompañamiento en onboarding clínico',
      'Contrato B2B con soporte SLA prioritario 4h'
    ]
  }
};

const STORAGE_KEY = 'nutralive_saas_subscription';

/**
 * Obtiene el estado actual de la suscripción guardada localmente.
 * @returns {object}
 */
export function getSubscriptionState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return {
        isActive: false,
        tier: 'FREE',
        planId: null,
        expiresAt: null
      };
    }
    const parsed = JSON.parse(raw);
    const now = Date.now();
    if (parsed.expiresAt && parsed.expiresAt < now) {
      return {
        isActive: false,
        tier: 'FREE',
        planId: null,
        isExpired: true
      };
    }
    return parsed;
  } catch {
    return { isActive: false, tier: 'FREE', planId: null };
  }
}

/**
 * Guarda o actualiza el estado de la suscripción (activación / simulación).
 * @param {string} planId
 * @param {string} customerEmail
 * @returns {object}
 */
export function activateSubscription(planId, customerEmail = 'familia@nutralive.cl') {
  const plan = Object.values(STRIPE_PLANS).find(p => p.id === planId) || STRIPE_PLANS.FAMILY_ANNUAL;
  const durationDays = plan.billingCycle === 'annual' ? 365 : 30;
  const expiresAt = Date.now() + durationDays * 24 * 60 * 60 * 1000;

  const subscription = {
    isActive: true,
    tier: plan.tier,
    planId: plan.id,
    planName: plan.name,
    customerEmail,
    priceUsd: plan.priceUsd,
    billingCycle: plan.billingCycle,
    activatedAt: Date.now(),
    expiresAt,
    simulatedStripeInvoiceId: `in_nutra_${Date.now()}`
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subscription));
  } catch {
    // Si localStorage está bloqueado, mantiene en memoria
  }

  return subscription;
}

/**
 * Cancela la suscripción local.
 */
export function cancelSubscription() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Silently continue
  }
  return { isActive: false, tier: 'FREE' };
}

/**
 * Genera la URL para Stripe Checkout Session (Direct Link).
 * @param {string} planId
 * @param {string} customerEmail
 * @returns {string}
 */
export function generateStripeCheckoutUrl(planId, customerEmail = '') {
  const plan = Object.values(STRIPE_PLANS).find(p => p.id === planId) || STRIPE_PLANS.FAMILY_MONTHLY;
  const baseUrl = 'https://checkout.stripe.com/c/pay/';
  const params = new URLSearchParams({
    price: plan.stripePriceId,
    client_reference_id: `nutralive_${Date.now()}`,
    prefilled_email: customerEmail || 'usuario@nutralive.cl',
    locale: 'es'
  });
  return `${baseUrl}?${params.toString()}`;
}
