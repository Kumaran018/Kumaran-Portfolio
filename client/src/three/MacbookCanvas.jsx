import React, { useState, useEffect } from 'react';
import './MacbookCSS.css';

export default function MacbookCanvas({ onEnterPortfolio }) {
  const [isOpen, setIsOpen] = useState(false);
  const [bootStep, setBootStep] = useState(0); // 0: closed, 1: opening, 2: boot-screen, 3: completed
  const [progress, setProgress] = useState(0);

  const handleOpenLaptop = () => {
    if (!isOpen) {
      setIsOpen(true);
      setBootStep(1);
    }
  };

  const handleSkip = () => {
    onEnterPortfolio();
  };

  useEffect(() => {
    if (bootStep === 1) {
      const timer = setTimeout(() => {
        setBootStep(2);
      }, 700);
      return () => clearTimeout(timer);
    } else if (bootStep === 2) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setBootStep(3);
              setTimeout(() => {
                onEnterPortfolio();
              }, 400);
            }, 1000);
            return 100;
          }
          return prev + 10;
        });
      }, 45);
      return () => clearInterval(interval);
    }
  }, [bootStep, onEnterPortfolio]);

  return (
    <div className={`macbook-landing-viewport ${bootStep === 3 ? 'fade-out' : ''}`}>
      
      {/* Skip Button */}
      <button 
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 py-2 px-5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold tracking-wider text-white/60 hover:text-white transition-all cursor-pointer"
      >
        Skip Intro
      </button>

      {/* Cosmic space background */}
      <div className="absolute inset-0 bg-black flex items-center justify-center overflow-hidden">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Subtle grid mesh overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      </div>

      {/* Interactive 3D Screen Area */}
      <div className="relative flex flex-col items-center justify-center w-full max-w-4xl px-4 z-10">
        
        <div 
          onClick={handleOpenLaptop}
          className={`macbook-3d-scene ${isOpen ? 'is-open' : 'is-closed-hover'} cursor-pointer`}
        >
          <div className="macbook-chassis">
            
            {/* 1. Base of Laptop */}
            <div className="macbook-base-case">
              <div className="macbook-keyboard-bed">
                <div className="keyboard-grid">
                  {Array.from({ length: 6 }).map((_, rIdx) => (
                    <div key={rIdx} className="keyboard-row">
                      {Array.from({ length: 14 }).map((_, kIdx) => (
                        <div key={kIdx} className="keyboard-key" />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
              <div className="macbook-trackpad" />
              <div className="macbook-base-front-notch" />
            </div>

            {/* 2. Laptop Lid */}
            <div className="macbook-lid-case">
              
              {/* BACK OF LID (Visible when closed, holds Apple logo) */}
              <div className="lid-outer-cover">
                <div className="apple-logo-glow-wrapper">
                  <svg className="apple-logo-svg" viewBox="0 0 170 170">
                    <path fill="currentColor" d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.37-6.15-2.82-2.3-6.61-6.8-11.35-13.5-3.52-4.9-6.53-10.22-9.03-15.97-2.5-5.75-4.75-12.51-6.76-20.29-2.02-7.78-3.03-15.37-3.03-22.77 0-11.95 2.87-21.94 8.61-29.98 5.74-8.03 13.34-12.11 22.8-12.22 4.45 0 9.28 1.48 14.48 4.43 5.2 2.95 9.17 4.43 11.9 4.43 2.17 0 6.02-1.4 11.53-4.2 5.52-2.8 10.37-4.15 14.56-4.04 10.96.22 19.53 4.29 25.7 12.22-9.77 5.97-14.56 14.15-14.37 24.56.22 8.04 3.2 14.73 8.93 20.08 5.74 5.34 12.63 8.16 20.69 8.44 2.39 5.86 4.67 11.72 6.84 17.58 2.18 5.86 3.26 10.74 3.26 14.65zm-33.16-118c0 6.4-2.28 12.23-6.84 17.48-4.56 5.25-10.11 8.45-16.64 9.61-.43-6.19 1.95-12.14 7.16-17.84 5.2-5.7 10.95-8.98 17.22-9.84.44 5.67-.9 11.08-2.9 16.23z" />
                  </svg>
                </div>
              </div>

              {/* INNER DISPLAY BEZEL (Visible when open) */}
              <div className="lid-inner-bezel">
                <div className="macbook-screen">
                  
                  {/* Screen Content Wrapper */}
                  {bootStep >= 2 && (
                    <div className="screen-operating-system flex flex-col justify-between p-6">
                      
                      {/* Boot top bar */}
                      <div className="flex justify-between items-center text-[10px] text-white/30 font-medium">
                        <span>Kumaran Air M4</span>
                        <span>Console Seeding</span>
                      </div>

                      {/* Main Console details */}
                      <div className="flex-1 flex flex-col justify-center items-start space-y-4">
                        <div className="text-white/80 text-xl font-semibold mb-2"></div>
                        
                        <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight font-sans welcome-typing">
                        Welcome To The World 
                        </h2>
                        
                        <div className="space-y-1.5 opacity-0 animate-fade-in-delayed">
                          <p className="text-xs text-white/60 font-medium">Kumaran R P</p>
                          <p className="text-[10px] text-accent-blue font-bold uppercase tracking-widest">
                            Full Stack Developer
                          </p>
                          <p className="text-[9px] text-white/40">B.Tech AI & Data Science (CGPA: 8.04)</p>
                        </div>
                      </div>

                      {/* Loading progress indicator */}
                      <div className="w-full space-y-1.5 opacity-0 animate-fade-in-delayed">
                        <div className="h-[2px] bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-accent-blue rounded-full transition-all duration-75"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[8px] uppercase tracking-wider text-white/30 font-bold">
                          <span>Setting secure link</span>
                          <span>{progress}%</span>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Floating Instruction overlay */}
        {!isOpen && (
          <div className="mt-12 flex flex-col items-center pointer-events-none animate-pulse">
            <h2 className="text-base font-bold tracking-wide text-white/70 font-sans">
              Click to Open MacBook Air
            </h2>
            <div className="w-5 h-8 border border-white/20 rounded-full mt-4 flex justify-center p-1">
              <div className="w-1 h-2 bg-white/40 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
