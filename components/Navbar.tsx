
'use client';

import Link from 'next/link';
import { Home, FolderGit2, Mail, FileText } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-6 inset-x-0 z-50 flex justify-center">
      <div
        className="
          flex items-center gap-2 rounded-2xl border
          border-neutral-200 bg-white/90 px-3 py-2 shadow-[0_6px_30px_-12px_rgba(0,0,0,0.25)]
          backdrop-blur supports-[backdrop-filter]:bg-white/70
          dark:border-white/10 dark:bg-white/5 dark:shadow-[0_6px_30px_-12px_rgba(0,0,0,0.6)]
        "
      >
        <IconLink href="/home" label="Home">
          <Home className="h-5 w-5" />
        </IconLink>

        <IconLink href="/projects" label="Projects">
          <FolderGit2 className="h-5 w-5" />
        </IconLink>

        <IconLink href="/contact" label="Contact">
          <Mail className="h-5 w-5" />
        </IconLink>

        <Divider />

        <Link
          href="/resume.pdf" download
          className="
            ml-1 rounded-xl px-4 py-2 text-sm font-medium
            bg-neutral-900 text-white hover:bg-neutral-800
            focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400
            dark:bg-zinc-900 dark:hover:bg-zinc-800
          "
        >
          Resume
        </Link>
      </div>
    </nav>
  );
}

/* — helpers — */

function IconLink({
  href,
  label,
  external = false,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const cls =
    'grid h-10 w-10 place-items-center rounded-xl text-neutral-700 hover:text-black hover:bg-neutral-100 transition ' +
    'dark:text-zinc-300 dark:hover:text-white dark:hover:bg-white/10';

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={cls}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} aria-label={label} className={cls}>
      {children}
    </Link>
  );
}

function Divider({ className = '' }) {
  return (
    <span
      className={`hidden sm:block h-6 w-px bg-neutral-200 dark:bg-white/10 ${className}`}
    />
  );
}
