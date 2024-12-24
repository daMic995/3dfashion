'use client';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ModelLoader = ({ url }: { url: string }) => {
    const gltf = useLoader(GLTFLoader, url);
    const group = useRef<Group>(null);

    return (
        <group ref={group}>
            <primitive object={gltf.scene} />
        </group>
    );
};

const LoadingSpinner = () => {
    return <mesh><sphereGeometry args={[1, 10, 10]} /><meshStandardMaterial color="black" /></mesh>;
};

const MannequinViewer = ({ modelUrl }: { modelUrl: string }) => {
    return (
        <Canvas gl={{ antialias: true }} dpr={[1, 5]}>
            <ambientLight intensity={1} />
            <Suspense fallback={<LoadingSpinner />}>
                <ModelLoader url={modelUrl} />
                <OrbitControls />
            </Suspense>
        </Canvas>
    );
};

export default MannequinViewer;