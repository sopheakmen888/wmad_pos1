// export async function POST(request: NextRequest) {
//   const data = await request.formData();
//   const file: File | null = data.get("file") as unknown as File;

//   if (!file) {
//     return NextResponse.json({ success: false });
//   }

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   return NextResponse.json({ message: "Hello", buffer: buffer });
// }

// app/api/upload/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Set your Cloudinary credentials
const CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!; // Cloudinary Cloud Name
const API_KEY = process.env.CLOUDINARY_API_KEY!; // Cloudinary API Key
const API_SECRET = process.env.CLOUDINARY_API_SECRET!; // Cloudinary API Secret (used for Basic Auth)
const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET!; // Cloudinary unsigned upload preset

// Function to create the Basic Auth header
const createBasicAuthHeader = (apiKey: string, apiSecret: string): string => {
  const credentials = `${apiKey}:${apiSecret}`;
  return `Basic ${Buffer.from(credentials).toString("base64")}`;
};

export async function POST(req: NextRequest) {
  console.log("Uploadd.....");
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
    formData.append("public_id", "filename-001"); // set filename

    const authHeader = createBasicAuthHeader(API_KEY, API_SECRET);
    console.log(authHeader);

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

    if (response.ok) {
      return NextResponse.json(result);
    } else {
      console.log(result);
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
