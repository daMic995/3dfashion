import dynamic from 'next/dynamic';


const MannequinViewer = dynamic(() => import('@/app/model/load_model'), { ssr: false });

export default function Model() {
    return (
        <div className="container max-w-6xl mx-auto h-full flex flex-col justify-between items-center">
            <h2 className="text-indigo-500 uppercase text-base font-medium tracking-tight my-5">3D Model</h2>
            <MannequinViewer modelUrl="/models/robot_playground.glb" />
        </div>
    );
}

