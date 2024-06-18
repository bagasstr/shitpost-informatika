import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const postId = params.id;
    const res = await prisma.blog.delete({ where: { id: postId } });
    if (!res) {
      return new NextResponse(`Blog post with ID ${postId} not found`, {
        status: 404,
      });
    } else {
      return NextResponse.json(
        { message: "Post deleted successfully" },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
  }
}
