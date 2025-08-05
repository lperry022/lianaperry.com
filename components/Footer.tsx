'use client';

import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full mt-16 py-6 border-t border-gray-800 text-center text-sm text-gray-400">
      <div className="mb-2">
        &copy; {new Date().getFullYear()} Liana Perry. All rights reserved.
      </div>
      <div className="space-x-4">
        <Link href="/maintenance" className="hover:text-purple-300 transition">Privacy</Link>
        <Link href="/maintenance" className="hover:text-purple-300 transition">Terms</Link>
        <Link href="/contact" className="hover:text-purple-300 transition">Contact</Link>
      </div>
    </footer>
  );
};

export default Footer;
