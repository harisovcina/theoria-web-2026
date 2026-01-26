import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET() {
  const cookieStore = await cookies()

  // Delete all auth cookies
  cookieStore.delete("__Host-authjs.csrf-token")
  cookieStore.delete("__Secure-authjs.callback-url")
  cookieStore.delete("__Secure-authjs.session-token")
  cookieStore.delete("authjs.csrf-token")
  cookieStore.delete("authjs.callback-url")
  cookieStore.delete("authjs.session-token")

  return NextResponse.json({
    success: true,
    message: "All auth cookies cleared. Go to /admin now"
  })
}
