// Deai - R3F
import {MeshWobbleMaterial, OrbitControls} from '@react-three/drei';
import React, {useRef} from 'react';

//R3F
import {useFrame, Canvas} from '@react-three/fiber';

import './App.css';

const SpringBox = ({position, args, color, speed}) => {
  const meshRef = useRef();
  useFrame(
    () => (meshRef.current.rotation.x = meshRef.current.rotation.y += 0.01),
  );

  return (
    <mesh castShadow position={position} ref={meshRef}>
      <boxBufferGeometry attach="geometry" args={args} />
      <MeshWobbleMaterial
        attach="material"
        color={color}
        speed={speed}
        factor={0.6}
      />
    </mesh>
  );
};

function App() {
  return (
    <>
      <Canvas shadows colorManagement camera={{position: [-5, 2, 10], fov: 60}}>
        <ambientLight intensity={0.3} />
        <directionalLight
          castShadow
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, 10, 0]} intensity={1.5} />

        <group>
          <mesh
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, -3, 0]}
          >
            <planeBufferGeometry attach="geometry" args={[100, 100]} />

            <shadowMaterial attach="material" opacity={0.3} />
          </mesh>
          <SpringBox
            position={[0, 1, 0]}
            args={[3, 2, 1]}
            color="lightblue"
            speed={2}
          />
          <SpringBox position={[-2, 1, -5]} color="pink" speed={6} />
          <SpringBox position={[5, 1, -2]} color="pink" speed={6} />
        </group>

        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
