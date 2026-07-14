import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Skills from '../sections/Skills';
import Projects from '../sections/Projects';
import Experience from '../sections/Experience';
import Certifications from '../sections/Certifications';
import Contact from '../sections/Contact';
import Footer from '../sections/Footer';
import CustomCursor from '../components/CustomCursor';
import Background3D from '../components/Background3D';
import Lenis from 'lenis';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      infinite: false,
      gestureOrientation: 'vertical'
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Monitor visible sections for Navbar highlights
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Center region of viewport
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative bg-black w-screen min-h-screen overflow-x-hidden text-white">
      {/* 3D Scroll-Linked Background Animation */}
      <Background3D />

      {/* Luxury Trailing Custom Cursor */}
      <CustomCursor />
      
      {/* Glass Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Flow Layout */}
      <div className="relative flex flex-col w-full z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
