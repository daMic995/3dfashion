"use client";
import { useEffect } from 'react';

import { ThreeCircles } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='flex items-center justify-center'>
            <ThreeCircles color="#6366F1" height={60} width={60} />
        </div>
    );
}

function logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('measurements');

    console.log('Logging out...');
    console.log(localStorage.getItem('user_id'));
    
    setTimeout(() => {
        window.location.href = '/';
    }, 10); // Delay the redirection slightly to ensure localStorage operations complete
}

export default function Logout() {
    useEffect(() => {
        logout();
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white">
            <div className='flex flex-col'>
                <h1 className="text-2xl lg:md:text-3xl font-bold mb-8">Logging Out...</h1>
                <Loader />
            </div>
        </div>
    );
}