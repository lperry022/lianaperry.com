'use client';

import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 h-14 border-b border-zinc-800 bg-black/80 backdrop-blur">
  <div className="mx-auto max-w-6xl h-full flex items-center justify-between px-4">
      <Link href="/home" className="text-purple-300 font-bold text-lg">
        Liana Perry
      </Link>
      <div className="space-x-6 text-sm">
        <Link href="/home" className="hover:text-purple-400 transition duration-200 hover:underline underline-offset-4">Home</Link>
        <Link href="/projects" className="hover:text-purple-400 transition duration-200 hover:underline underline-offset-4">Projects</Link>
        <Link href="/contact" className="hover:text-purple-400 transition duration-200 hover:underline underline-offset-4">Contact</Link>
        <a href="/Resume.pdf" download className="hover:text-purple-400 transition duration-200 hover:underline underline-offset-4">Resume</a>
      </div>
    </div>
    </nav>
  );
};

export default Navbar;
