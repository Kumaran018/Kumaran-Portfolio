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

  const handleScrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative w-screen min-h-screen lg:h-screen flex flex-col justify-center px-8 md:px-24 py-20 lg:py-0 overflow-hidden bg-transparent z-10 select-none">
      
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

          {/* Hero Title */}
          <div className="space-y-4 w-full">
            <p className="text-sm uppercase tracking-[0.4em] font-medium text-white/35 mb-1">Hello I am</p>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.8rem] font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 leading-none font-orbitron whitespace-nowrap">
              KUMARAN R P
            </h1>
            
            <div className="h-14 md:h-20 overflow-hidden relative flex items-center">
              <span className="text-2xl md:text-4xl xl:text-5xl font-bold tracking-wider bg-gradient-to-r from-accent-blue via-accent-cyan to-accent-purple bg-clip-text text-transparent font-orbitron uppercase whitespace-nowrap">
                {roles[roleIndex]}
              </span>
            </div>
          </div>

          {/* Lead subtitle */}
          <p className="max-w-2xl text-white/50 text-base md:text-lg font-light leading-relaxed font-sans">
            Detail-oriented engineer crafting premium full-stack web applications and AI-driven platforms. Focusing on minimalist designs, clean architectures, and flawless visual performance.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 w-full sm:w-auto">
            <GlowingButton variant="accent" onClick={handleScrollToProjects} className="px-8 py-4">
              <span>Explore My Work</span>
              <ArrowRight size={16} />
            </GlowingButton>
            <GlowingButton variant="secondary" onClick={() => {
              const contact = document.querySelector('#contact');
              if (contact) contact.scrollIntoView({ behavior: 'smooth' });
            }} className="px-8 py-4">
              <span>Get in Touch</span>
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
        <div className="lg:col-span-4 w-full flex items-center justify-center order-1 lg:order-2">
          <HeroThrone3D />
        </div>

      </div>
    </section>
  );
}
