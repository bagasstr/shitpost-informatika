import { revalidate } from "@/components/CreatePosts";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
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
    return NextResponse.json(
      { posts },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to fetch all posts", { status: 500 });
  }
}
