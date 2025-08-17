import { NextResponse } from "next/server";

const POST_URL = process.env.LINKEDIN_POST_URL!;
const FALLBACK = {
  title: process.env.LINKEDIN_LAST_POST_TITLE || "",
  description: process.env.LINKEDIN_LAST_POST_DESC || "",
  image: process.env.LINKEDIN_LAST_POST_IMAGE || "",
};

function pickMeta(html: string, prop: string) {
  // property="og:xxx"
  const re1 = new RegExp(
    `<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["']`,
    "i"
  );
  const m1 = html.match(re1);
  if (m1?.[1]) return m1[1].trim();

  // name="og:xxx" as a fallback
  const re2 = new RegExp(
    `<meta[^>]+name=["']${prop}["'][^>]+content=["']([^"']+)["']`,
    "i"
  );
  const m2 = html.match(re2);
  return m2?.[1]?.trim() || "";
}

export async function GET() {
  if (!POST_URL) {
    return NextResponse.json(
      { error: "Missing LINKEDIN_POST_URL" },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(POST_URL, {
      // Some sites require a browsery UA to return OG tags
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      },
      // Cache for 1 hour
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({
        url: POST_URL,
        title: FALLBACK.title,
        description: FALLBACK.description,
        image: FALLBACK.image,
        publishedAt: new Date().toISOString(),
        cached: false,
        note: `LinkedIn returned ${res.status}; using fallbacks.`,
      });
    }

    const html = await res.text();

    const title =
      pickMeta(html, "og:title") ||
      pickMeta(html, "twitter:title") ||
      FALLBACK.title;

    const description =
      pickMeta(html, "og:description") ||
      pickMeta(html, "twitter:description") ||
      FALLBACK.description;

    const image =
      pickMeta(html, "og:image") ||
      pickMeta(html, "twitter:image") ||
      FALLBACK.image;

    // Some posts include this; if not, just use "now"
    const publishedAt =
      pickMeta(html, "article:published_time") || new Date().toISOString();

    return NextResponse.json({
      url: POST_URL,
      title,
      description,
      image,
      publishedAt,
      cached: true,
    });
  } catch (e: any) {
    return NextResponse.json({
      url: POST_URL,
      title: FALLBACK.title,
      description: FALLBACK.description,
      image: FALLBACK.image,
      publishedAt: new Date().toISOString(),
      cached: false,
      note: `Scrape error; using fallbacks: ${e?.message || e}`,
    });
  }
}
