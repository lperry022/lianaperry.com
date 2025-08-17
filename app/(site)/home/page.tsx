'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Loading from '@/components/Loading';
import ThemeToggle from '@/components/ThemeToggle';

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem('hasSeenBoot');
    if (seen) setLoading(false);
    else {
      sessionStorage.setItem('hasSeenBoot', 'true');
      const t = setTimeout(() => setLoading(false), 6000);
      return () => clearTimeout(t);
    }
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-black dark:text-white transition-colors">
      {/* small floating utility bar with theme toggle */}
      <div className="fixed top-6 inset-x-0 z-40 flex justify-center">
        <div className="rounded-2xl border border-neutral-200 bg-white/80 px-3 py-2 backdrop-blur-sm
                        dark:border-white/10 dark:bg-white/5">
          <ThemeToggle />
        </div>
      </div>

      <main className="mx-auto max-w-5xl px-6 pt-28 pb-24">
        {/* =========================
            HERO
        ========================== */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
          {/* avatar column */}
          <div className="md:col-span-2">
            <div className="relative h-20 w-20 md:h-24 md:w-24 overflow-hidden rounded-full border border-neutral-200 dark:border-white/10">
              <Image src="/profile.jpeg" alt="Liana Perry" fill className="object-cover" priority />
            </div>
          </div>

          {/* text column */}
          <div className="md:col-span-10">
            <h1 className="font-extrabold tracking-tight leading-tight text-4xl md:text-[44px]">
              Hey, I’m Liana.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-700 dark:text-zinc-300">
              Psychology background meets cyber. I focus on ethical hacking, secure development, and
              digital forensics, translating human behavior into stronger defenses and better product decisions.
            </p>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="rounded-xl bg-neutral-900 px-4 py-2 text-white hover:bg-neutral-800
                           focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400
                           dark:bg-zinc-900 dark:hover:bg-zinc-800"
              >
                Hire me
              </Link>

              <a
                href="mailto:lianaperryy@gmail.com?subject=Opportunities%20for%20Liana"
                className="rounded-xl bg-emerald-500/15 px-4 py-2 text-sm font-medium text-emerald-700
                           hover:bg-emerald-500/20
                           dark:bg-emerald-400/15 dark:text-emerald-300 dark:hover:bg-emerald-400/20"
              >
                Open to opportunities
              </a>
            </div>

            {/* socials under CTAs, left-aligned */}
            <div className="mt-6 flex items-center gap-5 text-lg text-purple-700 dark:text-purple-300">
              <a
                href="https://www.linkedin.com/in/liana-perry-b5aa2717b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-purple-900 dark:hover:text-purple-200"
              >
                <i className="fab fa-linkedin-in" />
              </a>
              <a
                href="https://github.com/lperry022"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="hover:text-purple-900 dark:hover:text-purple-200"
              >
                <i className="fab fa-github" />
              </a>
              <a
                href="mailto:lianaperryy@gmail.com"
                aria-label="Email"
                className="hover:text-purple-900 dark:hover:text-purple-200"
              >
                <i className="fas fa-envelope" />
              </a>
            </div>
          </div>
        </section>

        {/* =========================
            ABOUT
        ========================== */}
        <section className="mt-16">
          <h2 className="mb-3 text-2xl font-bold text-purple-700 dark:text-purple-400">About Me</h2>
          <p className="max-w-3xl text-sm leading-relaxed text-neutral-700 dark:text-zinc-300">
            I’m a cybersecurity student with a foundation in psychology, passionate about ethical
            hacking, secure development, and digital forensics. My portfolio reflects both technical
            skill and human-centered design, built to demonstrate not only what I can do, but how I think.
          </p>
        </section>

        {/* =========================
            EXPLORE (bottom)
        ========================== */}
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-purple-700 dark:text-purple-400">Explore</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card href="/projects" title="🛠️ Projects">
              View my cybersecurity and development projects — from buffer overflows to secure DevOps pipelines.
            </Card>
            <Card title="💼 Tech Stack">
              Languages, frameworks, and tools I use regularly in development and security analysis.
            </Card>
            <Card href="/maintenance" title="🧠 Attack Archives">
              Explore technical walkthroughs and reports demonstrating real-world attack techniques, including exploitation, enumeration, and malware behavior analysis.
            </Card>
            <Card href="/contact" title="📬 Contact">
              Let’s connect! Send me a message if you’re interested in working together or just want to chat.
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

function Card({
  href,
  title,
  children,
}: {
  href?: string;
  title: string;
  children: React.ReactNode;
}) {
  const cls =
    'rounded-xl border border-neutral-200 bg-neutral-50/80 p-6 backdrop-blur-sm transition ' +
    'hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 duration-300 ' +
    'dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10';
  const inner = (
    <>
      <h3 className="mb-2 text-lg font-semibold text-purple-700 dark:text-purple-300">{title}</h3>
      <p className="text-sm text-neutral-700 dark:text-zinc-300">{children}</p>
    </>
  );
  return href ? (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  ) : (
    <div className={cls}>{inner}</div>
  );
}
