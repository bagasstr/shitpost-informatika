import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    function validateEmail(email) {
      // Regex untuk validasi email (Anda bisa menggunakan regex yang lebih ketat)
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
    const errors = {};
    if (!name) {
      errors.name = "Nama harus diisi";
    }
    if (!email) {
      errors.email = "Email harus diisi";
    } else if (!validateEmail(email)) {
      // Fungsi validasi email (lihat di bawah)
      errors.email = "Email tidak valid";
    } else {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        errors.email = "Email ini sudah ada";
      }
    }
    if (!password) {
      errors.password = "Password harus diisi";
    } else if (password.length < 6) {
      errors.password = "Password harus lebih dari 6 karakter";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: errors }, { status: 400 }); // Bad Request
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
