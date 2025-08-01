'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DegreesDisplay from '@/components/DegreesDisplay';

const degrees = [
  'Bachelor of Psychological Science',
  'Master of Cybersecurity (in progress)',
];

const HomePage = () => {
  const [currentDegree, setCurrentDegree] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDegree((prev) => (prev + 1) % degrees.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <nav className="w-full p-4 flex justify-between items-center border-b border-gray-800">
        <Link href="/" className="text-purple-300 font-bold text-lg">
          Liana Perry
        </Link>
        <div className="space-x-6 text-sm">
          <Link href="/home" className="hover:text-purple-400 transition duration-200 hover:underline underline-offset-4">Home</Link>
          <Link href="/projects" className="hover:text-purple-400 transition duration-200 hover:underline underline-offset-4">Projects</Link>
          <Link href="/contact" className="hover:text-purple-400 transition duration-200 hover:underline underline-offset-4">Contact</Link>
          <a href="/Resume.pdf" download className="hover:text-purple-400 transition duration-200 hover:underline underline-offset-4">Resume</a>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-10 px-6 py-24">
        {/* Profile Image */}
        <div className="w-40 h-40 relative rounded-full overflow-hidden border-4 border-purple-300">
          <Image
            src="/profile.jpeg"
            alt="Profile"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Name, Degrees, and Social Links */}
        <div className="space-y-6 max-w-lg">
          <h1 className="text-4xl md:text-5xl font-bold text-white">Liana Perry</h1>

          <DegreesDisplay />

          {/* Social Links */}
          <div className="flex justify-center md:justify-start gap-6 text-purple-400 text-2xl mt-2">
            <a
              href="https://www.linkedin.com/in/liana-perry-b5aa2717b/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-200 transition"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin-in" />
            </a>
            <a
              href="https://github.com/your-github-username"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-200 transition"
              aria-label="GitHub"
            >
              <i className="fab fa-github" />
            </a>
            <a
              href="mailto:lianaperryy@gmail.com"
              className="hover:text-purple-200 transition"
              aria-label="Email"
            >
              <i className="fas fa-envelope" />
            </a>
          </div>
        </div>
      </div>
      {/* About Me Section */}
      <section className="px-6 py-20">
        <h2 className="text-2xl font-bold text-purple-400 mb-4">About Me</h2>
        <p className="text-gray-300 text-sm leading-relaxed max-w-3xl mx-auto md:mx-0">
          I’m a cybersecurity student with a foundation in psychology, passionate about ethical hacking, secure development, and digital forensics. My portfolio reflects both technical skill and human-centered design, built to demonstrate not only what I can do — but how I think.
        </p>
      </section>

      <section className="px-6 py-20">
        <h2 className="text-2xl font-bold text-purple-400 mb-8">Explore</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* cards */}
          {/* Projects */}
          <Link
            href="/maintenance"
            className="bg-white/5 backdrop-blur-sm hover:bg-white/10 p-6 rounded-xl border border-white/10 transition transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-700/30 duration-300"
>            <h3 className="text-lg font-semibold text-purple-300 mb-2">🛠️ Projects</h3>
            <p className="text-sm text-gray-300">View my cybersecurity and development projects — from buffer overflows to secure DevOps pipelines.</p>
          </Link>
          <div className="bg-white/5 backdrop-blur-sm hover:bg-white/10 p-6 rounded-xl border border-white/10 transition transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-700/30 duration-300">
            <h3 className="text-lg font-semibold text-purple-300 mb-2">💼 Tech Stack</h3>
            <p className="text-sm text-gray-300">
              Languages, frameworks, and tools I use regularly in development and security analysis.
            </p>
          </div>


          {/* Attack Archives */}
          <Link
            href="/maintenance"
            className="bg-white/5 backdrop-blur-sm hover:bg-white/10 p-6 rounded-xl border border-white/10 transition transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-700/30 duration-300"
          >            <h3 className="text-lg font-semibold text-purple-300 mb-2">🧠 Attack Archives</h3>
            <p className="text-sm text-gray-300">
              Explore technical walkthroughs and reports demonstrating real-world attack techniques, including exploitation, enumeration, and malware behavior analysis.
            </p>
          </Link>
          {/* Contact */}
          <Link
            href="/maintenance"
            className="bg-white/5 backdrop-blur-sm hover:bg-white/10 p-6 rounded-xl border border-white/10 transition transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-700/30 duration-300"

          >            <h3 className="text-lg font-semibold text-purple-300 mb-2">📬 Contact</h3>
            <p className="text-sm text-gray-300">Let’s connect! Send me a message if you’re interested in working together or just want to chat.</p>
          </Link>

        </div>
      </section>

      {/* Footer */}
    </div>
  );
};

export default HomePage;
