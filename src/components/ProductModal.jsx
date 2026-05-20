import React, { useEffect, useRef, useState } from 'react';
import { productsData } from '../data/products';

const CloseIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

const StarIcon = ({ filled, onClick }) => (
  <svg 
    onClick={onClick}
    width="16" 
    height="16" 
    viewBox="0 0 24 24" 
    fill={filled ? "var(--color-gold-primary)" : "none"} 
    stroke={filled ? "var(--color-gold-primary)" : "rgba(200, 155, 90, 0.3)"} 
    strokeWidth="2"
    style={{ 
      cursor: onClick ? 'pointer' : 'default', 
      marginRight: '3px',
      transition: 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), fill 0.2s',
    }}
    className={onClick ? "interactive-star" : ""}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const ProductModal = ({ product, isOpen, onClose, addToCart, setSelectedProduct }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const infoSectionRef = useRef(null);
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('#000');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  // Local reviews state
  const [localReviews, setLocalReviews] = useState([]);
  const [localRating, setLocalRating] = useState(5.0);

  // New review form state
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setSelectedSize(product.sizes?.[0] || 'M');
      setSelectedColor(product.colors?.[0] || '#C89B5A');
      setLocalReviews(product.reviews || []);
      setLocalRating(product.rating || 5.0);
      if (infoSectionRef.current) {
        infoSectionRef.current.scrollTop = 0;
      }
    }
    setQuantity(1);
    setIsAdded(false);
  }, [product]);

  useEffect(() => {
    if (window.gsap) {
      if (isOpen) {
        window.gsap.to(modalRef.current, { opacity: 1, display: 'flex', duration: 0.3 });
        window.gsap.fromTo(contentRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 });
        document.body.style.overflow = 'hidden';
      } else {
        window.gsap.to(modalRef.current, { opacity: 0, duration: 0.3, onComplete: () => {
          if (modalRef.current) modalRef.current.style.display = 'none';
          document.body.style.overflow = 'auto';
        }});
      }
    }
  }, [isOpen]);

  if (!product) return null;

  const handleAddToCart = () => {
    setIsAdded(true);
    addToCart(product, quantity, selectedSize, selectedColor);
    
    if (window.gsap) {
      // Premium add feedback animation
      window.gsap.fromTo('.add-success-banner', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'back.out' });
    }

    setTimeout(() => {
      onClose();
      setIsAdded(false);
    }, 1200);
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewComment.trim()) return;

    const newReview = {
      name: newReviewName,
      rating: Number(newReviewRating),
      comment: newReviewComment
    };

    const updatedReviews = [newReview, ...localReviews];
    setLocalReviews(updatedReviews);

    // Calculate new average
    const totalStars = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
    const newAverage = (totalStars / updatedReviews.length).toFixed(1);
    setLocalRating(Number(newAverage));

    // Clear form
    setNewReviewName('');
    setNewReviewRating(5);
    setNewReviewComment('');
  };

  // Switch modal product with animation
  const handleProductSwitch = (newProduct) => {
    if (window.gsap && contentRef.current) {
      window.gsap.to(contentRef.current, { 
        opacity: 0, 
        y: 20, 
        duration: 0.25, 
        onComplete: () => {
          setSelectedProduct(newProduct);
          window.gsap.fromTo(contentRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' });
        } 
      });
    } else {
      setSelectedProduct(newProduct);
    }
  };

  const images = product.gallery || [product.image];
  const colors = product.colors || ['#C89B5A', '#1A1714', '#F5F0E8'];
  const sizes = product.sizes || ['PP', 'P', 'M', 'G', 'GG', 'XG'];

  // 3 Related products from the same category
  const relatedProducts = productsData
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  const isMainImageGradient = mainImage && mainImage.startsWith('linear-gradient');

  return (
    <div 
      ref={modalRef}
      className="typ-storefront"
      style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        backgroundColor: 'rgba(26, 23, 20, 0.75)', zIndex: 2000, display: 'none',
        alignItems: 'center', justifyContent: 'center', padding: '20px',
        backdropFilter: 'blur(8px)'
      }}
    >
      <div 
        ref={contentRef}
        style={{
          width: '100%', maxWidth: '1050px', backgroundColor: 'var(--color-bg-main)',
          borderRadius: '0px', overflow: 'hidden', display: 'flex', position: 'relative',
          maxHeight: '90vh', border: '1px solid rgba(200, 155, 90, 0.35)', boxShadow: '0 25px 60px rgba(0, 0, 0, 0.45)'
        }}
      >
        {/* Added Success Banner */}
        {isAdded && (
          <div className="add-success-banner" style={{
            position: 'absolute', top: 0, left: 0, width: '100%',
            backgroundColor: 'var(--color-gold-primary)', color: 'var(--color-white-soft)', padding: '12px',
            textAlign: 'center', fontWeight: '700', zIndex: 20, letterSpacing: '1px', fontSize: '13px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif"
          }}>
            ✓ Item adicionado à sacola de compras!
          </div>
        )}
 
        <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', color: 'var(--color-white-soft)', zIndex: 10, background: 'none', border: 'none', cursor: 'pointer', transition: 'transform 0.2s' }} className="close-modal-btn">
          <CloseIcon />
        </button>
 
        {/* Gallery Column */}
        <div style={{ width: '50%', display: 'flex', padding: '25px', gap: '15px', backgroundColor: 'rgba(200, 155, 90, 0.02)', borderRight: '1px solid rgba(200, 155, 90, 0.2)' }}>
          {/* Thumbnails */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '80px' }}>
            {images.map((img, i) => {
              const isGradient = img.startsWith('linear-gradient');
              return isGradient ? (
                <div 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  style={{ 
                    width: '100%', height: '80px', cursor: 'pointer', 
                    background: img,
                    borderRadius: '0px',
                    border: mainImage === img ? '2px solid var(--color-gold-primary)' : '1px solid rgba(245, 240, 232, 0.15)',
                    boxSizing: 'border-box',
                    opacity: mainImage === img ? 1 : 0.6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '9px', color: '#FFFFFF', fontWeight: 'bold', letterSpacing: '1px',
                    textTransform: 'uppercase', transition: 'all 0.3s'
                  }} 
                  className="gallery-thumbnail"
                >
                  Look {i + 1}
                </div>
              ) : (
                <img 
                  key={i} src={img} alt={`Thumb ${i}`} 
                  onClick={() => setMainImage(img)}
                  style={{ 
                    width: '100%', height: '80px', objectFit: 'cover', cursor: 'pointer', 
                    borderRadius: '0px',
                    border: mainImage === img ? '2px solid var(--color-gold-primary)' : '1px solid rgba(245, 240, 232, 0.15)',
                    boxSizing: 'border-box',
                    opacity: mainImage === img ? 1 : 0.6,
                    transition: 'all 0.3s'
                  }} 
                  className="gallery-thumbnail"
                />
              );
            })}
          </div>
 
          {/* Main Visual Display */}
          <div style={{ flex: 1, backgroundColor: 'rgba(245, 240, 232, 0.02)', borderRadius: '0px', overflow: 'hidden', display: 'flex', height: '100%', minHeight: '480px', border: '1px solid rgba(200, 155, 90, 0.2)' }}>
            {isMainImageGradient ? (
              <div style={{ flex: 1, background: mainImage, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '30px', textAlign: 'center' }}>
                <span style={{ fontSize: '32px', marginBottom: '10px', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, color: 'var(--color-white-soft)' }}>GLÁUCIA</span>
                <span style={{ fontSize: '13px', color: 'var(--color-white-soft)', textTransform: 'uppercase', letterSpacing: '4px', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>Lookbook Estilo</span>
              </div>
            ) : (
              <img src={mainImage} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            )}
          </div>
        </div>
 
        {/* Scrollable Info Column */}
        <div ref={infoSectionRef} style={{ width: '50%', padding: '40px', overflowY: 'auto', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--color-bg-main)' }}>
          <p style={{ color: 'var(--color-gold-dark)', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>
            ATELIÊ GLÁUCIA | {product.type}
          </p>
          <h2 style={{ fontSize: '32px', marginBottom: '12px', color: 'var(--color-white-soft)', lineHeight: '1.2', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, letterSpacing: '-0.5px' }}>
            {product.name}
          </h2>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <div style={{ display: 'flex' }}>
              {[1,2,3,4,5].map(star => <StarIcon key={star} filled={star <= Math.round(localRating)} />)}
            </div>
            <span style={{ color: 'var(--color-white-soft)', fontSize: '13px', fontFamily: "'Inter', sans-serif", fontWeight: 500, opacity: 0.8 }}>
              {localRating.toFixed(1)} ({localReviews.length} avaliações)
            </span>
          </div>
 
          <p style={{ fontSize: '24px', marginBottom: '20px', fontWeight: '700', color: 'var(--color-gold-dark)', fontFamily: "'Inter', sans-serif" }}>
            R$ {product.price.toFixed(2).replace('.', ',')}
          </p>

          <p style={{ color: 'var(--color-white-soft)', opacity: 0.8, fontSize: '14px', lineHeight: '1.6', marginBottom: '30px', fontFamily: "'Inter', sans-serif" }}>
            {product.description}
          </p>

          {/* Size Selector */}
          <div style={{ marginBottom: '25px' }}>
            <p style={{ color: 'var(--color-white-soft)', marginBottom: '10px', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
              Tamanho: <span style={{ textDecoration: 'underline' }}>{selectedSize}</span>
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {sizes.map(s => (
                <button 
                  key={s} 
                  onClick={() => setSelectedSize(s)}
                  style={{
                    width: '46px', height: '44px', 
                    border: selectedSize === s ? '1.5px solid var(--color-gold-primary)' : '1px solid rgba(245, 240, 232, 0.15)',
                    backgroundColor: selectedSize === s ? 'var(--color-gold-primary)' : 'transparent',
                    color: selectedSize === s ? 'var(--color-bg-main)' : 'var(--color-white-soft)', 
                    cursor: 'pointer',
                    fontWeight: selectedSize === s ? '700' : '500',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '13px',
                    transition: 'all 0.2s', outline: 'none'
                  }}
                  className="size-option-btn"
                >{s}</button>
              ))}
            </div>
          </div>

          {/* Color Selector */}
          <div style={{ marginBottom: '30px' }}>
            <p style={{ color: 'var(--color-white-soft)', marginBottom: '10px', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
              Selecione a Cor
            </p>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
              {colors.map(c => (
                <button 
                  key={c}
                  onClick={() => setSelectedColor(c)}
                  style={{
                    width: '32px', height: '32px', borderRadius: '50%', backgroundColor: c,
                    border: selectedColor === c ? '2px solid var(--color-white-soft)' : '1px solid rgba(245, 240, 232, 0.15)',
                    cursor: 'pointer', outline: 'none',
                    boxShadow: selectedColor === c ? '0 0 0 2px var(--color-bg-main), 0 0 0 4px var(--color-gold-primary)' : 'none',
                    transition: 'all 0.2s',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  className="color-option-btn"
                  title={c}
                />
              ))}
            </div>
          </div>

          {/* Add to Cart Actions */}
          <div style={{ display: 'flex', gap: '15px', marginBottom: '35px' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-white-soft)', borderRadius: '100px', backgroundColor: 'transparent', height: '48px', overflow: 'hidden' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ color: 'var(--color-white-soft)', width: '40px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }} className="quantity-btn">-</button>
              <span style={{ color: 'var(--color-white-soft)', width: '25px', textAlign: 'center', fontWeight: '600', fontFamily: "'Inter', sans-serif" }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ color: 'var(--color-white-soft)', width: '40px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', fontWeight: 'bold' }} className="quantity-btn">+</button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              style={{
                flex: 1, height: '48px', 
                backgroundColor: isAdded ? 'var(--color-gold-dark)' : 'var(--color-gold-primary)', 
                color: isAdded ? 'var(--color-white-soft)' : 'var(--color-bg-main)',
                border: 'none', cursor: 'pointer',
                borderRadius: '100px',
                textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, fontSize: '12px',
                fontFamily: "'Inter', sans-serif",
                transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
              }}
              className="add-to-cart-action-btn"
            >
              {isAdded ? '✓ Adicionado' : 'Adicionar à Sacola'}
            </button>
          </div>

          {/* Reviews Container */}
          <div style={{ borderTop: '1px solid rgba(200, 155, 90, 0.2)', paddingTop: '30px', marginBottom: '35px' }}>
            <h3 style={{ fontSize: '18px', marginBottom: '20px', letterSpacing: '1px', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, color: 'var(--color-white-soft)' }}>
              Avaliações das Clientes
            </h3>
            
            {/* Review List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
              {localReviews.length === 0 ? (
                <p style={{ color: 'rgba(245, 240, 232, 0.6)', fontSize: '13px', fontStyle: 'italic', fontFamily: "'Inter', sans-serif" }}>
                  Este produto ainda não tem avaliações. Seja o primeiro a avaliar!
                </p>
              ) : (
                localReviews.map((rev, index) => (
                  <div key={index} style={{ borderBottom: '1px solid rgba(200, 155, 90, 0.15)', paddingBottom: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--color-white-soft)', fontWeight: '600', fontSize: '13px', fontFamily: "'Inter', sans-serif" }}>{rev.name}</span>
                      <div style={{ display: 'flex' }}>
                        {[1,2,3,4,5].map(star => <StarIcon key={star} filled={star <= rev.rating} />)}
                      </div>
                    </div>
                    <p style={{ color: 'rgba(245, 240, 232, 0.8)', fontSize: '13px', lineHeight: '1.5', margin: 0, fontFamily: "'Inter', sans-serif" }}>
                      "{rev.comment}"
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Add Review Form */}
            <form onSubmit={handleAddReview} style={{ backgroundColor: 'rgba(245, 240, 232, 0.02)', padding: '20px', border: '1px solid rgba(200, 155, 90, 0.25)', borderRadius: '0px' }}>
              <h4 style={{ color: 'var(--color-white-soft)', fontSize: '13px', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: "'Inter', sans-serif", fontWeight: 700 }}>
                Deixe sua Avaliação
              </h4>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <span style={{ color: 'var(--color-white-soft)', fontSize: '13px', fontFamily: "'Inter', sans-serif" }}>Sua nota:</span>
                <div style={{ display: 'flex' }}>
                  {[1,2,3,4,5].map(star => (
                    <StarIcon 
                      key={star} 
                      filled={star <= newReviewRating} 
                      onClick={() => setNewReviewRating(star)}
                    />
                  ))}
                </div>
              </div>

              <input 
                required
                type="text" 
                placeholder="Seu Nome" 
                value={newReviewName}
                onChange={e => setNewReviewName(e.target.value)}
                className="review-input-field"
              />
              
              <textarea 
                required
                placeholder="Escreva sua opinião sincera sobre a peça..." 
                value={newReviewComment}
                onChange={e => setNewReviewComment(e.target.value)}
                rows={3}
                className="review-input-field"
                style={{ resize: 'none' }}
              />

              <button 
                type="submit" 
                style={{
                  width: '100%', padding: '12px', backgroundColor: 'var(--color-gold-primary)', 
                  border: 'none', color: 'var(--color-bg-main)', cursor: 'pointer',
                  borderRadius: '100px',
                  textTransform: 'uppercase', fontSize: '11px', letterSpacing: '1.5px', fontWeight: 700,
                  fontFamily: "'Inter', sans-serif",
                  transition: 'all 0.3s'
                }}
                className="submit-review-btn"
              >
                Enviar Avaliação
              </button>
            </form>
          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(200, 155, 90, 0.2)', paddingTop: '30px' }}>
              <h3 style={{ fontSize: '16px', marginBottom: '20px', letterSpacing: '1px', fontFamily: "'Bricolage Grotesque', sans-serif", fontWeight: 700, color: 'var(--color-white-soft)' }}>
                Quem comprou este item também amou
              </h3>
              <div style={{ display: 'flex', gap: '15px' }}>
                {relatedProducts.map(p => (
                  <div 
                    key={p.id} 
                    onClick={() => handleProductSwitch(p)}
                    style={{ 
                      flex: 1, cursor: 'pointer', display: 'flex', flexDirection: 'column', 
                      alignItems: 'center', textAlign: 'center', backgroundColor: 'transparent',
                      border: '1px solid rgba(200, 155, 90, 0.15)', padding: '10px', borderRadius: '0px',
                      transition: 'transform 0.3s, border-color 0.3s'
                    }}
                    className="related-item-card"
                  >
                    <div style={{ width: '100%', aspectRatio: '3/4', overflow: 'hidden', borderRadius: '0px', marginBottom: '10px', backgroundColor: 'rgba(200, 155, 90, 0.04)' }}>
                      <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }} className="related-img" />
                    </div>
                    <h4 style={{ fontSize: '13px', color: 'var(--color-white-soft)', margin: '0 0 5px 0', fontFamily: "'Inter', sans-serif", fontWeight: 600, display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '16px' }}>{p.name}</h4>
                    <p style={{ fontSize: '13px', margin: 0, fontWeight: '700', color: 'var(--color-gold-dark)', fontFamily: "'Inter', sans-serif" }}>R$ {p.price.toFixed(2).replace('.', ',')}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      <style>
        {`
          .close-modal-btn:hover {
            transform: scale(1.1) rotate(90deg);
            color: var(--color-gold-primary) !important;
          }
          .size-option-btn:hover {
            border-color: var(--color-gold-primary) !important;
            background-color: rgba(200, 155, 90, 0.08) !important;
            color: var(--color-white-soft) !important;
          }
          .size-option-btn:active,
          .color-option-btn:active,
          .quantity-btn:active,
          .add-to-cart-action-btn:active,
          .submit-review-btn:active,
          .related-item-card:active,
          .gallery-thumbnail:active {
            transform: scale(0.97) !important;
          }
          .gallery-thumbnail {
            transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s, opacity 0.3s;
          }
          .quantity-btn {
            transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            border-radius: 50%;
          }
          .quantity-btn:hover {
            background-color: rgba(200, 155, 90, 0.08) !important;
            color: var(--color-gold-primary) !important;
          }
          .add-to-cart-action-btn:hover {
            background-color: var(--color-gold-light) !important;
            color: var(--color-bg-main) !important;
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(200, 155, 90, 0.25);
          }
          .submit-review-btn:hover {
            background-color: var(--color-gold-light) !important;
            color: var(--color-bg-main) !important;
          }
          .related-item-card {
            transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 0.3s;
          }
          .related-item-card:hover {
            transform: translateY(-4px);
            border-color: var(--color-gold-primary) !important;
          }
          .related-item-card:hover .related-img {
            transform: scale(1.05);
          }
          .interactive-star {
            transition: transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), fill 0.2s;
          }
          .interactive-star:hover {
            transform: scale(1.25);
            fill: var(--color-gold-primary) !important;
          }
          .review-input-field {
            width: 100%;
            padding: 14px 16px;
            background-color: rgba(245, 240, 232, 0.03);
            border: 1.5px solid rgba(200, 155, 90, 0.25);
            color: var(--color-white-soft);
            font-size: 13px;
            border-radius: 0px;
            outline: none;
            margin-bottom: 16px;
            font-family: 'Inter', sans-serif;
            box-sizing: border-box;
            transition: border-color 0.3s, box-shadow 0.3s, background-color 0.3s;
          }
          .review-input-field::placeholder {
            color: rgba(245, 240, 232, 0.4);
          }
          .review-input-field:focus {
            border-color: var(--color-gold-primary) !important;
            background-color: rgba(245, 240, 232, 0.06);
            box-shadow: 0 0 0 3px rgba(200, 155, 90, 0.15);
          }
        `}
      </style>
    </div>
  );
};

export default ProductModal;
