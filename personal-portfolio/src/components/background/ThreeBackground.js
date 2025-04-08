// components/background/ThreeBackground.js (Removed overflow-hidden)

import React, { useRef, useMemo, Suspense } from 'react'; 
import { Canvas, useFrame, useThree } from '@react-three/fiber'; 
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function InteractiveStars(props) {
  const ref = useRef();
  const { viewport, mouse } = useThree(); 

  const positions = useMemo(() => {
    const count = 5000; 
    const posArray = new Float32Array(count * 3);
    const radius = Math.max(viewport.width, viewport.height) * 1.5; 
    for (let i = 0; i < count * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * radius; 
    }
    return posArray;
  }, [viewport]); 

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y = THREE.MathUtils.lerp(
        ref.current.rotation.y,
        (mouse.x * Math.PI) / 15, 
        0.03 
      );
       ref.current.rotation.x = THREE.MathUtils.lerp(
        ref.current.rotation.x,
        (mouse.y * Math.PI) / 15,
        0.03
      );
    }
  });

  return (
    <group> 
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffffff" 
          size={0.008}   
          sizeAttenuation={true}
          depthWrite={false} 
        />
      </Points>
    </group>
  );
}

export const ThreeBackground = () => {
  return (
    // REMOVED overflow-hidden from this div
    <div className="absolute inset-0 z-[-1] bg-gray-900"> 
      <Canvas
         camera={{ position: [0, 0, 1] }} 
         onCreated={({ gl }) => { 
           gl.domElement.style.cursor = 'move'; 
         }}
       >
         <Suspense fallback={null}> 
           <ambientLight intensity={0.3} /> 
           <directionalLight position={[5, 5, 5]} intensity={0.5} /> 
           <InteractiveStars /> 
         </Suspense>
       </Canvas>
    </div>
  );
};