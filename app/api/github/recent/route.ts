// app/api/github/recent/route.ts
import { NextResponse } from "next/server";

type Repo = {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string; // ISO
  fork: boolean;
};

const GITHUB_USER = "lperry022";

// Optional: avoid rate limits by adding a token in your .env.local
// GITHUB_TOKEN=ghp_xxx...
const headers: Record<string, string> = {
  Accept: "application/vnd.github+json",
};
if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      {
        // Cache on the server for 1 hour
        next: { revalidate: 3600 },
        headers,
      }
    );

    if (!res.ok) {
      return NextResponse.json({ repos: [] }, { status: res.status });
    }

    const all: Repo[] = await res.json();
    const top3 = all
      .filter((r) => !r.fork)
      .sort(
        (a, b) =>
          new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
      )
      .slice(0, 3);

    return NextResponse.json({ repos: top3 });
  } catch {
    return NextResponse.json({ repos: [] }, { status: 200 });
  }
}
