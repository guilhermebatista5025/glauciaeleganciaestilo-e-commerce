import React, { useEffect, useRef, useState } from 'react';

const CloseIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const CheckIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#C89B5A" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>;

const CheckoutModal = ({ isOpen, onClose, cartItems, clearCart }) => {
  const modalRef = useRef(null);
  const containerRef = useRef(null);
  
  // Step State
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Step 1 States (Personal info)
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');

  // Step 2 States (Address info)
  const [cep, setCep] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [cepLoading, setCepLoading] = useState(false);

  // Step 3 States (Payment info)
  const [paymentMethod, setPaymentMethod] = useState('cartao'); // 'cartao' | 'pix' | 'boleto'
  
  // Credit Card States
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardFlipped, setCardFlipped] = useState(false);

  // PIX States
  const [pixSeconds, setPixSeconds] = useState(600); // 10 minutes
  const [copiedPix, setCopiedPix] = useState(false);

  // Load animation
  useEffect(() => {
    if (window.gsap) {
      if (isOpen) {
        window.gsap.to(modalRef.current, { opacity: 1, display: 'flex', duration: 0.3 });
        window.gsap.fromTo(containerRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out' });
        document.body.style.overflow = 'hidden';
      } else {
        window.gsap.to(modalRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
          if (modalRef.current) modalRef.current.style.display = 'none';
          setStep(1);
          setIsSuccess(false);
          resetFormFields();
          document.body.style.overflow = 'auto';
        }});
      }
    }
  }, [isOpen]);

  // PIX Countdown timer
  useEffect(() => {
    let timer;
    if (step === 3 && paymentMethod === 'pix' && pixSeconds > 0 && !isSuccess) {
      timer = setInterval(() => {
        setPixSeconds(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step, paymentMethod, pixSeconds, isSuccess]);

  const resetFormFields = () => {
    setNome('');
    setEmail('');
    setCpf('');
    setPhone('');
    setCep('');
    setRua('');
    setNumero('');
    setComplemento('');
    setBairro('');
    setCidade('');
    setEstado('');
    setCardNumber('');
    setCardName('');
    setCardExpiry('');
    setCardCvv('');
    setCardFlipped(false);
    setPixSeconds(600);
    setCopiedPix(false);
  };

  // Masks
  const handleCpfChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 9) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`;
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
    } else if (value.length > 3) {
      value = `${value.slice(0, 3)}.${value.slice(3)}`;
    }
    setCpf(value);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 10) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }
    setPhone(value);
  };

  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    
    if (value.length > 5) {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    }
    setCep(value);

    // Auto CEP Fetching simulation (1.2s delay for realism)
    const cleanCep = value.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      setCepLoading(true);
      setTimeout(() => {
        setRua('Avenida Paulista');
        setBairro('Bela Vista');
        setCidade('São Paulo');
        setEstado('SP');
        setCepLoading(false);
      }, 1200);
    }
  };

  // Card Input Formatters
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 16) value = value.slice(0, 16);
    
    let formatted = '';
    for (let i = 0; i < value.length; i++) {
      if (i > 0 && i % 4 === 0) formatted += ' ';
      formatted += value[i];
    }
    setCardNumber(formatted);
  };

  const handleCardExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 4) value = value.slice(0, 4);
    
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2)}`;
    }
    setCardExpiry(value);
  };

  const handleCardCvvChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 3) value = value.slice(0, 3);
    setCardCvv(value);
  };

  // Submit flow
  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Complete checkout successfully
      setIsSuccess(true);
      if (clearCart) clearCart();

      // Animate checkmark
      if (window.gsap) {
        window.gsap.fromTo('.success-icon-glowing', 
          { scale: 0, rotation: -180 }, 
          { scale: 1, rotation: 0, duration: 0.8, ease: 'back.out(1.7)', delay: 0.2 }
        );
      }

      // Close modal after showing success screen
      setTimeout(() => {
        onClose();
      }, 4000);
    }
  };

  const handleCopyPix = () => {
    const fakePixKey = "0002010126580014br.gov.bcb.pix0136glauciaboutique2026pixkey02785465231053039865802BR5924Glaucia Boutique Premium6009Sao Paulo62070503***6304E2D1";
    navigator.clipboard.writeText(fakePixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  const formatPixTime = () => {
    const minutes = Math.floor(pixSeconds / 60);
    const seconds = pixSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div 
      ref={modalRef}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(0,0,0,0.92)', zIndex: 3000, display: 'none',
        alignItems: 'center', justifyContent: 'center', padding: '20px',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div 
        ref={containerRef}
        style={{
          width: '100%', maxWidth: '600px', backgroundColor: '#1A1714',
          borderRadius: '8px', padding: '40px', position: 'relative',
          border: '1px solid rgba(200,155,90,0.3)',
          maxHeight: '92vh', overflowY: 'auto', boxSizing: 'border-box'
        }}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', color: '#D4B896', background: 'none', border: 'none', cursor: 'pointer' }}>
          <CloseIcon />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <div className="success-icon-glowing" style={{ 
              display: 'inline-block', marginBottom: '25px', padding: '20px', 
              borderRadius: '50%', border: '2px solid #C89B5A',
              boxShadow: '0 0 25px rgba(200, 155, 90, 0.4)'
            }}>
              <CheckIcon />
            </div>
            <h2 className="font-display text-gold" style={{ fontSize: '32px', marginBottom: '15px', letterSpacing: '1px' }}>Pedido Confirmado!</h2>
            <p style={{ color: '#F5F0E8', fontSize: '16px', lineHeight: '1.6' }}>Sua compra foi registrada com absoluto sucesso!</p>
            <p style={{ color: '#D4B896', fontSize: '13px', marginTop: '12px', opacity: 0.9 }}>
              Preparamos sua embalagem com essência exclusiva Gláucia.<br />
              Um e-mail de confirmação com os detalhes de envio foi enviado.
            </p>
          </div>
        ) : (
          <>
            <h2 className="font-display" style={{ fontSize: '28px', color: '#F5F0E8', marginBottom: '25px', textAlign: 'center', letterSpacing: '1px' }}>Finalizar Pedido</h2>
            
            {/* Elegant Golden Progress Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '35px', position: 'relative', maxWidth: '380px', margin: '0 auto 35px auto' }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px', backgroundColor: '#2E2926', zIndex: 0, transform: 'translateY(-50%)' }} />
              <div style={{ 
                position: 'absolute', top: '50%', left: 0, 
                width: step === 1 ? '0%' : step === 2 ? '50%' : '100%', 
                height: '2px', backgroundColor: '#C89B5A', zIndex: 1, 
                transition: 'width 0.4s ease', transform: 'translateY(-50%)' 
              }} />
              
              {[1, 2, 3].map(s => (
                <div key={s} style={{ 
                  width: '32px', height: '32px', borderRadius: '50%', 
                  backgroundColor: step >= s ? '#C89B5A' : '#2E2926', 
                  color: step >= s ? '#000' : '#888', display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  fontWeight: 'bold', zIndex: 2, transition: 'all 0.4s ease',
                  fontSize: '14px',
                  boxShadow: step === s ? '0 0 10px rgba(200, 155, 90, 0.4)' : 'none'
                }}>
                  {s}
                </div>
              ))}
            </div>

            <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              
              {/* STEP 1: Personal Identification */}
              {step === 1 && (
                <div className="checkout-step" style={{ animation: 'fadeIn 0.5s' }}>
                  <h3 className="font-display text-gold" style={{ fontSize: '18px', marginBottom: '20px', letterSpacing: '1px' }}>1. Informações Pessoais</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div>
                      <label style={labelStyle}>Nome Completo</label>
                      <input required type="text" placeholder="Como impresso no documento" value={nome} onChange={e => setNome(e.target.value)} style={inputStyle} />
                    </div>
                    <div>
                      <label style={labelStyle}>E-mail de Contato</label>
                      <input required type="email" placeholder="nome@provedor.com" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} />
                    </div>
                    
                    <div style={{ display: 'flex', gap: '15px' }}>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>CPF</label>
                        <input required type="text" placeholder="000.000.000-00" value={cpf} onChange={handleCpfChange} style={inputStyle} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Celular / Telefone</label>
                        <input required type="text" placeholder="(00) 90000-0000" value={phone} onChange={handlePhoneChange} style={inputStyle} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Shipping Address */}
              {step === 2 && (
                <div className="checkout-step" style={{ animation: 'fadeIn 0.5s' }}>
                  <h3 className="font-display text-gold" style={{ fontSize: '18px', marginBottom: '20px', letterSpacing: '1px' }}>2. Endereço de Entrega</h3>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ position: 'relative' }}>
                      <label style={labelStyle}>CEP</label>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input required type="text" placeholder="01001-000" value={cep} onChange={handleCepChange} style={{ ...inputStyle, width: '160px', marginBottom: 0 }} />
                        {cepLoading && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C89B5A', fontSize: '12px' }}>
                            <span className="spinner-mini" style={{ display: 'inline-block', width: '12px', height: '12px', border: '2px solid #C89B5A', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                            Carregando...
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Rua / Logradouro</label>
                      <input required type="text" placeholder="Avenida Paulista, etc" value={rua} onChange={e => setRua(e.target.value)} style={inputStyle} />
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                      <div style={{ width: '120px' }}>
                        <label style={labelStyle}>Número</label>
                        <input required type="text" placeholder="1000" value={numero} onChange={e => setNumero(e.target.value)} style={inputStyle} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={labelStyle}>Complemento</label>
                        <input type="text" placeholder="Apto, Bloco, etc (Opcional)" value={complemento} onChange={e => setComplemento(e.target.value)} style={inputStyle} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                      <div style={{ flex: 2 }}>
                        <label style={labelStyle}>Bairro</label>
                        <input required type="text" placeholder="Bela Vista" value={bairro} onChange={e => setBairro(e.target.value)} style={inputStyle} />
                      </div>
                      <div style={{ flex: 2 }}>
                        <label style={labelStyle}>Cidade</label>
                        <input required type="text" placeholder="São Paulo" value={cidade} onChange={e => setCidade(e.target.value)} style={inputStyle} />
                      </div>
                      <div style={{ width: '70px' }}>
                        <label style={labelStyle}>UF</label>
                        <input required type="text" maxLength={2} placeholder="SP" value={estado} onChange={e => setEstado(e.target.value.toUpperCase())} style={inputStyle} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Secure Payment */}
              {step === 3 && (
                <div className="checkout-step" style={{ animation: 'fadeIn 0.5s' }}>
                  <h3 className="font-display text-gold" style={{ fontSize: '18px', marginBottom: '20px', letterSpacing: '1px' }}>3. Forma de Pagamento</h3>
                  
                  {/* Payment Tabs */}
                  <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
                    <button 
                      type="button" 
                      onClick={() => setPaymentMethod('cartao')}
                      style={{ 
                        flex: 1, padding: '12px', border: '1px solid',
                        borderColor: paymentMethod === 'cartao' ? '#C89B5A' : 'rgba(255,255,255,0.1)', 
                        backgroundColor: paymentMethod === 'cartao' ? 'rgba(200,155,90,0.15)' : 'rgba(255,255,255,0.02)', 
                        color: paymentMethod === 'cartao' ? '#C89B5A' : '#888',
                        cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', transition: 'all 0.3s'
                      }}
                    >
                      💳 Cartão
                    </button>
                    
                    <button 
                      type="button" 
                      onClick={() => setPaymentMethod('pix')}
                      style={{ 
                        flex: 1, padding: '12px', border: '1px solid',
                        borderColor: paymentMethod === 'pix' ? '#C89B5A' : 'rgba(255,255,255,0.1)', 
                        backgroundColor: paymentMethod === 'pix' ? 'rgba(200,155,90,0.15)' : 'rgba(255,255,255,0.02)', 
                        color: paymentMethod === 'pix' ? '#C89B5A' : '#888',
                        cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', transition: 'all 0.3s'
                      }}
                    >
                      ⚡ PIX (10% OFF)
                    </button>
                    
                    <button 
                      type="button" 
                      onClick={() => setPaymentMethod('boleto')}
                      style={{ 
                        flex: 1, padding: '12px', border: '1px solid',
                        borderColor: paymentMethod === 'boleto' ? '#C89B5A' : 'rgba(255,255,255,0.1)', 
                        backgroundColor: paymentMethod === 'boleto' ? 'rgba(200,155,90,0.15)' : 'rgba(255,255,255,0.02)', 
                        color: paymentMethod === 'boleto' ? '#C89B5A' : '#888',
                        cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', textTransform: 'uppercase', transition: 'all 0.3s'
                      }}
                    >
                      📄 Boleto
                    </button>
                  </div>
                  
                  {/* CREDIT CARD FLOW */}
                  {paymentMethod === 'cartao' && (
                    <div style={{ animation: 'fadeIn 0.4s' }}>
                      {/* Credit Card Interactive Graphic Mockup */}
                      <div className={`credit-card-container ${cardFlipped ? 'flipped' : ''}`}>
                        <div className="credit-card-inner">
                          {/* Card Front */}
                          <div className="credit-card-front">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ color: '#C89B5A', fontWeight: 'bold', fontSize: '14px', letterSpacing: '2px' }}>GLÁUCIA VIP</span>
                              <div style={{ width: '40px', height: '25px', backgroundColor: '#D4B896', borderRadius: '4px', opacity: 0.8 }} />
                            </div>
                            <div style={{ color: '#F5F0E8', fontSize: '20px', letterSpacing: '3px', margin: '20px 0', fontFamily: 'monospace' }}>
                              {cardNumber || '•••• •••• •••• ••••'}
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                              <div>
                                <div style={{ fontSize: '8px', color: '#888', textTransform: 'uppercase' }}>Titular</div>
                                <div style={{ fontSize: '12px', color: '#D4B896', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                  {cardName || 'NOME IMPRESSO'}
                                </div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '8px', color: '#888', textTransform: 'uppercase' }}>Validade</div>
                                <div style={{ fontSize: '12px', color: '#F5F0E8', fontFamily: 'monospace' }}>
                                  {cardExpiry || 'MM/AA'}
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Card Back */}
                          <div className="credit-card-back">
                            <div style={{ width: '100%', height: '35px', backgroundColor: '#000', margin: '10px 0 0 0' }} />
                            <div style={{ margin: '15px 0', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                              <div style={{ width: '70%', height: '24px', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '3px' }} />
                              <div style={{ 
                                color: '#000', backgroundColor: '#E8C97A', padding: '3px 8px', 
                                fontFamily: 'monospace', fontSize: '12px', fontWeight: 'bold', borderRadius: '3px'
                              }}>
                                {cardCvv || 'CVV'}
                              </div>
                            </div>
                            <div style={{ fontSize: '8px', color: '#C89B5A', textAlign: 'center', opacity: 0.8 }}>
                              Assinatura Autorizada • Inválido sem identificação
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Inputs */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                          <label style={labelStyle}>Número do Cartão</label>
                          <input 
                            required 
                            type="text" 
                            placeholder="0000 0000 0000 0000" 
                            value={cardNumber} 
                            onChange={handleCardNumberChange} 
                            onFocus={() => setCardFlipped(false)}
                            style={inputStyle} 
                          />
                        </div>
                        <div>
                          <label style={labelStyle}>Nome Impresso no Cartão</label>
                          <input 
                            required 
                            type="text" 
                            placeholder="NOME IMPRESSO" 
                            value={cardName} 
                            onChange={e => setCardName(e.target.value.toUpperCase())} 
                            onFocus={() => setCardFlipped(false)}
                            style={inputStyle} 
                          />
                        </div>
                        <div style={{ display: 'flex', gap: '15px' }}>
                          <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Validade</label>
                            <input 
                              required 
                              type="text" 
                              placeholder="MM/AA" 
                              value={cardExpiry} 
                              onChange={handleCardExpiryChange} 
                              onFocus={() => setCardFlipped(false)}
                              style={inputStyle} 
                            />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={labelStyle}>Código CVV</label>
                            <input 
                              required 
                              type="text" 
                              placeholder="000" 
                              value={cardCvv} 
                              onChange={handleCardCvvChange} 
                              onFocus={() => setCardFlipped(true)}
                              onBlur={() => setCardFlipped(false)}
                              style={inputStyle} 
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PIX FLOW */}
                  {paymentMethod === 'pix' && (
                    <div style={{ animation: 'fadeIn 0.4s', textAlign: 'center', padding: '10px 0' }}>
                      <p style={{ color: '#D4B896', fontSize: '13px', marginBottom: '20px' }}>
                        Pague com PIX e garanta aprovação instantânea com 10% de desconto adicional!
                      </p>
                      
                      {/* Fake QR Code */}
                      <div style={{ 
                        display: 'inline-block', padding: '15px', backgroundColor: '#F5F0E8', 
                        borderRadius: '8px', border: '3px solid #C89B5A', marginBottom: '20px',
                        boxShadow: '0 0 20px rgba(200, 155, 90, 0.2)'
                      }}>
                        {/* Styled SVG QR Code Graphic */}
                        <svg width="150" height="150" viewBox="0 0 100 100" fill="#1A1714">
                          <rect width="100" height="100" fill="#F5F0E8" />
                          {/* Corner Squares */}
                          <rect x="5" y="5" width="20" height="20" /> <rect x="8" y="8" width="14" height="14" fill="#F5F0E8" /> <rect x="11" y="11" width="8" height="8" />
                          <rect x="75" y="5" width="20" height="20" /> <rect x="78" y="8" width="14" height="14" fill="#F5F0E8" /> <rect x="81" y="81" width="8" height="8" fill="#F5F0E8" />
                          <rect x="5" y="75" width="20" height="20" /> <rect x="8" y="78" width="14" height="14" fill="#F5F0E8" /> <rect x="11" y="81" width="8" height="8" />
                          {/* Styled Random QR bits */}
                          <rect x="35" y="15" width="10" height="5" />
                          <rect x="55" y="5" width="5" height="15" />
                          <rect x="65" y="20" width="8" height="8" />
                          <rect x="40" y="35" width="20" height="20" /> <rect x="45" y="40" width="10" height="10" fill="#F5F0E8" />
                          <rect x="10" y="40" width="15" height="5" />
                          <rect x="70" y="50" width="15" height="15" />
                          <rect x="15" y="55" width="10" height="10" />
                          <rect x="75" y="75" width="20" height="20" /> <rect x="78" y="78" width="14" height="14" fill="#F5F0E8" />
                        </svg>
                      </div>

                      {/* Pix Key copy and timer */}
                      <div style={{ marginBottom: '25px' }}>
                        <p style={{ color: '#F5F0E8', fontSize: '13px', margin: '0 0 8px 0' }}>Este QR Code expira em:</p>
                        <span className="text-gold" style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace', letterSpacing: '1px' }}>
                          {pixSeconds > 0 ? formatPixTime() : 'EXPIRADO'}
                        </span>
                      </div>

                      <button 
                        type="button"
                        onClick={handleCopyPix}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '8px',
                          padding: '12px 25px', backgroundColor: 'transparent',
                          border: '1px solid #C89B5A', color: '#C89B5A', cursor: 'pointer',
                          fontWeight: 'bold', textTransform: 'uppercase', fontSize: '12px',
                          letterSpacing: '1.5px', transition: 'all 0.3s'
                        }}
                        className="pix-copy-button"
                      >
                        {copiedPix ? '✓ Código Copiado!' : 'Copiar Código PIX'}
                      </button>
                    </div>
                  )}

                  {/* BOLETO FLOW */}
                  {paymentMethod === 'boleto' && (
                    <div style={{ animation: 'fadeIn 0.4s', textAlign: 'center', padding: '15px 0' }}>
                      <p style={{ color: '#D4B896', fontSize: '13px', marginBottom: '25px' }}>
                        Gere o boleto bancário e pague em qualquer banco ou aplicativo de pagamentos.
                      </p>

                      {/* Mockup styled Barcode */}
                      <div style={{ 
                        backgroundColor: '#F5F0E8', padding: '25px', borderRadius: '4px',
                        border: '1px solid rgba(200, 155, 90, 0.3)', marginBottom: '30px',
                        display: 'flex', flexDirection: 'column', alignItems: 'center'
                      }}>
                        <span style={{ color: '#1A1714', fontSize: '11px', fontFamily: 'monospace', letterSpacing: '1px', marginBottom: '15px', fontWeight: '600' }}>
                          34191.79001 01043.513184 91020.150008 7 962100000{total.toFixed(0)}00
                        </span>
                        
                        {/* Barcode Graphic */}
                        <div style={{ display: 'flex', gap: '2px', height: '60px', width: '280px', backgroundColor: '#1A1714', padding: '5px' }}>
                          {[1,3,1,2,4,1,2,3,1,2,4,1,1,3,2,1,4,3,1,2,1,3,4,1,2,1,3,1,4,2,1,3,1,2].map((w, idx) => (
                            <div key={idx} style={{ flex: w, backgroundColor: idx % 2 === 0 ? '#1A1714' : '#F5F0E8', height: '100%' }} />
                          ))}
                        </div>
                      </div>

                      <button 
                        type="button"
                        onClick={() => alert('PDF do Boleto Bancário gerado! Pronto para impressão.')}
                        style={{
                          padding: '12px 30px', backgroundColor: '#C89B5A', color: '#000',
                          border: 'none', cursor: 'pointer', fontWeight: 'bold',
                          textTransform: 'uppercase', fontSize: '12px', letterSpacing: '1px',
                          transition: 'all 0.3s'
                        }}
                        className="print-boleto-btn"
                      >
                        Gerar PDF / Imprimir Boleto
                      </button>
                    </div>
                  )}

                  {/* Summary row */}
                  <div style={{ 
                    marginTop: '25px', padding: '20px 0 10px 0', borderTop: '1px solid rgba(200, 155, 90, 0.15)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center' 
                  }}>
                    <span style={{ color: '#F5F0E8', fontSize: '15px' }}>Total a pagar:</span>
                    <span className="text-gold font-display" style={{ fontSize: '26px', fontWeight: 'bold' }}>
                      R$ {total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
                {step > 1 ? (
                  <button 
                    type="button" 
                    onClick={() => setStep(step - 1)} 
                    style={{ 
                      padding: '15px 30px', color: '#D4B896', border: '1px solid rgba(255,255,255,0.1)',
                      backgroundColor: 'transparent', cursor: 'pointer', transition: 'all 0.3s',
                      textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1px'
                    }}
                    className="back-step-btn"
                  >
                    Voltar
                  </button>
                ) : <div />}
                
                <button 
                  type="submit" 
                  style={{ 
                    padding: '15px 45px', backgroundColor: '#C89B5A', color: '#000', 
                    border: 'none', cursor: 'pointer', fontWeight: 'bold', 
                    textTransform: 'uppercase', letterSpacing: '2.5px', fontSize: '12px',
                    transition: 'all 0.3s'
                  }}
                  className="next-step-btn"
                >
                  {step === 3 ? 'Confirmar Compra' : 'Continuar'}
                </button>
              </div>

            </form>
          </>
        )}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(12px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .back-step-btn:hover {
            border-color: #D4B896 !important;
            color: #F5F0E8 !important;
          }

          .next-step-btn:hover, .print-boleto-btn:hover {
            background-color: #E8C97A !important;
            box-shadow: 0 4px 15px rgba(200, 155, 90, 0.25);
          }

          .pix-copy-button:hover {
            background-color: rgba(200, 155, 90, 0.1) !important;
            border-color: #E8C97A !important;
            color: #E8C97A !important;
          }

          /* Interactive flipping Credit Card mockup styles */
          .credit-card-container {
            perspective: 1000px;
            width: 100%;
            max-width: 320px;
            height: 190px;
            margin: 0 auto 25px auto;
          }
          .credit-card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: left;
            transition: transform 0.6s;
            transform-style: preserve-3d;
          }
          .credit-card-container.flipped .credit-card-inner {
            transform: rotateY(180deg);
          }
          .credit-card-front, .credit-card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            border-radius: 12px;
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .credit-card-front {
            background: linear-gradient(135deg, #2E2926 0%, #1A1714 100%);
            border: 1px solid rgba(200, 155, 90, 0.4);
            box-shadow: 0 8px 25px rgba(0,0,0,0.5);
          }
          .credit-card-back {
            background: linear-gradient(135deg, #1A1714 0%, #100D0B 100%);
            border: 1px solid rgba(200, 155, 90, 0.4);
            transform: rotateY(180deg);
            box-shadow: 0 8px 25px rgba(0,0,0,0.5);
          }
        `}
      </style>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  color: '#D4B896',
  fontSize: '11px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  marginBottom: '6px',
  fontWeight: '500'
};

const inputStyle = {
  width: '100%',
  padding: '14px 16px',
  backgroundColor: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(200,155,90,0.15)',
  color: '#F5F0E8',
  outline: 'none',
  marginBottom: '15px',
  fontFamily: 'inherit',
  fontSize: '13px',
  borderRadius: '4px',
  boxSizing: 'border-box',
  transition: 'border-color 0.3s'
};

export default CheckoutModal;
