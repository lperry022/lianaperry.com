'use client';

import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"       // adds/removes "dark" on <html>
      defaultTheme="light"    // start in light (change if you prefer)
      enableSystem={false}    // keep it predictable while you test
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
