"use client";
import { useEffect } from 'react';

function logout() {
    localStorage.removeItem('user_id');
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
        <div className="min-h-screen flex items-center justify-center">
            <p>Logging out...</p>
        </div>
    );
}