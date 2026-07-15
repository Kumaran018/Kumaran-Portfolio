import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import GlowingButton from '../components/GlowingButton';
import HeroThrone3D from '../components/HeroThrone3D';

export default function Hero() {
  const canvasRef = useRef(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    "Full Stack Engineer",
    "AIDS Student"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Premium particle flow network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles = [];
    const particleCount = 65; // Slightly reduced to balance performance with 3D canvas

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.radius = Math.random() * 1.5 + 0.8;
        this.alpha = Math.random() * 0.35 + 0.15;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Connections
      ctx.strokeStyle = 'rgba(0, 102, 204, 0.03)';
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [is3DReady, setIs3DReady] = useState(false);

  const handleExploreClick = (e) => {
    e.preventDefault();
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-screen min-h-screen lg:h-screen flex flex-col justify-center px-8 md:px-24 pt-20 lg:pt-24 pb-20 lg:pb-0 overflow-hidden bg-transparent z-10 select-none">
      
      {/* Background aesthetics */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      
      {/* Glow spots mapping luxury product design */}
      <div className="absolute top-[10%] left-[25%] w-[600px] h-[600px] bg-gradient-to-br from-accent-blue/10 to-transparent rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-[10%] right-[20%] w-[500px] h-[500px] bg-gradient-to-tl from-accent-purple/10 to-transparent rounded-full blur-[120px] pointer-events-none animate-pulse-slow" />

      {/* Vignette mask overlay */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      {/* Main typographic container: Modified to a 2-Column Grid */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-20">
        
        {/* LEFT COLUMN: Texts, tags & CTAs (8 columns) */}
        <div className="lg:col-span-8 flex flex-col items-start space-y-8 order-2 lg:order-1">
          {/* Subtle Tagline */}
          <div className="flex items-center space-x-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-cyan animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/50 font-medium">
              Hello I Am
            </span>
          </div>

          {/* Heading Name */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white flex flex-col">
            <span className="font-heading name-dark-bold">KUMARAN R P</span>
          </h1>

          {/* Subheading - Changing roles block */}
          <div className="h-12 flex items-center overflow-hidden">
            <span className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple bg-clip-text text-transparent transform transition-all duration-500 uppercase tracking-widest font-heading">
              {roles[roleIndex]}
            </span>
          </div>

          {/* Bio text */}
          <p className="text-sm md:text-base text-white/55 leading-relaxed max-w-xl font-light">
            Detail-oriented engineer crafting premium full-stack web applications and AI-driven platforms. Focusing on minimalist designs, clean architectures, and flawless visual performance.
          </p>

          {/* Call to Actions (CTAs) */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <GlowingButton onClick={handleExploreClick}>
              Explore My Work <ArrowRight size={15} className="ml-2" />
            </GlowingButton>
            
            <GlowingButton variant="secondary" onClick={handleContactClick}>
              Get In Touch
            </GlowingButton>
          </div>

          {/* Footer social icons */}
          <div className="flex items-center space-x-6 pt-8 text-white/35">
            <a href="https://linkedin.com/in/kumaran-rp-4755a232b" target="_blank" rel="noreferrer" className="hover:text-accent-blue transition-all transform hover:-translate-y-0.5">
              <Linkedin size={18} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-accent-purple transition-all transform hover:-translate-y-0.5">
              <Github size={18} />
            </a>
            <a href="mailto:kumaranrp49@gmail.com" className="hover:text-accent-cyan transition-all transform hover:-translate-y-0.5">
              <Mail size={18} />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive 3D Cyber Throne (4 columns) */}
        <div className="lg:col-span-4 w-full flex items-center justify-center order-1 lg:order-2 relative h-[430px] md:h-[530px]">
          {/* Instant Static Placeholder (visible immediately on page load, fades out when 3D is ready) */}
          <div className={`absolute transition-opacity duration-700 ease-in-out z-0 flex items-center justify-center w-[400px] h-[400px] ${is3DReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {/* Throne Card */}
            <div className="w-[180px] h-[240px] md:w-[220px] md:h-[290px] rounded-xl border-[6px] border-white shadow-[0_0_20px_rgba(255,255,255,0.85)] bg-[#0c0d12] overflow-hidden select-none pointer-events-none relative z-10">
              <img src="/throne.webp" alt="Throne" className="w-full h-full object-cover" />
            </div>

            {/* Orbit Ring 1 (Gold) */}
            <div 
              className="absolute rounded-full border border-[#d4af37]/40 animate-[spin_8s_linear_infinite]" 
              style={{
                width: '320px',
                height: '320px',
                transform: 'rotateX(70deg) rotateY(15deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-[#d4af37] rounded-full shadow-[0_0_12px_#d4af37]" />
            </div>

            {/* Orbit Ring 2 (Cyan) */}
            <div 
              className="absolute rounded-full border border-[#00f2fe]/40 animate-[spin_10s_linear_infinite]" 
              style={{
                width: '370px',
                height: '370px',
                transform: 'rotateX(45deg) rotateY(-20deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-[#00f2fe] rounded-full shadow-[0_0_12px_#00f2fe]" />
            </div>

            {/* Orbit Ring 3 (Purple) */}
            <div 
              className="absolute rounded-full border border-[#8622e6]/40 animate-[spin_6s_linear_infinite]" 
              style={{
                width: '270px',
                height: '270px',
                transform: 'rotateX(-45deg) rotateZ(30deg)',
                transformStyle: 'preserve-3d'
              }}
            >
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#8622e6] rounded-full shadow-[0_0_12px_#8622e6]" />
            </div>
          </div>
          
          {/* Interactive 3D Canvas */}
          <div className="absolute inset-0 w-full h-full z-10 flex items-center justify-center">
            <HeroThrone3D onReady={() => setIs3DReady(true)} />
          </div>
        </div>

      </div>
    </section>
  );
}
