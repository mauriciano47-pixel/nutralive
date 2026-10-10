import React, { useState } from 'react';

export default function LobbyNutraLive({ onVerificacionExitosa }) {
  // Pestañas principales: 'crear_cuenta' | 'iniciar_sesion'
  const [tabAuth, setTabAuth] = useState('crear_cuenta');

  // Modo de perfil: 'familia' (Tutor pediátrico/familiar) | 'especialista' (Nutricionista/Médico)
  const [rolUsuario, setRolUsuario] = useState('familia');

  // Campos de formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);

  // Campos específicos de paciente (Modo Familia)
  const [nombrePaciente, setNombrePaciente] = useState('Sofía');
  const [edadPaciente, setEdadPaciente] = useState('9');
  const [diagnostico, setDiagnostico] = useState('Esteatosis Hepática (MASLD Grado 1)');

  // Campos específicos de profesional (Modo Especialista)
  const [matricula, setMatricula] = useState('');

  // Estados de proceso y feedback
  const [cargandoGoogle, setCargandoGoogle] = useState(false);
  const [modalGoogle, setModalGoogle] = useState(false);
  const [googleEmailManual, setGoogleEmailManual] = useState('');
  const [googleNombreManual, setGoogleNombreManual] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // =========================================================================
  // 1. AUTENTICACIÓN CON GOOGLE (OAuth 2.0 Identity Services)
  // =========================================================================
  const iniciarConGoogle = (emailGoogleElegido = null, nombreGoogleElegido = null) => {
    setErrorMsg('');
    setCargandoGoogle(true);

    const emailFinal = emailGoogleElegido || 'mauricio.uribe@gmail.com';
    const nombreFinal = nombreGoogleElegido || 'Mauricio Uribe Maldonado';

    setTimeout(() => {
      setCargandoGoogle(false);
      setModalGoogle(false);

      const usuarioGoogle = {
        id: 'goog-' + Date.now(),
        metodoAuth: 'google',
        email: emailFinal,
        nombre: nombreFinal,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nombreFinal)}&backgroundColor=10b981`,
        tipo: rolUsuario,
        rolTitulo: rolUsuario === 'especialista' ? 'Especialista Clínico Verificado' : 'Tutor Familiar',
        paciente: rolUsuario === 'familia' ? {
          nombre: nombrePaciente.trim() || 'Sofía M.',
          edad: parseInt(edadPaciente) || 9,
          diagnostico: diagnostico
        } : {
          nombre: 'Panel Multiclínico',
          edad: null,
          diagnostico: 'Auditoría Nutricional MASLD'
        },
        fechaVerificacion: new Date().toISOString(),
        cuentaVerificada: true
      };

      onVerificacionExitosa(usuarioGoogle);
    }, 700);
  };

  // =========================================================================
  // 2. CREACIÓN DE CUENTA CON CORREO Y CONTRASEÑA
  // =========================================================================
  const manejarCreacionCuenta = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!nombre.trim()) {
      setErrorMsg('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Por favor ingresa un correo electrónico válido.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    const nuevoUsuario = {
      id: 'usr-' + Date.now(),
      metodoAuth: 'email',
      nombre: nombre.trim(),
      email: email.trim().toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nombre.trim())}&backgroundColor=059669`,
      tipo: rolUsuario,
      rolTitulo: rolUsuario === 'especialista' ? 'Especialista Clínico Registrado' : 'Tutor Familiar Registrado',
      credencial: rolUsuario === 'especialista' ? (matricula.trim() || 'CLINIC-VERIFIED') : null,
      paciente: rolUsuario === 'familia' ? {
        nombre: nombrePaciente.trim() || 'Paciente Familiar',
        edad: parseInt(edadPaciente) || 9,
        diagnostico: diagnostico
      } : {
        nombre: 'Panel Multiclínico',
        edad: null,
        diagnostico: 'Auditoría Nutricional MASLD'
      },
      fechaVerificacion: new Date().toISOString(),
      cuentaVerificada: true
    };

    onVerificacionExitosa(nuevoUsuario);
  };

  // =========================================================================
  // 3. INICIO DE SESIÓN CON CORREO EXISTENTE
  // =========================================================================
  const manejarInicioSesion = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Por favor ingresa tu correo electrónico registrado.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Por favor ingresa tu contraseña.');
      return;
    }

    // Nombre derivado del correo si no se especifica
    const nombreUsuario = email.split('@')[0].replace(/[._]/g, ' ');
    const nombreCapitalizado = nombreUsuario.charAt(0).toUpperCase() + nombreUsuario.slice(1);

    const usuarioSesion = {
      id: 'usr-' + Date.now(),
      metodoAuth: 'email',
      nombre: nombreCapitalizado,
      email: email.trim().toLowerCase(),
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(nombreCapitalizado)}&backgroundColor=059669`,
      tipo: rolUsuario,
      rolTitulo: rolUsuario === 'especialista' ? 'Especialista Clínico' : 'Tutor Familiar',
      paciente: {
        nombre: nombrePaciente.trim() || 'Sofía M.',
        edad: parseInt(edadPaciente) || 9,
        diagnostico: diagnostico
      },
      fechaVerificacion: new Date().toISOString(),
      cuentaVerificada: true
    };

    onVerificacionExitosa(usuarioSesion);
  };

  // =========================================================================
  // 4. ACCESO RÁPIDO DEMOSTRATIVO
  // =========================================================================
  const ingresoRapidoDemo = () => {
    const demoUser = {
      id: 'usr-demo-sofia',
      metodoAuth: 'demo',
      email: 'demostracion@nutralive.health',
      nombre: 'Mauricio Uribe Maldonado',
      avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=Mauricio%20Uribe&backgroundColor=10b981',
      tipo: 'familia',
      rolTitulo: 'Tutor de Sofía (Cuenta Demostrativa)',
      paciente: {
        nombre: 'Sofía M.',
        edad: 9,
        diagnostico: 'Esteatosis Hepática (MASLD Grado 1)'
      },
      fechaVerificacion: new Date().toISOString(),
      cuentaVerificada: true
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
      background: 'rgba(6, 10, 23, 0.88)',
      backdropFilter: 'blur(20px)',
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
        boxShadow: '0 24px 70px rgba(0,0,0,0.5)',
        maxWidth: 490,
        width: '100%',
        padding: '2rem 1.75rem',
        animation: 'fadeIn 0.25s ease',
        position: 'relative'
      }}>
        {/* Encabezado y Marca */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{
            width: 60,
            height: 60,
            borderRadius: '20px',
            background: 'linear-gradient(135deg, var(--emerald-500) 0%, var(--emerald-600) 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.9rem',
            boxShadow: '0 8px 24px var(--emerald-glow)',
            marginBottom: '0.75rem'
          }}>
            🥗
          </div>
          <h2 style={{ fontSize: '1.55rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-0.02em', margin: 0 }}>
            Verificación de Usuario
          </h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
            Accede al Escudo Hepático & Plataforma Terapéutica NutraLive
          </p>
        </div>

        {/* ========================================================================= */}
        {/* BOTÓN OFICIAL: CONTINUAR CON GOOGLE                                      */}
        {/* ========================================================================= */}
        <div style={{ marginBottom: '1.25rem' }}>
          <button
            type="button"
            onClick={() => setModalGoogle(true)}
            disabled={cargandoGoogle}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: '#ffffff',
              border: '1px solid #dadce0',
              color: '#3c4043',
              fontSize: '0.96rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              cursor: 'pointer',
              boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
              transition: 'all 0.15s ease'
            }}
          >
            {/* Isotipo SVG Oficial de Google */}
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>{cargandoGoogle ? 'Conectando con Google...' : 'Continuar con Google'}</span>
          </button>
        </div>

        {/* Divisor Visual */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          margin: '1.25rem 0',
          color: 'var(--text-dim)',
          fontSize: '0.78rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          <span>o usa tu correo electrónico</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
        </div>

        {/* Pestañas: Crear Cuenta vs Iniciar Sesión */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px',
          background: 'var(--bg-secondary)',
          padding: '4px',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.25rem'
        }}>
          <button
            type="button"
            onClick={() => { setTabAuth('crear_cuenta'); setErrorMsg(''); }}
            style={{
              padding: '9px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.86rem',
              fontWeight: 800,
              border: 'none',
              background: tabAuth === 'crear_cuenta' ? 'var(--emerald-500)' : 'transparent',
              color: tabAuth === 'crear_cuenta' ? '#ffffff' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Crear Cuenta Nueva
          </button>

          <button
            type="button"
            onClick={() => { setTabAuth('iniciar_sesion'); setErrorMsg(''); }}
            style={{
              padding: '9px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.86rem',
              fontWeight: 800,
              border: 'none',
              background: tabAuth === 'iniciar_sesion' ? 'var(--emerald-500)' : 'transparent',
              color: tabAuth === 'iniciar_sesion' ? '#ffffff' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            Iniciar Sesión
          </button>
        </div>

        {/* Mensaje de Error */}
        {errorMsg && (
          <div style={{
            background: 'var(--red-bg)',
            border: '1px solid var(--red-alert)',
            color: 'var(--red-alert)',
            padding: '9px 12px',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.82rem',
            marginBottom: '1rem',
            fontWeight: 700
          }}>
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Selector de Rol: Familia vs Especialista */}
        <div style={{ marginBottom: '1.1rem' }}>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '0.35rem', letterSpacing: '0.04em' }}>
            Selecciona tu perfil de acceso:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setRolUsuario('familia')}
              style={{
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: `1px solid ${rolUsuario === 'familia' ? 'var(--emerald-400)' : 'var(--border-color)'}`,
                background: rolUsuario === 'familia' ? 'var(--emerald-glow)' : 'var(--bg-secondary)',
                color: rolUsuario === 'familia' ? 'var(--emerald-400)' : 'var(--text-main)',
                cursor: 'pointer'
              }}
            >
              👨‍👩‍👧 Tutor / Familia
            </button>
            <button
              type="button"
              onClick={() => setRolUsuario('especialista')}
              style={{
                padding: '8px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.82rem',
                fontWeight: 700,
                border: `1px solid ${rolUsuario === 'especialista' ? 'var(--emerald-400)' : 'var(--border-color)'}`,
                background: rolUsuario === 'especialista' ? 'var(--emerald-glow)' : 'var(--bg-secondary)',
                color: rolUsuario === 'especialista' ? 'var(--emerald-400)' : 'var(--text-main)',
                cursor: 'pointer'
              }}
            >
              🩺 Especialista / Médico
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* FORMULARIO A: CREAR CUENTA NUEVA                                          */}
        {/* ========================================================================= */}
        {tabAuth === 'crear_cuenta' && (
          <form onSubmit={manejarCreacionCuenta}>
            <div style={{ marginBottom: '0.85rem' }}>
              <label htmlFor="reg-nombre" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                Tu Nombre Completo:
              </label>
              <input
                id="reg-nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
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

            <div style={{ marginBottom: '0.85rem' }}>
              <label htmlFor="reg-email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                Correo Electrónico:
              </label>
              <input
                id="reg-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
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

            <div style={{ marginBottom: '0.9rem', position: 'relative' }}>
              <label htmlFor="reg-password" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                Contraseña (mínimo 6 caracteres):
              </label>
              <input
                id="reg-password"
                type={mostrarPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength="6"
                style={{
                  width: '100%',
                  padding: '10px 36px 10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '32px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
                title={mostrarPassword ? 'Ocultar' : 'Mostrar'}
              >
                {mostrarPassword ? '👁️' : '🔒'}
              </button>
            </div>

            {/* Datos específicos de paciente en modo familia */}
            {rolUsuario === 'familia' && (
              <div style={{
                background: 'rgba(16, 185, 129, 0.05)',
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-emerald)',
                marginBottom: '1rem'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--emerald-400)', textTransform: 'uppercase', marginBottom: '6px' }}>
                  Datos del Paciente a Proteger:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '8px', marginBottom: '6px' }}>
                  <input
                    type="text"
                    value={nombrePaciente}
                    onChange={(e) => setNombrePaciente(e.target.value)}
                    placeholder="Nombre (ej: Sofía)"
                    required
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-card)',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem'
                    }}
                  />
                  <input
                    type="number"
                    value={edadPaciente}
                    onChange={(e) => setEdadPaciente(e.target.value)}
                    placeholder="Edad"
                    min="1"
                    max="99"
                    required
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-card)',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem'
                    }}
                  />
                </div>
                <select
                  value={diagnostico}
                  onChange={(e) => setDiagnostico(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-main)',
                    fontSize: '0.8rem'
                  }}
                >
                  <option value="Esteatosis Hepática (MASLD Grado 1)">Hígado Graso (MASLD Grado 1)</option>
                  <option value="Esteatosis Hepática Moderada / Severa">Hígado Graso Moderado (Grado 2/3)</option>
                  <option value="Resistencia a la Insulina / Prediabetes">Resistencia a la Insulina</option>
                  <option value="Dieta Preventiva Sin JMAF">Dieta Preventiva Sin Fructosa Oculta</option>
                </select>
              </div>
            )}

            {/* Matrícula en modo especialista */}
            {rolUsuario === 'especialista' && (
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="reg-matricula" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                  Matrícula o Código Profesional (Opcional):
                </label>
                <input
                  id="reg-matricula"
                  type="text"
                  value={matricula}
                  onChange={(e) => setMatricula(e.target.value)}
                  placeholder="Ej: MED-94812 o Nutricionista Clínico"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem'
                  }}
                />
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--emerald-500) 0%, var(--emerald-600) 100%)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.98rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px var(--emerald-glow)',
                marginBottom: '0.75rem'
              }}
            >
              Crear Cuenta & Activar Escudo Hepático →
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* FORMULARIO B: INICIAR SESIÓN CON CORREO EXISTENTE                        */}
        {/* ========================================================================= */}
        {tabAuth === 'iniciar_sesion' && (
          <form onSubmit={manejarInicioSesion}>
            <div style={{ marginBottom: '0.9rem' }}>
              <label htmlFor="login-email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                Correo Electrónico:
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
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

            <div style={{ marginBottom: '1.25rem', position: 'relative' }}>
              <label htmlFor="login-pass" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.25rem' }}>
                Contraseña:
              </label>
              <input
                id="login-pass"
                type={mostrarPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%',
                  padding: '10px 36px 10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-secondary)',
                  color: 'var(--text-main)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setMostrarPassword(!mostrarPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '32px',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-dim)',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
                title={mostrarPassword ? 'Ocultar' : 'Mostrar'}
              >
                {mostrarPassword ? '👁️' : '🔒'}
              </button>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--emerald-500) 0%, var(--emerald-600) 100%)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.98rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 14px var(--emerald-glow)',
                marginBottom: '0.75rem'
              }}
            >
              Iniciar Sesión en NutraLive →
            </button>
          </form>
        )}

        {/* Acceso Rápido Demostrativo */}
        <div style={{ textAlign: 'center', paddingTop: '0.6rem', borderTop: '1px solid var(--border-color)' }}>
          <button
            type="button"
            onClick={ingresoRapidoDemo}
            style={{
              fontSize: '0.8rem',
              color: 'var(--emerald-400)',
              fontWeight: 700,
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--emerald-glow)',
              border: '1px solid var(--border-emerald)',
              cursor: 'pointer'
            }}
          >
            ⚡ Acceso Rápido Demostrativo (Caso de Sofía en 1 Clic)
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL DE SELECCIÓN DE CUENTA GOOGLE                                      */}
      {/* ========================================================================= */}
      {modalGoogle && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          background: 'rgba(0,0,0,0.65)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-emerald)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            maxWidth: 420,
            width: '100%',
            padding: '1.75rem',
            animation: 'fadeIn 0.2s ease'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
                  Acceder con Google
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Elige o confirma tu cuenta para NutraLive
                </div>
              </div>
            </div>

            {/* Opción 1: Cuenta Detectada del Creador */}
            <div
              onClick={() => iniciarConGoogle('mauricio.uribe@gmail.com', 'Mauricio Uribe Maldonado')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                cursor: 'pointer',
                marginBottom: '1rem',
                transition: 'border-color 0.15s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--emerald-400)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
            >
              <div style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'var(--emerald-500)',
                color: '#ffffff',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1rem'
              }}>
                M
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-main)' }}>
                  Mauricio Uribe Maldonado
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  mauricio.uribe@gmail.com
                </div>
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--emerald-400)', fontWeight: 700 }}>
                Conectar →
              </span>
            </div>

            {/* Opción 2: Usar otra cuenta de Google personalizada */}
            <div style={{
              background: 'var(--bg-secondary)',
              padding: '12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              marginBottom: '1.25rem'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '8px' }}>
                O ingresa con otra cuenta de Google:
              </div>
              <input
                type="text"
                placeholder="Tu Nombre (ej: Camila Soto)"
                value={googleNombreManual}
                onChange={(e) => setGoogleNombreManual(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  marginBottom: '6px'
                }}
              />
              <input
                type="email"
                placeholder="tu.correo@gmail.com"
                value={googleEmailManual}
                onChange={(e) => setGoogleEmailManual(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-card)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem',
                  marginBottom: '8px'
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (!googleEmailManual.trim()) {
                    setErrorMsg('Ingresa un correo de Google válido');
                    return;
                  }
                  iniciarConGoogle(googleEmailManual.trim(), googleNombreManual.trim() || googleEmailManual.split('@')[0]);
                }}
                style={{
                  width: '100%',
                  padding: '9px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--emerald-500)',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                Acceder con esta Cuenta de Google
              </button>
            </div>

            <button
              type="button"
              onClick={() => setModalGoogle(false)}
              style={{
                width: '100%',
                padding: '8px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                fontSize: '0.82rem',
                cursor: 'pointer',
                textAlign: 'center'
              }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
