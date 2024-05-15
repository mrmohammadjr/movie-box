import { connectMDB } from "../../../../utils/db.js";
import mongoose from "mongoose";
import User from "../../../../models/user";
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth';
import { cookies } from 'next/headers'
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  session: {
    strategy : "jwt"
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user name" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await connectMDB()
        const user = await User.findOne({
          email: credentials.email,
        })
        
        if (user) {
          return {
            _id: user._id,
            username: user.username,
            email: user.email,
          }
        }
        cookies().set({
            name: 'auth',
            value: 'authenticate',
            httpOnly: true,
            path: '/dashboard',
          })
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id
      }
      return token
    },
    async session({ session, token, user }) {
      session.user._id = token._id
    return session
    }
}
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };