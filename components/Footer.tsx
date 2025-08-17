'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full py-6  text-center text-sm text-gray-400">
      <div className="mb-2">
        &copy; {new Date().getFullYear()} Liana Perry. All rights reserved.
      </div>
      <div className="space-x-4">
      </div>
    </footer>
  );
};

export default Footer;
