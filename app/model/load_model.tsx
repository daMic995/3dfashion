'use client';

import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Group, Box3, Vector3 } from 'three';

const ModelLoader = ({ url }: { url: string }) => {
    const gltf = useLoader(GLTFLoader, url);
    const scene = gltf.scene;
    const groupRef = useRef<Group>(null);

    useEffect(() => {
        if (groupRef.current) {
            const box = new Box3().setFromObject(scene); // Compute the bounding box of the model
            const center = box.getCenter(new Vector3()); // Get the center of the bounding box
            const size = box.getSize(new Vector3()); // Get the size of the bounding box
            scene.position.set(-center.x, -center.y + size.y / 2, -center.z); // Center the model
        }
    }, [scene]);

    return (
        <group ref={groupRef}>
            <primitive object={scene} />
        </group>
    );
};

const LoadingSpinner = () => {
    return (
        <mesh>
            <sphereGeometry args={[1, 10, 10]} />
            <meshStandardMaterial color="black" />
        </mesh>
    );
};

const MannequinViewer = ({ modelUrl }: { modelUrl: string }) => {
    return (
        <Canvas gl={{ antialias: true }} dpr={[1, 5]} className="relative h-svh">
            <ambientLight intensity={1} />
            <Suspense fallback={<LoadingSpinner />}>
                <ModelLoader url={modelUrl} />
                <OrbitControls />
            </Suspense>
        </Canvas>
    );
};

export default MannequinViewer;