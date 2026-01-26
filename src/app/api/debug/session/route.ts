import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  return NextResponse.json({
    session,
    user: session?.user,
    email: session?.user?.email,
  })
}
