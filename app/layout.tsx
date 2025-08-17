import "./globals.css";
import MouseGlow from "@/components/MouseGlow";
export const metadata = { title: "Liana Perry" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}