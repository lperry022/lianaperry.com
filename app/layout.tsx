import './globals.css';
import Providers from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-neutral-900 dark:bg-black dark:text-white transition-colors">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
