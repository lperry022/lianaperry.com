import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });
  if (!token?.accessToken) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const response = await fetch(
      "https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:person:YOUR_PROFILE_ID&sharesPerOwner=3&sortBy=LAST_MODIFIED",
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "X-Restli-Protocol-Version": "2.0.0",
        },
      }
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
