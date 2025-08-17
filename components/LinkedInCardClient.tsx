'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { ExternalLink, Linkedin } from 'lucide-react';

type LinkedInPost = { url: string; title?: string; description?: string; publishedAt?: string };

const fetcher = (url: string) => fetch(url).then(r => {
  if (r.status === 204) return null;
  return r.json();
});

export default function LinkedInCardClient() {
  const { data, error, isLoading } = useSWR<LinkedInPost | null>('/api/linkedin/latest', fetcher);

  if (isLoading) return <p className="text-sm text-neutral-600 dark:text-zinc-400">Loading…</p>;
  if (error) return <p className="text-sm text-neutral-600 dark:text-zinc-400">Couldn’t load LinkedIn right now.</p>;
  if (!data) {
    return (
      <>
        <p className="text-sm text-neutral-600 dark:text-zinc-400">Can’t auto-fetch your latest post yet.</p>
        <Link
          href="https://www.linkedin.com/in/liana-perry-b5aa2717b/"
          target="_blank"
          className="mt-3 inline-flex items-center gap-1 text-sm text-purple-700 hover:underline dark:text-purple-300"
        >
          View my LinkedIn → <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </>
    );
  }

  return (
    <Link
      href={data.url}
      target="_blank"
      className="block rounded-xl border border-neutral-200 bg-white/70 p-4 hover:shadow-md dark:border-white/10 dark:bg-white/5"
    >
      <div className="flex items-center gap-2 mb-2 text-sm text-neutral-500 dark:text-zinc-400">
        <Linkedin className="h-4 w-4 text-[#0A66C2]" />
        linkedin.com • {data.publishedAt && new Date(data.publishedAt).toLocaleDateString()}
      </div>

      {data.title && (
        <h3 className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
          {data.title}
        </h3>
      )}

      {data.description && (
        <p className="mt-1 text-sm text-neutral-700 dark:text-zinc-300 line-clamp-2">
          {data.description}
        </p>
      )}
    </Link>
  );
}