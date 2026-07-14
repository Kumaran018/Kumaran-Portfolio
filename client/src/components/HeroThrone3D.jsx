import React, { useRef, useState } from 'react';

export default function HeroThrone3D() {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setCoords({ x, y });

    // Interactive 3D tilt coordinates
    const tiltX = ((y - height / 2) / (height / 2)) * -10; // Max tilt 10deg
    const tiltY = ((x - width / 2) / (width / 2)) * 10;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  return (
    <div className="w-full max-w-md h-[400px] md:h-[500px] flex items-center justify-center relative z-10 select-none">
      
      {/* Dynamic Background Neon Gold Glow */}
      <div 
        className="absolute w-[280px] h-[360px] bg-gradient-to-tr from-[#d4af37]/20 via-[#f3e5ab]/15 to-transparent rounded-full blur-[80px] pointer-events-none transition-all duration-700" 
        style={{
          transform: isHovered ? 'scale(1.15) translate(10px, -10px)' : 'scale(1)'
        }}
      />

      {/* Floating orbital rings around image */}
      <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_40s_linear_infinite] scale-75 pointer-events-none" />
      <div className="absolute inset-0 border border-[#d4af37]/10 rounded-full animate-[spin_25s_linear_infinite_reverse] scale-90 pointer-events-none" />

      {/* 3D Card Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-[300px] h-[400px] rounded-3xl p-[1.5px] overflow-hidden cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease',
          background: isHovered 
            ? `radial-gradient(circle at ${coords.x}px ${coords.y}px, rgba(212, 175, 55, 0.4) 0%, rgba(255, 255, 255, 0.05) 50%, transparent 100%)`
            : 'rgba(255, 255, 255, 0.08)',
          boxShadow: isHovered 
            ? '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(212, 175, 55, 0.15)'
            : '0 20px 40px -15px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 255, 255, 0.02)',
        }}
      >
        {/* Inner Card Container */}
        <div 
          className="w-full h-full rounded-[22px] overflow-hidden bg-black/95 relative flex items-center justify-center"
          style={{
            transform: 'translateZ(10px)', // Elevates the image in 3D layering
          }}
        >
          {/* Royal Golden Throne Image */}
          <img 
            src="/throne.png" 
            alt="Royal Golden Throne" 
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            draggable="false"
          />

          {/* Golden Corner Bracket Highlights */}
          <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-[#d4af37]/60" />
          <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-[#d4af37]/60" />
          <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-[#d4af37]/60" />
          <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-[#d4af37]/60" />

          {/* Fine luxury diagonal line highlight reflection */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 pointer-events-none" />

          {/* Mouse follow spotlight reflection overlay */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none mix-blend-overlay"
              style={{
                background: `radial-gradient(circle 120px at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.15), transparent)`,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
