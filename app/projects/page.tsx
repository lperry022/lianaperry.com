"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Star, Code2, ExternalLink, CalendarClock, Filter, Search } from "lucide-react";

// === Tunables ===
const GITHUB_USER = "lperry022"; // your GitHub username
const CARD_CLASS =
  "bg-white/5 backdrop-blur-sm hover:bg-white/10 p-6 rounded-xl border border-white/10 transition transform hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-700/30 duration-300";

// Curated projects you want to showcase at the top of the page.
// These will be enriched with live GitHub data (stars, language, links) if found.
const FEATURED: Array<{
  slug: string; // repo name on GitHub when available
  title: string;
  blurb: string;
  tags: string[]; // used for filtering
  demo?: string; // optional live link/demo
  image?: string; // optional banner from /public
}> = [
    {
      slug: "ForensiX",
      title: "ForensiX – Digital Forensics CTF",
      blurb:
        "Browser-based CTF platform with challenge cards, flag validation, and neon UI. Now adding server-side persistence and difficulty tags.",
      tags: ["Web", "DFIR", "Node", "MongoDB"],
      image: "/globe.svg",
    },
    {
      slug: "lianaperry.com",
      title: "Portfolio – lianaperry.com",
      blurb:
        "Animated portfolio with purple glow aesthetic, particles background, and Framer Motion transitions.",
      tags: ["Web", "Next.js", "Tailwind"],
      demo: "https://lianaperry.com",
      image: "/window.svg",
    },
    {
      slug: "keylogger",
      title: "Encrypted Keylogger + GUI Viewer",
      blurb:
        "Educational keylogger with encrypted logs, GUI viewer, and optional sender; built for coursework and blue-team demos.",
      tags: ["Tools", "Python", "Security"],
      image: "/file.svg",
    },
    {
      slug: "LinkedIn-telligence",
      title: "LinkedIn‑telligence PWA",
      blurb:
        "PWA that drafts LinkedIn posts with manual approval, offline support, history, and webhook integration.",
      tags: ["Web", "PWA", "TypeScript"],
      image: "/next.svg",
    },
    {
      slug: "Jenkins-DevOps",
      title: "SecDevOps Pipeline – Jenkins",
      blurb:
        "CI pipeline demo for a simple site: build, tests, quality scan, and staged deploy with artifacts.",
      tags: ["SecDevOps", "CI/CD", "Jenkins"],
      image: "/vercel.svg",
    },
  ];

// Types for GitHub fetch
interface Repo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  pushed_at: string; // ISO date
}

const shimmer = "before:absolute before:inset-0 before:animate-pulse before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.06),transparent)] before:bg-[length:200%_100%]";

export default function RootLayout() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("All");
  const [sort, setSort] = useState<string>("recent");

  // Fetch public repos
  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
          {
            headers: {
              // This header is harmless without a token; improves topics when logged-in. Kept simple here.
              Accept: "application/vnd.github+json",
            },
            next: { revalidate: 60 * 60 }, // cache one hour on Vercel/Next
          }
        );
        if (!res.ok) throw new Error(`GitHub: ${res.status} ${res.statusText}`);
        const data: Repo[] = await res.json();
        if (!cancelled) setRepos(data);
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? "Failed to load repositories");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  // Combine curated FEATURED with live GitHub metadata where possible
  const enrichedFeatured = useMemo(() => {
    const byName = new Map(repos.map((r) => [r.name.toLowerCase(), r]));
    return FEATURED.map((p) => {
      const repo = byName.get(p.slug.toLowerCase());
      return {
        ...p,
        stars: repo?.stargazers_count ?? 0,
        language: repo?.language ?? undefined,
        repoUrl: repo?.html_url ?? (p.slug ? `https://github.com/${GITHUB_USER}/${p.slug}` : undefined),
        homepage: repo?.homepage ?? p.demo,
        updated: repo?.pushed_at ?? undefined,
        archived: repo?.archived ?? false,
      } as any;
    });
  }, [repos]);

  // Build a list of non-featured repos to show below (skip forks & archived by default)
  const otherRepos = useMemo(() => {
    const featuredSet = new Set(FEATURED.map((p) => p.slug.toLowerCase()));
    return repos
      .filter((r) => !r.fork && !featuredSet.has(r.name.toLowerCase()))
      .map((r) => ({
        title: r.name,
        blurb: r.description ?? "No description provided.",
        tags: [r.language ?? "Repo"],
        repoUrl: r.html_url,
        homepage: r.homepage ?? undefined,
        stars: r.stargazers_count,
        language: r.language ?? undefined,
        updated: r.pushed_at,
        archived: r.archived,
      }));
  }, [repos]);

  const categories = ["All", "Web", "DFIR", "SecDevOps", "Tools", "Python", "TypeScript", "Next.js", "Node", "Jenkins"];

  // Apply filter/search/sort across both lists
  const filtered = useMemo(() => {
    const apply = (list: any[]) =>
      list.filter((p) => {
        const matchesSearch = (p.title + " " + p.blurb).toLowerCase().includes(query.toLowerCase());
        const matchesFilter =
          filter === "All" || (p.tags ?? []).some((t: string) => t.toLowerCase() === filter.toLowerCase());
        return matchesSearch && matchesFilter;
      });

    const sorter = (a: any, b: any) => {
      if (sort === "stars") return (b.stars ?? 0) - (a.stars ?? 0);
      if (sort === "az") return a.title.localeCompare(b.title);
      // recent
      const ad = a.updated ? new Date(a.updated).getTime() : 0;
      const bd = b.updated ? new Date(b.updated).getTime() : 0;
      return bd - ad;
    };

    const list = [...apply(enrichedFeatured), ...apply(otherRepos)];
    return list.sort(sorter);
  }, [enrichedFeatured, otherRepos, filter, query, sort]);

  return (
    <div className="relative min-h-screen bg-black text-zinc-100">
      {/* subtle radial glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_circle_at_50%_-20%,rgba(139,92,246,0.15),transparent_60%)]" />

      <section className="mx-auto w-full max-w-6xl px-4 pb-32 pt-16 md:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl"
        >
          Projects
        </motion.h1>
        <p className="mb-8 max-w-2xl text-zinc-300">
          Experiments and coursework spanning <span className="text-violet-400">DFIR</span>,
          <span className="mx-1 text-violet-400">SecDevOps</span>, and modern web.
          Everything here is open, with highlights curated up top and the rest pulled live from GitHub.
        </p>

        {/* Toolbar */}
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" size={18} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects…"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-10 py-2 text-sm outline-none ring-violet-500/40 transition focus:ring-2"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-zinc-800 bg-zinc-900/60 px-3 py-2 text-sm outline-none ring-violet-500/40 focus:ring-2"
              aria-label="Sort"
            >
              <option value="recent">Most recent</option>
              <option value="stars">Most stars</option>
              <option value="az">A–Z</option>
            </select>
            <Link
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              className="group inline-flex items-center gap-2 rounded-xl border border-violet-600/40 bg-violet-600/10 px-3 py-2 text-sm font-medium text-violet-200 transition hover:bg-violet-600/20"
            >
              <Github size={16} /> View GitHub
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1 md:pt-0">
            <Filter size={16} className="opacity-60" />
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`rounded-full border px-3 py-1 text-xs transition ${filter === c
                    ? "border-violet-500 bg-violet-500/20 text-violet-100"
                    : "border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700"
                  }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-4 ${shimmer}`}
                style={{ minHeight: 180 }}
              />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-900/50 bg-red-950/30 p-4 text-sm text-red-200">
            Couldn’t load GitHub data ({error}). Showing curated projects only.
          </div>
        )}

        {/* Results */}
        <ProjectGrid items={filtered} />

        <div className="mt-12 text-center text-sm text-zinc-400">
          <p className="mb-2">Want details on a specific project or private coursework?</p>
          <p>
            Ping me on GitHub <Link href={`https://github.com/${GITHUB_USER}`} className="text-violet-300 underline">@{GITHUB_USER}</Link>
            {" "}or via the contact page.
          </p>
        </div>
      </section>
    </div>
  );
}

function ProjectGrid({ items }: { items: any[] }) {
  if (!items.length)
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950/60 p-8 text-center text-zinc-400">
        No projects match your filters yet.
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, idx) => (
        <motion.article
          key={p.title + idx}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.4, delay: idx * 0.04 }}
          className={`group relative overflow-hidden ${CARD_CLASS}`}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/10">
              {p.image ? (
                <Image src={p.image} alt="" fill className="object-contain p-1" />
              ) : (
                <div className="h-full w-full" />
              )}
            </div>
            <h3 className="text-base font-semibold text-purple-300">{p.title}</h3>
          </div>

          <p className="mb-4 line-clamp-3 text-sm text-gray-300">{p.blurb}</p>

          <div className="mb-4 flex flex-wrap gap-2">
            {(p.tags ?? []).slice(0, 5).map((t: string) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-purple-200"
              >
                {t}
              </span>
            ))}
            {p.language && (
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-gray-300">
                <Code2 size={12} className="mr-1 inline" /> {p.language}
              </span>
            )}
            {p.archived && (
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-amber-200">
                archived
              </span>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-3">
              {typeof p.stars === "number" && (
                <span className="inline-flex items-center gap-1">
                  <Star size={14} className="opacity-80" /> {p.stars}
                </span>
              )}
              {p.updated && (
                <span className="inline-flex items-center gap-1">
                  <CalendarClock size={14} className="opacity-80" />
                  {new Date(p.updated).toLocaleDateString()}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {p.repoUrl && (
                <Link
                  href={p.repoUrl}
                  target="_blank"
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[12px] text-zinc-200 transition hover:bg-white/10"
                >
                  <Github size={14} /> Code
                </Link>
              )}
              {(p.homepage || p.demo) && (
                <Link
                  href={p.homepage || p.demo}
                  target="_blank"
                  className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[12px] text-violet-200 transition hover:bg-white/10"
                >
                  <ExternalLink size={14} /> Live
                </Link>
              )}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}
