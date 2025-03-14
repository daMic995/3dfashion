"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const loginAccessed = params.get('login_accessed');
        if (loginAccessed) {
            console.log('Login accessed:', loginAccessed);
            setIsLogin(loginAccessed === 'true'); // Convert to boolean
        }
    }, []);  
    
    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            setMessage1('Please enter both email and password');
            setStatus(400);
            return;
        }

        try {
            const response = await fetch('/api/python/authenticate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: loginEmail, password: loginPassword }),
            });
            const data = await response.json();
            setMessage1(data.message);
            setStatus(data.status);

            if (data.status === 200) {
                localStorage.setItem('user_id', data.user_id);
                router.push('/dashboard'); // Redirect to the dashboard page on successful login
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setMessage1('An error occurred while logging in. Please try again.');
            setStatus(500);
        } finally {
            setLoading(false);
        }
    };

    const handleSignUpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!signUpEmail || !signUpPassword || !firstName || !lastName) {
            setMessage2('Please enter all fields');
            setStatus(400);
            return;
        }

        try {
            const response = await fetch('/api/python/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: signUpEmail, password: signUpPassword, firstName, lastName }),
            });
            const data = await response.json();
            setMessage2(data.message);
            setStatus(data.status);

            if (data.status === 200) {
                localStorage.setItem('user_id', data.user_id);
                router.push('/dashboard'); // Redirect to the dashboard page on successful sign-up
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setMessage2('An error occurred while signing up. Please try again.');
            setStatus(500);
        } finally {
            setLoading(false);
        }
    };

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message1, setMessage1] = useState('');
    const [message2, setMessage2] = useState('');
    const [status, setStatus] = useState(200);

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 relative overflow-hidden">
                <div className="grid grid-cols-2 w-full relative" id='container'>
                    {/* Login Form */}
                    <div className={`p-6 sm:p-12 transform transition-transform duration-700 
                        ${isLogin ? 'translate-x-0 z-10' : ' -translate-x-full z-0'} `} id='login'>
                        <div className="mt-12 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="flex flex-col items-center">
                                    <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-700 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                        <div className="bg-white p-2 rounded-full">
                                            <svg className="w-4" viewBox="0 0 533.5 544.3">
                                                <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                                                <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                                                <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                                                <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
                                            </svg>
                                        </div>
                                        <span className="ml-4">Sign In with Google</span>
                                    </button>
                                </div>
                                <div className="my-4 border-b text-center">
                                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">Or sign in with e-mail</div>
                                </div>
                                <form className="w-full flex-1 mt-8" onSubmit={handleLoginSubmit}>
                                    <div className="flex flex-col items-center">
                                        <div className="mx-auto max-w-xs">
                                            <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" type="email" placeholder="Email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                                            <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5" type="password" placeholder="Password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                            <button type="submit" className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                                <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                    <circle cx="8.5" cy="7" r="4" />
                                                    <path d="M20 8v6M23 11h-6" />
                                                </svg>
                                                <span className="ml-3">Sign In</span>
                                            </button>
                                            <p className="mt-6 text-xs text-gray-600 text-center">
                                                I agree to abide by 3D Fashion's {" "}
                                                <a href="#" className="border-b border-gray-500 border-dotted">Terms of Service</a>
                                                {" "} and its {" "}
                                                <a href="#" className="border-b border-gray-500 border-dotted">Privacy Policy</a>
                                            </p>
                                            {message1 && status !== 200 && <p className="mt-4 text-sm text-center text-red-500">{message1}</p>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* Signup Form */}
                    <div className={`p-6 sm:p-12 transform transition-transform duration-700 
                        ${isLogin ? 'translate-x-full z-0' : 'translate-x-0 z-10'}`} id='signup'>
                        <div className="mt-1 flex flex-col items-center">
                            <h1 className="text-2xl xl:text-3xl font-extrabold">Create Account</h1>
                            <div className="w-full flex-1 mt-8">
                                <div className="flex flex-col items-center">
                                    <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-700 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                        <div className="bg-white p-2 rounded-full">
                                            <svg className="w-4" viewBox="0 0 533.5 544.3">
                                                <path d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z" fill="#4285f4" />
                                                <path d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z" fill="#34a853" />
                                                <path d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z" fill="#fbbc04" />
                                                <path d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z" fill="#ea4335" />
                                            </svg>
                                        </div>
                                        <span className="ml-4">Sign Up with Google</span>
                                    </button>
                                </div>
                                <div className="my-4 border-b text-center">
                                    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">Or sign up with e-mail</div>
                                </div>
                                <form className="w-full flex-1 mt-8" onSubmit={handleSignUpSubmit}>
                                    <div className="flex flex-col items-center">
                                        <div className="mx-auto max-w-xs">
                                            <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white" type="text" placeholder="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                            <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2" type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                            <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2" type="email" placeholder="Email" required value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} />
                                            <input className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-2" type="password" placeholder="Password" required value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} />
                                            <button type="submit" className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                                <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                    <circle cx="8.5" cy="7" r="4" />
                                                    <path d="M20 8v6M23 11h-6" />
                                                </svg>
                                                <span className="ml-3">Sign Up</span>
                                            </button>
                                            <p className="mt-6 text-xs text-gray-600 text-center">
                                                I agree to abide by 3D Fashion's {" "}
                                                <a href="#" className="border-b border-gray-500 border-dotted">Terms of Service</a>
                                                {" "} and its {" "}
                                                <a href="#" className="border-b border-gray-500 border-dotted">Privacy Policy</a>
                                            </p>
                                            {message2 && status !== 200 && <p className="mt-4 text-sm text-center text-red-500">{message2}</p>}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Overlay Container */}
                <div className="absolute inset-0 w-full h-full flex" id='overlay'>
                    <div className={`w-1/2 h-full bg-indigo-500 text-white flex flex-col items-center justify-center transform transition-transform duration-700 ${isLogin ? "-translate-x-full" : "translate-x-0"}`}>
                        <h2 className="text-3xl font-bold mb-3">Welcome Back!</h2>
                        <p className="mb-5">To keep connected, please login with your details.</p>
                        <button className="bg-transparent border border-white py-2 px-6 rounded hover:bg-white hover:text-indigo-500 transition" onClick={() => setIsLogin(true)}>Sign In</button>
                    </div>
                    <div className={`w-1/2 h-full bg-indigo-500 text-white flex flex-col items-center justify-center transform transition-transform duration-700 ${isLogin ? "translate-x-0" : "translate-x-full"}`}>
                        <h2 className="text-3xl font-bold mb-3">Hello, Friend!</h2>
                        <p className="mb-5">Enter your details to start your journey with us.</p>
                        <button className="bg-transparent border border-white py-2 px-6 rounded hover:bg-white hover:text-indigo-500 transition" onClick={() => setIsLogin(false)}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
}