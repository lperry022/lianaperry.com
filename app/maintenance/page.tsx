import React from 'react';
import Navbar from '@/components/Navbar'; 
import Footer from '@/components/Footer';

const Maintenance = () => {
  return (
    <div className="h-screen bg-black text-white flex items-center justify-center px-6">
            {/* Navbar */}
      <Navbar />
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-300">🚧 Under Maintenance</h1>
        <p className="text-gray-400 text-lg">This page is currently being updated. Please check back soon.</p>
      </div>
              {/* Footer*/}
    <Footer />
    </div>
  );

};

export default Maintenance;
