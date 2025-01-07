import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
  });

  if (
    !token &&
    request.nextUrl.pathname !== "/login" &&
    request.nextUrl.pathname !== "/register"
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next(); //
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - .svg, .ico, .png (images)
     * - .webmanifest (PWA manifest)
     */
    "/((?!api|_next/static|_next/image|404|.*\\.svg$|.*\\.ico$|.*\\.png$|.*\\.webmanifest$).*)",
    /*
     * Match the root path
     */
    "/",
  ],
};
