import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Stars, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Sub-component to render the Image Card in 3D with mouse tilt
function ThreeDCard({ isHovered, coords, isLightTheme }) {
  const [texture, setTexture] = useState(null);
  const groupRef = useRef();
  const materialRef = useRef();

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.load('/throne.webp', (tex) => {
      if ('colorSpace' in tex) tex.colorSpace = THREE.SRGBColorSpace;
      else tex.encoding = 3001; // sRGBEncoding
      setTexture(tex);
    });
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    let targetRotationX = 0;
    let targetRotationY = 0;

    if (isHovered) {
      const ndcX = (coords.x / 310) * 2 - 1;
      const ndcY = (coords.y / 410) * 2 - 1;
      targetRotationY = ndcX * 0.22; // Rotate around Y
      targetRotationX = -ndcY * 0.22; // Rotate around X
    }

    // Smoothly lerp towards target rotation
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.08);
    
    // Add a gentle floating animation
    const time = Date.now() * 0.001;
    groupRef.current.position.y = Math.sin(time * 1.2) * 0.06;

    // Pulse the emissive intensity of the border for a dynamic lightning/energy glow!
    if (materialRef.current) {
      const baseIntensity = isLightTheme ? 0.45 : 0.95;
      materialRef.current.emissiveIntensity = baseIntensity + Math.sin(time * 6.0) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Premium Glass Card Backing with Dynamic Energy Glow */}
      <RoundedBox args={[2.2, 2.9, 0.06]} radius={0.08} smoothness={4}>
        <meshPhysicalMaterial 
          ref={materialRef}
          clearcoat={1.0} 
          clearcoatRoughness={0.1} 
          transmission={0.4} 
          opacity={1} 
          thickness={0.8} 
          roughness={0.1} 
          metalness={0.1}
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={isLightTheme ? 0.45 : 0.95}
        />
      </RoundedBox>
      
      {/* Front Image Overlay */}
      {texture && (
        <mesh position={[0, 0, 0.032]}>
          <planeGeometry args={[2.12, 2.82]} />
          <meshBasicMaterial map={texture} transparent side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

// Sub-component to manage the Orbits and Spheres
function OrbitalAnimation({ isLightTheme }) {
  const orb1Ref = useRef();
  const orb2Ref = useRef();
  const orb3Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Orb 1: moves on Torus 1 (Gold)
    if (orb1Ref.current) {
      const angle = t * 0.5;
      const x = Math.cos(angle) * 1.8;
      const y = Math.sin(angle) * 1.8;
      const pos = new THREE.Vector3(x, y, 0);
      pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2.3);
      pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 6);
      orb1Ref.current.position.copy(pos);
    }

    // Orb 2: moves on Torus 2 (Cyan)
    if (orb2Ref.current) {
      const angle = -t * 0.4;
      const x = Math.cos(angle) * 2.1;
      const y = Math.sin(angle) * 2.1;
      const pos = new THREE.Vector3(x, y, 0);
      pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 3.2);
      pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 5);
      orb2Ref.current.position.copy(pos);
    }

    // Orb 3: moves on Torus 3 (Purple)
    if (orb3Ref.current) {
      const angle = t * 0.7;
      const x = Math.cos(angle) * 1.5;
      const y = Math.sin(angle) * 1.5;
      const pos = new THREE.Vector3(x, y, 0);
      pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 3.8);
      pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 4);
      orb3Ref.current.position.copy(pos);
    }
  });

  return (
    <group>
      {/* Torus 1: Gold */}
      <mesh rotation={[Math.PI / 2.3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.8, 0.005, 8, 100]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={isLightTheme ? 0.22 : 0.15} />
      </mesh>
      <mesh ref={orb1Ref}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color="#d4af37" />
      </mesh>

      {/* Torus 2: Cyan */}
      <mesh rotation={[Math.PI / 3.2, -Math.PI / 5, 0]}>
        <torusGeometry args={[2.1, 0.004, 8, 100]} />
        <meshBasicMaterial color="#00f2fe" transparent opacity={isLightTheme ? 0.2 : 0.12} />
      </mesh>
      <mesh ref={orb2Ref}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#00f2fe" />
      </mesh>

      {/* Torus 3: Purple */}
      <mesh rotation={[-Math.PI / 3.8, Math.PI / 4, 0]}>
        <torusGeometry args={[1.5, 0.004, 8, 100]} />
        <meshBasicMaterial color="#8622e6" transparent opacity={isLightTheme ? 0.2 : 0.12} />
      </mesh>
      <mesh ref={orb3Ref}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#8622e6" />
      </mesh>
    </group>
  );
}

// Fallback component to show while loading
function ThreeDLoader() {
  return null;
}

export default function HeroThrone3D({ onReady }) {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isLightTheme, setIsLightTheme] = useState(() => {
    return document.body.classList.contains('light-theme');
  });

  useEffect(() => {
    const handleThemeChange = () => {
      setIsLightTheme(document.body.classList.contains('light-theme'));
    };
    window.addEventListener('themechange', handleThemeChange);
    return () => window.removeEventListener('themechange', handleThemeChange);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - left,
      y: e.clientY - top
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-full max-w-md h-[430px] md:h-[530px] flex items-center justify-center relative z-10 select-none cursor-pointer"
    >
      {/* 3D Canvas directly without outer container box or borders */}
      <div className="absolute inset-0 w-full h-full">
        <Canvas 
          camera={{ position: [0, 0, 4.2], fov: 50 }}
          onCreated={() => {
            if (onReady) onReady();
          }}
        >
          <ambientLight intensity={isLightTheme ? 1.2 : 0.8} />
          <pointLight position={[10, 10, 10]} intensity={isLightTheme ? 2.0 : 1.5} />
          
          <ThreeDCard isHovered={isHovered} coords={coords} isLightTheme={isLightTheme} />
          <OrbitalAnimation isLightTheme={isLightTheme} />

          {/* Futuristic Glowing Concentric Platform Pedestal */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
            <ringGeometry args={[1.75, 1.77, 64]} />
            <meshBasicMaterial color="#d4af37" transparent opacity={isLightTheme ? 0.35 : 0.25} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
            <ringGeometry args={[1.4, 1.415, 64]} />
            <meshBasicMaterial color="#00f2fe" transparent opacity={isLightTheme ? 0.25 : 0.18} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
            <ringGeometry args={[1.0, 1.01, 64]} />
            <meshBasicMaterial color="#8622e6" transparent opacity={isLightTheme ? 0.25 : 0.18} />
          </mesh>

          {!isLightTheme && <Stars radius={100} depth={50} count={120} factor={4} saturation={0.5} fade speed={1} />}
        </Canvas>
      </div>
    </div>
  );
}
