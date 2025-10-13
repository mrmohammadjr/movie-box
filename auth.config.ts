import { schema } from "./lib/schema";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
export default {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedCredentials = schema.parse(credentials);
        if (validatedCredentials) {
          const { email, password } = validatedCredentials;
          // Import Prisma lazily so Middleware (Edge runtime) doesn't bundle it
          const { default: db } = await import("./lib/prisma");
          const user = await db.user.findUnique({
            where: { email },
          });
          if (!user || !user.password) {
            console.log(user)
            return null
          };
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (isPasswordValid) {
            console.log(user);
            return user;
          }
        } else {
          throw new Error("Invalid credentials");
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
