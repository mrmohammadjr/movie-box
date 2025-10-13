"use server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
export async function favAction(id: number , poster: string) {
  const session = await auth();
  try {
    if (!session?.user?.email) {
      return { error: "User not authenticated" };
    }
    
    const user = await prisma.user.findFirst({
      where: { email: session.user.email },
    });
    if (!user) {
      return { error: "User not found" };
    }
    const idString = String(id);
    if (user.favorites.includes(idString)) {
      user.favorites = user.favorites.filter((item: string) => item !== idString);
    } else {
      user.favorites.push(idString);
    }
    await prisma.user.update({
      where: { id: user.id },
      data: { favorites: user.favorites },
    });
    return { success: "Successfully updated favorite status", favorites: user.favorites, isFavorite: user.favorites.includes(idString) };
  } catch (error) {
    return { error: "Failed to update favorite status" };
  }
}

export async function deletefavAction(item:number) {
  const session = await auth();
  try {
    if (!session?.user?.email) {
      return { error: "User not authenticated" };
    }
    const user = await prisma.user.findFirst({
      where: { email: session.user.email },
    });
    if (!user) {
      return { error: "User not found" };
    }
    const itemString = String(item);
    user.favorites = user.favorites.filter((fav: string) => fav !== itemString);
    await prisma.user.update({
      where: { id: user.id },
      data: { favorites: user.favorites },
    });
    return { success: "Successfully removed from favorites", favorites: user.favorites };

  } catch (error) {
    return { error: "Failed to remove from favorites" };
  }
}