'use client';

import React, { useEffect, useState } from 'react';

const messages = [
  '[BOOT] Initializing portfolio system...',
  '[OK] Loaded modules: Skills, Projects, Contact...',
  '[OK] Loading assets and terminal interface...',
  '[OK] Ready.',
];

const Loading = () => {
  const [lines, setLines] = useState<string[]>([]);
  const [current, setCurrent] = useState('');
  const [msgIndex, setMsgIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (msgIndex >= messages.length) return;

    const currentMsg = messages[msgIndex];

    if (charIndex < currentMsg.length) {
      const charTimeout = setTimeout(() => {
        setCurrent((prev) => prev + currentMsg[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 20);
      return () => clearTimeout(charTimeout);
    } else {
      const lineTimeout = setTimeout(() => {
        setLines((prev) => [...prev, currentMsg]);
        setCurrent('');
        setCharIndex(0);
        setMsgIndex((prev) => prev + 1);
      }, 700);
      return () => clearTimeout(lineTimeout);
    }
  }, [charIndex, msgIndex]); // <- ✅ add both here

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-purple-200 font-mono text-sm sm:text-base px-6">
      <div className="w-full max-w-xl">
        {lines.map((line, i) => (
          <div key={i} className="mb-1">{line}</div>
        ))}
        {msgIndex < messages.length && (
          <div className="animate-pulse text-purple-400">{current}|</div>
        )}
        {msgIndex === messages.length && (
          <div className="mt-4 text-purple-400 text-xs animate-pulse">Launching interface...</div>
        )}
      </div>
    </div>
  );
};

export default Loading;
