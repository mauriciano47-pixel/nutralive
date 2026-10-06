import React, { useState } from 'react';

export default function LobbyNutraLive({ onVerificacionExitosa }) {
  const [modo, setModo] = useState('familia'); // 'familia' | 'especialista'
  const [nombreTutor, setNombreTutor] = useState('');
  const [nombrePaciente, setNombrePaciente] = useState('Sofía');
  const [edadPaciente, setEdadPaciente] = useState('9');
  const [diagnostico, setDiagnostico] = useState('Hígado Graso Metabólico (MASLD)');
  const [pinEspecialista, setPinEspecialista] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const manejarEnvioFamilia = (e) => {
    e.preventDefault();
    if (!nombreTutor.trim()) {
      setErrorMsg('Por favor ingresa tu nombre de padre, madre o tutor.');
      return;
    }
    if (!nombrePaciente.trim()) {
      setErrorMsg('Por favor indica el nombre del paciente o hijo a cuidar.');
      return;
    }

    const usuarioVerificado = {
      id: 'usr-' + Date.now(),
      tipo: 'familia',
      rolTitulo: 'Tutor Familiar',
      nombre: nombreTutor.trim(),
      paciente: {
        nombre: nombrePaciente.trim(),
        edad: parseInt(edadPaciente) || 9,
        diagnostico: diagnostico
      },
      fechaVerificacion: new Date().toISOString()
    };

    onVerificacionExitosa(usuarioVerificado);
  };

  const manejarEnvioEspecialista = (e) => {
    e.preventDefault();
    if (!nombreTutor.trim()) {
      setErrorMsg('Por favor ingresa tu nombre profesional.');
      return;
    }

    const usuarioVerificado = {
      id: 'med-' + Date.now(),
      tipo: 'especialista',
      rolTitulo: 'Especialista Clínico / Nutricionista',
      nombre: nombreTutor.trim(),
      credencial: pinEspecialista.trim() || 'CLINIC-VERIFIED',
      paciente: {
        nombre: 'Panel Multipasiente',
        edad: null,
        diagnostico: 'Auditoría Nutricional MASLD'
      },
      fechaVerificacion: new Date().toISOString()
    };

    onVerificacionExitosa(usuarioVerificado);
  };

  const ingresoRapidoDemostrativo = () => {
    const demoUser = {
      id: 'usr-demo-sofia',
      tipo: 'familia',
      rolTitulo: 'Tutor de Sofía (Demostrativo)',
      nombre: 'Mauricio Uribe (Padre de Familia)',
      paciente: {
        nombre: 'Sofía M.',
        edad: 9,
        diagnostico: 'Esteatosis Hepática (MASLD Grado 1)'
      },
      fechaVerificacion: new Date().toISOString()
    };
    onVerificacionExitosa(demoUser);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 90000,
      background: 'rgba(11, 19, 43, 0.85)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1.25rem',
      overflowY: 'auto'
    }}>
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-emerald)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        maxWidth: 480,
        width: '100%',
        padding: '2rem 1.75rem',
        animation: 'fadeIn 0.25s ease'
      }}>
        {/* Cabecera del Lobby */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: 58,
            height: 58,
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--emerald-500) 0%, var(--emerald-600) 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.8rem',
            boxShadow: '0 8px 24px var(--emerald-glow)',
            marginBottom: '0.75rem'
          }}>
            🥗
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
            Verificación de Usuario
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Personaliza el escudo nutricional según tu rol de cuidado clínico.
          </p>
        </div>

        {/* Selector de Modo: Familia vs Especialista */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          background: 'var(--bg-secondary)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem'
        }}>
          <button
            type="button"
            onClick={() => { setModo('familia'); setErrorMsg(''); }}
            style={{
              padding: '10px 8px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: 700,
              background: modo === 'familia' ? 'var(--emerald-500)' : 'transparent',
              color: modo === 'familia' ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>👨‍👩‍👧 Familia / Tutor</span>
          </button>
          <button
            type="button"
            onClick={() => { setModo('especialista'); setErrorMsg(''); }}
            style={{
              padding: '10px 8px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.85rem',
              fontWeight: 700,
              background: modo === 'especialista' ? 'var(--emerald-500)' : 'transparent',
              color: modo === 'especialista' ? '#ffffff' : 'var(--text-muted)',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>🩺 Especialista</span>
          </button>
        </div>

        {errorMsg && (
          <div style={{
            background: 'var(--red-bg)',
            border: '1px solid var(--red-alert)',
            color: 'var(--red-alert)',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            marginBottom: '1rem',
            fontWeight: 600
          }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Formulario Modo Familia */}
        {modo === 'familia' && (
          <form onSubmit={manejarEnvioFamilia}>
            <div style={{ marginBottom: '0.9rem' }}>
              <label htmlFor="nombre-tutor" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.3rem' }}>
                Tu Nombre (Padre, Madre o Tutor):
              </label>
              <input
                id="nombre-tutor"
                type="text"
                value={nombreTutor}
                onChange={(e) => setNombreTutor(e.target.value)}
                placeholder="Ej: Mauricio Uribe"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px', marginBottom: '0.9rem' }}>
              <div>
                <label htmlFor="nombre-paciente" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.3rem' }}>
                  Nombre del Paciente (Hijo/a):
                </label>
                <input
                  id="nombre-paciente"
                  type="text"
                  value={nombrePaciente}
                  onChange={(e) => setNombrePaciente(e.target.value)}
                  placeholder="Ej: Sofía"
                  required
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label htmlFor="edad-paciente" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.3rem' }}>
                  Edad (años):
                </label>
                <input
                  id="edad-paciente"
                  type="number"
                  value={edadPaciente}
                  onChange={(e) => setEdadPaciente(e.target.value)}
                  min="1"
                  max="99"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="diagnostico-select" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.3rem' }}>
                Condición / Enfoque Dietético:
              </label>
              <select
                id="diagnostico-select"
                value={diagnostico}
                onChange={(e) => setDiagnostico(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              >
                <option value="Hígado Graso Metabólico (MASLD)">Hígado Graso Metabólico (MASLD / NAFLD)</option>
                <option value="Resistencia a la Insulina / Prediabetes">Resistencia a la Insulina / Prediabetes</option>
                <option value="Dieta Estricta Sin Fructosa / JMAF">Dieta Estricta Sin Fructosa Oculta</option>
                <option value="Evaluación Preventiva General">Evaluación Preventiva General</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--emerald-500)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: '0 4px 14px var(--emerald-glow)',
                marginBottom: '0.75rem'
              }}
            >
              Verificar & Iniciar Escudo Familiar →
            </button>
          </form>
        )}

        {/* Formulario Modo Especialista */}
        {modo === 'especialista' && (
          <form onSubmit={manejarEnvioEspecialista}>
            <div style={{ marginBottom: '0.9rem' }}>
              <label htmlFor="nombre-esp" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.3rem' }}>
                Nombre del Profesional / Clínica:
              </label>
              <input
                id="nombre-esp"
                type="text"
                value={nombreTutor}
                onChange={(e) => setNombreTutor(e.target.value)}
                placeholder="Ej: Dra. Valeria Morales"
                required
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="pin-esp" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-dim)', marginBottom: '0.3rem' }}>
                Código / Matrícula Profesional (Opcional):
              </label>
              <input
                id="pin-esp"
                type="text"
                value={pinEspecialista}
                onChange={(e) => setPinEspecialista(e.target.value)}
                placeholder="Ej: NUT-48912 o Dejar en blanco"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--emerald-500)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem',
                boxShadow: '0 4px 14px var(--emerald-glow)',
                marginBottom: '0.75rem'
              }}
            >
              Acceso a Consola Clínica →
            </button>
          </form>
        )}

        {/* Botón de Ingreso Demostrativo Inmediato */}
        <div style={{ textAlign: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
          <button
            type="button"
            onClick={ingresoRapidoDemostrativo}
            style={{
              fontSize: '0.82rem',
              color: 'var(--emerald-400)',
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--emerald-glow)',
              border: '1px solid var(--border-emerald)',
              cursor: 'pointer'
            }}
          >
            ⚡ Probar Caso Clínico de Sofía (1 toque)
          </button>
        </div>
      </div>
    </div>
  );
}
