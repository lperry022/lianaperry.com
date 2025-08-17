import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return NextResponse.json({ error: "No token" }, { status: 500 });

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

  const text = await res.text(); // <-- show the real error
  if (!res.ok) {
    return NextResponse.json(
      { error: `GitHub ${res.status}: ${text}` },
      { status: res.status }
    );
  }

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
}
