"use client";

import Navbar from "@/components/Navbar";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  // This is a nested layout, so NO <html>/<body> here.
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
