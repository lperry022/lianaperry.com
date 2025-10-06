import NextAuth, { NextAuthOptions } from "next-auth";
import LinkedInProvider from "next-auth/providers/linkedin";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";


export const authOptions: NextAuthOptions = {
  providers: [
   LinkedInProvider({
  clientId: process.env.LINKEDIN_CLIENT_ID!,
  clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
  authorization: {
    params: {
      scope: "r_liteprofile r_emailaddress w_member_social",
    },
  },
}),
  ],
 callbacks: {
  async jwt({ token, account }) {
    // 👇 this prints ONLY on the login redirect where `account` exists
    if (account) {
      console.log("🔐 LinkedIn account payload:", {
        provider: account.provider,
        access_token: (account as any).access_token,
        expires_at: (account as any).expires_at
      });
    }

    if (account?.access_token) {
      token.accessToken = account.access_token;
    }
    return token;
  },

  async session({ session, token }) {
    session.accessToken = token.accessToken as string | undefined;
    return session;
  },
}

};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
