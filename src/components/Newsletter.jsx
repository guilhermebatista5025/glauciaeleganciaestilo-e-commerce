import React from 'react';

const Newsletter = () => {
  return (
    <section className="section-padding" style={{ 
      background: 'linear-gradient(to bottom, #1A1714, #2E2926)',
      textAlign: 'center',
      borderTop: '1px solid rgba(200, 155, 90, 0.1)'
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p className="text-gold" style={{ fontSize: '12px', letterSpacing: '4px', marginBottom: '20px' }}>
          ✦ FAÇA PARTE DA NOSSA COMUNIDADE ✦
        </p>

        <p style={{ color: '#F5F0E8', fontSize: '20px', lineHeight: 1.6, fontWeight: 300, marginBottom: '40px' }}>
          Receba em primeira mão os lançamentos, ofertas exclusivas e conteúdo sobre moda evangélica.
        </p>

        <form style={{ display: 'flex', gap: '10px', marginBottom: '30px' }} onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Seu melhor e-mail" 
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: '1px solid #C89B5A',
              color: '#F5F0E8',
              padding: '16px 20px',
              fontSize: '14px',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />
          <button 
            type="submit"
            style={{
              backgroundColor: '#C89B5A',
              color: '#000',
              padding: '0 30px',
              fontSize: '12px',
              fontWeight: 500,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#E8C97A'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#C89B5A'}
          >
            Quero Receber
          </button>
        </form>

        <p style={{ color: '#D4B896', fontSize: '14px', fontWeight: 300 }}>
          Mais de 2.000 mulheres e homens já fazem parte.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
