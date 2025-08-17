'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch: only render after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="rounded-xl border border-neutral-200 bg-neutral-50/80 px-3 py-2 text-sm
                 dark:border-white/10 dark:bg-white/5"
    >
      {isDark ? 'WIP' : 'WIP'}
    </button>
  );
}
