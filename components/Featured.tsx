'use client';

import useSWR from 'swr';
import Link from 'next/link';
import LinkedInCardClient from "./LinkedInCardClient"
import {
  Github,
  Star,
  GitBranch,
  ExternalLink,
  CalendarClock,
  Linkedin,
} from 'lucide-react';

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
};

const GITHUB_USER = 'lperry022';
const fetcher = (url: string) => fetch(url).then((r) => r.json());

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white/80 p-5 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
      {children}
    </div>
  );
}

export default function Featured({
  linkedin = {
    url: 'https://www.linkedin.com/in/liana-perry-b5aa2717b/',
    title: '',
  },
}: {
  linkedin?: { url: string; title?: string };
}) {
  const { data, isLoading } = useSWR<{ repos: Repo[] }>(
    '/api/github/recent',
    fetcher
  );
  const repos = data?.repos ?? [];

  return (
    <section aria-labelledby="featured" className="mt-12">
      <h2
        id="featured"
        className="mb-4 text-[22px] font-semibold tracking-tight text-neutral-800 dark:text-neutral-100"
      >
        Featured
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Recent Projects */}
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5 opacity-80" />
              <span className="text-sm text-neutral-600 dark:text-zinc-400">
                @{GITHUB_USER}
              </span>
            </div>
            <Link
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              className="inline-flex items-center gap-1 text-sm text-purple-700 hover:underline dark:text-purple-300"
            >
              Open GitHub <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          <h3 className="mb-3 text-base font-semibold">Recent Projects</h3>

          <div className="space-y-3">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[84px] animate-pulse rounded-xl border border-neutral-200 bg-white/60 dark:border-white/10 dark:bg-white/5"
                />
              ))
            ) : repos.length ? (
              repos.map((r) => (
                <article
                  key={r.html_url}
                  className="group rounded-xl border border-neutral-200 bg-white/70 p-4 transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-white/5"
                >
                  <Link href={r.html_url} target="_blank" className="block">
                    <div className="mb-1 flex items-center justify-between">
                      <h4 className="text-sm font-medium text-neutral-900 group-hover:underline dark:text-neutral-100">
                        {r.name}
                      </h4>
                      <span className="inline-flex items-center gap-3 text-[11px] text-neutral-600 dark:text-zinc-400">
                        <span className="inline-flex items-center gap-1">
                          <Star className="h-3.5 w-3.5" /> {r.stargazers_count}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <GitBranch className="h-3.5 w-3.5" /> {r.forks_count}
                        </span>
                      </span>
                    </div>
                    {r.description && (
                      <p className="line-clamp-2 text-[13px] text-neutral-700 dark:text-zinc-300">
                        {r.description}
                      </p>
                    )}
                    <div className="mt-2 text-[11px] text-neutral-500 dark:text-zinc-400">
                      <CalendarClock className="mr-1 inline h-3.5 w-3.5" />
                      Updated {new Date(r.pushed_at).toLocaleDateString()}
                    </div>
                  </Link>
                </article>
              ))
            ) : (
              <p className="text-sm text-neutral-600 dark:text-zinc-400">
                No recent public projects found.
              </p>
            )}
          </div>
        </Card>

        {/* Recent on LinkedIn */}
        <Card>
          <div className="mb-3 flex items-center gap-2">
            <Linkedin className="h-5 w-5 text-[#0A66C2]" />
            <span className="text-sm text-neutral-600 dark:text-zinc-400">
              Recent on LinkedIn
            </span>
          </div>
            <LinkedInCardClient /> 
        </Card>
      </div>
    </section>
  );
}
