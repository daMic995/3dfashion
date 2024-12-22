import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import * as THREE from 'three';


const ModelLoader = ({ url } : {url: string}) => {
    const gltf = useLoader(GLTFLoader, url);
    const { camera } = useThree();

    useEffect(() => {
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const size = new THREE.Vector3();
        box.getSize(size);

        const maxDimension = Math.max(size.x, size.y, size.z);
        const distance = maxDimension * 2; // Distance to fit model within the view
        camera.position.set(center.x, center.y, center.z + distance); // Move camera
        camera.lookAt(center); // Focus camera on model
    }, [gltf, camera]);
    return <primitive object={gltf.scene} />;
};

const LoadingSpinner = () => {
    return <mesh><sphereGeometry args={[1, 16, 16]} /><meshStandardMaterial color="white" /></mesh>;
};

const MannequinViewer = ({ modelUrl }: { modelUrl: string }) => {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <Suspense fallback={<LoadingSpinner />}>
                <ModelLoader url={modelUrl} />
            </Suspense>
        </Canvas>
    );
};

export default MannequinViewer;