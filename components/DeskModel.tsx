'use client';

import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Desk = () => {
  const { scene } = useGLTF('/models/desk.glb');
  const ref = useRef<THREE.Object3D>(null);

  useEffect(() => {
    if (ref.current) {
      const box = new THREE.Box3().setFromObject(ref.current);
      const size = new THREE.Vector3();
      box.getSize(size);
      console.log('Model dimensions:', size);
    }
  }, []);

  return (
    <primitive object={scene} ref={ref} scale={[10, 10, 10]} position={[0, -1.5, 0]} />
  );
};

const DeskModel = () => {
  return (
    <Canvas
      camera={{ position: [0, 2, 8], fov: 50 }}
      style={{ background: '#121212' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 5, 2]} intensity={1} />
      <Suspense fallback={null}>
        <Desk />
      </Suspense>
      <OrbitControls />
      <gridHelper args={[10, 10]} />
    </Canvas>
  );
};

export default DeskModel;
