import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "This site is under maintenance",
  description:
    "This site is under maintenance.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
