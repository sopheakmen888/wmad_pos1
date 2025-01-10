import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/auth/stateless-session";
import { cookies } from "next/headers";

// 1. Specify protected and public routes
const protectedRoutes = [
  "/dashboard",
  "/pos",
  "/product",
  "/stockin",
  "/upload",
  "/user",
  "/supplier",
  "/supplier/:id"
  "/",
  "/promotion"
];
const publicRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
  // 2. Get the path and check if it's an API route
  const path = req.nextUrl.pathname;
  const isApiRoute = path.startsWith("/api");
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  console.log("path:", path);

  if (isApiRoute) {
    // 3. Check for the Authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return new NextResponse(
        JSON.stringify({
          error: "Unauthorized: Missing or invalid Authorization header",
        }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Optionally: Verify the token in the Authorization header
    const token = authHeader.split(" ")[1];
    try {
      // Assuming decrypt function can handle token decryption or validation
      const session = await decrypt(token);
      if (!session || !session.userId) {
        return new NextResponse(
          JSON.stringify({ error: "Unauthorized: Invalid token" }),
          { status: 401, headers: { "Content-Type": "application/json" } }
        );
      }
    } catch (error) {
      console.error("Token verification failed:", error);
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized: Token verification failed" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
  }

  // 4. Decrypt the session from the cookie for non-API routes
  if (!isApiRoute) {
    const cookie = cookies().get("session")?.value;
    const session = await decrypt(cookie);
    console.log("session in middleware: ", session);
    console.log("cookie:", cookie);

    // Redirect logic for protected and public routes
    if (isProtectedRoute && !session?.userId) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    if (
      isPublicRoute &&
      session?.userId &&
      !req.nextUrl.pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
  }

  return NextResponse.next();
}
