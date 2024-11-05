import { useSpring } from '@react-spring/three';
import { Clock } from 'three';

export function useAnimationEngine() {
  const { scale } = useSpring({
    from: { scale: 1.8 },
    to: [
      { scale: 2.5 + Math.random() * 2 },
      { scale: 1.8 + Math.random() }
    ],
    config: {
      mass: 2 + Math.random() * 1.5,
      tension: 170 + Math.random() * 20,
      friction: 10 + Math.random() * 4
    },
    loop: true,
  });

  const getAnimationValues = (clock: Clock) => {
    const time = clock.getElapsedTime();

    return {
      rotation: {
        x: Math.cos(time * 0.3) * 0.2,
        y: Math.sin(time * 0.5) * 0.8,
        z: Math.sin(time * 0.4) * 0.3
      },
      position: {
        x: Math.cos(time * 1.5) * 0.001,
        y: Math.sin(time * 2) * 0.002
      },
      shouldPlayNote: time % (2 + Math.random() * 3) < 0.1
    };
  };

  return { scale, getAnimationValues };
}