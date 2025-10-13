import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ comment: string }> }
) {
  try {
    const { comment } = await context.params;
    const data = await prisma.comments.findFirst({
      where: { movieId: Number(comment) },
    });
    return NextResponse.json({ comments: data?.comments || [] });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
