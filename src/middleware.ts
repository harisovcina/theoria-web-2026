import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

/**
 * Minimal middleware - admin auth is handled in admin/layout.tsx
 * This file exists to prevent Auth.js default middleware from blocking routes
 */
export function middleware(req: NextRequest) {
  // Allow all requests through - auth is handled at the layout level
  return NextResponse.next()
}

export const config = {
  // Match all routes except Next.js internals and static files
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
}
