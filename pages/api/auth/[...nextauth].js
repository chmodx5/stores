import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import Auth0Provider from "next-auth/providers/auth0";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
//imprt prisma client
import { PrismaClient } from "@prisma/client";

const prisma = require("./../../../utils/prismadb");

export const authOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ session, token, account }) {
      if (account) {
        token.account = account.provider;
      }
      // token.userRole = "admin";
      // console.log("token", token);
      return token;
    },
  },
};

export default NextAuth(authOptions);
