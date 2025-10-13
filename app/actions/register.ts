"use server";
import { PrismaClient } from '@prisma/client';
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
const prisma = new PrismaClient()
export async function register(formData: FormData) {
  
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const userName = formData.get("name") as string;
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const existingUser = await prisma.user.findFirst({
      where: { email: email },
    });

    if (existingUser) {
      return { error: "User already exists" };
    }
    
    const user = await prisma.user.create({
    data: {
      id: uuid(),
      email,
      userName,
      password: hashedPassword, // In a real app, ensure to hash passwords and handle them securely
      confirmPassword: hashedPassword,
      favorites: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });
    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    
    // Handle specific Prisma errors
    if (error instanceof Error) {
      if (error.message.includes("timeout") || error.message.includes("Server selection timeout")) {
        return { error: "Database connection timeout. Please try again." };
      }
      if (error.message.includes("P2010")) {
        return { error: "Database connection failed. Please check your connection." };
      }
    }
    
    return { error: "Something went wrong during registration" };
  }
}
