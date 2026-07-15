import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Sub-component to render the Image Card in 3D with mouse tilt
function ThreeDCard({ isHovered, coords }) {
  const texture = useTexture('/throne.png');
  const groupRef = useRef();

  useFrame(() => {
    if (!groupRef.current) return;
    let targetRotationX = 0;
    let targetRotationY = 0;

    if (isHovered) {
      // Normalize mouse coordinates (coords are from 0 to container width/height)
      // Standard card dimensions: 310px width, 410px height
      const ndcX = (coords.x / 310) * 2 - 1;
      const ndcY = (coords.y / 410) * 2 - 1;
      targetRotationY = ndcX * 0.25; // Rotate around Y
      targetRotationX = -ndcY * 0.25; // Rotate around X
    }

    // Smoothly lerp towards target rotation
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.08);
    
    // Add a gentle floating animation
    const time = Date.now() * 0.001;
    groupRef.current.position.y = Math.sin(time * 1.5) * 0.05;
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic Golden glow border */}
      <mesh position={[0, 0, -0.015]}>
        <planeGeometry args={[2.26, 2.96]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.8} />
      </mesh>
      
      {/* Main Image Plane */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.2, 2.9]} />
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Sub-component to manage the Orbits and Spheres
function OrbitalAnimation() {
  const orb1Ref = useRef();
  const orb2Ref = useRef();
  const orb3Ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Orb 1: moves on Torus 1 (Gold)
    if (orb1Ref.current) {
      const angle = t * 0.7;
      const x = Math.cos(angle) * 1.9;
      const y = Math.sin(angle) * 1.9;
      const pos = new THREE.Vector3(x, y, 0);
      pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2.2);
      pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 5);
      orb1Ref.current.position.copy(pos);
    }

    // Orb 2: moves on Torus 2 (Cyan)
    if (orb2Ref.current) {
      const angle = -t * 0.5;
      const x = Math.cos(angle) * 2.2;
      const y = Math.sin(angle) * 2.2;
      const pos = new THREE.Vector3(x, y, 0);
      pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 3.5);
      pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 4.5);
      orb2Ref.current.position.copy(pos);
    }

    // Orb 3: moves on Torus 3 (Purple)
    if (orb3Ref.current) {
      const angle = t * 0.9;
      const x = Math.cos(angle) * 1.6;
      const y = Math.sin(angle) * 1.6;
      const pos = new THREE.Vector3(x, y, 0);
      pos.applyAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 4);
      pos.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 3);
      orb3Ref.current.position.copy(pos);
    }
  });

  return (
    <group>
      {/* Torus 1: Gold */}
      <mesh rotation={[Math.PI / 2.2, Math.PI / 5, 0]}>
        <torusGeometry args={[1.9, 0.012, 16, 100]} />
        <meshBasicMaterial color="#d4af37" transparent opacity={0.25} />
      </mesh>
      <mesh ref={orb1Ref}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#d4af37" />
      </mesh>

      {/* Torus 2: Cyan */}
      <mesh rotation={[Math.PI / 3.5, -Math.PI / 4.5, 0]}>
        <torusGeometry args={[2.2, 0.01, 16, 100]} />
        <meshBasicMaterial color="#00f2fe" transparent opacity={0.2} />
      </mesh>
      <mesh ref={orb2Ref}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#00f2fe" />
      </mesh>

      {/* Torus 3: Purple */}
      <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[1.6, 0.01, 16, 100]} />
        <meshBasicMaterial color="#8622e6" transparent opacity={0.2} />
      </mesh>
      <mesh ref={orb3Ref}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#8622e6" />
      </mesh>
    </group>
  );
}

// Fallback component to show while loading
function ThreeDLoader() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color="#d4af37" wireframe />
    </mesh>
  );
}

export default function HeroThrone3D() {
  const containerRef = useRef(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

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
      {/* 3D Canvas */}
      <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden bg-black/40 border border-white/5 backdrop-blur-sm">
        <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          
          <Suspense fallback={<ThreeDLoader />}>
            <ThreeDCard isHovered={isHovered} coords={coords} />
            <OrbitalAnimation />
          </Suspense>

          {/* Grid helper floor similar to second image */}
          <gridHelper 
            args={[10, 20, '#d4af37', '#222222']} 
            position={[0, -2.0, 0]} 
            rotation={[Math.PI / 12, 0, 0]} 
          />

          <Stars radius={100} depth={50} count={200} factor={4} saturation={0.5} fade speed={1} />
        </Canvas>
      </div>

      {/* Decorative Golden Corner Highlights (HTML overlaid on top of canvas) */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#d4af37]/60 pointer-events-none" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#d4af37]/60 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#d4af37]/60 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#d4af37]/60 pointer-events-none" />
    </div>
  );
}
