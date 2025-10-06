'use client';

import useSWR from "swr";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function LinkedInCardClient() {
  const { data, error, isLoading } = useSWR("/api/linkedin/posts", fetcher);

  if (isLoading) return <p>Loading LinkedIn posts…</p>;
  if (error) return <p>Failed to load posts</p>;
  if (!data?.posts?.length) return <p>No recent posts found.</p>;

 return (
  <div className="space-y-3">
    {data.posts.map((post: any) => (
      <article
        key={post.id}
        className="rounded-xl border border-neutral-200 bg-white/70 p-3 dark:border-white/10 dark:bg-white/5"
      >
        <Link href={post.url} target="_blank" className="block">
          <h4 className="font-medium text-sm text-neutral-900 dark:text-neutral-100">
            {post.title}
          </h4>
          <p className="text-xs text-neutral-600 dark:text-neutral-400">
            {post.description}
          </p>
          {post.publishedAt && (
            <p className="text-[11px] text-neutral-500 mt-1">
              {new Date(post.publishedAt).toLocaleDateString()}
            </p>
          )}
        </Link>
      </article>
    ))}
  </div>
);
}
