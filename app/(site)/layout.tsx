"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function SiteLayout({ children }:{children:React.ReactNode}) {
  return (
<div className="flex min-h-screen flex-col 
                bg-white text-neutral-900 
                dark:bg-black dark:text-white 
                transition-colors duration-300">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
