import dynamic from 'next/dynamic';


const MannequinViewer = dynamic(() => import('@/app/model/load_model'), { ssr: false });

export default function Model() {
    return (
        <main className="h-full w-full">
            <MannequinViewer modelUrl="/models/female.glb" />
        </main>
        
    );
}

