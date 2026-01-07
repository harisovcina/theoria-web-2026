import { db } from "@/lib/db"
import { NextResponse } from "next/server"

// GET /api/team - Get all team members (ordered)
export async function GET() {
  try {
    const teamMembers = await db.teamMember.findMany({
      orderBy: { order: "asc" },
    })

    return NextResponse.json(teamMembers)
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    )
  }
}

export const revalidate = 86400 // 24 hours
