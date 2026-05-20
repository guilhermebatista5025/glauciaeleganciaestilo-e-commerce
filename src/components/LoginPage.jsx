import React, { useState, useEffect } from 'react';

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.09 2.48-1.36.03-1.8-.79-3.36-.79-1.56 0-2.05.77-3.34.82-1.33.05-2.33-1.32-3.17-2.53-1.72-2.5-3.02-7.07-1.24-10.15.88-1.53 2.45-2.5 4.16-2.53 1.29-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93 9.9-3.06-.96.04-2.13.64-2.82 1.45-.6.7-1.13 1.84-.99 2.94.97.08 2.06-.52 2.82-1.33" />
  </svg>
);

const LoginPage = ({ onLoginSuccess, navigateTo }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const registeredUsers = JSON.parse(localStorage.getItem('@glaucia/registered_users') || '[]');
      const userFound = registeredUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (userFound) {
        if (userFound.password === password) {
          setSuccessMsg(`Bem-vindo(a) de volta, ${userFound.name}!`);
          setTimeout(() => {
            onLoginSuccess({ name: userFound.name, email: userFound.email });
            navigateTo('home');
          }, 1200);
        } else {
          setError('Senha incorreta. Tente novamente.');
        }
      } else {
        if (email === 'user@example.com' && password === '123456') {
          setSuccessMsg('Bem-vindo(a) de volta!');
          setTimeout(() => {
            onLoginSuccess({ name: 'Cliente Gláucia', email: 'user@example.com' });
            navigateTo('home');
          }, 1200);
        } else {
          setError('Usuário não encontrado. Crie uma conta no menu Cadastrar.');
        }
      }
    }, 1000);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const registeredUsers = JSON.parse(localStorage.getItem('@glaucia/registered_users') || '[]');
      const emailExists = registeredUsers.some(u => u.email.toLowerCase() === email.toLowerCase()) || email === 'user@example.com';

      if (emailExists) {
        setError('Este e-mail já está cadastrado.');
        return;
      }

      const newUser = { name, email, password };
      registeredUsers.push(newUser);
      localStorage.setItem('@glaucia/registered_users', JSON.stringify(registeredUsers));

      setSuccessMsg('Cadastro realizado com sucesso! Fazendo login...');
      setTimeout(() => {
        onLoginSuccess({ name, email });
        navigateTo('home');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="login-page-container">
      <style>
        {`
          .login-page-container {
            width: 100%;
            min-height: 100vh;
            display: flex;
            background-color: #1A1714;
            box-sizing: border-box;
          }

          .login-content-wrapper {
            display: flex;
            width: 100%;
            height: 100vh;
          }

          /* Left Panel - Visual Column */
          .login-visual-side {
            width: 50%;
            background-image: url('/login_panel_bg.png');
            background-size: cover;
            background-position: center;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            padding: 80px;
            box-sizing: border-box;
          }
          
          .login-visual-side::before {
            content: '';
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: linear-gradient(180deg, rgba(35, 30, 27, 0.2) 0%, rgba(26, 23, 20, 0.9) 100%);
            z-index: 1;
          }

          .login-visual-content {
            position: relative;
            z-index: 2;
            color: #F5F0E8;
            text-align: left;
          }

          .login-visual-logo {
            font-family: var(--font-title);
            font-size: 48px;
            letter-spacing: 5px;
            color: var(--color-gold-primary);
            margin-bottom: 12px;
            text-transform: uppercase;
            text-shadow: 0 4px 10px rgba(0,0,0,0.5);
          }

          .login-visual-tagline {
            font-family: var(--font-body);
            font-size: 16px;
            letter-spacing: 2px;
            color: #D4B896;
            text-transform: uppercase;
            opacity: 0.9;
          }

          /* Right Panel - Form Column */
          .login-form-side {
            width: 50%;
            padding: 50px 80px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background-color: #231E1B;
            position: relative;
            overflow-y: auto;
          }

          .login-form-container {
            max-width: 480px;
            width: 100%;
            margin: 0 auto;
          }

          @media (max-width: 1024px) {
            .login-visual-side { width: 40%; padding: 40px; }
            .login-form-side { width: 60%; padding: 40px 60px; }
          }

          @media (max-width: 768px) {
            .login-content-wrapper { flex-direction: column; height: auto; min-height: 100vh; }
            .login-visual-side { display: none; }
            .login-form-side { width: 100%; padding: 40px 25px; align-items: center; justify-content: flex-start; padding-top: 40px;}
          }

          .login-tabs-header {
            display: flex;
            border-bottom: 1px solid rgba(200, 155, 90, 0.15);
            margin-bottom: 35px;
          }

          .login-tab-btn {
            flex: 1;
            background: none;
            border: none;
            padding: 15px 0;
            color: rgba(245, 240, 232, 0.4);
            font-size: 13px;
            letter-spacing: 2px;
            text-transform: uppercase;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            position: relative;
          }

          .login-tab-btn.active {
            color: var(--color-gold-primary);
          }

          .login-tab-btn.active::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 2px;
            background-color: var(--color-gold-primary);
          }

          .login-input-group {
            margin-bottom: 22px;
            position: relative;
          }

          .login-input-label {
            display: block;
            font-size: 11px;
            color: #D4B896;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            margin-bottom: 8px;
            font-weight: 500;
          }

          .login-input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }

          .login-field-icon {
            position: absolute;
            left: 16px;
            color: rgba(200, 155, 90, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
            transition: color 0.3s;
          }

          .login-input-field {
            width: 100%;
            box-sizing: border-box;
            background-color: rgba(15, 12, 10, 0.4);
            border: 1px solid rgba(200, 155, 90, 0.2);
            color: #F5F0E8;
            padding: 14px 16px 14px 46px;
            font-size: 14px;
            outline: none;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            font-family: var(--font-body);
          }

          .login-input-field:focus {
            border-color: var(--color-gold-primary);
            background-color: rgba(15, 12, 10, 0.6);
            box-shadow: 0 0 10px rgba(200, 155, 90, 0.12);
          }

          .login-input-field:focus + .login-field-icon {
            color: var(--color-gold-primary);
          }

          .login-pwd-toggle {
            position: absolute;
            right: 16px;
            background: none;
            border: none;
            color: rgba(245, 240, 232, 0.4);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 4px;
            transition: color 0.3s;
          }

          .login-pwd-toggle:hover {
            color: var(--color-gold-primary);
          }

          .login-btn-primary {
            width: 100%;
            padding: 15px;
            background-color: var(--color-gold-primary);
            color: #1A1714;
            font-size: 13px;
            font-weight: 700;
            letter-spacing: 2px;
            text-transform: uppercase;
            border: none;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            margin-top: 10px;
            border-radius: 30px;
          }

          .login-btn-primary:hover:not(:disabled) {
            background-color: var(--color-gold-light);
            box-shadow: 0 5px 20px rgba(200, 155, 90, 0.25);
            transform: translateY(-1px);
          }

          .login-btn-primary:active:not(:disabled) {
            transform: translateY(0);
          }

          .login-btn-primary:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .login-error-banner {
            background-color: rgba(217, 83, 79, 0.08);
            border-left: 2px solid #D9534F;
            color: #F2DEDE;
            padding: 12px 16px;
            font-size: 13px;
            margin-bottom: 20px;
            line-height: 1.4;
          }

          .login-success-banner {
            text-align: center;
            padding: 40px 0;
          }

          .login-success-icon {
            font-size: 64px;
            color: var(--color-gold-primary);
            margin-bottom: 20px;
            display: inline-block;
            animation: bounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          }

          @keyframes bounce {
            0% { transform: scale(0.3); opacity: 0; }
            50% { transform: scale(1.1); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); opacity: 1; }
          }

          /* Social Login Section */
          .login-divider {
            display: flex;
            align-items: center;
            text-align: center;
            margin: 25px 0;
            color: rgba(245, 240, 232, 0.25);
            font-size: 11px;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .login-divider::before,
          .login-divider::after {
            content: '';
            flex: 1;
            border-bottom: 1px solid rgba(200, 155, 90, 0.12);
          }

          .login-divider:not(:empty):before {
            margin-right: 15px;
          }

          .login-divider:not(:empty):after {
            margin-left: 15px;
          }

          .login-social-buttons {
            display: flex;
            gap: 15px;
          }

          .login-social-btn {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            padding: 12px 16px;
            background-color: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(200, 155, 90, 0.15);
            color: #F5F0E8;
            font-size: 12px;
            letter-spacing: 1px;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s;
            border-radius: 4px;
          }

          .login-social-btn:hover {
            background-color: rgba(200, 155, 90, 0.08);
            border-color: var(--color-gold-primary);
            color: var(--color-gold-primary);
          }
        `}
      </style>

      <div className="login-content-wrapper">
        {/* Left Column - Visual side */}
        <div className="login-visual-side">
          <div className="login-visual-content">
            <h2 className="login-visual-logo">Gláucia</h2>
            <p className="login-visual-tagline">Elegância, Modéstia & Estilo</p>
          </div>
        </div>

        {/* Right Column - Form side */}
        <div className="login-form-side">
          <div className="login-form-container">
            {successMsg ? (
              <div className="login-success-banner">
                <span className="login-success-icon">✦</span>
                <h3 className="font-title text-gold" style={{ fontSize: '28px', marginBottom: '16px', letterSpacing: '1px' }}>Seja Bem-vindo(a)</h3>
                <p style={{ color: '#D4B896', fontSize: '15px', fontWeight: 300, lineHeight: 1.6 }}>{successMsg}</p>
              </div>
            ) : (
              <>
                <div className="login-tabs-header">
                  <button 
                    className={`login-tab-btn font-body ${activeTab === 'login' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('login'); setError(''); }}
                    disabled={loading}
                  >
                    Entrar
                  </button>
                  <button 
                    className={`login-tab-btn font-body ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('register'); setError(''); }}
                    disabled={loading}
                  >
                    Cadastrar
                  </button>
                </div>

                {error && (
                  <div className="login-error-banner font-body">
                    {error}
                  </div>
                )}

                {activeTab === 'login' ? (
                  <form onSubmit={handleLoginSubmit}>
                    <div className="login-input-group">
                      <label className="login-input-label font-body">E-mail</label>
                      <div className="login-input-wrapper">
                        <input 
                          type="email" 
                          className="login-input-field font-body"
                          placeholder="exemplo@glaucia.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={loading}
                          required
                        />
                        <span className="login-field-icon">
                          <MailIcon />
                        </span>
                      </div>
                    </div>

                    <div className="login-input-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label className="login-input-label font-body">Senha</label>
                        <a href="#esqueceu" style={{ fontSize: '11px', color: '#D4B896', opacity: 0.7, textTransform: 'uppercase', letterSpacing: '1px', textDecoration: 'none', marginBottom: '8px' }}>Esqueceu?</a>
                      </div>
                      <div className="login-input-wrapper">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          className="login-input-field font-body"
                          placeholder="Digite sua senha"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={loading}
                          required
                        />
                        <span className="login-field-icon">
                          <LockIcon />
                        </span>
                        <button 
                          type="button" 
                          className="login-pwd-toggle" 
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex="-1"
                        >
                          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="login-btn-primary font-body"
                      disabled={loading}
                    >
                      {loading ? 'Acessando...' : 'Acessar Conta'}
                    </button>
                    
                    <div className="login-divider">ou acesse com</div>

                    <div className="login-social-buttons">
                      <button type="button" className="login-social-btn font-body" onClick={() => setError('Conexão social demonstrativa. Use o login padrão!')}>
                        <GoogleIcon /> Google
                      </button>
                      <button type="button" className="login-social-btn font-body" onClick={() => setError('Conexão social demonstrativa. Use o login padrão!')}>
                        <AppleIcon /> Apple
                      </button>
                    </div>

                    <p style={{ color: '#D4B896', fontSize: '11px', marginTop: '25px', textAlign: 'center', opacity: 0.6, letterSpacing: '0.5px' }}>
                      Acesso Rápido de Teste: <strong style={{ color: 'var(--color-gold-primary)' }}>user@example.com</strong> / <strong style={{ color: 'var(--color-gold-primary)' }}>123456</strong>
                    </p>
                  </form>
                ) : (
                  <form onSubmit={handleRegisterSubmit}>
                    <div className="login-input-group">
                      <label className="login-input-label font-body">Nome Completo</label>
                      <div className="login-input-wrapper">
                        <input 
                          type="text" 
                          className="login-input-field font-body"
                          placeholder="Seu nome completo"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          disabled={loading}
                          required
                        />
                        <span className="login-field-icon">
                          <UserIcon />
                        </span>
                      </div>
                    </div>

                    <div className="login-input-group">
                      <label className="login-input-label font-body">E-mail</label>
                      <div className="login-input-wrapper">
                        <input 
                          type="email" 
                          className="login-input-field font-body"
                          placeholder="exemplo@glaucia.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          disabled={loading}
                          required
                        />
                        <span className="login-field-icon">
                          <MailIcon />
                        </span>
                      </div>
                    </div>

                    <div className="login-input-group">
                      <label className="login-input-label font-body">Senha</label>
                      <div className="login-input-wrapper">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          className="login-input-field font-body"
                          placeholder="Mínimo de 6 caracteres"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          disabled={loading}
                          required
                        />
                        <span className="login-field-icon">
                          <LockIcon />
                        </span>
                        <button 
                          type="button" 
                          className="login-pwd-toggle" 
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex="-1"
                        >
                          {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                        </button>
                      </div>
                    </div>

                    <div className="login-input-group">
                      <label className="login-input-label font-body">Confirmar Senha</label>
                      <div className="login-input-wrapper">
                        <input 
                          type={showPassword ? "text" : "password"} 
                          className="login-input-field font-body"
                          placeholder="Repita sua senha"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          disabled={loading}
                          required
                        />
                        <span className="login-field-icon">
                          <LockIcon />
                        </span>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="login-btn-primary font-body"
                      disabled={loading}
                    >
                      {loading ? 'Cadastrando...' : 'Criar Conta Premium'}
                    </button>

                    <div className="login-divider">ou cadastre com</div>

                    <div className="login-social-buttons">
                      <button type="button" className="login-social-btn font-body" onClick={() => setError('Cadastro social demonstrativo. Crie uma conta no formulário!')}>
                        <GoogleIcon /> Google
                      </button>
                      <button type="button" className="login-social-btn font-body" onClick={() => setError('Cadastro social demonstrativo. Crie uma conta no formulário!')}>
                        <AppleIcon /> Apple
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
