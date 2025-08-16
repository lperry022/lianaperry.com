import "./globals.css";
import MouseGlow from "@/components/MouseGlow";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = { title: "Liana Perry" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <MouseGlow />
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}