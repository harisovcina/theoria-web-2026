import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

const AUTHORIZED_ADMINS = ["haris.ovcina@gmail.com"]
const BYPASS_AUTH_IN_DEV = process.env.BYPASS_AUTH === "true"

// PUT /api/admin/projects/[id] - Update project
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication (bypass in dev mode)
    if (!BYPASS_AUTH_IN_DEV) {
      const session = await auth()
      if (!session?.user?.email || !AUTHORIZED_ADMINS.includes(session.user.email)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    }

    const { id } = await params
    const body = await req.json()

    const project = await db.project.update({
      where: { id },
      data: {
        name: body.name,
        client: body.client,
        year: parseInt(body.year),
        services: JSON.stringify(body.services || []),
        industry: JSON.stringify(body.industry || []),
        heroImage: body.heroImage,
        deviceMockup: body.deviceMockup,
        deviceType: body.deviceType,
        layoutVariant: body.layoutVariant,
        caseStudy: body.caseStudy || null,
        comingSoon: body.comingSoon ?? true,
      },
    })

    // Revalidate pages
    revalidatePath("/")
    revalidatePath("/admin/projects")
    revalidatePath(`/projects/${id}`)

    return NextResponse.json(project)
  } catch (error) {
    console.error("Error updating project:", error)
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/projects/[id] - Delete project
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication (bypass in dev mode)
    if (!BYPASS_AUTH_IN_DEV) {
      const session = await auth()
      if (!session?.user?.email || !AUTHORIZED_ADMINS.includes(session.user.email)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    }

    const { id } = await params

    await db.project.delete({
      where: { id },
    })

    // Revalidate pages
    revalidatePath("/")
    revalidatePath("/admin/projects")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting project:", error)
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}
