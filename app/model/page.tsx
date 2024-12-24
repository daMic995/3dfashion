"use client";
import dynamic from 'next/dynamic';

const MannequinViewer = dynamic(() => import("@/app/load3dmodel"), { ssr: false })

export default function Model() {
    return (
        <div className="flex justify-center h-full w-full lg:w-1/2 ms:pl-10 relative z-50">
            <MannequinViewer modelUrl="/models/robot_playground.glb"/>
        </div>
    )
}