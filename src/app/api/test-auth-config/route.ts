import { NextResponse } from "next/server"

export async function GET() {
  try {
    const config = {
      AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID ? "✓ Set" : "✗ Missing",
      AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET ? "✓ Set" : "✗ Missing",
      AUTH_SECRET: process.env.AUTH_SECRET ? "✓ Set" : "✗ Missing",
      AUTH_URL: process.env.AUTH_URL || "Not set",
      DATABASE_URL: process.env.DATABASE_URL ? "✓ Set" : "✗ Missing",
      DIRECT_URL: process.env.DIRECT_URL ? "✓ Set" : "✗ Missing",
      NODE_ENV: process.env.NODE_ENV,
    }

    return NextResponse.json(config)
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
