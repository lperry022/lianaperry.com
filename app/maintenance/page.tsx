'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Maintenance = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Centered message */}
      <main className="flex-grow flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-300">🚧 Under Maintenance</h1>
          <p className="text-gray-400 text-lg">This page is currently being updated. Please check back soon.</p>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Maintenance;
