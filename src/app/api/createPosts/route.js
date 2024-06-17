import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // Ganti karakter non-alfanumerik dengan tanda hubung
    .replace(/^-+|-+$/g, ""); // Hapus tanda hubung di awal dan akhir
}
export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  const { title, content, secureUrl, publicId } = body;
  const slug = generateSlug(title);
  if (!title || !content) {
    return new NextResponse("Missing title or content", { status: 400 });
  }
  try {
    const res = await prisma.blog.create({
      data: {
        title,
        content,
        slug,
        author: { connect: { email: session?.user?.email } },
        secureUrl,
        publicId,
      },
      include: {
        author: {
          select: { name: true, email: true },
        },
      },
    });

    if (!res) {
      return new NextResponse("Failed to create blog", { status: 500 });
    }

    return NextResponse.json(
      {
        messages: "Post created successfully",
        author: res.author.name,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error) {
      // Jika error karena slug sudah ada, generate slug baru
      if (error.code === "P2002") {
        // ... (opsional) Tambahkan logika untuk mencoba kembali dengan slug baru
        console.error("Error creating blog (duplicate slug):", error);
      }
    } else {
      console.error("Error creating blog:", error);
    }
    return new NextResponse("Internal server error", { status: 500 });
  }
}
