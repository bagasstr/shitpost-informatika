import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.blog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return NextResponse.json({ posts });
}
