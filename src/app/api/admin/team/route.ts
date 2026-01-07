import { auth } from "@/auth"
import { db } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

const AUTHORIZED_ADMINS = ["haris.ovcina@gmail.com"]
const BYPASS_AUTH_IN_DEV = process.env.BYPASS_AUTH === "true"

// POST /api/admin/team - Create team member
export async function POST(req: NextRequest) {
  try {
    // Check authentication (bypass in dev mode)
    if (!BYPASS_AUTH_IN_DEV) {
      const session = await auth()
      if (!session?.user?.email || !AUTHORIZED_ADMINS.includes(session.user.email)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }
    }

    const body = await req.json()

    // Get the highest order number and increment
    const maxOrder = await db.teamMember.findFirst({
      orderBy: { order: "desc" },
      select: { order: true },
    })

    const teamMember = await db.teamMember.create({
      data: {
        name: body.name,
        role: body.role,
        babyPhoto: body.babyPhoto,
        adultPhoto: body.adultPhoto,
        email: body.email || null,
        linkedin: body.linkedin || null,
        cvLink: body.cvLink || null,
        order: (maxOrder?.order ?? -1) + 1,
      },
    })

    // Revalidate pages
    revalidatePath("/about")
    revalidatePath("/admin/team")

    return NextResponse.json(teamMember)
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json(
      { error: "Failed to create team member" },
      { status: 500 }
    )
  }
}
