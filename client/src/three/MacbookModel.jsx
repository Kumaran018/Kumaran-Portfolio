import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// Helper to draw realistic Apple logo shape paths
const createAppleLogoGeometries = () => {
  // Apple body shape
  const bodyShape = new THREE.Shape();
  bodyShape.moveTo(0, 0.12);
  
  // Left curve
  bodyShape.bezierCurveTo(-0.12, 0.12, -0.22, 0.06, -0.28, -0.04);
  bodyShape.bezierCurveTo(-0.35, -0.15, -0.32, -0.32, -0.22, -0.42);
  bodyShape.bezierCurveTo(-0.12, -0.52, 0, -0.45, 0, -0.45); // bottom center dip
  
  // Right curve
  bodyShape.bezierCurveTo(0, -0.45, 0.12, -0.52, 0.22, -0.42);
  bodyShape.bezierCurveTo(0.32, -0.32, 0.35, -0.15, 0.32, -0.04);
  
  // Bite on the right
  bodyShape.bezierCurveTo(0.24, -0.04, 0.20, 0.00, 0.20, 0.06);
  bodyShape.bezierCurveTo(0.20, 0.12, 0.24, 0.16, 0.28, 0.16);
  bodyShape.bezierCurveTo(0.18, 0.20, 0.10, 0.12, 0, 0.12);

  // Tilted Leaf shape
  const leafShape = new THREE.Shape();
  leafShape.moveTo(0.00, 0.16);
  leafShape.quadraticCurveTo(0.08, 0.22, 0.10, 0.34);
  leafShape.quadraticCurveTo(-0.03, 0.30, 0.00, 0.16);

  const bodyGeom = new THREE.ShapeGeometry(bodyShape);
  const leafGeom = new THREE.ShapeGeometry(leafShape);

  return { bodyGeom, leafGeom };
};

const { bodyGeom, leafGeom } = createAppleLogoGeometries();

export default function MacbookModel({ isOpen, onOpened }) {
  const groupRef = useRef();
  const hingeRef = useRef();
  const screenLightRef = useRef();
  const screenMeshRef = useRef();

  const [bootStep, setBootStep] = useState(0); // 0: Off, 1: Apple logo, 2: Progress bar, 3: Completed
  const [progress, setProgress] = useState(0);

  const { camera } = useThree();

  // Mouse hover reaction (tilt)
  const targetRotation = useRef({ x: 0.15, y: -0.4 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      
      if (!isOpen) {
        targetRotation.current.y = -0.4 + mouse.current.x * 0.12;
        targetRotation.current.x = 0.15 - mouse.current.y * 0.08;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isOpen]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.current.x, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.current.y, 0.05);
    }
  });

  // Handle open animation
  useEffect(() => {
    if (isOpen) {
      // Rotate the group to face front
      gsap.to(targetRotation.current, {
        x: 0,
        y: 0,
        duration: 1.5,
        ease: 'power2.inOut',
      });

      // Lift/rotate the screen lid open from Math.PI / 2 (closed) to -0.3 (open)
      gsap.fromTo(hingeRef.current.rotation, 
        { x: Math.PI / 2 },
        {
          x: -0.35,
          duration: 2.2,
          ease: 'power3.inOut',
          onComplete: () => {
            setBootStep(1);
          }
        }
      );

      // Animate Camera to zoom in close to the display viewport
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 3.4,
        duration: 3.5,
        delay: 0.5,
        ease: 'power2.inOut',
      });
    }
  }, [isOpen, camera]);

  // Boot sequence progress animation
  useEffect(() => {
    if (bootStep === 1) {
      const timer = setTimeout(() => {
        setBootStep(2);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (bootStep === 2) {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: 100,
        duration: 1.8,
        ease: 'power1.inOut',
        onUpdate: () => setProgress(Math.floor(obj.val)),
        onComplete: () => {
          setBootStep(3);
          setTimeout(() => {
            if (onOpened) onOpened();
          }, 600);
        }
      });
    }
  }, [bootStep, onOpened]);

  return (
    <group ref={groupRef} position={[0, -0.5, 0]} rotation={[0.15, -0.4, 0]}>
      
      {/* 1. CNC-Machined Base (Rounded corners silver aluminum case) */}
      <RoundedBox args={[3.2, 0.08, 2.2]} radius={0.05} smoothness={8} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#cfcfcf" 
          roughness={0.25} 
          metalness={0.7} 
        />
      </RoundedBox>

      {/* 1b. Trackpad */}
      <RoundedBox args={[1.0, 0.005, 0.65]} radius={0.015} smoothness={4} position={[0, 0.041, 0.5]}>
        <meshStandardMaterial 
          color="#bcbcbc" 
          roughness={0.4} 
          metalness={0.3} 
        />
      </RoundedBox>

      {/* 1c. Keyboard Bed (Recessed track) */}
      <mesh position={[0, 0.041, -0.3]}>
        <boxGeometry args={[2.8, 0.002, 1.0]} />
        <meshStandardMaterial color="#b5b5b5" roughness={0.6} />
      </mesh>

      {/* 1d. Key Caps */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={i} position={[0, 0.043, -0.7 + i * 0.2]}>
          <boxGeometry args={[2.6, 0.01, 0.12]} />
          <meshStandardMaterial color="#1c1c1c" roughness={0.5} />
        </mesh>
      ))}

      {/* 2. Hinge Pivot Group (Rotates along the X axis) */}
      <group ref={hingeRef} position={[0, 0.04, -1.08]} rotation={[Math.PI / 2, 0, 0]}>
        
        {/* Horizontal Cylinder Hinge Mesh (Properly aligned along X axis) */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.035, 0.035, 3.0, 24]} />
          <meshStandardMaterial color="#555555" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* 3. Screen Lid Group */}
        <group position={[0, 0, 0]}>
          
          {/* Lid Aluminum Shell */}
          <group position={[0, 1.05, -0.01]}>
            <RoundedBox args={[3.2, 2.1, 0.04]} radius={0.05} smoothness={8} castShadow>
              <meshStandardMaterial 
                color="#cfcfcf" 
                roughness={0.25} 
                metalness={0.7} 
              />
            </RoundedBox>
          </group>

          {/* Glowing Vector Apple Logo on BACK cover (Correctly scaled and centered) */}
          <group position={[0, 1.05, -0.035]} rotation={[0, Math.PI, 0]} scale={[0.6, 0.6, 1.0]}>
            <mesh geometry={bodyGeom}>
              <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </mesh>
            <mesh geometry={leafGeom}>
              <meshBasicMaterial color="#ffffff" toneMapped={false} />
            </mesh>
          </group>

          {/* 4. Display Bezel */}
          <group position={[0, 1.05, 0.012]} ref={screenMeshRef}>
            <RoundedBox args={[3.12, 2.02, 0.01]} radius={0.04} smoothness={8}>
              <meshStandardMaterial 
                color="#0a0a0a" 
                roughness={0.8} 
              />
            </RoundedBox>

            {/* Glowing Screen Content */}
            {bootStep > 0 && (
              <group position={[0, 0, 0.008]}>
                <pointLight 
                  ref={screenLightRef}
                  position={[0, 0, 0.2]} 
                  intensity={1.8} 
                  distance={4}
                  color="#ffffff" 
                />

                {/* Black desktop backdrop plane */}
                <mesh>
                  <planeGeometry args={[3.04, 1.94]} />
                  <meshBasicMaterial color="#000000" />
                </mesh>

                {/* Apple logo center boot */}
                {(bootStep === 1 || bootStep === 2) && (
                  <group position={[0, -0.1, 0.001]} scale={[0.5, 0.5, 1.0]}>
                    <mesh geometry={bodyGeom}>
                      <meshBasicMaterial color="#ffffff" />
                    </mesh>
                    <mesh geometry={leafGeom}>
                      <meshBasicMaterial color="#ffffff" />
                    </mesh>
                  </group>
                )}

                {/* Boot progress loading bar */}
                {bootStep === 2 && (
                  <group position={[0, -0.45, 0.001]}>
                    <mesh>
                      <planeGeometry args={[1.2, 0.03]} />
                      <meshBasicMaterial color="#2d2d2d" />
                    </mesh>
                    <mesh position={[-0.6 + (progress / 100) * 0.6, 0, 0.001]}>
                      <planeGeometry args={[(progress / 100) * 1.2, 0.03]} />
                      <meshBasicMaterial color="#ffffff" />
                    </mesh>
                  </group>
                )}

                {/* Welcome desktop screen */}
                {bootStep === 3 && (
                  <group>
                    <mesh>
                      <planeGeometry args={[3.04, 1.94]} />
                      <meshBasicMaterial color="#020012" />
                    </mesh>
                    
                    <mesh position={[0, 0, 0.001]}>
                      <planeGeometry args={[2.8, 1.8]} />
                      <meshBasicMaterial 
                        color="#051540" 
                        transparent 
                        opacity={0.8}
                      />
                    </mesh>

                    <Text
                      position={[0, 0.2, 0.005]}
                      fontSize={0.16}
                      color="#ffffff"
                      fontWeight="bold"
                    >
                      Kumaran R P
                    </Text>
                    <Text
                      position={[0, -0.1, 0.005]}
                      fontSize={0.08}
                      color="#88aaff"
                    >
                      Welcome To The World
                    </Text>
                  </group>
                )}
              </group>
            )} 
          </group>
        </group>
      </group>
    </group>
  );
}
