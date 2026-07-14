import React from 'react';
import { ArrowUp, Terminal } from 'lucide-react';
import { resumeData } from '../data/resumeData';

export default function Footer() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-screen bg-transparent py-12 px-8 md:px-24 border-t border-white/5 overflow-hidden select-none font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Brand */}
        <div className="flex items-center space-x-2">
          <Terminal size={18} className="text-accent-blue" />
          <span className="text-sm font-bold tracking-wider text-white">KUMARAN R P</span>
        </div>

        {/* Copy */}
        <p className="text-xs text-white/40 font-light text-center md:text-left">
          &copy; {new Date().getFullYear()} Kumaran R P. All rights reserved. Crafting Digital Experiences.
        </p>

        {/* Links / Back to top */}
        <div className="flex items-center space-x-6">
          <a
            href="https://linkedin.com/in/kumaran-rp-4755a232b"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-white/50 hover:text-white transition-colors font-semibold"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-white/50 hover:text-white transition-colors font-semibold"
          >
            GitHub
          </a>
          <button
            onClick={handleScrollTop}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:border-white/30 flex items-center justify-center text-white/70 hover:text-white transition-all transform hover:-translate-y-1"
          >
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
