import { auth } from "@/auth"
import { NextResponse } from "next/server"

// List of authorized admin emails
const AUTHORIZED_ADMINS = ["haris.ovcina@gmail.com"]

// TEMPORARY: Bypass auth in local development
const BYPASS_AUTH_IN_DEV = process.env.BYPASS_AUTH === "true"

export default auth((req) => {
  const { pathname } = req.nextUrl

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    // Bypass auth in development mode
    if (BYPASS_AUTH_IN_DEV) {
      return NextResponse.next()
    }

    const user = req.auth?.user

    // If not logged in, redirect to home
    if (!user) {
      return NextResponse.redirect(new URL("/", req.url))
    }

    // If logged in but not authorized, redirect to home
    if (!user.email || !AUTHORIZED_ADMINS.includes(user.email)) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }

  return NextResponse.next()
})

// Configure which routes use this middleware
export const config = {
  matcher: [
    // Protect admin routes
    "/admin/:path*",
    // Skip Next.js internals and static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}
