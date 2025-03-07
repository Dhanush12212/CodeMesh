import React from 'react';
import { assets } from '../assets/assets.js';

function LandingPage() {
  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center px-4 sm:px-0">
      
      {/* Background Image */}
      <img 
        className="absolute w-full h-full object-cover brightness-50" 
        src={assets.LandingBackground} 
        alt="Background" 
      /> 

      {/* Content Wrapper */}
      <div className="absolute flex flex-col items-center text-center gap-8 bg-white/10 backdrop-blur-lg p-8 rounded-3xl shadow-lg border border-white/20">
        
        {/* Title & Description */}
        <div className="flex flex-col gap-3 text-white">
          <h1 className="text-5xl font-bold drop-shadow-md">Code Together, Anywhere, Anytime!</h1>
          <p className="text-lg sm:text-xl font-medium opacity-90">
            Collaborate in real-time with seamless coding & instant updates.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-6">
          <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 rounded-xl shadow-md hover:bg-blue-600 transition-all duration-300">
            Create Room
          </button>
          <button className="px-6 py-3 text-lg font-semibold text-white bg-green-500 rounded-xl shadow-md hover:bg-green-600 transition-all duration-300">
            Join Room
          </button>
        </div>

      </div>
    </div>
  );
}

export default LandingPage;
