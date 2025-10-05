import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export async function POST(request: NextRequest) {
  const { e } = await request.json();
  const currentUser = await prisma.user.findFirst({
    where: { email: e },
  });
  console.log("current",currentUser)
  return NextResponse.json({
    success: true,
    data: currentUser,
  });
}
