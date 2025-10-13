"use server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB


export async function addUser(formData: FormData) {
  const email = formData.get("email") as string;
  const userName = formData.get("name") as string;

  const user = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      email,
      userName,
      password: "defaultpassword", // In a real app, ensure to hash passwords and handle them securely
      confirmPassword: "defaultpassword",
      favorites: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
  return user;
}
