import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function MorphingBlob() {
  const meshRef = useRef();
  const materialRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track window scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const progress = window.scrollY / totalScroll;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      // 1. Position morphing linked to scroll progress
      // Hero (0): right, About (0.15): left, Skills (0.35): center-back, Projects (0.55): right-back, etc.
      let targetX = 1.2;
      let targetY = 0;
      let targetZ = 0;

      if (scrollProgress > 0.1 && scrollProgress <= 0.3) {
        // About Section (Left placement)
        targetX = -1.3;
        targetY = 0.2;
      } else if (scrollProgress > 0.3 && scrollProgress <= 0.5) {
        // Skills Section (Centered deep back)
        targetX = 0;
        targetY = -0.3;
        targetZ = -1.5;
      } else if (scrollProgress > 0.5 && scrollProgress <= 0.7) {
        // Projects Section (Right-back placement)
        targetX = 1.4;
        targetY = -0.2;
        targetZ = -0.5;
      } else if (scrollProgress > 0.7) {
        // Experience / Contact (Centered forward)
        targetX = 0;
        targetY = 0.3;
        targetZ = 0.5;
      }

      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.05);

      // Rotate model
      meshRef.current.rotation.y = time * 0.15 + scrollProgress * Math.PI;
      meshRef.current.rotation.x = time * 0.08;
    }

    if (materialRef.current) {
      // 2. Color transition based on scroll progress
      // Hero: blue, About: cyan, Skills: purple, Projects: blue-purple, Contact: cyan-blue
      let color1 = new THREE.Color('#0066cc'); // Blue
      let color2 = new THREE.Color('#00f2fe'); // Cyan
      let color3 = new THREE.Color('#8622e6'); // Purple

      let targetColor = color1;
      if (scrollProgress <= 0.25) {
        targetColor = color1.clone().lerp(color2, scrollProgress / 0.25);
      } else if (scrollProgress > 0.25 && scrollProgress <= 0.5) {
        targetColor = color2.clone().lerp(color3, (scrollProgress - 0.25) / 0.25);
      } else if (scrollProgress > 0.5 && scrollProgress <= 0.75) {
        targetColor = color3.clone().lerp(color1, (scrollProgress - 0.5) / 0.25);
      } else {
        targetColor = color1.clone().lerp(color2, (scrollProgress - 0.75) / 0.25);
      }

      materialRef.current.color.lerp(targetColor, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <Sphere ref={meshRef} args={[1.0, 64, 64]} position={[1.2, 0, 0]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#0066cc"
          distort={0.4}
          speed={3}
          roughness={0.1}
          metalness={0.9}
          bumpScale={0.05}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </Sphere>
    </Float>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 w-screen h-screen pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <ambientLight intensity={0.4} />
        
        {/* Colorful spotlights pointing at coordinates to reflect on metal blob */}
        <spotLight position={[10, 10, 10]} intensity={1.5} color="#00f2fe" />
        <spotLight position={[-10, -10, -10]} intensity={1} color="#8622e6" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#ffffff" />

        <MorphingBlob />
      </Canvas>
    </div>
  );
}
