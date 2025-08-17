import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // allow ?url=... override, otherwise use env
    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url") || process.env.LINKEDIN_POST_URL;
    if (!url) {
      return NextResponse.json(
        { ok: false, error: "Missing LinkedIn post URL" },
        { status: 400 }
      );
    }

    // LinkedIn oEmbed (no auth). omitScript=true keeps it light.
    const o = await fetch(
      `https://www.linkedin.com/oembed?omitScript=true&url=${encodeURIComponent(
        url
      )}`,
      {
        // Some hosts are picky about UA; this helps avoid 403 in some setups
        headers: { "User-Agent": "Mozilla/5.0" },
        // Cache on the server for 1 hour
        next: { revalidate: 3600 },
      }
    );

    if (!o.ok) {
      return NextResponse.json(
        { ok: false, error: `LinkedIn oEmbed failed: ${o.status}` },
        { status: o.status }
      );
    }

    const data = await o.json(); // { html, width, height, ... }
    return NextResponse.json({ ok: true, ...data });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message || "LinkedIn fetch error" },
      { status: 500 }
    );
  }
}
