import { NextResponse } from "next/server";

export async function GET() {
  // Accept either name for convenience
  const url =
    process.env.LINKEDIN_POST_URL ||
    process.env.LINKEDIN_LAST_POST_URL ||
    "";

  const title =
    process.env.LINKEDIN_LAST_POST_TITLE ||
    process.env.LINKEDIN_POST_TITLE ||
    "View my latest post";

  if (!url) {
    // No URL set -> tell the card to show the fallback message
    return new NextResponse(null, { status: 204 });
  }

  return NextResponse.json(
    { url, title, publishedAt: new Date().toISOString() },
    { status: 200 }
  );
}