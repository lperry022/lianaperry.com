import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liana Perry",
  description:
    "Liana Perry - Portfolio.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
