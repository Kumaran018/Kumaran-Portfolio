import React from 'react';

export default function GlowingButton({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  className = '', 
  disabled = false 
}) {
  const baseStyle = "relative overflow-hidden px-6 py-3 rounded-full font-medium text-sm tracking-wider uppercase transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2";
  
  const variants = {
    primary: "bg-white text-black hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]",
    secondary: "bg-transparent text-white border border-white/10 hover:border-white/40 hover:bg-white/5",
    accent: "bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:shadow-[0_0_20px_rgba(0,102,204,0.5)]",
    glow: "bg-black/60 text-white border border-accent-blue/30 hover:border-accent-blue hover:shadow-[0_0_15px_rgba(0,102,204,0.3)] backdrop-blur-sm"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {/* Glow highlight particle inside */}
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
