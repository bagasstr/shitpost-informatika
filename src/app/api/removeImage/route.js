import cloudinary from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function removeImage(publicId) {
  try {
    const res = await cloudinary.v2.uploader.destroy(publicId);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { publicId } = body;
    if (!publicId) {
      return new NextResponse("Missing publicId", { status: 400 });
    }
    await removeImage(publicId);
    return NextResponse.json(
      { messages: "Image deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    throw error;
  }
}
