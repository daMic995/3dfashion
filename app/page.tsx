"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import integrations from './integrations';

function index() {
  const [message, setMessage] = useState('Loading...');

  useEffect(() => {
    fetch('/api/python')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return <p>{message}</p>;
}


export default function Home() {

  const [isNavVisible, setNavVisible] = useState(false);

  const toggleNav = () => {
    setNavVisible(!isNavVisible);
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-black h-24 w-full relative z-50">
        <div className="container max-w-6xl mx-auto h-full flex justify-center sm:justify-between items-center px-8 xl:px-0">
          <a href="/" className="inline-block h-full flex items-center h-5 relative font-black leading-none">
            <Image src="/3dfashion.png" alt="logo" width={50} height={50} />
            <span className="text-xl ml-3 text-gray-100">
              3D Fashion<span className="text-purple-500">.</span>
            </span>
          </a>

          <nav
            id="nav"
            className={`absolute left-0 w-full md:w-auto text-gray-600 flex-col md:flex-row h-64 md:h-24 justify-between text-sm lg:text-base bg-white md:bg-transparent top-0 mt-24 md:mt-0 border-t md:border-none border-gray-200 pt-5 md:py-0 z-50 flex ${
              isNavVisible ? "flex" : "hidden"
            } md:flex items-center md:relative`}
          >
            {["Home", "Features", "Pricing", "Testimonials"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="font-bold ml-0 md:mr-3 lg:mr-8 transition-color duration-100 hover:text-indigo-600"
              >
                {link}
              </a>
            ))}

            <div className="block md:hidden border-t border-gray-200 font-medium flex flex-col w-full">
              <a href="#_" className="py-2 text-pink-500 w-full text-center font-bold">
                Login
              </a>
              <a
                href="#_"
                className="px-5 py-3 font-bold text-sm leading-none bg-indigo-700 text-white w-full inline-block text-center relative"
              >
                Get Started
              </a>
            </div>
          </nav>

          {/* Login Button */}
          <div
            className="absolute left-0 md:relative w-full md:w-auto md:bg-transparent border-b md:border-none border-gray-200 mt-48 md:mt-0 flex-col md:flex-row pb-8 md:p-0 justify-center items-center md:items-end hidden md:flex md:justify-between">
            <a
              href="#_"
              className="px-3 md:px-5 py-2 text-sm text-pink-500 lg:text-white font-bold mr-0 sm:mr-3 relative z-40 md:mt-0">
              Login
            </a>
            <a
              href="#_"
              className="px-5 py-3 rounded font-bold text-sm transition-all duration-300 leading-none bg-indigo-700 lg:bg-white text-white lg:text-indigo-700 w-auto sm:w-full h-full inline-block font-bold relative shadow-md lg:shadow-none hover:shadow-xl duration-100 transition z-40">
              Get Started
            </a>

            {/* SVGs */}
            <svg
              className="hidden lg:block absolute w-screen max-w-3xl -mt-64 -ml-12 left-0 top-0"
              viewBox="0 0 818 815"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <linearGradient id="c" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop stopColor="#E614F2" offset="0%" />
                  <stop stopColor="#FC3832" offset="100%" />
                </linearGradient>
                <linearGradient id="f" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop stopColor="#657DE9" offset="0%" />
                  <stop stopColor="#1C0FD7" offset="100%" />
                </linearGradient>
                <filter
                  id="a"
                  x="-4.7%"
                  y="-3.3%"
                  width="109.3%"
                  height="109.3%"
                  filterUnits="objectBoundingBox"
                >
                  <feOffset dy="8" in="SourceAlpha" result="shadowOffsetOuter1" />
                  <feGaussianBlur
                    stdDeviation="8"
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                  />
                  <feColorMatrix
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
                    in="shadowBlurOuter1"
                  />
                </filter>
                <filter
                  id="d"
                  x="-4.7%"
                  y="-3.3%"
                  width="109.3%"
                  height="109.3%"
                  filterUnits="objectBoundingBox"
                >
                  <feOffset dy="8" in="SourceAlpha" result="shadowOffsetOuter1" />
                  <feGaussianBlur
                    stdDeviation="8"
                    in="shadowOffsetOuter1"
                    result="shadowBlurOuter1"
                  />
                  <feColorMatrix
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                    in="shadowBlurOuter1"
                  />
                </filter>
                <path
                  id="b"
                  d="M160.52 108.243h497.445c17.83 0 24.296 1.856 30.814 5.342 6.519 3.486 11.635 8.602 15.12 15.12 3.487 6.52 5.344 12.985 5.344 30.815v497.445c0 17.83-1.857 24.296-5.343 30.814-3.486 6.519-8.602 11.635-15.12 15.12-6.52 3.487-12.985 5.344-30.815 5.344H160.52c-17.83 0-24.296-1.857-30.814-5.343-6.519-3.486-11.635-8.602-15.12-15.12-3.487-6.52-5.343-12.985-5.343-30.815V159.52c0-17.83 1.856-24.296 5.342-30.814 3.486-6.519 8.602-11.635 15.12-15.12 6.52-3.487 12.985-5.343 30.815-5.343z"
                />
                <path
                  id="e"
                  d="M159.107 107.829H656.55c17.83 0 24.296 1.856 30.815 5.342 6.518 3.487 11.634 8.602 15.12 15.12 3.486 6.52 5.343 12.985 5.343 30.816V656.55c0 17.83-1.857 24.296-5.343 30.815-3.486 6.518-8.602 11.634-15.12 15.12-6.519 3.486-12.985 5.343-30.815 5.343H159.107c-17.83 0-24.297-1.857-30.815-5.343-6.519-3.486-11.634-8.602-15.12-15.12-3.487-6.519-5.343-12.985-5.343-30.815V159.107c0-17.83 1.856-24.297 5.342-30.815 3.487-6.519 8.602-11.634 15.12-15.12 6.52-3.487 12.985-5.343 30.816-5.343z"
                />
              </defs>
              <g fill="none" fillRule="evenodd" opacity=".9">
                <g transform="rotate(65 416.452 409.167)">
                  <use fill="#000" filter="url(#a)" xlinkHref="#b" />
                  <use fill="url(#c)" xlinkHref="#b" />
                </g>
                <g transform="rotate(29 421.929 414.496)">
                  <use fill="#000" filter="url(#d)" xlinkHref="#e" />
                  <use fill="url(#f)" xlinkHref="#e" />
                </g>
              </g>
            </svg>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={toggleNav} id="nav-mobile-btn" className="w-6 absolute block md:hidden right-0 top-0 mr-10 mt-8 sm:mt-10 z-50 cursor-pointer select-none">
            <span className="w-full h-1 mt-2 sm:mt-1 bg-gray-300 rounded-full block transform duration-200"></span>
            <span className="w-full h-1 mt-1 bg-gray-300 rounded-full block transform duration-200"></span>
            <span className="w-full h-1 mt-1 bg-gray-300 rounded-full block transform duration-200"></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="hero" className="bg-black w-full justify-center items-center relative overflow-x-hidden lg:pt-40 lg:pb-40 xl:pt-40 xl:pb-64">
        <div className="container max-w-6xl mx-auto h-full flex flex-col lg:flex-row justify-between items-center -mt-32 px-8 xl:px-0">
          <div className="flex flex-col items-center lg:items-start w-full max-w-xl lg:w-1/2 pt-48 lg:pt-20 xl:pt-40 text-center lg:text-left z-30">
            <h1 className="text-gray-100 font-black text-3xl sm:text-6xl leading-tight relative mb-4 xl:mb-8">
              3D Fashion
            </h1>
            <p className="text-gray-400 text-base sm:text-lg xl:text-xl text-gray-600 mb-8 pr-0 lg:pr-20">
              With 3D precision, AI-powered body measurement and a talented pick of tailors, 
              we aim to provide you with an effortless outlet for your creative fashion needs.
            </p>
            <p className="text-base sm:text-lg xl:text-xl text-gray-500 mb-8 pr-0 lg:pr-20">
              Envision. Design. Tailor.
              </p>
            <a href="/model"
              className="mt-0 sm:mt-1 px-8 py-4 rounded-md font-bold text-base bg-indigo-600 shadow-xl text-white border-t border-gray-200 w-auto relative self-start inline-block lg:mx-0 mx-auto">
              3D Model Tool
            </a>
            
            {/* Integrations */}
            <div className="hidden sm:flex flex-col mt-12 lg:mt-24">
              <p className="text-gray-500 uppercase font-medium tracking-widest mb-4 text-sm">
                Integrates With
              </p>
              <div className="flex">

                {integrations.map((app) => (
                <a href={app.link} key={app.name} className="mr-4" target="_blank">
                  <img
                    key={app.name}
                    className="h-8 mr-4 fill-current text-gray-500 transition-color duration-150 hover:text-gray-600 cursor-pointer"
                    src={app.image}
                  />
                </a>
                ))}

              </div>
            </div>

            {/* Illustration */}
            <svg
            className="absolute left-0 max-w-md -ml-64 mt-24 left-svg"
            viewBox="0 0 423 423"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <linearGradient id="linearGradient-1" x1="100%" y1="0%" x2="4.48%" y2="0%">
                <stop stopColor="#5C54DB" offset="0%" />
                <stop stopColor="#6A82E7" offset="100%" />
              </linearGradient>
              <filter
                id="filter-3"
                x="-9.3%"
                y="-6.7%"
                width="118.7%"
                height="118.7%"
                filterUnits="objectBoundingBox"
              >
                <feOffset dy="8" in="SourceAlpha" result="shadowOffsetOuter1" />
                <feGaussianBlur stdDeviation="8" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
                <feColorMatrix
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                  in="shadowBlurOuter1"
                />
              </filter>
              <rect id="path-2" x="63" y="504" width="300" height="300" rx="40" />
            </defs>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity=".9">
              <g id="Desktop-HD" transform="translate(-39 -531)">
                <g id="Hero" transform="translate(43 83)">
                  <g id="Rectangle-6" transform="rotate(45 213 654)">
                    <use fill="#000" filter="url(#filter-3)" xlinkHref="#path-2" />
                    <use fill="url(#linearGradient-1)" xlinkHref="#path-2" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
          </div>

          <div className="flex flex-col items-end justify-center h-full w-full lg:w-1/2 ms:pl-10 relative z-50">
            <div className="relative lg:absolute max-w-4xl xl:max-w-6xl left-0 container lg:w-screen w-full">
              <img src="/Mannequin_Image-removebg.png"
                    className="mt-20 lg:mt-24 xl:mt-40 w-full h-auto mb-20 lg:mb-0 lg:h-full ml-0 lg:-ml-12 h-auto"/>
            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white w-full relative py-10 md:py-16 lg:py-24 xl:py-40 border-t border-gray-200 px-8 xl:px-0">
        <div className="container max-w-6xl mx-auto h-full flex flex-col justify-between items-center">
          <h2 className="text-indigo-500 uppercase text-base font-medium tracking-tight my-5">Our Features</h2>
          <h3 className="font-black text-3xl mt-2 sm:mt-0 px-5 sm:px-0 sm:text-6xl max-w-2xl leading-tight text-gray-900 text-center">
          Design and seamlessly share your creations with tailors
          </h3>
          <div className="flex flex-col lg:flex-row w-full mt-0 sm:mt-10 lg:mt-20">
            {/* Feature 1 */}
            <div className="w-full max-w-md mx-auto mb-0 sm:mb-16 lg:mb-0 lg:w-1/3 p-4">
              <div className="flex flex-col justify-center items-center w-full h-full mr-5 p-20 rounded-lg relative">
                <svg
                  className="w-full h-full absolute fill-current text-gray-100"
                  viewBox="0 0 377 340"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M342.8 3.7c24.7 14 18.1 75 22.1 124s18.6 85.8 8.7 114.2c-9.9 28.4-44.4 48.3-76.4 62.4-32 14.1-61.6 22.4-95.9 28.9-34.3 6.5-73.3 11.1-95.5-6.2-22.2-17.2-27.6-56.5-47.2-96C38.9 191.4 5 151.5.9 108.2-3.1 64.8 22.7 18 61.8 8.7c39.2-9.2 91.7 19 146 16.6 54.2-2.4 110.3-35.6 135-21.6z" />
                </svg>
                <svg
                  className="w-20 h-20 relative"
                  viewBox="0 0 58 58"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                      id="linearGradient-1TriangleIcon1"
                    >
                      <stop stopColor="#9C09DB" offset="0%" />
                      <stop stopColor="#1C0FD7" offset="100%" />
                    </linearGradient>
                    <filter
                      x="-14%"
                      y="-10%"
                      width="128%"
                      height="128%"
                      filterUnits="objectBoundingBox"
                      id="filter-3TriangleIcon1"
                    >
                      <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
                      <feGaussianBlur
                        stdDeviation="2"
                        in="shadowOffsetOuter1"
                        result="shadowBlurOuter1"
                      />
                      <feColorMatrix
                        values="0 0 0 0 0.141176471 0 0 0 0 0.031372549 0 0 0 0 0.501960784 0 0 0 0.15 0"
                        in="shadowBlurOuter1"
                      />
                    </filter>
                    <path
                      d="M17.947 0h14.106c6.24 0 8.503.65 10.785 1.87a12.721 12.721 0 015.292 5.292C49.35 9.444 50 11.707 50 17.947v14.106c0 6.24-.65 8.503-1.87 10.785a12.721 12.721 0 01-5.292 5.292C40.556 49.35 38.293 50 32.053 50H17.947c-6.24 0-8.503-.65-10.785-1.87a12.721 12.721 0 01-5.292-5.292C.65 40.556 0 38.293 0 32.053V17.947c0-6.24.65-8.503 1.87-10.785A12.721 12.721 0 017.162 1.87C9.444.65 11.707 0 17.947 0z"
                      id="path-2TriangleIcon1"
                    />
                  </defs>
                  <use
                    fill="#000"
                    filter="url(#filter-3TriangleIcon1)"
                    xlinkHref="#path-2TriangleIcon1"
                  />
                  <use fill="url(#linearGradient-1TriangleIcon1)" xlinkHref="#path-2TriangleIcon1" />
                  <g
                    transform="translate(18 15)"
                    fill="#FFF"
                    fillRule="nonzero"
                  >
                    <path
                      d="M9.432 2.023l8.919 14.879a1.05 1.05 0 01-.384 1.452 1.097 1.097 0 01-.548.146H-.42A1.07 1.07 0 01-1.5 17.44c0-.19.052-.375.15-.538L7.567 2.023a1.092 1.092 0 011.864 0z"
                      transform="rotate(90 8.5 10)"
                    />
                  </g>
                </svg>
                <h4 className="font-bold text-lg mt-6 relative text-center">3D Garment Modelling</h4>
                <p className="text-base text-gray-600 text-center mt-2 relative">
                  From concept to creation, we provide a 
                  cutting-edge 3D garment modelling platform
                  capable of bringing your ideas to life.
                </p>
                <a
                  href="#_"
                  className="flex underline text-indigo-500 font-medium text-sm mt-2 relative">
                  Learn More
                </a>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="w-full max-w-md mx-auto mb-0 sm:mb-16 lg:mb-0 lg:w-1/3 p-4">
              <div className="flex flex-col justify-center items-center w-full h-full mr-5 p-20 rounded-lg relative">
                <svg
                  className="w-full h-full absolute fill-current text-gray-100"
                  viewBox="0 0 377 340"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M342.8 3.7c24.7 14 18.1 75 22.1 124s18.6 85.8 8.7 114.2c-9.9 28.4-44.4 48.3-76.4 62.4-32 14.1-61.6 22.4-95.9 28.9-34.3 6.5-73.3 11.1-95.5-6.2-22.2-17.2-27.6-56.5-47.2-96C38.9 191.4 5 151.5.9 108.2-3.1 64.8 22.7 18 61.8 8.7c39.2-9.2 91.7 19 146 16.6 54.2-2.4 110.3-35.6 135-21.6z" />
                </svg>
                <svg
                  className="w-20 h-20 relative"
                  viewBox="0 0 58 58"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                      id="linearGradient-1TriangleIcon1"
                    >
                      <stop stopColor="#9C09DB" offset="0%" />
                      <stop stopColor="#1C0FD7" offset="100%" />
                    </linearGradient>
                    <filter
                      x="-14%"
                      y="-10%"
                      width="128%"
                      height="128%"
                      filterUnits="objectBoundingBox"
                      id="filter-3TriangleIcon1"
                    >
                      <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
                      <feGaussianBlur
                        stdDeviation="2"
                        in="shadowOffsetOuter1"
                        result="shadowBlurOuter1"
                      />
                      <feColorMatrix
                        values="0 0 0 0 0.141176471 0 0 0 0 0.031372549 0 0 0 0 0.501960784 0 0 0 0.15 0"
                        in="shadowBlurOuter1"
                      />
                    </filter>
                    <path
                      d="M17.947 0h14.106c6.24 0 8.503.65 10.785 1.87a12.721 12.721 0 015.292 5.292C49.35 9.444 50 11.707 50 17.947v14.106c0 6.24-.65 8.503-1.87 10.785a12.721 12.721 0 01-5.292 5.292C40.556 49.35 38.293 50 32.053 50H17.947c-6.24 0-8.503-.65-10.785-1.87a12.721 12.721 0 01-5.292-5.292C.65 40.556 0 38.293 0 32.053V17.947c0-6.24.65-8.503 1.87-10.785A12.721 12.721 0 017.162 1.87C9.444.65 11.707 0 17.947 0z"
                      id="path-2TriangleIcon1"
                    />
                  </defs>
                  <use
                    fill="#000"
                    filter="url(#filter-3TriangleIcon1)"
                    xlinkHref="#path-2TriangleIcon1"
                  />
                  <use fill="url(#linearGradient-1TriangleIcon1)" xlinkHref="#path-2TriangleIcon1" />
                  <g
                    transform="translate(18 15)"
                    fill="#FFF"
                    fillRule="nonzero"
                  >
                    <path
                      d="M9.432 2.023l8.919 14.879a1.05 1.05 0 01-.384 1.452 1.097 1.097 0 01-.548.146H-.42A1.07 1.07 0 01-1.5 17.44c0-.19.052-.375.15-.538L7.567 2.023a1.092 1.092 0 011.864 0z"
                      transform="rotate(90 8.5 10)"
                    />
                  </g>
                </svg>
                <h4 className="font-bold text-lg mt-6 relative text-center">Web Styling</h4>
                <p className="text-base text-gray-600 text-center mt-2 relative">
                  Our web styling platform is designed to provide you with 
                  a seamless experience in creating your own unique designs.
                </p>
                <a
                  href="#_"
                  className="flex underline text-indigo-500 font-medium text-sm mt-2 relative">
                  Learn More
                </a>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="w-full max-w-md mx-auto mb-0 sm:mb-16 lg:mb-0 lg:w-1/3 p-4">
              <div className="flex flex-col justify-center items-center w-full h-full mr-5 p-20 rounded-lg relative">
                <svg
                  className="w-full h-full absolute fill-current text-gray-100"
                  viewBox="0 0 377 340"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M342.8 3.7c24.7 14 18.1 75 22.1 124s18.6 85.8 8.7 114.2c-9.9 28.4-44.4 48.3-76.4 62.4-32 14.1-61.6 22.4-95.9 28.9-34.3 6.5-73.3 11.1-95.5-6.2-22.2-17.2-27.6-56.5-47.2-96C38.9 191.4 5 151.5.9 108.2-3.1 64.8 22.7 18 61.8 8.7c39.2-9.2 91.7 19 146 16.6 54.2-2.4 110.3-35.6 135-21.6z" />
                </svg>
                <svg
                  className="w-20 h-20 relative"
                  viewBox="0 0 58 58"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                      id="linearGradient-1TriangleIcon1"
                    >
                      <stop stopColor="#9C09DB" offset="0%" />
                      <stop stopColor="#1C0FD7" offset="100%" />
                    </linearGradient>
                    <filter
                      x="-14%"
                      y="-10%"
                      width="128%"
                      height="128%"
                      filterUnits="objectBoundingBox"
                      id="filter-3TriangleIcon1"
                    >
                      <feOffset dy="2" in="SourceAlpha" result="shadowOffsetOuter1" />
                      <feGaussianBlur
                        stdDeviation="2"
                        in="shadowOffsetOuter1"
                        result="shadowBlurOuter1"
                      />
                      <feColorMatrix
                        values="0 0 0 0 0.141176471 0 0 0 0 0.031372549 0 0 0 0 0.501960784 0 0 0 0.15 0"
                        in="shadowBlurOuter1"
                      />
                    </filter>
                    <path
                      d="M17.947 0h14.106c6.24 0 8.503.65 10.785 1.87a12.721 12.721 0 015.292 5.292C49.35 9.444 50 11.707 50 17.947v14.106c0 6.24-.65 8.503-1.87 10.785a12.721 12.721 0 01-5.292 5.292C40.556 49.35 38.293 50 32.053 50H17.947c-6.24 0-8.503-.65-10.785-1.87a12.721 12.721 0 01-5.292-5.292C.65 40.556 0 38.293 0 32.053V17.947c0-6.24.65-8.503 1.87-10.785A12.721 12.721 0 017.162 1.87C9.444.65 11.707 0 17.947 0z"
                      id="path-2TriangleIcon1"
                    />
                  </defs>
                  <use
                    fill="#000"
                    filter="url(#filter-3TriangleIcon1)"
                    xlinkHref="#path-2TriangleIcon1"
                  />
                  <use fill="url(#linearGradient-1TriangleIcon1)" xlinkHref="#path-2TriangleIcon1" />
                  <g
                    transform="translate(18 15)"
                    fill="#FFF"
                    fillRule="nonzero"
                  >
                    <path
                      d="M9.432 2.023l8.919 14.879a1.05 1.05 0 01-.384 1.452 1.097 1.097 0 01-.548.146H-.42A1.07 1.07 0 01-1.5 17.44c0-.19.052-.375.15-.538L7.567 2.023a1.092 1.092 0 011.864 0z"
                      transform="rotate(90 8.5 10)"
                    />
                  </g>
                </svg>
                <h4 className="font-bold text-lg mt-6 relative text-center">Tailors</h4>
                <p className="text-base text-gray-600 text-center mt-2 relative">
                  Share your design with our talented pick of tailors
                  and get your custom-made garment delivered to you.
                </p>
                <a
                  href="#_"
                  className="flex underline text-indigo-500 font-medium text-sm mt-2 relative">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-200 text-white pt-12 pb-8 px-4">
        <div className="mx-auto px-4 container overflow-hidden max-w-6xl flex flex-col lg:flex-row justify-between">
          {/* Logo and Description */}
          <div className="w-full lg:w-1/4 mr-4 text-left sm:text-center pl-12 sm:pl-0 lg:text-left">
            <a
              href="/"
              className="block text-left sm:text-center lg:text-left flex justify-start sm:justify-center lg:justify-start">
              <span className="flex items-start sm:items-center">
                <Image src="/3dfashion.png" alt="logo" width={50} height={50} />
              </span>
            </a>
            <p className="text-gray-300 text-base mr-4 mt-6">
              Crafting the next-level of user experience and engagement.
            </p>
          </div>

          {/* Links Section */}
          <div className="w-full lg:w-3/4 pl-10 block sm:flex text-sm mt-6 lg:mt-0">
            {[
              {
                title: "Product",
                links: [
                  { text: "Features", href: "#" },
                  { text: "Integrations", href: "#" },
                  { text: "Pricing", href: "#" },
                  { text: "FAQ", href: "#" },
                ],
              },
              {
                title: "Company",
                links: [
                  { text: "Privacy", href: "#" },
                  { text: "Terms of Service", href: "#" },
                ],
              },
              {
                title: "TailwindCSS",
                links: [
                  { text: "Tailwind Components", href: "https://devdojo.com/tailwindcss/components" },
                  { text: "Tailwind Templates", href: "https://devdojo.com/tailwindcss/templates" },
                  { text: "Tails", href: "https://devdojo.com/tails" },
                ],
              },
            ].map((section, idx) => (
              <ul key={idx} className="text-gray-300 list-none p-0 font-medium flex flex-col text-left w-full">
                <li className="inline-block py-2 px-3 text-gray-500 uppercase font-bold tracking-wide mt-5 md:mt-0">
                  {section.title}
                </li>
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href={link.href}
                      className="inline-block py-2 px-3 text-gray-200 hover:text-gray-600 no-underline"
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            ))}

            {/* Social Links */}
            <div className="text-gray-300 flex flex-col w-full">
              <div className="inline-block py-2 px-3 text-gray-200 uppercase font-bold mt-5 md:mt-0">Follow Us</div>
              <div className="flex pl-4 justify-start mt-2">
                {[
                  { href: "https://devdojo.com", iconPath: "M23.998 12c0-6.628..." },
                  { href: "https://devdojo.com", iconPath: "M23.954 4.569a10 10 0..." },
                  { href: "https://devdojo.com", iconPath: "M12 .297c-6.63 0-12 5.373..." },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    className="block flex items-center text-gray-200 hover:text-gray-100 mr-6 no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={social.href}
                  >
                    <svg viewBox="0 0 24 24" className="fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                      <path d={social.iconPath} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-4 mt-10 pt-6 text-gray-400 border-t border-gray-100 text-center">
          © 2024 3D Fashion. All rights reserved.
        </div>
      </footer>
    </div>
  )
}