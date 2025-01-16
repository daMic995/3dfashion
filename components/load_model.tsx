'use client';

import { Canvas, useFrame} from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { Group, Box3, Vector3, Mesh } from 'three';

const ModelLoader = ({ url }: { url: string }) => {
    const { scene } = useGLTF(url);
    const groupRef = useRef<Group>(null);
    
    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    );
};

const LoadingSpinner = () => {
    const ref = useRef<Mesh>(null);

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.z += 0.01;
        }
    });

    return (
        <mesh ref={ref}>
            <ringGeometry args={[0.1, 0.15, 10]} />
            <meshStandardMaterial color="black" />
        </mesh>
    );
};

const ModelViewer = ({ modelUrl }: { modelUrl: string }) => {
    return (
        <Canvas gl={{ antialias: true }} dpr={[1, 5]} className="relative">
            <ambientLight intensity={1} />
            <Suspense fallback={<LoadingSpinner />}>
                <ModelLoader url={modelUrl} />
                <OrbitControls />
            </Suspense>
        </Canvas>
    );
};

export default ModelViewer;