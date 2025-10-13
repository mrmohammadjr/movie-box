import NextAuth from "next-auth";
import authConfig from "./auth.config";
import db from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

const adapter = PrismaAdapter(db);

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter,
  session: { strategy: 'jwt' },
  ...authConfig,
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = (user as any).userName || user.name;
        token.email = user.email;
      }
      return token;
    },
  },
});
