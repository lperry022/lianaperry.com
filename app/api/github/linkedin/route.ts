// app/api/linkedin/route.ts
import { NextResponse } from 'next/server';

type Post = {
  id: string;
  title: string;
  url: string;
  publishedAt: string; // ISO date
  summary?: string;
};

export async function GET() {
  try {
    const feedUrl = process.env.LINKEDIN_JSON_URL; // e.g., https://gist.githubusercontent.com/..../raw/posts.json
    if (feedUrl) {
      const r = await fetch(feedUrl, { next: { revalidate: 1800 } });
      if (!r.ok) {
        return NextResponse.json(
          { error: `LinkedIn feed: ${r.status}` },
          { status: r.status }
        );
      }
      const posts = (await r.json()) as Post[];
      // sort newest first and trim
      const recent = posts
        .slice()
        .sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime()
        )
        .slice(0, 4);
      return NextResponse.json({ posts: recent });
    }

    // Fallback sample (edit/remove when you add LINKEDIN_JSON_URL)
    const sample: Post[] = [
      {
        id: 'sample-1',
        title: 'On building an encrypted keylogger for blue-team education',
        url: 'https://www.linkedin.com/in/liana-perry-b5aa2717b/',
        publishedAt: new Date().toISOString(),
        summary:
          'AI can block a lot, but intent and design still matter. Lessons learned from a controlled, ethical build.',
      },
      {
        id: 'sample-2',
        title: 'Human factors in cyber: psychology meets incident response',
        url: 'https://www.linkedin.com/in/liana-perry-b5aa2717b/',
        publishedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
        summary:
          'Bridging empathy with security workflows to reduce harm after scams and identity theft.',
      },
    ];
    return NextResponse.json({ posts: sample });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || 'Failed to load posts' },
      { status: 500 }
    );
  }
}
