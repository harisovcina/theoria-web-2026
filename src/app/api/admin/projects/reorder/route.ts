import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

const AUTHORIZED_ADMINS = ["haris.ovcina@gmail.com"]
const BYPASS_AUTH_IN_DEV = process.env.BYPASS_AUTH === "true"

// PUT /api/admin/projects/reorder - Reorder projects
export async function PUT(req: NextRequest) {
  try {
    // Check authentication (bypass in dev mode)
    if (!BYPASS_AUTH_IN_DEV) {
      const session = await auth()
      if (!session?.user?.email || !AUTHORIZED_ADMINS.includes(session.user.email)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    }

    const body = await req.json()
    const { projectIds } = body as { projectIds: string[] }

    if (!Array.isArray(projectIds)) {
      return NextResponse.json(
        { error: "Invalid projectIds format" },
        { status: 400 }
      )
    }

    // Update order for each project
    await Promise.all(
      projectIds.map((id, index) =>
        db.project.update({
          where: { id },
          data: { order: index },
        })
      )
    )

    // Revalidate pages
    revalidatePath("/")
    revalidatePath("/admin/projects")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error reordering projects:", error)
    return NextResponse.json(
      { error: "Failed to reorder projects" },
      { status: 500 }
    )
  }
}
