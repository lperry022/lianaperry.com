// app/api/github/pinned/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json(
      { error: "No token in process.env.GITHUB_TOKEN" },
      { status: 500 }
    );
  }

  const query = `
    query($login:String!) {
      user(login:$login) {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              stargazerCount
              primaryLanguage { name }
              url
              homepageUrl
              isArchived
              pushedAt
            }
          }
        }
      }
    }
  `;
  const body = JSON.stringify({ query, variables: { login: "lperry022" } });

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
    body,
  });

  const text = await res.text(); // show raw response for debugging

  if (!res.ok) {
    // You’ll see GitHub’s exact error here (e.g., "Bad credentials" or "Resource not accessible")
    return NextResponse.json(
      { error: `GitHub ${res.status}: ${text}` },
      { status: res.status }
    );
  }

  try {
    const json = JSON.parse(text);
    const nodes = json?.data?.user?.pinnedItems?.nodes ?? [];
    const pinned = nodes.map((r: any) => ({
      title: r.name,
      blurb: r.description ?? "No description provided.",
      tags: [r.primaryLanguage?.name ?? "Repo"],
      stars: r.stargazerCount ?? 0,
      language: r.primaryLanguage?.name ?? undefined,
      repoUrl: r.url,
      homepage: r.homepageUrl ?? undefined,
      updated: r.pushedAt,
      archived: r.isArchived,
    }));
    return NextResponse.json({ pinned });
  } catch (e: any) {
    return NextResponse.json(
      { error: `Parse error: ${e?.message}`, raw: text.slice(0, 400) },
      { status: 500 }
    );
  }
}
