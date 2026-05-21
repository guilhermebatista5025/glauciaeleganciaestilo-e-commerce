import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Garantir autoplay e mute programáticos para navegadores rígidos (Safari/Chrome/Mobile)
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(error => {
        console.log("Autoplay do vídeo foi evitado pelo navegador:", error);
      });
    }
  }, []);

  useEffect(() => {
    // GSAP Animations for Content
    if (window.gsap) {
      const tl = window.gsap.timeline({ delay: 3 }); // wait for loading screen

      tl.to('.hero-line-1', { width: '60px', opacity: 1, duration: 1, ease: 'power2.out' })
        .fromTo('.hero-badge', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.5");

      const titleWords = document.querySelectorAll('.hero-title-word');
      tl.fromTo(titleWords,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        "-=0.2"
      );

      tl.to('.hero-line-2', { width: '60px', opacity: 1, duration: 1, ease: 'power2.out' }, "-=0.5")
        .fromTo('.hero-desc', { opacity: 0 }, { opacity: 1, duration: 1 }, "-=0.2")
        .fromTo('.hero-btn', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.2 }, "-=0.5")
        .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 1 }, "+=0.5");

      // Parallax removido a pedido do usuário
    }
  }, []);

  return (
    <section
      ref={containerRef}
      id="inicio"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#1A1714'
      }}
    >
      {/* HTML5 Native Video Background (100% Controle Local e Zero UI) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          minWidth: '100%',
          minHeight: '100%',
          width: 'auto',
          height: 'auto',
          transform: 'translate(-50%, -50%)',
          zIndex: 0,
          opacity: 0.4,
          objectFit: 'cover'
        }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>

      {/* Overlay Escuro / Gradiente (Estilo TYP) */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(26,23,20,0.1) 0%, rgba(26,23,20,0.8) 100%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          textAlign: 'center',
          padding: '0 20px'
        }}
      >
        <div className="hero-line-1" style={{ width: 0, height: '1px', backgroundColor: '#C89B5A', opacity: 0, marginBottom: '20px' }} />

        <p className="hero-badge text-gold" style={{ fontSize: '11px', letterSpacing: '4px', marginBottom: '20px', textTransform: 'uppercase' }}>
          Trazendo Exclusividade
        </p>

        <h1 className="font-title" style={{ fontSize: 'clamp(40px, 8vw, 100px)', lineHeight: 1, marginBottom: '20px', maxWidth: '1000px', textShadow: '0 10px 30px rgba(0,0,0,0.5)', textTransform: 'uppercase' }}>
          <span className="hero-title-word" style={{ display: 'inline-block', marginRight: '15px' }}>Glaucia</span>
          <span className="hero-title-word" style={{ display: 'inline-block' }}>Boutique</span>
        </h1>

        <div className="hero-line-2" style={{ width: 0, height: '1px', backgroundColor: '#C89B5A', opacity: 0, marginBottom: '30px' }} />

        <p className="hero-desc" style={{ color: '#F5F0E8', fontSize: '14px', letterSpacing: '2px', fontWeight: 300, maxWidth: '600px', lineHeight: 1.6, marginBottom: '40px', textShadow: '0 2px 4px rgba(0,0,0,0.8)', textTransform: 'uppercase' }}>
          Curadoria Exclusiva • Streetwear Premium • Alto Padrão
        </p>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            className="hero-btn"
            style={{
              backgroundColor: '#C89B5A',
              color: '#000',
              padding: '16px 40px',
              fontSize: '12px',
              letterSpacing: '2px',
              fontWeight: 500,
              textTransform: 'uppercase',
              transition: 'background-color 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#E8C97A'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#C89B5A'}
          >
            Explorar Coleção
          </button>

          <button
            className="hero-btn"
            style={{
              backgroundColor: 'transparent',
              color: '#C89B5A',
              border: '1px solid #C89B5A',
              padding: '16px 40px',
              fontSize: '12px',
              letterSpacing: '2px',
              fontWeight: 500,
              textTransform: 'uppercase',
              transition: 'all 0.3s',
              backdropFilter: 'blur(4px)',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => { e.target.style.backgroundColor = 'rgba(200, 155, 90, 0.1)'; e.target.style.color = '#E8C97A'; }}
            onMouseOut={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#C89B5A'; }}
          >
            Ver Lançamentos
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="hero-scroll"
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 2,
          opacity: 0
        }}
      >
        <span style={{ fontSize: '10px', letterSpacing: '3px', color: '#F5F0E8', marginBottom: '10px', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>SCROLL</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#F5F0E8"
          strokeWidth="2"
          style={{
            animation: 'bounce 2s infinite'
          }}
        >
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </div>

      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `}
      </style>
    </section>
  );
};

export default Hero;
