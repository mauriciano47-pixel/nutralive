import React, { useState } from 'react';
import { STRIPE_PLANS, getSubscriptionState, activateSubscription, cancelSubscription, generateStripeCheckoutUrl } from '../utils/stripeService';

export default function ModalPlanesNutraLive({ isOpen, onClose, onSubscriptionChanged }) {
  const [cycle, setCycle] = useState('annual'); // 'monthly' | 'annual'
  const [category, setCategory] = useState('FAMILY'); // 'FAMILY' | 'CLINICAL'
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [activePlan, setActivePlan] = useState(getSubscriptionState());

  if (!isOpen) return null;

  const currentPlan = category === 'FAMILY'
    ? (cycle === 'annual' ? STRIPE_PLANS.FAMILY_ANNUAL : STRIPE_PLANS.FAMILY_MONTHLY)
    : (cycle === 'annual' ? STRIPE_PLANS.CLINICAL_B2B_ANNUAL : STRIPE_PLANS.CLINICAL_B2B_MONTHLY);

  const handleCheckout = (isSimulation = true) => {
    setIsProcessing(true);
    setTimeout(() => {
      if (isSimulation) {
        const sub = activateSubscription(currentPlan.id, email || 'familia@nutralive.cl');
        setActivePlan(sub);
        if (onSubscriptionChanged) onSubscriptionChanged(sub);
        setIsProcessing(false);
      } else {
        const url = generateStripeCheckoutUrl(currentPlan.id, email);
        window.open(url, '_blank');
        setIsProcessing(false);
      }
    }, 700);
  };

  const handleCancelSub = () => {
    const sub = cancelSubscription();
    setActivePlan(sub);
    if (onSubscriptionChanged) onSubscriptionChanged(sub);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '16px'
    }}>
      <div style={{
        backgroundColor: '#0d1117',
        border: '1px solid #30363d',
        borderRadius: '16px',
        maxWidth: '680px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        color: '#f0f6fc',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
        padding: '28px',
        position: 'relative'
      }}>
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar modal de planes"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: '#8b949e',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '4px 8px'
          }}
        >
          &times;
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <span style={{
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            color: '#10b981',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            marginBottom: '8px'
          }}>
            PLANES DE PROTECCIÓN HEPÁTICA
          </span>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '4px 0 8px 0', color: '#f0f6fc' }}>
            Escudo Nutricional de Precisión
          </h2>
          <p style={{ color: '#8b949e', fontSize: '14px', margin: 0 }}>
            Tecnología clínica para revertir la esteatosis y eliminar la fructosa industrial oculta.
          </p>
        </div>

        {/* Selector de Categoría (Familiar vs Clínico B2B) */}
        <div style={{
          display: 'flex',
          backgroundColor: '#161b22',
          borderRadius: '10px',
          padding: '4px',
          marginBottom: '20px',
          border: '1px solid #30363d'
        }}>
          <button
            onClick={() => setCategory('FAMILY')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              background: category === 'FAMILY' ? '#238636' : 'transparent',
              color: category === 'FAMILY' ? '#ffffff' : '#8b949e',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🛡️ Guardián Familiar (B2C)
          </button>
          <button
            onClick={() => setCategory('CLINICAL')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: 'none',
              background: category === 'CLINICAL' ? '#1f6feb' : 'transparent',
              color: category === 'CLINICAL' ? '#ffffff' : '#8b949e',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            🏥 Licencia Clínica B2B
          </button>
        </div>

        {/* Selector de Ciclo de Facturación */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <span style={{ fontSize: '13px', color: cycle === 'monthly' ? '#f0f6fc' : '#8b949e' }}>Mensual</span>
          <button
            onClick={() => setCycle(cycle === 'annual' ? 'monthly' : 'annual')}
            aria-label="Cambiar ciclo de facturación"
            style={{
              width: '48px',
              height: '24px',
              borderRadius: '12px',
              backgroundColor: cycle === 'annual' ? '#10b981' : '#30363d',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'background-color 0.2s'
            }}
          >
            <span style={{
              position: 'absolute',
              top: '2px',
              left: cycle === 'annual' ? '26px' : '2px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              transition: 'left 0.2s'
            }} />
          </button>
          <span style={{ fontSize: '13px', color: cycle === 'annual' ? '#10b981' : '#8b949e', fontWeight: 'bold' }}>
            Anual {currentPlan.discountPercent ? `(${currentPlan.discountPercent}% OFF)` : ''}
          </span>
        </div>

        {/* Tarjeta del Plan Seleccionado */}
        <div style={{
          backgroundColor: '#161b22',
          border: '1px solid #388bfd',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '20px',
          position: 'relative'
        }}>
          {currentPlan.badge && (
            <span style={{
              position: 'absolute',
              top: '-12px',
              right: '20px',
              backgroundColor: '#f59e0b',
              color: '#000',
              fontSize: '11px',
              fontWeight: 'bold',
              padding: '3px 10px',
              borderRadius: '12px'
            }}>
              {currentPlan.badge}
            </span>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#f0f6fc' }}>
                {currentPlan.name}
              </h3>
              <p style={{ color: '#8b949e', fontSize: '13px', margin: 0 }}>
                {category === 'FAMILY' ? 'Protección completa para tu hogar y tus hijos' : 'Herramienta de precisión para centros médicos y pediatras'}
              </p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#58a6ff' }}>
                ${currentPlan.priceUsd} <span style={{ fontSize: '14px', color: '#8b949e' }}>USD</span>
              </div>
              <div style={{ fontSize: '12px', color: '#8b949e' }}>
                ~${currentPlan.priceClp.toLocaleString('es-CL')} CLP / {currentPlan.billingCycle === 'annual' ? 'año' : 'mes'}
              </div>
            </div>
          </div>

          {/* Características */}
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0' }}>
            {currentPlan.features.map((feat, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#c9d1d9', marginBottom: '8px' }}>
                <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                {feat}
              </li>
            ))}
          </ul>

          {/* Input de Email para Recibo */}
          <div style={{ marginBottom: '16px' }}>
            <label htmlFor="customer-email-input" style={{ display: 'block', fontSize: '12px', color: '#8b949e', marginBottom: '4px' }}>
              Correo de facturación:
            </label>
            <input
              id="customer-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@correo.com"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                backgroundColor: '#0d1117',
                border: '1px solid #30363d',
                color: '#f0f6fc',
                fontSize: '13px',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Estado de Suscripción Actual */}
          {activePlan.isActive && activePlan.tier === category ? (
            <div style={{
              backgroundColor: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid #10b981',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ color: '#10b981', fontWeight: 'bold', fontSize: '13px' }}>
                  ⭐ Suscripción {activePlan.planName} Activa
                </div>
                <div style={{ color: '#8b949e', fontSize: '12px' }}>
                  Válida hasta: {new Date(activePlan.expiresAt).toLocaleDateString('es-CL')}
                </div>
              </div>
              <button
                onClick={handleCancelSub}
                style={{
                  background: 'transparent',
                  border: '1px solid #f85149',
                  color: '#f85149',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Pausar
              </button>
            </div>
          ) : null}

          {/* Botones de Acción */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => handleCheckout(true)}
              disabled={isProcessing}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#238636',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                fontSize: '14px',
                cursor: isProcessing ? 'wait' : 'pointer',
                transition: 'background-color 0.2s'
              }}
            >
              {isProcessing ? 'Procesando...' : (activePlan.isActive ? 'Actualizar Plan' : '⚡ Activar Suscripción Segura')}
            </button>
            <button
              onClick={() => handleCheckout(false)}
              disabled={isProcessing}
              title="Abrir pasarela Stripe Checkout oficial"
              style={{
                padding: '12px 16px',
                backgroundColor: '#21262d',
                color: '#c9d1d9',
                border: '1px solid #30363d',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer'
              }}
            >
              💳 Stripe Checkout
            </button>
          </div>
        </div>

        {/* Garantía y Seguridad */}
        <div style={{ textAlign: 'center', color: '#8b949e', fontSize: '11px', display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <span>🔒 Encriptación SSL 256-bit</span>
          <span>•</span>
          <span>Cancelación en 1-click sin preguntas</span>
          <span>•</span>
          <span>Cumplimiento RGPD & Datos Clínicos Seguros</span>
        </div>
      </div>
    </div>
  );
}
