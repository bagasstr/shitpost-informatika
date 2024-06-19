import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const posts = await prisma.blog.findMany({
      where: {
        authorEmail: session?.user?.email,
      },
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
  } catch (error) {
    console.error(error);
    return new NextResponse("Failed to fetch all posts", { status: 500 });
  }
}
