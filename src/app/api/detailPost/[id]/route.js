import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    const postId = params.id;
    const res = await prisma.blog.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });
    if (!res) {
      return new NextResponse("Post not found", { status: 404 });
    }
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
  }
}
