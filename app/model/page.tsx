"use client"
import dynamic from 'next/dynamic';
import bodyMeasurements, {metricUnit} from '@/components/body_measurement';

const MannequinViewer = dynamic(() => import('@/components/load_model'), { ssr: false });

export default function Model() {
    return (
        <div className="h-full w-full overflow-hidden">
            <div className="grid grid-cols-5 gap-0 h-full w-full">
                <section id="body-measurements" className="bg-white flex flex-col h-full w-full max-w-xl text-center lg:text-left z-30">
                    <div className="px-5 py-3 font-bold text-sm leading-none bg-indigo-700 text-white w-full inline-block text-center relative">
                        AI Powered Body Measurements
                    </div>
                    <div
                        id="body-data"
                        className="flex flex-col w-full p-2 overflow-y-auto h-[calc(100vh-56px)] scroll-smooth relative">
                            <div className="flex grid-cols-2 w-full font-bold">
                                <div id="body-part-header" className="flex-auto w-1/2 text-sm">Body Part</div>
                                <div id="body-part-value-header" className="flex-auto w-1/2 text-sm">Length ({metricUnit})</div>
                            </div>
                        {bodyMeasurements.map((part) => (
                            <div key={part.name} className="flex grid-cols-2 w-full">
                                <div id="body-part" className="flex-auto w-1/2 text-sm">{part.name}</div>
                                <div id="body-part-value" className="flex-auto w-1/2 text-sm">{part.value}</div>
                            </div>
                        ))}
                    </div>
                </section>
                <section id="model" className="col-span-4">
                    <MannequinViewer modelUrl="/models/robot_playground.glb" />
                </section>
            </div>
        </div>
    );
}