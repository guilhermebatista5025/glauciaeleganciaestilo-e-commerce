import React, { useEffect, useRef } from 'react';

const Collections = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      const cards = document.querySelectorAll('.typ-card');
      
      window.gsap.fromTo(cards, 
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
          }
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} id="colecoes" style={{ backgroundColor: '#1A1714' }}>
      <style>
        {`
          .typ-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            width: 100%;
          }
          .typ-grid-full {
            grid-column: span 2;
          }
          @media (max-width: 768px) {
            .typ-grid { grid-template-columns: 1fr; }
            .typ-grid-full { grid-column: span 1; }
          }
          .typ-card {
            position: relative;
            height: 80vh;
            min-height: 500px;
            overflow: hidden;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .typ-card-bg {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-size: cover;
            background-position: center;
            transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
            z-index: 0;
          }
          .typ-overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background-color: rgba(0,0,0,0.3);
            transition: background-color 0.5s ease;
            z-index: 1;
          }
          .typ-card:hover .typ-card-bg {
            transform: scale(1.05);
          }
          .typ-card:hover .typ-overlay {
            background-color: rgba(0,0,0,0.5);
          }
          .typ-content {
            position: relative;
            z-index: 2;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .typ-title {
            font-size: clamp(32px, 5vw, 64px);
            color: #F5F0E8;
            margin-bottom: 20px;
            letter-spacing: 4px;
            text-transform: uppercase;
          }
          .typ-link {
            color: #F5F0E8;
            font-size: 13px;
            letter-spacing: 2px;
            text-transform: uppercase;
            text-decoration: none;
            position: relative;
            padding-bottom: 5px;
            opacity: 0.9;
            transition: opacity 0.3s ease;
          }
          .typ-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 1px;
            background-color: #C89B5A;
            transform: scaleX(0);
            transform-origin: center;
            transition: transform 0.4s ease;
          }
          .typ-card:hover .typ-link::after {
            transform: scaleX(1);
          }
        `}
      </style>

      <div className="typ-grid">
        
        {/* Feminino */}
        <div className="typ-card">
          <div className="typ-card-bg" style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=1000")'
          }} />
          <div className="typ-overlay" />
          <div className="typ-content font-display">
            <h3 className="typ-title">Feminino</h3>
            <span className="typ-link font-body text-gold">Shop Now</span>
          </div>
        </div>

        {/* Masculino */}
        <div className="typ-card">
          <div className="typ-card-bg" style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=1000")'
          }} />
          <div className="typ-overlay" />
          <div className="typ-content font-display">
            <h3 className="typ-title">Masculino</h3>
            <span className="typ-link font-body text-gold">Shop Now</span>
          </div>
        </div>

        {/* Lançamentos - Full Width */}
        <div className="typ-card typ-grid-full" style={{ height: '70vh' }}>
          <div className="typ-card-bg" style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000")',
            backgroundPosition: 'center 30%'
          }} />
          <div className="typ-overlay" style={{ backgroundColor: 'rgba(0,0,0,0.4)' }} />
          <div className="typ-content font-display">
            <h3 className="typ-title text-gold" style={{ color: '#C89B5A' }}>Lançamentos</h3>
            <span className="typ-link font-body">Ver Todos</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Collections;
