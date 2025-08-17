'use client';

import Image from 'next/image';
import GlowButton from '@/components/GlowButton';

export default function Entry() {
  return (
    <div
      className="
        relative min-h-screen flex items-center justify-center
        bg-black text-white px-8
      "
    >
      <div className="flex flex-col md:flex-row items-center md:items-center gap-16 max-w-6xl w-full">
        {/* Left: ALERT Image */}
        <div className="w-64 md:w-80 lg:w-96 flex-shrink-0">
          <div className="relative w-full">
            <Image
              src="/assets/alert.png"
              alt="Alert logo"
              width={400}
              height={200}
              className="object-contain w-full"
              priority
            />
          </div>
        </div>

        {/* Right: Text + CTA */}
        <div className="flex flex-col text-center md:text-left space-y-8 max-w-lg">
          <div className="space-y-4">
            <p className="text-sm uppercase tracking-widest text-gray-300 leading-relaxed">
              This portfolio isn’t just a website — it’s a simulation of my professional growth.
            </p>
            <p className="text-sm uppercase tracking-widest text-gray-300 leading-relaxed">
              Inspired by my background in psychology and cybersecurity, the interface reflects how I think, learn, and evolve.
            </p>
          </div>

          <div>
            <GlowButton text="Enter the System" href="/home" />
          </div>
        </div>
      </div>
    </div>
  );
}
