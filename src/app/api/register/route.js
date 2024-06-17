import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing email, name, or password", {
        status: 401,
      });
    }

    // Periksa apakah pengguna sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword },
    });
    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    ); // 201 Created
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 } // 500 Internal Server Error
    );
  }
}
