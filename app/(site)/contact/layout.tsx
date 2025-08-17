import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me | Liana Perry",
  description:
    "Contact Liana Perry – email and socials.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
