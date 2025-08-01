import React from 'react';
import GlowButton from '../components/GlowButton';
import Link from 'next/link';


const Entry = () => {
  return (
    <div className="h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12">

        {/* Left: ALERT Image */}
        <div className="w-80 h-auto">
          <img src="/assets/alert.png" alt="Alert Logo" className="w-full h-auto object-contain" />
        </div>

        {/* Right: Text and Button */}
        <div className="text-center md:text-left space-y-6 max-w-md">
          <p className="text-xs uppercase tracking-widest text-gray-300">
            This portfolio isn’t just a website – it’s a simulation of my professional growth.
          </p>
          <p className="text-xs uppercase tracking-widest text-gray-300">
            Inspired by my background in psychology and cybersecurity, the interface reflects how I think, learn, and evolve.
          </p>
          <GlowButton />
        </div>

      </div>
    </div>
  );
};

export default Entry;
