import React from 'react';

const CrownIcon = () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C89B5A" strokeWidth="1.5"><path d="M2 20h20M4 16l2-10 4 4 2-6 2 6 4-4 2 10H4z" fill="rgba(200, 155, 90, 0.2)"/></svg>;

const Footer = () => {
  return (
    <footer className="bg-black-premium" style={{ borderTop: '1px solid rgba(200, 155, 90, 0.3)', padding: '80px 5% 30px' }} id="contato">
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '40px',
        marginBottom: '60px'
      }}>
        
        {/* Col 1 */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '20px' }}>
            <CrownIcon />
            <span className="font-accent text-gold" style={{ fontSize: '32px', letterSpacing: '2px' }}>Glaucia</span>
          </div>
          <p style={{ color: '#D4B896', fontSize: '14px', lineHeight: 1.6, marginBottom: '20px' }}>
            Elegância e Estilo. Moda evangélica premium para quem valoriza a fé e a sofisticação.
          </p>
          <div style={{ display: 'flex', gap: '15px' }}>
            {/* Social Icons Placeholders */}
            <a href="#" style={{ color: '#C89B5A' }}>Instagram</a>
            <a href="#" style={{ color: '#C89B5A' }}>WhatsApp</a>
            <a href="#" style={{ color: '#C89B5A' }}>Facebook</a>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="font-title text-gold" style={{ fontSize: '18px', marginBottom: '20px' }}>Navegação</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><a href="#" style={{ color: '#D4B896', fontSize: '14px', transition: 'color 0.3s' }}>Coleções</a></li>
            <li><a href="#" style={{ color: '#D4B896', fontSize: '14px', transition: 'color 0.3s' }}>Sobre Nós</a></li>
            <li><a href="#" style={{ color: '#D4B896', fontSize: '14px', transition: 'color 0.3s' }}>Blog</a></li>
            <li><a href="#" style={{ color: '#D4B896', fontSize: '14px', transition: 'color 0.3s' }}>Contato</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="font-title text-gold" style={{ fontSize: '18px', marginBottom: '20px' }}>Políticas</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li><a href="#" style={{ color: '#D4B896', fontSize: '14px', transition: 'color 0.3s' }}>Trocas e Devoluções</a></li>
            <li><a href="#" style={{ color: '#D4B896', fontSize: '14px', transition: 'color 0.3s' }}>Política de Privacidade</a></li>
            <li><a href="#" style={{ color: '#D4B896', fontSize: '14px', transition: 'color 0.3s' }}>Termos de Uso</a></li>
            <li><a href="#" style={{ color: '#D4B896', fontSize: '14px', transition: 'color 0.3s' }}>Prazos de Entrega</a></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="font-title text-gold" style={{ fontSize: '18px', marginBottom: '20px' }}>Contato</h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ color: '#D4B896', fontSize: '14px' }}>WhatsApp: (11) 99999-9999</li>
            <li style={{ color: '#D4B896', fontSize: '14px' }}>contato@glauciaestilo.com.br</li>
            <li style={{ color: '#D4B896', fontSize: '14px' }}>Seg a Sex: 09h às 18h</li>
          </ul>
        </div>

      </div>

      <div style={{ 
        borderTop: '1px solid rgba(200, 155, 90, 0.1)', 
        paddingTop: '30px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <p style={{ color: '#D4B896', fontSize: '12px' }}>
          © 2025 Glaucia Elegância e Estilo — Todos os direitos reservados
        </p>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span style={{ color: '#C89B5A', fontSize: '12px', fontWeight: 'bold' }}>VISA</span>
          <span style={{ color: '#C89B5A', fontSize: '12px', fontWeight: 'bold' }}>MASTER</span>
          <span style={{ color: '#C89B5A', fontSize: '12px', fontWeight: 'bold' }}>PIX</span>
          <span style={{ color: '#C89B5A', fontSize: '12px', fontWeight: 'bold' }}>BOLETO</span>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;
