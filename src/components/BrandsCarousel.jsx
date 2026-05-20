import React, { useEffect, useRef } from 'react';

const CrownIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C89B5A" strokeWidth="1.5">
    <path d="M2 20h20M4 16l2-10 4 4 2-6 2 6 4-4 2 10H4z"/>
  </svg>
);

const MonogramV = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C89B5A" strokeWidth="1.5">
    <path d="M5 3l7 18 7-18" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 3l3 8 3-8" strokeLinecap="round" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);

const FleurDeLis = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C89B5A" strokeWidth="1.5">
    <path d="M12 2C12 2 9 6 9 10C9 14 12 17 12 22C12 17 15 14 15 10C15 6 12 2 12 2Z"/>
    <path d="M3 14C7 14 9 12 12 10C9 8 7 6 3 6C5 9 5 11 3 14Z" opacity="0.7"/>
    <path d="M21 14C17 14 15 12 12 10C15 8 17 6 21 6C19 9 19 11 21 14Z" opacity="0.7"/>
    <path d="M6 16H18" strokeLinecap="round"/>
  </svg>
);

const FlowerIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C89B5A" strokeWidth="1.5">
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 5c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3Z"/>
    <path d="M12 13c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3Z"/>
    <path d="M5 12c0-1.5 1.5-3 3-3s3 1.5 3 3-1.5 3-3 3-3-1.5-3-3Z"/>
    <path d="M13 12c0-1.5 1.5-3 3-3s3 1.5 3 3-1.5 3-3 3-3-1.5-3-3Z"/>
  </svg>
);

const CrestIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C89B5A" strokeWidth="1.5">
    <path d="M12 22C12 22 20 18 20 10V5L12 2L4 5V10C4 18 12 22 12 22Z"/>
    <path d="M12 6V18" opacity="0.5"/>
    <path d="M8 10h8" opacity="0.5"/>
  </svg>
);

const SparkleIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C89B5A" strokeWidth="1.5">
    <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" strokeLinejoin="round"/>
  </svg>
);

const brands = [
  { name: "Ateliê D'Or", icon: <CrownIcon /> },
  { name: "Virtue Couture", icon: <MonogramV /> },
  { name: "L'Élégance Modeste", icon: <FleurDeLis /> },
  { name: "Bella Modéstia", icon: <FlowerIcon /> },
  { name: "Sofistiqué Haute", icon: <CrestIcon /> },
  { name: "Pure Grace", icon: <SparkleIcon /> }
];

const BrandsCarousel = () => {
  const trackRef = useRef(null);

  useEffect(() => {
    let ctx;
    if (window.gsap && trackRef.current) {
      ctx = window.gsap.context(() => {
        const track = trackRef.current;
        
        // Infinite marquee animation using GSAP
        window.gsap.to(track, {
          x: "-50%",
          duration: 20,
          ease: "none",
          repeat: -1,
          overwrite: "auto"
        });
      });
    }
    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <>
      <style>
        {`
          .brands-section {
            background: linear-gradient(to bottom, #1A1714, #2E2926);
            padding: 80px 0;
            border-top: 1px solid rgba(200, 155, 90, 0.1);
            border-bottom: 1px solid rgba(200, 155, 90, 0.1);
            overflow: hidden;
            position: relative;
          }

          .brands-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 5%;
            text-align: center;
            margin-bottom: 35px;
          }

          .brands-title {
            font-size: 11px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: var(--color-gold-primary);
            margin-bottom: 10px;
            font-weight: 600;
          }

          .brands-subtitle {
            font-size: 18px;
            font-family: var(--font-display);
            color: var(--color-white-soft);
            font-weight: 300;
          }

          .marquee-wrapper {
            position: relative;
            width: 100%;
            overflow: hidden;
            display: flex;
            padding: 20px 0;
          }

          /* Fade gradients on side of marquee */
          .marquee-wrapper::before,
          .marquee-wrapper::after {
            content: '';
            position: absolute;
            top: 0;
            width: 15%;
            height: 100%;
            z-index: 2;
            pointer-events: none;
          }

          .marquee-wrapper::before {
            left: 0;
            background: linear-gradient(to right, #1A1714, transparent);
          }

          .marquee-wrapper::after {
            right: 0;
            background: linear-gradient(to left, #2E2926, transparent);
          }

          .marquee-track {
            display: flex;
            width: max-content;
            gap: 30px;
            will-change: transform;
            /* Fallback animation if GSAP isn't loaded */
            animation: cssMarquee 25s linear infinite;
          }

          /* Stop fallback CSS animation if GSAP is running */
          .gsap-active .marquee-track {
            animation: none;
          }

          .brand-card {
            display: flex;
            align-items: center;
            gap: 15px;
            background-color: rgba(26, 23, 20, 0.6);
            border: 1px solid rgba(200, 155, 90, 0.12);
            border-radius: 6px;
            padding: 20px 35px;
            transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
            user-select: none;
            width: 280px;
            justify-content: center;
            backdrop-filter: blur(5px);
          }

          .brand-card:hover {
            transform: translateY(-5px) scale(1.03);
            border-color: var(--color-gold-primary);
            box-shadow: 0 10px 25px rgba(200, 155, 90, 0.08);
            background-color: rgba(200, 155, 90, 0.03);
          }

          .brand-icon-wrapper {
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.4s ease;
          }

          .brand-card:hover .brand-icon-wrapper {
            transform: rotate(10deg) scale(1.1);
          }

          .brand-name {
            font-family: var(--font-display);
            font-size: 16px;
            letter-spacing: 1.5px;
            color: var(--color-white-soft);
            font-weight: 400;
          }

          @keyframes cssMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

      <section className={`brands-section ${window.gsap ? 'gsap-active' : ''}`}>
        
        <div className="brands-container">
          <p className="brands-title">✦ MARCAS PARCEIRAS ✦</p>
          <h2 className="brands-subtitle">Grifes de Prestígio em Alta Costura Modesta</h2>
        </div>

        <div className="marquee-wrapper">
          <div className="marquee-track" ref={trackRef}>
            
            {/* First Set of Items */}
            {brands.map((brand, i) => (
              <div key={`brand-1-${i}`} className="brand-card">
                <div className="brand-icon-wrapper">
                  {brand.icon}
                </div>
                <span className="brand-name">{brand.name}</span>
              </div>
            ))}

            {/* Duplicated Set of Items for Seamless Loop */}
            {brands.map((brand, i) => (
              <div key={`brand-2-${i}`} className="brand-card">
                <div className="brand-icon-wrapper">
                  {brand.icon}
                </div>
                <span className="brand-name">{brand.name}</span>
              </div>
            ))}

          </div>
        </div>

      </section>
    </>
  );
};

export default BrandsCarousel;
