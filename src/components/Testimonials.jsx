import React, { useEffect, useRef } from 'react';

const testimonialsData = [
  {
    initial: "J",
    author: "Juliana Mendes",
    text: "Simplesmente apaixonada pelas peças! O caimento da alfaiataria premium é impecável e o tecido tem um toque maravilhoso. Glaucia Boutique agora é minha loja favorita.",
    avatarBg: "linear-gradient(135deg, #C89B5A, #8A6432)"
  },
  {
    initial: "B",
    author: "Beatriz Santos",
    text: "Atendimento consultivo incrível no WhatsApp! Me ajudaram a escolher o look perfeito para um evento corporativo. Roupas extremamente elegantes e com muita modéstia.",
    avatarBg: "linear-gradient(135deg, #109d58, #056633)"
  },
  {
    initial: "M",
    author: "Mariana Azevedo",
    text: "As roupas são ainda mais lindas pessoalmente! Dá para sentir o cuidado e o alto padrão em cada costura. Entrega rápida e embalagem super perfumada.",
    avatarBg: "linear-gradient(135deg, #4285F4, #0b4ab3)"
  },
  {
    initial: "D",
    author: "Débora Alencar",
    text: "Finalmente encontrei uma marca que une streetwear premium com elegância. Os conjuntos são modernos, confortáveis e super exclusivos!",
    avatarBg: "linear-gradient(135deg, #d23f57, #9a2036)"
  },
  {
    initial: "C",
    author: "Carolina Rezende",
    text: "Experiência de compra impecável! A curadoria de moda feminina deles é de outro nível. Peças atemporais de altíssima qualidade que valem cada centavo.",
    avatarBg: "linear-gradient(135deg, #fbbc04, #d19a00)"
  }
];

const Testimonials = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.fromTo('.mid-banner-content', 
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );

      window.gsap.fromTo('.floating-wrapper', 
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.15,
          duration: 1.2,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          }
        }
      );
    }
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="mid-banner-section" 
      style={{ 
        position: 'relative', 
        backgroundColor: '#1A1714',
        padding: '80px 20px',
        overflow: 'hidden'
      }}
    >
      {/* Noise Texture Background */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E")',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      {/* Cinematic Ambient Glow */}
      <div className="testimonials-ambient-glow" />

      {/* Main Container Banner */}
      <div className="mid-banner">
        {/* Background Image of Luxury Boutique */}
        <div className="mid-banner-img" />
        <div className="mid-banner-gradient" />

        <div className="mid-banner-inner">
          
          {/* Left Side Content */}
          <div className="mid-banner-content">
            <span className="brand-badge">Experiência Real</span>
            <h2 className="font-title text-gold">O QUE DIZEM NOSSAS CLIENTES</h2>
            
            <div className="google-rating-badge">
              <span className="stars">★★★★★</span>
              <span className="highlight">Padrão 5 Estrelas</span>
            </div>

            <p className="testimonials-lead">
              A curadoria e o alto padrão da <strong>Glaucia Boutique</strong> se refletem na satisfação de quem veste nossa marca. Confira os relatos de quem vivenciou nossa experiência de alta costura e atendimento exclusivo.
            </p>

            <a 
              href="https://www.google.com/search?q=Glaucia+Boutique" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-google-massive"
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Ler todas as avaliações
            </a>
          </div>

          {/* Right Side: Cascading 3D Floating Review Cards */}
          <div className="floating-reviews-container">
            {testimonialsData.map((item, index) => (
              <div key={index} className={`floating-wrapper r-${index + 1}`}>
                <article className="floating-review">
                  <div className="review-header">
                    <div className="review-author-info">
                      <div className="review-avatar" style={{ background: item.avatarBg }}>
                        {item.initial}
                      </div>
                      <div>
                        <span className="review-name">{item.author}</span>
                        <span className="review-date">Cliente Verificada</span>
                      </div>
                    </div>
                    
                    {/* Google Mini Icon */}
                    <svg className="google-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.16v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.16C1.43 8.55 1 10.22 1 12s.43 3.45 1.16 4.93l3.68-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.16 7.07l3.68 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </div>
                  
                  <div className="review-stars">★★★★★</div>
                  <p className="review-text">"{item.text}"</p>
                </article>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Embedded CSS Styles for Ultra-Premium Aesthetics and Cascading Float */}
      <style>
        {`
          .mid-banner-section {
            position: relative;
            z-index: 1;
          }

          .testimonials-ambient-glow {
            position: absolute;
            top: 20%;
            left: -10%;
            width: 50vw;
            height: 60vh;
            background: radial-gradient(circle at center, rgba(200, 155, 90, 0.1) 0%, rgba(200, 155, 90, 0.02) 50%, transparent 80%);
            pointer-events: none;
            z-index: 0;
            mix-blend-mode: screen;
          }

          .mid-banner {
            position: relative;
            max-width: 1200px;
            margin: 0 auto;
            height: 680px;
            border-radius: 16px;
            overflow: hidden;
            background: #110F0D;
            display: flex;
            align-items: center;
            border: 1px solid rgba(200, 155, 90, 0.15);
            box-shadow: 0 30px 60px rgba(0,0,0,0.6);
            z-index: 1;
          }

          .mid-banner-img {
            position: absolute;
            inset: 0;
            background: url('https://images.pexels.com/photos/3735641/pexels-photo-3735641.jpeg?auto=compress&cs=tinysrgb&w=1200') center/cover no-repeat;
            opacity: 0.15;
            transition: opacity 0.8s ease;
          }

          .mid-banner:hover .mid-banner-img {
            opacity: 0.22;
          }

          .mid-banner-gradient {
            position: absolute;
            inset: 0;
            background: linear-gradient(to right, #110F0D 0%, rgba(17, 15, 13, 0.8) 45%, rgba(17, 15, 13, 0.3) 100%),
                        linear-gradient(to top, #110F0D 0%, transparent 30%);
            pointer-events: none;
          }

          .mid-banner-inner {
            position: relative;
            z-index: 2;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 60px;
            gap: 40px;
          }

          .mid-banner-content {
            max-width: 480px;
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }

          .brand-badge {
            background: rgba(200, 155, 90, 0.15);
            color: #C89B5A;
            border: 1px solid rgba(200, 155, 90, 0.3);
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            padding: 6px 16px;
            border-radius: 4px;
            margin-bottom: 20px;
          }

          .mid-banner-content h2 {
            font-size: clamp(32px, 4vw, 44px);
            line-height: 1.1;
            margin-bottom: 12px;
            text-shadow: 0 4px 10px rgba(0, 0, 0, 0.8);
            font-weight: 700;
            letter-spacing: 1px;
          }

          .google-rating-badge {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 24px;
            font-size: 16px;
            font-weight: 600;
            text-shadow: 0 2px 5px rgba(0, 0, 0, 0.8);
          }

          .google-rating-badge .stars {
            color: #FBBC04;
            letter-spacing: 2px;
            font-size: 18px;
          }

          .google-rating-badge .highlight {
            color: #F5F0E8;
            letter-spacing: 1px;
          }

          .testimonials-lead {
            font-size: 15px;
            color: #F5F0E8;
            opacity: 0.85;
            line-height: 1.7;
            margin-bottom: 35px;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
          }

          .btn-google-massive {
            background: #FFFFFF;
            color: #1A1714;
            padding: 18px 32px;
            border-radius: 6px;
            font-weight: 700;
            font-size: 14px;
            display: inline-flex;
            align-items: center;
            gap: 14px;
            text-decoration: none;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            box-shadow: 0 10px 30px rgba(0,0,0,0.4), 0 0 1px rgba(251,188,4,0.1);
            text-transform: uppercase;
            letter-spacing: 1.5px;
          }

          .btn-google-massive svg {
            width: 20px;
            height: 20px;
          }

          .btn-google-massive:hover {
            transform: translateY(-4px);
            background: #F5F0E8;
            box-shadow: 0 15px 35px rgba(0,0,0,0.6), 0 0 20px rgba(200, 155, 90, 0.3);
          }

          .btn-google-massive:active {
            transform: translateY(-1px);
          }

          /* Floating Cascade Layout for 5 Cards */
          .floating-reviews-container {
            position: relative;
            width: 520px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            pointer-events: none;
          }

          .floating-wrapper {
            position: absolute;
            pointer-events: auto;
            transition: z-index 0.3s;
            will-change: transform;
          }

          .floating-wrapper:hover {
            z-index: 50 !important;
          }

          /* Waterfall Positions */
          .floating-wrapper.r-1 {
            top: 6%;
            left: 2%;
            z-index: 3;
            animation: floatCard1 7s ease-in-out infinite;
          }

          .floating-wrapper.r-2 {
            top: 20%;
            right: 0%;
            z-index: 4;
            animation: floatCard2 8s ease-in-out infinite;
          }

          .floating-wrapper.r-3 {
            top: 42%;
            left: 4%;
            z-index: 5;
            animation: floatCard3 6s ease-in-out infinite;
          }

          .floating-wrapper.r-4 {
            top: 60%;
            right: 2%;
            z-index: 6;
            animation: floatCard4 9s ease-in-out infinite;
          }

          .floating-wrapper.r-5 {
            top: 76%;
            left: 12%;
            z-index: 7;
            animation: floatCard5 7.5s ease-in-out infinite;
          }

          /* Floating Keyframes */
          @keyframes floatCard1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(0.5deg); }
          }
          @keyframes floatCard2 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(-0.5deg); }
          }
          @keyframes floatCard3 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-6px) rotate(0.8deg); }
          }
          @keyframes floatCard4 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(-0.6deg); }
          }
          @keyframes floatCard5 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-7px) rotate(0.3deg); }
          }

          .floating-review {
            width: 330px;
            background: rgba(26, 23, 20, 0.7);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(200, 155, 90, 0.15);
            border-radius: 12px;
            padding: 18px 22px;
            display: flex;
            flex-direction: column;
            gap: 12px;
            cursor: pointer;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.01);
            transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                        border-color 0.4s ease, 
                        box-shadow 0.4s ease;
          }

          .floating-review:hover {
            transform: scale(1.06) translateY(-2px);
            border-color: rgba(200, 155, 90, 0.5);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.75), 0 0 20px rgba(200, 155, 90, 0.2);
          }

          .review-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }

          .review-author-info {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .review-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            color: #FFFFFF;
            font-size: 15px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
          }

          .review-name {
            font-size: 13.5px;
            font-weight: 600;
            color: #FFFFFF;
            display: block;
          }

          .review-date {
            font-size: 11px;
            color: #C89B5A;
            font-weight: 500;
          }

          .google-icon {
            width: 18px;
            height: 18px;
          }

          .review-stars {
            color: #FBBC04;
            font-size: 14px;
            letter-spacing: 1.5px;
            margin-top: -3px;
          }

          .review-text {
            font-size: 12.5px;
            color: #F5F0E8;
            opacity: 0.9;
            line-height: 1.5;
            font-style: italic;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          /* Responsviness and Stacking */
          @media (max-width: 992px) {
            .mid-banner {
              height: auto;
            }

            .mid-banner-inner {
              flex-direction: column;
              padding: 60px 20px 40px;
              align-items: flex-start;
              gap: 40px;
            }

            .mid-banner-content {
              max-width: 100%;
              padding: 0;
            }

            .btn-google-massive {
              width: 100%;
              justify-content: center;
            }

            .floating-reviews-container {
              width: 100%;
              height: auto;
              display: flex;
              flex-direction: row;
              overflow-x: auto;
              gap: 20px;
              padding: 10px 5px 30px;
              scroll-snap-type: x mandatory;
              pointer-events: auto;
              justify-content: flex-start;
              -webkit-overflow-scrolling: touch;
            }

            .floating-reviews-container::-webkit-scrollbar {
              display: none;
            }

            .floating-wrapper {
              width: auto;
              position: relative;
              top: auto !important;
              left: auto !important;
              right: auto !important;
              flex: 0 0 290px;
              scroll-snap-align: center;
              animation: none !important;
            }

            .floating-review {
              width: 100%;
              background: rgba(26, 23, 20, 0.95);
              backdrop-filter: none;
              -webkit-backdrop-filter: none;
            }
          }
        `}
      </style>

    </section>
  );
};

export default Testimonials;
