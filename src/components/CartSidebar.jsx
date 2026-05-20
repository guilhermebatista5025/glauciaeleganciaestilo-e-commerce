import React, { useEffect, useRef, useState } from 'react';

const CloseIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const TrashIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;

const CartSidebar = ({ isOpen, toggleCart, items, updateQuantity, removeFromCart, openCheckout }) => {
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [cep, setCep] = useState('');
  const [shippingCalculated, setShippingCalculated] = useState(false); // false | 'loading' | true
  const [shippingError, setShippingError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [couponError, setCouponError] = useState('');

  useEffect(() => {
    if (window.gsap) {
      if (isOpen) {
        window.gsap.to(overlayRef.current, { opacity: 1, display: 'block', duration: 0.3 });
        window.gsap.to(sidebarRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });
      } else {
        window.gsap.to(sidebarRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
        window.gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        }});
      }
    }
  }, [isOpen]);

  const handleRemove = (cartId, elementId) => {
    if (window.gsap) {
      window.gsap.to(`#${elementId}`, {
        opacity: 0,
        x: 50,
        height: 0,
        marginBottom: 0,
        padding: 0,
        duration: 0.3,
        onComplete: () => removeFromCart(cartId)
      });
    } else {
      removeFromCart(cartId);
    }
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'GLAUCIA10') {
      setDiscount(0.1); // 10%
      setCouponSuccess('Cupom GLAUCIA10 ativado! 10% de desconto aplicado.');
      setCouponError('');
    } else {
      setDiscount(0);
      setCouponError('Cupom inválido. Tente GLAUCIA10.');
      setCouponSuccess('');
    }
  };

  const handleCalculateShipping = () => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      setShippingError('Digite um CEP válido (8 números)');
      setShippingCalculated(false);
      return;
    }
    setShippingError('');
    setShippingCalculated('loading');
    
    setTimeout(() => {
      setShippingCalculated(true);
    }, 1000);
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountValue = subtotal * discount;
  const isFreeShipping = subtotal >= 299;
  
  // Shipping logic: R$ 15.90 if calculated and subtotal is under 299, otherwise 0
  const shipping = shippingCalculated === true ? (isFreeShipping ? 0 : 15.90) : null;
  const total = subtotal - discountValue + (shipping || 0);

  return (
    <>
      <div 
        ref={overlayRef}
        onClick={toggleCart}
        style={{
          position: 'fixed',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 1000,
          opacity: 0,
          display: 'none',
          backdropFilter: 'blur(4px)'
        }}
      />

      <div 
        ref={sidebarRef}
        style={{
          position: 'fixed',
          top: 0, right: 0, width: '100%', maxWidth: '450px', height: '100vh',
          backgroundColor: '#1A1714',
          borderLeft: '1px solid rgba(200, 155, 90, 0.4)',
          zIndex: 1001,
          transform: 'translateX(100%)',
          display: 'flex', flexDirection: 'column'
        }}
      >
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(200, 155, 90, 0.1)' }}>
          <h2 className="font-title text-gold" style={{ fontSize: '24px' }}>Sua Sacola</h2>
          <button onClick={toggleCart} style={{ color: '#D4B896' }}><CloseIcon /></button>
        </div>

        {/* Free Shipping Progress */}
        <div style={{ padding: '20px 30px', backgroundColor: 'rgba(200, 155, 90, 0.05)', borderBottom: '1px solid rgba(200, 155, 90, 0.1)' }}>
          <p style={{ fontSize: '12px', color: '#F5F0E8', marginBottom: '10px', textAlign: 'center' }}>
            {isFreeShipping 
              ? <span className="text-gold">✨ Você ganhou FRETE GRÁTIS! ✨</span>
              : `Faltam R$ ${(299 - subtotal).toFixed(2).replace('.', ',')} para FRETE GRÁTIS`
            }
          </p>
          <div style={{ width: '100%', height: '4px', backgroundColor: '#2E2926', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ 
              height: '100%', 
              backgroundColor: '#C89B5A', 
              width: `${Math.min((subtotal / 299) * 100, 100)}%`,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <p style={{ color: '#D4B896', marginBottom: '20px' }}>Sua sacola está vazia.</p>
              <button onClick={toggleCart} style={{ color: '#C89B5A', textDecoration: 'underline' }}>Continuar explorando</button>
            </div>
          ) : (
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {items.map((item) => (
                <li id={`cart-item-${item.cartId}`} key={item.cartId} style={{ display: 'flex', gap: '15px', position: 'relative' }}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: '90px', height: '120px', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '90px', height: '120px', background: 'linear-gradient(135deg, #3D2B1F 0%, #C89B5A 100%)' }} />
                  )}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4 className="font-display" style={{ fontSize: '16px', marginBottom: '5px', paddingRight: '20px' }}>{item.name}</h4>
                        <button onClick={() => handleRemove(item.cartId, `cart-item-${item.cartId}`)} style={{ color: '#9A7240', position: 'absolute', right: 0, top: 0 }}>
                          <TrashIcon />
                        </button>
                      </div>
                      <p style={{ fontSize: '12px', color: '#D4B896', marginBottom: '5px' }}>Tam: {item.size} | Cor: <span style={{ display: 'inline-block', width: '10px', height: '10px', backgroundColor: item.color, borderRadius: '50%', border: '1px solid #444', verticalAlign: 'middle' }}></span></p>
                      <p className="text-gold" style={{ fontWeight: 500 }}>R$ {item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(200, 155, 90, 0.3)', width: 'fit-content' }}>
                      <button onClick={() => updateQuantity(item.cartId, -1)} style={{ padding: '5px 10px', color: '#C89B5A' }}>-</button>
                      <span style={{ fontSize: '14px', width: '30px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartId, 1)} style={{ padding: '5px 10px', color: '#C89B5A' }}>+</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: '25px 30px', borderTop: '1px solid rgba(200, 155, 90, 0.1)', backgroundColor: '#1A1714' }}>
            
            {/* CEP Calculator */}
            <div style={{ marginBottom: '15px' }}>
              <div style={{ display: 'flex', border: '1px solid rgba(200, 155, 90, 0.3)' }}>
                <input 
                  type="text" 
                  maxLength={9}
                  placeholder="Simular CEP (ex: 01001-000)" 
                  value={cep}
                  onChange={e => setCep(e.target.value)}
                  style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: '#F5F0E8', padding: '10px 15px', outline: 'none', fontSize: '12px' }}
                />
                <button onClick={handleCalculateShipping} style={{ backgroundColor: 'rgba(200, 155, 90, 0.1)', color: '#C89B5A', padding: '0 15px', fontSize: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                  {shippingCalculated === 'loading' ? '...' : 'Calcular'}
                </button>
              </div>
              {shippingError && <p style={{ color: '#E8C97A', fontSize: '11px', marginTop: '5px', margin: '5px 0 0 0' }}>{shippingError}</p>}
              
              {shippingCalculated === 'loading' && (
                <p style={{ color: '#D4B896', fontSize: '11px', marginTop: '5px', margin: '5px 0 0 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span className="spinner-mini" style={{ display: 'inline-block', width: '8px', height: '8px', border: '1.5px solid #C89B5A', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                  Calculando melhor rota de entrega...
                </p>
              )}
              
              {shippingCalculated === true && (
                <div style={{ backgroundColor: 'rgba(200, 155, 90, 0.03)', border: '1px dashed rgba(200, 155, 90, 0.2)', padding: '10px', marginTop: '10px', borderRadius: '3px' }}>
                  <p style={{ color: '#F5F0E8', fontSize: '12px', fontWeight: '600', margin: '0 0 2px 0' }}>✓ Entrega Expressa Boutique</p>
                  <p style={{ color: '#D4B896', fontSize: '11px', margin: 0 }}>
                    Prazo: <strong>2 dias úteis</strong> | Frete: <strong className="text-gold">{isFreeShipping ? 'Grátis' : 'R$ 15,90'}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Discount Coupon */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', border: '1px solid rgba(200, 155, 90, 0.3)' }}>
                <input 
                  type="text" 
                  placeholder="Cupom de desconto (ex: GLAUCIA10)" 
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  style={{ flex: 1, backgroundColor: 'transparent', border: 'none', color: '#F5F0E8', padding: '10px 15px', outline: 'none', fontSize: '12px' }}
                />
                <button onClick={applyCoupon} style={{ backgroundColor: 'rgba(200, 155, 90, 0.1)', color: '#C89B5A', padding: '0 15px', fontSize: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
                  Aplicar
                </button>
              </div>
              {couponSuccess && <p style={{ color: '#88D49E', fontSize: '11px', marginTop: '5px', margin: '5px 0 0 0' }}>{couponSuccess}</p>}
              {couponError && <p style={{ color: '#E8C97A', fontSize: '11px', marginTop: '5px', margin: '5px 0 0 0' }}>{couponError}</p>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', color: '#D4B896' }}>
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '14px', color: '#88D49E' }}>
                <span>Desconto (10%)</span>
                <span>- R$ {discountValue.toFixed(2).replace('.', ',')}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '14px', color: '#D4B896' }}>
              <span>Frete</span>
              <span>
                {shipping === null 
                  ? <span style={{ fontSize: '11px', color: '#888', fontStyle: 'italic' }}>Informe seu CEP</span> 
                  : (shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2).replace('.', ',')}`)
                }
              </span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px', borderTop: '1px solid rgba(200,155,90,0.2)', paddingTop: '15px' }}>
              <span style={{ fontSize: '18px', color: '#F5F0E8' }}>Total</span>
              <span className="text-gold" style={{ fontSize: '24px', fontWeight: 'bold' }}>
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
            
            <button onClick={openCheckout} style={{ 
              width: '100%', padding: '18px', backgroundColor: '#C89B5A', color: '#000', border: 'none', cursor: 'pointer',
              textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 600, transition: 'background-color 0.3s'
            }} className="cart-checkout-btn">
              Finalizar Compra
            </button>

            <style>
              {`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
                .cart-checkout-btn:hover {
                  background-color: #E8C97A !important;
                  box-shadow: 0 4px 15px rgba(200, 155, 90, 0.2);
                }
              `}
            </style>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
