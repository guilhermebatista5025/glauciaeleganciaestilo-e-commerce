import React, { useEffect, useRef } from 'react';

const CloseIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const TrashIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>;
const CartIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;

const WishlistSidebar = ({ isOpen, toggleWishlistSidebar, items, toggleWishlist, addToCart }) => {
  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (window.gsap) {
      if (isOpen) {
        window.gsap.to(overlayRef.current, { opacity: 1, display: 'block', duration: 0.3 });
        window.gsap.to(sidebarRef.current, { x: 0, duration: 0.5, ease: 'power3.out' });
      } else {
        window.gsap.to(sidebarRef.current, { x: '-100%', duration: 0.4, ease: 'power3.in' });
        window.gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
          if (overlayRef.current) overlayRef.current.style.display = 'none';
        }});
      }
    }
  }, [isOpen]);

  const handleRemove = (product, elementId) => {
    if (window.gsap) {
      window.gsap.to(`#${elementId}`, {
        opacity: 0,
        x: -50,
        height: 0,
        marginBottom: 0,
        padding: 0,
        duration: 0.3,
        onComplete: () => toggleWishlist(product)
      });
    } else {
      toggleWishlist(product);
    }
  };

  const handleAddToCart = (product, elementId) => {
    // Add to cart with default values (first size and first color, or defaults)
    const defaultSize = product.sizes?.[0] || 'M';
    const defaultColor = product.colors?.[0] || '#C89B5A';
    
    // Quick GSAP pulse animation on the card when adding
    if (window.gsap) {
      window.gsap.to(`#${elementId}`, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        onComplete: () => {
          addToCart(product, 1, defaultSize, defaultColor);
        }
      });
    } else {
      addToCart(product, 1, defaultSize, defaultColor);
    }
  };

  return (
    <>
      <div 
        ref={overlayRef}
        onClick={toggleWishlistSidebar}
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
          top: 0, left: 0, width: '100%', maxWidth: '450px', height: '100vh',
          backgroundColor: '#1A1714',
          borderRight: '1px solid rgba(200, 155, 90, 0.4)',
          zIndex: 1001,
          transform: 'translateX(-100%)',
          display: 'flex', flexDirection: 'column'
        }}
      >
        <div style={{ padding: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(200, 155, 90, 0.1)' }}>
          <h2 className="font-title text-gold" style={{ fontSize: '24px' }}>Seus Favoritos</h2>
          <button onClick={toggleWishlistSidebar} style={{ color: '#D4B896', background: 'none', border: 'none', cursor: 'pointer' }}><CloseIcon /></button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <p style={{ color: '#D4B896', marginBottom: '20px' }}>Você ainda não salvou nenhum produto.</p>
              <button onClick={toggleWishlistSidebar} style={{ color: '#C89B5A', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>Explorar a boutique</button>
            </div>
          ) : (
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '25px', padding: 0, margin: 0, listStyle: 'none' }}>
              {items.map((item) => (
                <li id={`wishlist-item-${item.id}`} key={item.id} style={{ display: 'flex', gap: '15px', position: 'relative', overflow: 'hidden' }}>
                  {item.image ? (
                    <img src={item.image} alt={item.name} style={{ width: '90px', height: '120px', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '90px', height: '120px', background: 'linear-gradient(135deg, #3D2B1F 0%, #C89B5A 100%)' }} />
                  )}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4 className="font-display" style={{ fontSize: '16px', marginBottom: '5px', paddingRight: '25px', color: '#F5F0E8' }}>{item.name}</h4>
                        <button 
                          onClick={() => handleRemove(item, `wishlist-item-${item.id}`)} 
                          style={{ color: '#9A7240', position: 'absolute', right: 0, top: 0, background: 'none', border: 'none', cursor: 'pointer' }}
                          title="Remover dos favoritos"
                        >
                          <TrashIcon />
                        </button>
                      </div>
                      <p style={{ fontSize: '12px', color: '#D4B896', marginBottom: '5px' }}>{item.category} | {item.type}</p>
                      <p className="text-gold" style={{ fontWeight: 500 }}>R$ {item.price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    
                    <button 
                      onClick={() => handleAddToCart(item, `wishlist-item-${item.id}`)}
                      style={{ 
                        display: 'flex', alignItems: 'center', gap: '8px', 
                        padding: '10px 15px', backgroundColor: 'rgba(200, 155, 90, 0.1)', 
                        border: '1px solid #C89B5A', color: '#C89B5A', cursor: 'pointer',
                        fontSize: '12px', letterSpacing: '1px', fontWeight: 600,
                        textTransform: 'uppercase', width: 'fit-content', transition: 'all 0.3s'
                      }}
                      className="hover-gold-button"
                    >
                      <CartIcon /> Adicionar à sacola
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default WishlistSidebar;
