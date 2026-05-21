import React, { useRef } from 'react';

const LoadingScreen = ({ onComplete }) => {
  const containerRef = useRef(null);

  const handleVideoEnded = () => {
    if (window.gsap) {
      window.gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: onComplete
      });
    } else {
      onComplete();
    }
  };

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
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999
      }}
    >
      <video
        src="/videos/refresh.webm"
        autoPlay
        muted
        playsInline
        onEnded={handleVideoEnded}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </div>
  );
};

export default LoadingScreen;
