import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set your Cloudinary credentials
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!;
const API_KEY = process.env.CLOUDINARY_API_KEY!;
const API_SECRET = process.env.CLOUDINARY_API_SECRET!;
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET!;

// Function to create the Basic Auth header
const createBasicAuthHeader = (apiKey: string, apiSecret: string): string => {
  const credentials = `${apiKey}:${apiSecret}`;
  return `Basic ${Buffer.from(credentials).toString("base64")}`;
};
export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();
    const file: File | null = data.get("file") as unknown as File;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    console.log(file);
    console.log("API_KEY", API_KEY);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("api_key", API_KEY);

    const authHeader = createBasicAuthHeader(API_KEY, API_SECRET);
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader,
        },
        body: formData,
      }
    );
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(
        { error: result.error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    );
  }
}