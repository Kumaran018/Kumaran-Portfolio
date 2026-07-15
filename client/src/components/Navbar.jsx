import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Terminal, ShieldAlert, Clock, Sun, Moon, Download } from 'lucide-react';

export default function Navbar({ activeSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [timeString, setTimeString] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Live clock logic
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('en-US', { hour12: true }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Theme switcher logic
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('theme', theme);
    window.dispatchEvent(new Event('themechange'));
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navLinks = [
    { name: 'Hero', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-4 bg-black/75 backdrop-blur-md border-b border-white/5 shadow-lg' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a 
          href="#hero" 
          onClick={(e) => handleScrollTo(e, '#hero')}
          className="flex items-center space-x-2 text-xl font-bold tracking-wider text-white hover:text-accent-blue transition-colors duration-300"
        >
          <Terminal size={20} className="text-accent-blue" />
          <span className="font-sans">KUMARAN</span>
        </a>

        {/* Desktop Menu & Utilities */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`text-xs tracking-widest uppercase transition-colors duration-300 font-light hover:text-white ${
                  activeSection === link.href.substring(1)
                    ? 'text-accent-cyan font-semibold'
                    : 'text-white/60'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Vertical Divider */}
          <div className="h-5 w-[1px] bg-white/10" />

          {/* Clock, Theme Toggle & Resume Button */}
          <div className="flex items-center space-x-4">
            {/* Live Clock */}
            <div className="flex items-center space-x-1.5 text-xs text-white/65 font-mono">
              <Clock size={13} className="text-accent-cyan" />
              <span>{timeString}</span>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-white/10 transition-all"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
            </button>

            {/* Download Resume Button */}
            <a
              href="/Kumaran_Resume.pdf"
              download
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-accent-blue/40 bg-accent-blue/10 hover:bg-accent-blue/20 text-xs font-semibold text-white tracking-wider transition-all uppercase font-sans"
            >
              <Download size={12} />
              <span>Resume</span>
            </a>
          </div>
        </div>

        {/* Mobile Hamburger & Quick Theme Trigger */}
        <div className="lg:hidden flex items-center space-x-3">
          {/* Quick Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white transition-all"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-accent-blue transition-colors p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`fixed inset-0 top-[60px] w-full h-[calc(100vh-60px)] bg-black/95 backdrop-blur-xl z-40 lg:hidden flex flex-col items-center justify-center space-y-6 transition-all duration-500 ${
        isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
      }`}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={(e) => handleScrollTo(e, link.href)}
            className="text-xl tracking-widest uppercase font-light text-white/70 hover:text-white hover:scale-105 transition-all"
          >
            {link.name}
          </a>
        ))}

        <div className="w-20 h-[1px] bg-white/10 my-4" />

        {/* Time, Theme & Resume on Mobile Dropdown */}
        <div className="flex flex-col items-center space-y-4">
          {/* Clock */}
          <div className="flex items-center space-x-1.5 text-sm text-white/60 font-mono">
            <Clock size={15} className="text-accent-cyan animate-pulse" />
            <span>{timeString}</span>
          </div>

          {/* Download Resume Button */}
          <a
            href="/Kumaran_Resume.pdf"
            download
            className="flex items-center space-x-2 px-5 py-2.5 rounded-lg border border-accent-blue/40 bg-accent-blue/10 hover:bg-accent-blue/20 text-xs font-semibold text-white tracking-widest transition-all uppercase font-sans"
          >
            <Download size={14} />
            <span>Download Resume</span>
          </a>
        </div>
      </div>
    </nav>
  );
}
