// app/api/linkedin/posts/route.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/options";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const res = await fetch(
      "https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:person:YOUR_PERSON_ID&sharesPerOwner=3&sortBy=LAST_MODIFIED",
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );

    const json = await res.json();

    const posts =
      json.elements?.slice(0, 3).map((p: any) => ({
        id: p.activity,
        title: p.text?.text?.substring(0, 80) || "Untitled Post",
        description: p.text?.text || "",
        publishedAt: p.lastModified?.time
          ? new Date(p.lastModified.time).toISOString()
          : null,
        url: `https://www.linkedin.com/feed/update/${p.activity}`,
      })) ?? [];

    return NextResponse.json({ posts });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
