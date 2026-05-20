import React, { useEffect, useState, useRef } from 'react';
import { productsData } from '../data/products';

const SearchIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>;
const HeartIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>;
const BagIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>;
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>;
const CrownIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 20h20M4 16l2-10 4 4 2-6 2 6 4-4 2 10H4z" fill="rgba(200, 155, 90, 0.2)" /></svg>;

const Header = ({ toggleCart, toggleWishlistSidebar, cartCount, wishlistCount, openProductModal, navigateTo, currentPage, user, handleLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  const handleSearchResultClick = (product) => {
    setSearchOpen(false);
    setSearchQuery('');
    if (openProductModal) {
      openProductModal(product);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter' && searchQuery.trim().length > 1) {
      setSearchOpen(false);
      if (navigateTo) {
        navigateTo('shop', { search: searchQuery });
      }
      setSearchQuery('');
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Search Logic
  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = productsData.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // GSAP for Search
  useEffect(() => {
    if (window.gsap) {
      if (searchOpen) {
        window.gsap.to(searchContainerRef.current, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power3.out' });
        setTimeout(() => searchInputRef.current?.focus(), 100);
      } else {
        window.gsap.to(searchContainerRef.current, { height: 0, opacity: 0, duration: 0.3, ease: 'power3.in' });
        setSearchQuery('');
      }
    }
  }, [searchOpen]);

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? <span key={i} style={{ color: '#C89B5A', fontWeight: 'bold' }}>{part}</span> : part
    );
  };

  const headerStyle = {
    position: 'fixed', top: 0, left: 0, width: '100%', padding: '20px 5%',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    transition: 'all 0.3s ease', zIndex: 1000,
    boxSizing: 'border-box',
    backgroundColor: scrolled || searchOpen ? 'rgba(26, 23, 20, 0.98)' : 'transparent',
    backdropFilter: scrolled || searchOpen ? 'blur(20px)' : 'none',
    borderBottom: scrolled || searchOpen ? '1px solid rgba(200, 155, 90, 0.1)' : 'none'
  };

  const handleLinkClick = (e, page, filters = null) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (navigateTo) {
      navigateTo(page, filters);
    }
  };

  return (
    <>
      <style>
        {`
          .nav-link::after {
            content: ''; position: absolute; bottom: -4px; left: 0; width: 100%; height: 1px;
            background-color: var(--color-gold-primary); transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease;
          }
          .nav-link:hover::after { transform: scaleX(1); }
          .nav-link:hover { color: var(--color-gold-primary); }
          .nav-link.active-link { color: var(--color-gold-primary); }
          .nav-link.active-link::after { transform: scaleX(1); }
          .header-icon { color: var(--color-white-soft); transition: color 0.3s; margin-left: 20px; position: relative; }
          .header-icon:hover { color: var(--color-gold-primary); }
          .mobile-menu { display: none; }
          
          @media (max-width: 1024px) { 
            .desktop-nav { display: none; } 
            .mobile-menu { display: block; } 
          }
          
          .search-result-item {
            display: flex; align-items: center; padding: 15px; border-bottom: 1px solid rgba(200,155,90,0.1);
            transition: background-color 0.2s; cursor: pointer;
          }
          .search-result-item:hover { background-color: rgba(200,155,90,0.05); }

          /* Mobile Nav Overlay Panel */
          .mobile-nav-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background-color: rgba(26, 23, 20, 0.98);
            backdrop-filter: blur(20px);
            z-index: 1001;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 25px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
          }
          .mobile-nav-overlay.open {
            opacity: 1;
            visibility: visible;
          }
          .mobile-nav-link {
            font-size: 20px;
            letter-spacing: 3px;
            text-transform: uppercase;
            color: var(--color-white-soft);
            transition: color 0.3s;
            position: relative;
            padding: 5px 0;
          }
          .mobile-nav-link:hover {
            color: var(--color-gold-primary);
          }
          .mobile-nav-link.active-link {
            color: var(--color-gold-primary);
          }
          .mobile-close-btn {
            position: absolute;
            top: 30px;
            right: 5%;
            color: var(--color-white-soft);
            background: none;
            border: none;
            font-size: 32px;
            line-height: 1;
            cursor: pointer;
            transition: color 0.3s;
          }
          .mobile-close-btn:hover {
            color: var(--color-gold-primary);
          }
        `}
      </style>

      <header style={headerStyle}>

        {/* Desktop Nav */}
        <nav className="desktop-nav">
          <a
            href="#inicio"
            className={`nav-link ${currentPage === 'home' ? 'active-link' : ''}`}
            onClick={(e) => handleLinkClick(e, 'home', { anchor: '#inicio' })}
            style={{ margin: '0 15px', position: 'relative', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}
          >
            Início
          </a>
          <a
            href="#colecoes"
            className="nav-link"
            onClick={(e) => handleLinkClick(e, 'home', { anchor: '#colecoes' })}
            style={{ margin: '0 15px', position: 'relative', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}
          >
            Coleções
          </a>
          <a
            href="#sobre"
            className="nav-link"
            onClick={(e) => handleLinkClick(e, 'home', { anchor: '#sobre' })}
            style={{ margin: '0 15px', position: 'relative', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}
          >
            Sobre
          </a>
          <a
            href="#loja"
            className={`nav-link ${currentPage === 'shop' ? 'active-link' : ''}`}
            onClick={(e) => handleLinkClick(e, 'shop')}
            style={{ margin: '0 15px', position: 'relative', fontSize: '12px', letterSpacing: '1.5px', textTransform: 'uppercase' }}
          >
            Loja
          </a>
        </nav>

        {/* Logo */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'auto',
          zIndex: 10,
          width: 'max-content'
        }}>
          <div className="text-gold" style={{ marginBottom: '-3px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CrownIcon />
          </div>
          <a
            href="#"
            className="font-accent text-gold"
            onClick={(e) => handleLinkClick(e, 'home', { anchor: '#inicio' })}
            style={{
              fontSize: '28px',
              letterSpacing: '2px',
              textAlign: 'center',
              display: 'block',
              margin: 0,
              padding: 0,
              lineHeight: 1
            }}
          >
            Glaucia
          </a>
        </div>

        {/* Right Nav & Icons */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center' }}>
            {user ? (
              <div style={{ position: 'relative', margin: '0 15px', display: 'inline-block' }}>
                <button 
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  style={{
                    background: 'rgba(200, 155, 90, 0.08)',
                    border: '1px solid rgba(200, 155, 90, 0.3)',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    fontSize: '11px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'var(--color-gold-primary)',
                    fontFamily: 'inherit',
                    padding: '8px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(200, 155, 90, 0.15)';
                    e.currentTarget.style.borderColor = 'var(--color-gold-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(200, 155, 90, 0.08)';
                    e.currentTarget.style.borderColor = 'rgba(200, 155, 90, 0.3)';
                  }}
                >
                  Olá, {user.name.split(' ')[0]} ▾
                </button>
                {userDropdownOpen && (
                  <div style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: '10px',
                    backgroundColor: '#1A1714', border: '1px solid rgba(200, 155, 90, 0.25)',
                    padding: '8px 0', minWidth: '130px', zIndex: 100,
                    boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                    borderRadius: '4px'
                  }}>
                    <button 
                      onClick={() => {
                        handleLogout();
                        setUserDropdownOpen(false);
                      }}
                      style={{
                        width: '100%', padding: '8px 16px', textAlign: 'left',
                        background: 'none', border: 'none', color: '#F5F0E8',
                        fontSize: '11px', letterSpacing: '1.5px', textTransform: 'uppercase',
                        cursor: 'pointer', transition: 'color 0.2s', fontFamily: 'inherit'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold-primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#F5F0E8'}
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '10px' }}>
                <button 
                  onClick={() => navigateTo('login')}
                  style={{
                    padding: '8px 18px',
                    fontSize: '11px',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    color: 'var(--color-white-soft)',
                    border: '1px solid rgba(245, 240, 232, 0.3)',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                    fontWeight: '500'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-white-soft)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(245, 240, 232, 0.3)';
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Entrar
                </button>
              </div>
            )}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
            <button className="header-icon" onClick={() => setSearchOpen(!searchOpen)}>
              <SearchIcon />
            </button>

            <button className="header-icon" onClick={toggleWishlistSidebar}>
              <HeartIcon />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'var(--color-gold-primary)', color: '#000',
                  fontSize: '10px', width: '16px', height: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                  borderRadius: '50%', fontWeight: 'bold'
                }}>
                  {wishlistCount}
                </span>
              )}
            </button>

            <button className="header-icon" onClick={toggleCart}>
              <BagIcon />
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'var(--color-gold-primary)', color: '#000',
                  fontSize: '10px', width: '16px', height: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center',
                  borderRadius: '50%', fontWeight: 'bold'
                }}>
                  {cartCount}
                </span>
              )}
            </button>

            <button className="header-icon mobile-menu" onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-down Navigation Panel */}
      <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="mobile-close-btn" onClick={() => setMobileMenuOpen(false)}>&times;</button>

        <div className="text-gold" style={{ marginBottom: '20px' }}>
          <CrownIcon />
        </div>

        <a
          href="#inicio"
          className={`mobile-nav-link ${currentPage === 'home' ? 'active-link' : ''}`}
          onClick={(e) => handleLinkClick(e, 'home', { anchor: '#inicio' })}
        >
          Início
        </a>
        <a
          href="#colecoes"
          className="mobile-nav-link"
          onClick={(e) => handleLinkClick(e, 'home', { anchor: '#colecoes' })}
        >
          Coleções
        </a>
        <a
          href="#sobre"
          className="mobile-nav-link"
          onClick={(e) => handleLinkClick(e, 'home', { anchor: '#sobre' })}
        >
          Sobre Nós
        </a>
        <a
          href="#loja"
          className={`mobile-nav-link ${currentPage === 'shop' ? 'active-link' : ''}`}
          onClick={(e) => handleLinkClick(e, 'shop')}
        >
          Loja Virtual
        </a>
        
        {user ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', marginTop: '20px', borderTop: '1px solid rgba(200, 155, 90, 0.15)', paddingTop: '20px', width: '80%' }}>
            <span style={{ fontSize: '14px', color: 'var(--color-gold-primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Olá, {user.name}
            </span>
            <button 
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              style={{
                background: 'none', border: 'none', color: '#D4B896',
                fontSize: '16px', letterSpacing: '2px', textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: 'inherit'
              }}
            >
              Sair
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px', borderTop: '1px solid rgba(200, 155, 90, 0.15)', paddingTop: '20px', width: '80%' }}>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                navigateTo('login');
              }}
              style={{
                width: '100%',
                padding: '12px 24px',
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--color-white-soft)',
                border: '1px solid rgba(245, 240, 232, 0.3)',
                borderRadius: '30px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                textAlign: 'center',
                background: 'transparent'
              }}
            >
              Entrar
            </button>
          </div>
        )}
      </div>

      {/* Search Overlay Dropdown */}
      <div
        ref={searchContainerRef}
        style={{
          position: 'fixed', top: '80px', left: 0, width: '100%', backgroundColor: '#1A1714',
          borderBottom: '1px solid rgba(200, 155, 90, 0.2)', zIndex: 999,
          height: 0, opacity: 0, overflow: 'hidden'
        }}
      >
        <div style={{ padding: '30px 5%', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="O que você está procurando? (Pressione Enter para ver tudo)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchKeyDown}
              style={{
                width: '100%', padding: '15px 0', fontSize: '24px', backgroundColor: 'transparent',
                border: 'none', borderBottom: '2px solid #C89B5A', color: '#F5F0E8', outline: 'none',
                fontFamily: 'var(--font-display)'
              }}
            />
            <button onClick={() => setSearchOpen(false)} style={{ position: 'absolute', right: 0, top: '15px', color: '#888' }}>Fechar</button>
          </div>

          <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            {searchResults.length > 0 ? (
              searchResults.map(product => (
                <div key={product.id} className="search-result-item" onClick={() => handleSearchResultClick(product)}>
                  {product.image ? (
                    <img src={product.image} alt={product.name} style={{ width: '60px', height: '80px', objectFit: 'cover', marginRight: '20px' }} />
                  ) : (
                    <div style={{ width: '60px', height: '80px', background: 'linear-gradient(135deg, #3D2B1F 0%, #C89B5A 100%)', marginRight: '20px' }} />
                  )}
                  <div>
                    <h4 className="font-display" style={{ fontSize: '18px', color: '#F5F0E8' }}>{highlightText(product.name, searchQuery)}</h4>
                    <p style={{ color: '#C89B5A', fontSize: '14px' }}>R$ {product.price.toFixed(2).replace('.', ',')}</p>
                    <span style={{ fontSize: '10px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>{product.category}</span>
                  </div>
                </div>
              ))
            ) : searchQuery.length > 1 ? (
              <p style={{ color: '#888', padding: '20px 0' }}>Nenhum produto encontrado para "{searchQuery}"</p>
            ) : (
              <p style={{ color: '#888', padding: '20px 0', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Digite pelo menos 2 caracteres...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
