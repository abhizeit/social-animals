import { db } from "./db";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import Email from "next-auth/providers/email";

export const authOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    Email({
      server: {
        service: "gmail",
        auth: {
          user: process.env.EMAIL_AUTH_USER ?? "",
          pass: process.env.EMAIL_AUTH_PASS ?? "",
        },
      },
      from: "Social Animals",
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
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
