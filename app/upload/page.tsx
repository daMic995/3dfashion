"use client";

import { useRouter } from 'next/navigation';
import { createContext, useState, useEffect} from 'react';
import { ImCancelCircle } from "react-icons/im";
import { IoIosCloudUpload } from "react-icons/io";

import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='flex items-center justify-center'>
            <ThreeCircles color="#6366F1" height={70} width={70} />
        </div>
    );
}

export default function Upload() {

    const router = useRouter();

    // Manage uploaded file states
    const [frontViewFile, setFrontViewFile] = useState<File | null>(null);
    const [sideViewFile, setSideViewFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<number|null>(null);

    // Send uploaded files to backend for processing
    const uploadViews = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Button Clicked')
        setLoading(true);

        const formData = new FormData();
        formData.append('frontView', frontViewFile!);
        formData.append('sideView', sideViewFile!);
        
        try {
            const task = await fetch('/api/python/upload', {
                method: 'POST',
                body: formData,
            });

            const response = await task.json();

            setStatus(response.status);

            // Store measurements in local storage
            localStorage.setItem('measurements', JSON.stringify(response.measurements));
            
            setLoading(false);
            
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Return success message if upload is successful
    if (status === 200) {
        return(
            <div className='min-h-screen flex flex-col items-center justify-center text-center bg-white'>
                <h1 className="text-2xl lg:md:text-3xl font-bold mb-8">Success!</h1>
                <p className="text-lg text-gray-600 mb-4">Your images have been successfully uploaded and processed.</p>
                <button className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700'
                onClick={() => router.push('/dashboard')}>Access Body Measurements</button>
            </div>
        )
    };

    // Force Login
    /* 
    useEffect(() => {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
            router.push('/login');
        }
    }, [router]);*/

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800">
           <div className='grid grid-cols-2 gap-2 px-16 py-16 lg:md:py-0'>
                <div className='w-3/4 max-w-4xl text-left py-16 lg:md:py-0'>
                    <h1 className="text-4xl lg:md:text-5xl font-bold mb-8">Upload Your Image Views</h1>
                    <ul className='text-lg list-decimal list-inside text-left text-gray-600'>
                        <li>Upload your front and side view images.</li>
                        <li>Images must be in PNG, JPG, GIF or SVG format.</li>
                        <li>Images must be clear and high resolution.</li>
                        <li>Get your body measurements!</li>
                    </ul>
                </div>
                {loading ? <Loader/> : 
                <div>
                <div className='w-full max-w-3xl grid grid-rows-2 lg:md:grid-cols-2 lg:md:grid-rows-1 gap-4 bg-gray-100 rounded-lg shadow-lg'>
                    <div className='p-4 flex flex-col items-center'>
                        <div className='flex items-center mb-4'>
                            <h1 className="text-lg font-bold">Front View</h1>
                            {frontViewFile && 
                            <ImCancelCircle size={20} className="text-red-500 cursor-pointer ml-4" 
                            onClick={() => setFrontViewFile(null)} />}
                        </div>

                        {frontViewFile ? (
                        <img
                            src={URL.createObjectURL(frontViewFile)}
                            alt="Front View"
                            width="200"
                            height="200"
                        />
                        ) : 
                        <label htmlFor="dropzone-file1" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">
                                    Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 px-2">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file1" type="file" className="hidden" onChange={(e) => setFrontViewFile(e.target.files![0])} />
                        </label>
                        }
                    </div>
                    <div className='p-4 flex flex-col items-center justify-center'>
                        <div className='flex items-center mb-4'>
                            <h1 className="text-lg font-bold">Side View</h1>
                            {sideViewFile &&
                            <ImCancelCircle size={20} className="text-red-500 cursor-pointer ml-4" 
                            onClick={() => setSideViewFile(null)} />}
                        </div>
                        {sideViewFile ? (
                        <img
                            src={URL.createObjectURL(sideViewFile)}
                            alt="Side View"
                            width="200"
                            height="200"
                        />
                        ): 
                        <label htmlFor="dropzone-file2" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">
                                    Click to upload</span> or drag and drop</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 px-2">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file2" type="file" className="hidden" onChange={(e) => setSideViewFile(e.target.files![0])} />
                        </label>
                        }
                    </div>
                </div>
                {frontViewFile && sideViewFile && 
                <div className='flex items-center justify-center'>
                <IoIosCloudUpload size={40} className="text-indigo-600 mt-6 cursor-pointer transform hover:scale-110" 
                onClick={uploadViews}/>
                </div>
                }
                </div>
                }
            </div>
        </div>
    );
}