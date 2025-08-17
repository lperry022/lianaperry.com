import { NextResponse } from 'next/server';

/**
 * Optional envs if you have LinkedIn API access configured
 * (Authorization Code flow / Marketing Developer Platform approval
 *  with Community Management product to read posts).
 *
 * LINKEDIN_ACCESS_TOKEN=...
 * LINKEDIN_MEMBER_URN=urn:li:person:xxxxxxxx
 */
const TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const MEMBER_URN = process.env.LINKEDIN_MEMBER_URN;

export async function GET() {
  try {
    if (!TOKEN || !MEMBER_URN) {
      return NextResponse.json({ ok: false, reason: 'no-token' }, { status: 200 });
    }

    // Prefer the newer Posts API (REST surface); falls back if needed.
    const url = `https://api.linkedin.com/rest/posts?q=author&author=${encodeURIComponent(MEMBER_URN)}&count=5`;
    const r = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'X-Restli-Protocol-Version': '2.0.0',
      },
      next: { revalidate: 900 },
    });

    if (!r.ok) {
      // If your app isn’t approved yet, gracefully bail out
      return NextResponse.json({ ok: false, reason: `linkedin-${r.status}` }, { status: 200 });
    }

    const data = await r.json();
    const first = (data?.elements || data?.items || [])[0];

    if (!first) return NextResponse.json({ ok: false, reason: 'no-posts' }, { status: 200 });

    // Shape varies; extract a sensible preview + URL if present
    const title =
      first?.text?.text ||
      first?.commentary?.text?.text ||
      'LinkedIn post';
    const urlFromEntity =
      first?.permalink ||
      first?.navigationUrl ||
      `https://www.linkedin.com/in/liana-perry-b5aa2717b/`;

    return NextResponse.json({
      ok: true,
      item: {
        title: title?.slice(0, 120),
        preview: title?.slice(0, 260),
        url: urlFromEntity,
      },
    });
  } catch (e: any) {
    return NextResponse.json({ ok: false, reason: e?.message || 'error' }, { status: 200 });
  }
}
