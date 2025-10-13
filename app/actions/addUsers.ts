"use server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

// Server action to add a user. Uses the shared Prisma singleton and hashes the password.


export async function addUser(formData: FormData) {
  const email = formData.get("email") as string;
  const userName = formData.get("name") as string;
  const rawPassword = (formData.get("password") as string) || "defaultpassword";

  if (!email || !userName) {
    throw new Error("Missing required fields: email and name");
  }

  const passwordHash = await bcrypt.hash(rawPassword, 10);

  const user = await prisma.user.create({
    data: {
      email,
      userName,
      password: passwordHash,
      confirmPassword: passwordHash,
      favorites: [],
    },
  });
  return user;
}
