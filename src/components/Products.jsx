import React, { useState, useEffect, useRef } from 'react';
import { productsData } from '../data/products';

const filters = ['TODOS', 'FEMININO', 'MASCULINO', 'VESTIDOS', 'SAIAS', 'CONJUNTOS', 'CAMISAS', 'BLAZERS', 'NOVIDADES'];

const HeartIcon = ({ filled }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? "#C89B5A" : "none"} stroke="#C89B5A" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);

const Products = ({ openModal, toggleWishlist, wishlist, navigateTo }) => {
  const [activeFilter, setActiveFilter] = useState('TODOS');
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const gridRef = useRef(null);

  useEffect(() => {
    setFilteredProducts(productsData);
  }, []);

  useEffect(() => {
    let result = productsData;
    if (activeFilter === 'NOVIDADES') {
      result = productsData.filter(p => p.isNew);
    } else if (activeFilter !== 'TODOS') {
      result = productsData.filter(p => p.category === activeFilter || p.type === activeFilter);
    }
    
    // GSAP Animation for filtering
    if (window.gsap && gridRef.current) {
      const cards = gridRef.current.children;
      
      window.gsap.to(cards, {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        stagger: 0.05,
        onComplete: () => {
          setFilteredProducts(result);
          
          setTimeout(() => {
            const newCards = gridRef.current.children;
            window.gsap.fromTo(newCards, 
              { opacity: 0, scale: 0.9, y: 20 },
              { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out' }
            );
          }, 50);
        }
      });
    } else {
      setFilteredProducts(result);
    }
  }, [activeFilter]);

  const handleFilterClick = (filter) => {
    if (activeFilter !== filter) setActiveFilter(filter);
  };

  return (
    <section className="section-padding" style={{ backgroundColor: '#2E2926' }}>
      <style>
        {`
          .filter-btn {
            color: #D4B896;
            font-size: 11px;
            letter-spacing: 2px;
            text-transform: uppercase;
            padding: 8px 16px;
            border: 1px solid transparent;
            font-family: 'Raleway', sans-serif;
            font-weight: 500;
            transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), color 0.3s, border-color 0.3s;
          }
          .filter-btn.active {
            color: #C89B5A;
            border-color: #C89B5A;
            font-weight: 700;
          }
          .filter-btn:hover {
            color: #C89B5A;
          }
          .filter-btn:active {
            transform: scale(0.96);
          }
          .filter-container {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 50px;
          }
          .product-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 24px;
          }
          @media (max-width: 1024px) {
            .product-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (max-width: 640px) {
            .product-grid { grid-template-columns: 1fr; }
          }
          .product-card {
            cursor: pointer;
            transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            background-color: transparent;
            padding: 10px;
            border: 1px solid transparent;
          }
          .product-card:hover {
            border-color: rgba(200, 155, 90, 0.1);
            background-color: rgba(255, 255, 255, 0.01);
          }
          .product-card:active {
            transform: scale(0.98);
          }
          .product-img-container {
            position: relative;
            aspect-ratio: 1/1;
            background-color: #1A1714;
            margin-bottom: 20px;
            overflow: hidden;
          }
          .product-img-container img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.6s ease;
          }
          .product-card:hover .product-img-container img {
            transform: scale(1.06);
          }
          .product-wishlist {
            position: absolute;
            top: 15px;
            right: 15px;
            color: #fff;
            opacity: 1;
            transition: all 0.3s;
            z-index: 2;
            background-color: rgba(26,23,20,0.6);
            backdrop-filter: blur(4px);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
          }
          .product-wishlist:hover {
            background-color: rgba(26,23,20,0.85);
            transform: scale(1.1);
          }
          .product-add-btn {
            position: absolute;
            bottom: 15px;
            left: 50%;
            transform: translate(-50%, 100%);
            width: auto;
            padding: 10px 24px;
            background-color: #FFFFFF;
            color: #000000;
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 1.5px;
            text-transform: uppercase;
            text-align: center;
            border-radius: 100px;
            border: none;
            transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            opacity: 0;
            white-space: nowrap;
            z-index: 3;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
          }
          .product-card:hover .product-add-btn {
            transform: translate(-50%, 0);
            opacity: 1;
          }
          .product-card:hover .product-add-btn:hover {
            background-color: #C89B5A;
            color: #000000;
            transform: translate(-50%, -2px);
          }
        `}
      </style>

      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 className="font-title text-gold" style={{ fontSize: '40px', marginBottom: '20px' }}>Peças Mais Amadas</h2>
      </div>

      <div className="filter-container">
        {filters.map(filter => (
          <button 
            key={filter}
            className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
            onClick={() => handleFilterClick(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="product-grid" ref={gridRef}>
        {filteredProducts.map(product => {
          const isWished = wishlist && wishlist.some(w => w.id === product.id);
          
          return (
            <div key={product.id} className="product-card" onClick={() => openModal(product)}>
              
              <div className="product-img-container">
                <img src={product.image} alt={product.name} />
                {product.isNew && (
                  <div style={{
                    position: 'absolute',
                    top: '15px',
                    left: '15px',
                    backgroundColor: '#C89B5A',
                    color: '#000000',
                    padding: '4px 8px',
                    fontSize: '9px',
                    letterSpacing: '1px',
                    fontWeight: 'bold',
                    zIndex: 2
                  }}>
                    NOVO
                  </div>
                )}
                
                <button 
                  className="product-wishlist"
                  style={{
                    transform: isWished ? 'scale(1.1)' : 'scale(1)'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                    if(window.gsap) {
                      window.gsap.fromTo(e.currentTarget, { scale: 0.8 }, { scale: 1.2, duration: 0.2, yoyo: true, repeat: 1 });
                    }
                  }}
                >
                  <HeartIcon filled={isWished} />
                </button>

                <button 
                  className="product-add-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(product);
                  }}
                >
                  Ver Detalhes
                </button>
              </div>

              <div style={{ textAlign: 'center', padding: '0 5px' }}>
                <p style={{ fontSize: '10px', color: '#D4B896', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
                  {product.type === 'VESTIDOS' ? 'Vestido Longo' : product.category}
                </p>
                <h3 style={{ fontSize: '16px', marginBottom: '8px', color: '#F5F0E8', fontFamily: "'Inter', sans-serif", fontWeight: 500, letterSpacing: '-0.3px', lineHeight: '1.4' }}>
                  {product.name}
                </h3>
                <p className="text-gold" style={{ fontSize: '15px', fontWeight: '700', fontFamily: "'Inter', sans-serif" }}>
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
              </div>

            </div>
          );
        })}
      </div>
      
      {/* Centered Golden CTA button to the full shop */}
      {navigateTo && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <button 
            onClick={() => navigateTo('shop')}
            style={{
              padding: '16px 36px',
              backgroundColor: 'transparent',
              color: 'var(--color-gold-primary)',
              border: '2px solid var(--color-gold-primary)',
              fontSize: '12px',
              fontWeight: '700',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              borderRadius: '0px',
              boxShadow: '0 4px 20px rgba(200, 155, 90, 0.05)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--color-gold-primary)';
              e.currentTarget.style.color = '#1A1714';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(200, 155, 90, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--color-gold-primary)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(200, 155, 90, 0.05)';
            }}
          >
            Ver Coleção Completa →
          </button>
        </div>
      )}

    </section>
  );
};

export default Products;
