'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="w-full p-4 flex justify-between items-center border-b border-gray-800">
      <Link href="/home" className="text-purple-300 font-bold text-lg">
        Liana Perry
      </Link>
      <div className="space-x-6 text-sm">
        <Link href="/home" className="hover:text-purple-400 transition duration-200 hover:underline underline-offset-4">Home</Link>
        <Link href="/maintenance" className="hover:text-purple-400 transition duration-200 hover:underline underline-offset-4">Projects</Link>
        <Link href="/contact" className="hover:text-purple-400 transition duration-200 hover:underline underline-offset-4">Contact</Link>
        <a href="/Resume.pdf" download className="hover:text-purple-400 transition duration-200 hover:underline underline-offset-4">Resume</a>
      </div>
    </nav>
  );
};

export default Navbar;
