import { db } from "@/lib/db"
import { NextResponse } from "next/server"

// GET /api/projects - Get all projects (ordered)
export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: { order: "asc" },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}

export const revalidate = 86400 // 24 hours
