'use client';

import React, { useEffect, useState } from 'react';

const degrees = [
  '🎓 Bachelor of Psychological Science',
  '🎓 Master of Cybersecurity (in progress)',
];

const DegreesDisplay = () => {
  const [index, setIndex] = useState(0);        // current degree index
  const [text, setText] = useState('');         // displayed text
  const [charIndex, setCharIndex] = useState(0); // current character index

  useEffect(() => {
    // Reset on degree index change
    setText('');
    setCharIndex(0);
  }, [index]);

  useEffect(() => {
    if (charIndex < degrees[index].length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + degrees[index][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 50); // typing speed
      return () => clearTimeout(timeout);
    } else {
      // After full text typed, wait 2.5s and go to next degree
      const delay = setTimeout(() => {
        setIndex((prev) => (prev + 1) % degrees.length);
      }, 2500);
      return () => clearTimeout(delay);
    }
  }, [charIndex, index]);

  return (
    <div className="flex flex-col items-center gap-2 mt-2">
      <p className="text-purple-200 text-sm md:text-base min-h-[1.5rem]">
        {text}
<span className="text-purple-400 animate-blink">|</span>
      </p>
    </div>
  );
};

export default DegreesDisplay;
