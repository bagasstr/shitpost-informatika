import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const postId = params.id; // Ambil ID post dari parameter URL

    // Cari post berdasarkan ID
    const post = await prisma.blog.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });

    // Jika post tidak ditemukan, kembalikan status 404
    if (!post) {
      return new NextResponse("Post not found", { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    // Handle error jika terjadi kesalahan saat mengambil data
    console.error("Error fetching post:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
