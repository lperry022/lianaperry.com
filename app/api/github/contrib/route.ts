import { NextResponse } from 'next/server';

const USER = 'lperry022';

export async function GET() {
  try {
    const r = await fetch(`https://github.com/users/${USER}/contributions`, {
      headers: { 'User-Agent': 'portfolio-site' },
      // cache it for 30 minutes
      next: { revalidate: 1800 },
    });

    if (!r.ok) {
      const txt = await r.text();
      return NextResponse.json({ error: `GitHub ${r.status}`, detail: txt }, { status: 502 });
    }

    const svg = await r.text();
    // Return JSON so the client can dangerouslySetInnerHTML it
    return NextResponse.json({ svg });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Failed to fetch' }, { status: 500 });
  }
}
