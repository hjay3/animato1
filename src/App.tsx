import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import Model from './components/Model';
import LoadingScreen from './components/LoadingScreen';

function App() {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 flex items-center justify-center">
      <div className="w-[90vw] h-[90vw] max-w-[800px] max-h-[800px] relative">
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-75"></div>
        <div className="absolute inset-0 bg-pink-500/5 rounded-full blur-xl animate-pulse delay-150"></div>
        <Canvas
          camera={{ position: [0, 0, 3], fov: 40 }}
          className="rounded-lg shadow-2xl"
        >
          <Suspense fallback={<LoadingScreen />}>
            <ambientLight intensity={0.8} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1.5}
              castShadow
            />
            <pointLight position={[-10, -10, -10]} intensity={0.8} />
            <pointLight
              position={[5, 5, 5]}
              intensity={0.5}
              color="#ff7f50"
            />
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
            <Model />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              minPolarAngle={Math.PI / 2.5}
              maxPolarAngle={Math.PI / 1.5}
              autoRotate
              autoRotateSpeed={0.5}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default App;