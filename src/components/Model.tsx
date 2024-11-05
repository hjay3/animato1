import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { useSpring, animated } from '@react-spring/three';
import { useModelLoader } from '../hooks/useModelLoader';
import { useSoundEngine } from '../hooks/useSoundEngine';
import { useAnimationEngine } from '../hooks/useAnimationEngine';

export default function Model() {
  const meshRef = useRef<Mesh>(null);
  const [targetPosition] = useState(new Vector3(0, 0, 0));
  
  const { currentModel, switchModel } = useModelLoader();
  const { playRandomNote } = useSoundEngine();
  const { scale, getAnimationValues } = useAnimationEngine();

  useEffect(() => {
    const interval = setInterval(() => {
      switchModel();
      targetPosition.set(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2
      );
    }, 5000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [switchModel]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const { rotation, position, shouldPlayNote } = getAnimationValues(state.clock);
    
    // Apply smooth rotations
    meshRef.current.rotation.x = rotation.x;
    meshRef.current.rotation.y = rotation.y;
    meshRef.current.rotation.z = rotation.z;

    // Smooth position interpolation
    meshRef.current.position.lerp(targetPosition, 0.02);
    
    // Apply subtle movements
    meshRef.current.position.y += position.y;
    meshRef.current.position.x += position.x;

    if (shouldPlayNote) {
      playRandomNote();
    }
  });

  return (
    <animated.mesh ref={meshRef} scale={scale}>
      <primitive
        object={currentModel}
        scale={0.15}
        rotation={[0, Math.PI, 0]}
      />
    </animated.mesh>
  );
}