import React, { useEffect, useRef } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const tl = window.gsap.timeline({
      onComplete: () => {
        window.gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: onComplete
        });
      }
    });

    // Animate text appearing letter by letter
    const chars = textRef.current.innerText.split('');
    textRef.current.innerText = '';
    chars.forEach(char => {
      const span = document.createElement('span');
      span.innerText = char;
      span.style.opacity = 0;
      textRef.current.appendChild(span);
    });

    tl.to(textRef.current.children, {
      opacity: 1,
      stagger: 0.1,
      duration: 0.1,
      ease: 'power2.inOut'
    })
    .to(progressRef.current, {
      scaleX: 1,
      duration: 1.5,
      ease: 'power3.inOut'
    }, "-=0.5")
    .to(textRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.5
    });

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1A1714',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <h1 
        ref={textRef}
        className="font-display text-gold"
        style={{ fontSize: '3rem', letterSpacing: '8px', marginBottom: '40px' }}
      >
        GLAUCIA
      </h1>
      <div 
        style={{
          width: '200px',
          height: '2px',
          backgroundColor: 'rgba(200, 155, 90, 0.2)',
          position: 'relative'
        }}
      >
        <div 
          ref={progressRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#C89B5A',
            transformOrigin: 'left',
            transform: 'scaleX(0)'
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
