import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/auth/stateless-session";
import { cookies } from "next/headers";

const protectedRoutes = [
  "/dashboard",
  "/pos",
  "/product",
  "/stockin",
  "/upload",
  "/user",
  "/stockin/add-purchase",
  "/",
];
const publicRoutes = ["/login", "/api/auth/login"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isApiRoute = path.startsWith("/api");
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = cookies().get("session");

  console.log("path:", path);

  if (isApiRoute) {
    if (!isPublicRoute) {
      if (cookie) {
        const session = await decrypt(cookie?.value);
        if (!session?.userId) {
          return new NextResponse(
            JSON.stringify({
              error: "Unauthorized: Invalid cookie",
            }),
            { status: 401, headers: { "Content-Type": "application/json" } }
          );
        }
      } else {
        const authHeader = req.headers.get("authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return new NextResponse(
            JSON.stringify({
              error: "Unauthorized: Missing or invalid Authorization header",
            }),
            { status: 401, headers: { "Content-Type": "application/json" } }
          );
        }

        const token = authHeader.split(" ")[1];
        try {
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
            JSON.stringify({
              error: "Unauthorized: Token verification failed",
            }),
            { status: 401, headers: { "Content-Type": "application/json" } }
          );
        }
      }
    }
  }

  if (!isApiRoute) {
    const session = await decrypt(cookie?.value);

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
