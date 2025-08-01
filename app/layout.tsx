import './globals.css';
import MouseGlow from '@/components/MouseGlow';

export const metadata = {
  title: 'Liana Perry'
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MouseGlow />
        {children}
      </body>
    </html>
  );
}