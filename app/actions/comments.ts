"use server";
import prisma from "@/lib/prisma";
export default async function sendComment(
  commentVal: string,
  id: number | string,
  name: string
) {
    try {
    const existing = await prisma.comments.findFirst({
      where: { movieId: Number(id) },
    });
    if (existing) {
      existing.comments.push(commentVal);
      const updated = await prisma.comments.update({
        where: { id: existing.id },
        data: { comments: existing.comments },
      });
      return { data: updated };
    } else {
      const newComment = await prisma.comments.create({
        data: {
          movieId: Number(id),
          name: name,
          comments: [commentVal],
          like: 0,
        },
      });
      return { data: newComment };
    }
    } catch (_error) {
        return { error: "Failed to add comment" };
    }
}
