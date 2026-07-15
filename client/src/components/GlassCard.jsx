import React, { useRef, useState } from 'react';

export default function GlassCard({ children, className = '', glowColor = 'rgba(0, 102, 204, 0.25)', onClick }) {
  const cardRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setCoords({ x, y });

    // Premium 3D Tilt Effect
    const tiltX = ((y - height / 2) / (height / 2)) * -4; // Tilt max 4deg for sublte premium feel
    const tiltY = ((x - width / 2) / (width / 2)) * 4;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`;
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
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`glass-card relative rounded-2xl p-[1px] overflow-hidden transition-all duration-150 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, background-color 0.15s ease',
        background: isHovered 
          ? `radial-gradient(circle at ${coords.x}px ${coords.y}px, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.04) 50%, transparent 100%)`
          : undefined,
        boxShadow: isHovered 
          ? `0 15px 35px -10px rgba(0,0,0,0.8), 0 0 25px ${glowColor.replace('0.25', '0.06')}`
          : undefined,
      }}
    >
      {/* Inner card container */}
      <div 
        className="glass-card-inner relative backdrop-blur-xl w-full h-full rounded-2xl p-6 overflow-hidden transition-colors duration-150"
        style={{
          background: isHovered
            ? 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 100%), #0a0a0a'
            : undefined
        }}
      >
        {/* Soft background glow trace inside the card */}
        {isHovered && (
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              width: '280px',
              height: '280px',
              background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
              left: `${coords.x - 140}px`,
              top: `${coords.y - 140}px`,
              mixBlendMode: 'screen',
              opacity: 0.8,
              transition: 'opacity 0.2s ease',
            }}
          />
        )}

        {/* Diagonal hairline reflection */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.01] to-white/0 pointer-events-none" />

        <div className="relative z-10 text-white">{children}</div>
      </div>
    </div>
  );
}
