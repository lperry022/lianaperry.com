'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Github,
  Star,
  Code2,
  ExternalLink,
  CalendarClock,
  Filter,
  Search,
} from 'lucide-react';

// === Tunables ===
const GITHUB_USER = 'lperry022';

// Unified, theme-aware card class
const CARD_CLASS =
  'rounded-xl border p-6 backdrop-blur-sm transition duration-300 ' +
  'hover:-translate-y-1 hover:shadow-lg hover:shadow-purple-500/10 ' +
  'border-neutral-200 bg-neutral-50/80 ' +
  'dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10';

// === Types ===
interface Repo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  homepage: string | null;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
}

interface PinnedItem {
  title: string;
  blurb: string;
  tags: string[];
  stars: number;
  language?: string;
  repoUrl: string;
  homepage?: string;
  updated?: string;
  archived?: boolean;
}

const shimmer =
  'before:absolute before:inset-0 before:animate-pulse before:bg-[linear-gradient(110deg,transparent,rgba(0,0,0,0.06),transparent)] dark:before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.06),transparent)] before:bg-[length:200%_100%]';

export default function ProjectsPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [pinned, setPinned] = useState<PinnedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<string>('All');
  const [sort, setSort] = useState<string>('recent');

  // Fetch pinned + public repos
  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError(null);

        const [pinnedRes, reposRes] = await Promise.all([
          fetch('/api/github/pinned', { next: { revalidate: 3600 } }),
          fetch(
            `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
            {
              headers: { Accept: 'application/vnd.github+json' },
              next: { revalidate: 3600 },
            }
          ),
        ]);

        if (!pinnedRes.ok) throw new Error(`Pinned fetch failed: ${pinnedRes.status}`);
        if (!reposRes.ok) throw new Error(`GitHub: ${reposRes.status} ${reposRes.statusText}`);

        const { pinned: pinnedJson } = await pinnedRes.json();
        const reposJson: Repo[] = await reposRes.json();

        if (!cancelled) {
          setPinned(
            (pinnedJson ?? []).map((r: any) => ({
              title: r.title,
              blurb: r.blurb,
              tags: r.tags ?? [],
              stars: r.stars ?? 0,
              language: r.language,
              repoUrl: r.repoUrl ?? r.url,
              homepage: r.homepage,
              updated: r.updated,
              archived: r.archived,
            }))
          );
          setRepos(reposJson);
        }
      } catch (e: any) {
        if (!cancelled) setError(e.message ?? 'Failed to load repositories');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  // Non-featured repos (skip forks/archived and skip any already in pinned)
  const otherRepos = useMemo(() => {
    const pinnedNames = new Set(pinned.map((p) => (p.title || '').toLowerCase()));
    return repos
      .filter((r) => !r.fork && !r.archived && !pinnedNames.has(r.name.toLowerCase()))
      .map((r) => ({
        title: r.name,
        blurb: r.description ?? 'No description provided.',
        tags: [r.language ?? 'Repo'],
        repoUrl: r.html_url,
        homepage: r.homepage ?? undefined,
        stars: r.stargazers_count,
        language: r.language ?? undefined,
        updated: r.pushed_at,
        archived: r.archived,
      }));
  }, [repos, pinned]);

  const categories = [
    'All',
    'Web',
    'DFIR',
    'SecDevOps',
    'Tools',
    'Python',
    'TypeScript',
    'Next.js',
    'Node',
    'Jenkins',
  ];

  // Apply search/filter/sort across featured + others
  const filtered = useMemo(() => {
    const apply = (list: any[]) =>
      list.filter((p) => {
        const matchesSearch = (p.title + ' ' + p.blurb)
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesFilter =
          filter === 'All' ||
          (p.tags ?? []).some((t: string) => t.toLowerCase() === filter.toLowerCase());
        return matchesSearch && matchesFilter;
      });

    const sorter = (a: any, b: any) => {
      if (sort === 'stars') return (b.stars ?? 0) - (a.stars ?? 0);
      if (sort === 'az') return a.title.localeCompare(b.title);
      const ad = a.updated ? new Date(a.updated).getTime() : 0;
      const bd = b.updated ? new Date(b.updated).getTime() : 0;
      return bd - ad; // recent
    };

    const list = [...apply(pinned), ...apply(otherRepos)];
    return list.sort(sorter);
  }, [pinned, otherRepos, filter, query, sort]);

  return (
    <div className="relative min-h-screen transition-colors">
      <section className="mx-auto w-full max-w-6xl px-4 pb-32 pt-28 md:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-3 text-3xl font-semibold tracking-tight md:text-4xl"
        >
          Projects
        </motion.h1>

        <p className="mb-8 max-w-2xl text-neutral-700 dark:text-zinc-300">
          Experiments and coursework spanning{' '}
          <span className="text-violet-700 dark:text-violet-400">DFIR</span>,{' '}
          <span className="text-violet-700 dark:text-violet-400">SecDevOps</span>, and modern web.
          Everything here is live from GitHub. Featured projects mirror my GitHub “Pinned” repos.
        </p>

        {/* Toolbar */}
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-3">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-zinc-400"
                size={18}
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search projects…"
                className="w-full rounded-xl border px-10 py-2 text-sm outline-none
                           border-neutral-300 bg-white text-neutral-900
                           focus:ring-2 ring-violet-300/60
                           dark:border-white/10 dark:bg-zinc-900/60 dark:text-white dark:focus:ring-violet-500/40"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border px-3 py-2 text-sm outline-none
                         border-neutral-300 bg-white text-neutral-900
                         focus:ring-2 ring-violet-300/60
                         dark:border-white/10 dark:bg-zinc-900/60 dark:text-white dark:focus:ring-violet-500/40"
              aria-label="Sort"
            >
              <option value="recent">Most recent</option>
              <option value="stars">Most stars</option>
              <option value="az">A–Z</option>
            </select>
            <Link
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              className="group inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium
                         border-violet-200 bg-violet-100 text-violet-900 hover:bg-violet-200
                         dark:border-violet-600/40 dark:bg-violet-600/10 dark:text-violet-200 dark:hover:bg-violet-600/20"
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
                className={`rounded-full border px-3 py-1 text-xs transition ${
                  filter === c
                    ? 'border-violet-400 bg-violet-100 text-violet-900 dark:border-violet-500 dark:bg-violet-500/20 dark:text-violet-100'
                    : 'border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400 dark:border-white/10 dark:bg-zinc-900/60 dark:text-zinc-300'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`relative overflow-hidden ${CARD_CLASS} ${shimmer}`}
                style={{ minHeight: 180 }}
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mb-6 rounded-xl border p-4 text-sm
                          border-red-200 bg-red-50 text-red-900
                          dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">
            Couldn’t load GitHub data ({error}). Showing nothing to avoid stale entries.
          </div>
        )}

        {/* Results */}
        {!loading && !error && <ProjectGrid items={filtered} />}

        <div className="mt-12 text-center text-sm text-neutral-600 dark:text-zinc-400">
          <p className="mb-2">Want details on a specific project or private coursework?</p>
          <p>
            Ping me on GitHub{' '}
            <Link
              href={`https://github.com/${GITHUB_USER}`}
              className="text-violet-700 underline dark:text-violet-300"
            >
              @{GITHUB_USER}
            </Link>{' '}
            or via the contact page.
          </p>
        </div>
      </section>
    </div>
  );
}

function ProjectGrid({ items }: { items: any[] }) {
  if (!items.length)
    return (
      <div className="rounded-xl border p-8 text-center
                      border-neutral-200 bg-neutral-50 text-neutral-600
                      dark:border-zinc-800 dark:bg-zinc-950/60 dark:text-zinc-400">
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
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 0.4, delay: idx * 0.04 }}
          className={`group relative overflow-hidden ${CARD_CLASS}`}
        >
          <div className="mb-4 flex items-center gap-3">
            <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl border
                            border-neutral-200 bg-white
                            dark:border-white/10 dark:bg-white/10">
              {p.image ? (
                <Image src={p.image} alt="" fill className="object-contain p-1" />
              ) : (
                <div className="h-full w-full" />
              )}
            </div>
            <h3 className="text-base font-semibold text-purple-700 dark:text-purple-300">
              {p.title}
            </h3>
          </div>

          <p className="mb-4 line-clamp-3 text-sm text-neutral-700 dark:text-zinc-300">
            {p.blurb}
          </p>

          <div className="mb-4 flex flex-wrap gap-2">
            {(p.tags ?? []).slice(0, 5).map((t: string) => (
              <span
                key={t}
                className="rounded-full border px-2 py-0.5 text-[11px]
                           border-neutral-300 bg-white text-purple-700
                           dark:border-white/10 dark:bg-white/5 dark:text-purple-200"
              >
                {t}
              </span>
            ))}
            {p.language && (
              <span className="rounded-full border px-2 py-0.5 text-[11px]
                               border-neutral-300 bg-white text-neutral-700
                               dark:border-white/10 dark:bg-white/5 dark:text-zinc-300">
                <Code2 size={12} className="mr-1 inline" /> {p.language}
              </span>
            )}
            {p.archived && (
              <span className="rounded-full border px-2 py-0.5 text-[11px]
                               border-amber-200 bg-amber-50 text-amber-800
                               dark:border-amber-800/50 dark:bg-amber-900/20 dark:text-amber-200">
                archived
              </span>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between text-xs text-neutral-600 dark:text-gray-400">
            <div className="flex items-center gap-3">
              {typeof p.stars === 'number' && (
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
                  className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[12px]
                             border-neutral-300 bg-white text-neutral-800 hover:bg-neutral-100
                             dark:border-white/10 dark:bg-white/5 dark:text-zinc-200 dark:hover:bg-white/10"
                >
                  <Github size={14} /> Code
                </Link>
              )}
              {(p.homepage || p.demo) && (
                <Link
                  href={p.homepage || p.demo}
                  target="_blank"
                  className="inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-[12px]
                             border-violet-200 bg-violet-100 text-violet-900 hover:bg-violet-200
                             dark:border-violet-600/40 dark:bg-violet-600/10 dark:text-violet-200 dark:hover:bg-violet-600/20"
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
