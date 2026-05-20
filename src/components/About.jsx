import React, { useEffect, useRef } from 'react';

const About = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.fromTo(textRef.current, 
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );

      window.gsap.fromTo(visualRef.current, 
        { x: 100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          }
        }
      );
    }
  }, []);

  return (
    <section ref={containerRef} className="section-padding bg-black-premium" id="sobre">
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '50px' }}>
        
        {/* Lado Texto */}
        <div ref={textRef} style={{ flex: '1 1 500px' }}>
          <p className="text-gold" style={{ fontSize: '12px', letterSpacing: '4px', marginBottom: '20px' }}>
            ✦ NOSSA HISTÓRIA ✦
          </p>
          
          <h2 className="font-display" style={{ fontSize: '48px', fontStyle: 'italic', marginBottom: '30px', lineHeight: 1.2 }}>
            "Moda que honra sua fé, celebra sua beleza."
          </h2>

          <p style={{ color: '#D4B896', fontSize: '16px', lineHeight: 1.8, marginBottom: '20px', fontWeight: 300 }}>
            Há mais de 10 anos, a Glaucia Elegância e Estilo nasceu do sonho de mostrar que modéstia e sofisticação andam juntas. Cada peça é pensada para mulheres e homens que vivem sua fé com autenticidade e elegância.
          </p>

          <p style={{ color: '#D4B896', fontSize: '16px', lineHeight: 1.8, marginBottom: '40px', fontWeight: 300 }}>
            Acreditamos que vestir-se bem é um ato de respeito consigo mesmo, com os outros e com Deus.
          </p>

          <div style={{ display: 'flex', gap: '30px', borderTop: '1px solid rgba(200, 155, 90, 0.2)', paddingTop: '30px' }}>
            <div>
              <h4 className="font-title text-gold" style={{ fontSize: '24px' }}>+500</h4>
              <p style={{ fontSize: '12px', color: '#D4B896', textTransform: 'uppercase', letterSpacing: '1px' }}>Peças</p>
            </div>
            <div>
              <h4 className="font-title text-gold" style={{ fontSize: '24px' }}>+2.000</h4>
              <p style={{ fontSize: '12px', color: '#D4B896', textTransform: 'uppercase', letterSpacing: '1px' }}>Clientes</p>
            </div>
            <div>
              <h4 className="font-title text-gold" style={{ fontSize: '24px' }}>10</h4>
              <p style={{ fontSize: '12px', color: '#D4B896', textTransform: 'uppercase', letterSpacing: '1px' }}>Anos de História</p>
            </div>
          </div>
        </div>

        {/* Lado Visual */}
        <div ref={visualRef} style={{ flex: '1 1 500px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div style={{ 
            height: '300px', 
            backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1000")', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '4px', 
            transform: 'translateY(40px)' 
          }} />
          <div style={{ 
            height: '400px', 
            backgroundImage: 'url("https://images.unsplash.com/photo-1582050041567-9cfec35abfc4?auto=format&fit=crop&q=80&w=1000")', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '4px' 
          }} />
        </div>

      </div>
    </section>
  );
};

export default About;
