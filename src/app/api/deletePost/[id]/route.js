import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  const id = params.id;
  const res = await prisma.blog.delete({ where: { id: id } });
  if (!res.ok) {
    return new NextResponse("Post not found", { status: 404 });
  }
  return NextResponse.json({ message: "Post deleted successfully" });
}
