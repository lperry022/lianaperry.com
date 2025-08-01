'use client';

import React, { useEffect, useState } from 'react';

const MouseGlow: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, rgba(128, 0, 255, 0.3), transparent 80%)`,
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default MouseGlow;
