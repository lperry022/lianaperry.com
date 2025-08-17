import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Liana Perry",
  description:
    "Projects and experiments by Liana Perry – cybersecurity, DFIR, SecDevOps, and web.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
