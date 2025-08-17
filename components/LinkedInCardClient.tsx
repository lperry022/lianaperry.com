// components/LinkedInCardClient.tsx
'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

type LinkedInPost = { url: string; title?: string; publishedAt?: string };

const fetcher = (url: string) => fetch(url).then(r => {
  if (r.status === 204) return null;
  return r.json();
});

export default function LinkedInCardClient() {
  const { data, error, isLoading } = useSWR<LinkedInPost | null>('/api/linkedin/latest', fetcher);

  if (isLoading) {
    return <p className="text-sm text-neutral-600 dark:text-zinc-400">Loading…</p>;
  }
  if (error) {
    return <p className="text-sm text-neutral-600 dark:text-zinc-400">Couldn’t load LinkedIn right now.</p>;
  }
  if (!data) {
    return (
      <>
        <p className="text-sm text-neutral-600 dark:text-zinc-400">
          Can’t auto-fetch your latest post yet.
        </p>
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
    <>
      {data.title && (
        <h3 className="mb-2 text-base font-semibold">{data.title}</h3>
      )}
      <Link
        href={data.url}
        target="_blank"
        className="inline-flex items-center gap-1 text-sm text-purple-700 hover:underline dark:text-purple-300"
      >
        Read on LinkedIn <ExternalLink className="h-3.5 w-3.5" />
      </Link>
      {data.publishedAt && (
        <p className="mt-2 text-xs text-neutral-500 dark:text-zinc-400">{new Date(data.publishedAt).toLocaleDateString()}</p>
      )}
    </>
  );
}
