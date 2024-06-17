// app/api/blog/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Ganti karakter non-alfanumerik dengan tanda hubung
    .replace(/^-+|-+$/g, ""); // Hapus tanda hubung di awal dan akhir
}
export async function PATCH(request, { params }) {
  // const session = await getServerSession(authOptions);
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const { id } = params;
  const { title, content, secureUrl, publicId } = await request.json();

  // Generate slug dari title jika title berubah
  const existingBlog = await prisma.blog.findUnique({
    where: { id },
  });

  const slug =
    title !== existingBlog?.title ? generateSlug(title) : existingBlog?.slug;

  try {
    // Update blog berdasarkan ID
    const updatedBlog = await prisma.blog.update({
      where: { id },
      data: {
        title,
        content,
        slug,
        secureUrl,
        publicId,
      },
    });

    if (!updatedBlog) {
      return new NextResponse("Blog not found", { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return new NextResponse("Slug already exists", { status: 400 });
      }
    }
    console.error("Error updating blog:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
