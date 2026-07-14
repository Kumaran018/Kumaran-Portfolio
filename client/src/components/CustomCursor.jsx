import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorDotRef = useRef();
  const cursorRingRef = useRef();

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    if (!dot || !ring) return;

    const onMouseMove = (e) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const onMouseOver = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.classList.contains('clickable')
      ) {
        gsap.to(ring, {
          scale: 1.8,
          borderColor: '#0066cc',
          backgroundColor: 'rgba(0, 102, 204, 0.12)',
          duration: 0.2,
        });
        gsap.to(dot, {
          scale: 1.5,
          backgroundColor: '#00f2fe',
          duration: 0.2,
        });
      }
    };

    const onMouseOut = (e) => {
      if (
        e.target.tagName === 'A' ||
        e.target.tagName === 'BUTTON' ||
        e.target.closest('button') ||
        e.target.closest('a') ||
        e.target.classList.contains('clickable')
      ) {
        gsap.to(ring, {
          scale: 1,
          borderColor: 'rgba(255, 255, 255, 0.35)',
          backgroundColor: 'transparent',
          duration: 0.2,
        });
        gsap.to(dot, {
          scale: 1,
          backgroundColor: '#ffffff',
          duration: 0.2,
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-8 h-8 border border-white/35 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-75 ease-out hidden md:block"
      />
    </>
  );
}
