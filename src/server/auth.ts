import { db } from "./db";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "database",
  },
  callbacks: {
    async signIn({ user }) {
      const dbUser = await db.user.findUnique({
        where: { email: user?.email as string },
      });
      if (dbUser && dbUser.active == false) {
        await db.user.update({
          where: { email: dbUser?.email as string },
          data: {
            active: true,
          },
        });
      }
      return true;
    },
  },
} satisfies NextAuthOptions;
