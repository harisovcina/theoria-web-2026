import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/admin/Sidebar"

const AUTHORIZED_ADMINS = [
  "haris.ovcina@gmail.com",
  "harisovcina@gmail.com",
]
const BYPASS_AUTH_IN_DEV = process.env.BYPASS_AUTH === "true"
// Temporary emergency password (will be removed once OAuth fixed)
const EMERGENCY_PASSWORD = process.env.ADMIN_EMERGENCY_PASSWORD

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check for emergency password in production
  if (EMERGENCY_PASSWORD && process.env.NODE_ENV === "production") {
    const { cookies } = await import("next/headers")
    const cookieStore = await cookies()
    const emergencyAuth = cookieStore.get("emergency_admin_auth")

    if (emergencyAuth?.value !== EMERGENCY_PASSWORD) {
      redirect("/api/admin-login")
    }
  } else if (!BYPASS_AUTH_IN_DEV) {
    // Normal Google OAuth flow
    const session = await auth()

    // If not signed in at all, redirect to sign in page
    if (!session?.user?.email) {
      redirect("/api/auth/signin?callbackUrl=/admin")
    }

    // If signed in but not authorized, redirect to homepage
    if (!AUTHORIZED_ADMINS.includes(session.user.email)) {
      redirect("/")
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8 bg-muted/30">
        {children}
      </main>
    </div>
  )
}
