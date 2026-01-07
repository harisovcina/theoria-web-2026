"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ImageUpload } from "./ImageUpload"
import { Loader2Icon } from "lucide-react"

const teamMemberSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  babyPhoto: z.string().min(1, "Baby photo is required"),
  adultPhoto: z.string().min(1, "Adult photo is required"),
  email: z.string().email().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  cvLink: z.string().url().optional().or(z.literal("")),
})

type TeamFormData = z.infer<typeof teamMemberSchema>

interface TeamFormProps {
  teamMember?: any
  mode: "create" | "edit"
}

export function TeamForm({ teamMember, mode }: TeamFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TeamFormData>({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: {
      name: teamMember?.name || "",
      role: teamMember?.role || "",
      babyPhoto: teamMember?.babyPhoto || "",
      adultPhoto: teamMember?.adultPhoto || "",
      email: teamMember?.email || "",
      linkedin: teamMember?.linkedin || "",
      cvLink: teamMember?.cvLink || "",
    },
  })

  const babyPhoto = watch("babyPhoto")
  const adultPhoto = watch("adultPhoto")

  const onSubmit = async (data: TeamFormData) => {
    try {
      setIsSubmitting(true)

      const payload = {
        ...data,
        email: data.email || null,
        linkedin: data.linkedin || null,
        cvLink: data.cvLink || null,
      }

      const url =
        mode === "create"
          ? "/api/admin/team"
          : `/api/admin/team/${teamMember.id}`
      const method = mode === "create" ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error("Failed to save team member")

      toast.success(
        mode === "create" ? "Team member created" : "Team member updated"
      )
      router.push("/admin/team")
      router.refresh()
    } catch (error) {
      console.error("Submit error:", error)
      toast.error("Failed to save team member")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
        <div className="grid gap-6">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="e.g., Haris Ovčina"
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              {...register("role")}
              placeholder="e.g., Founder & Lead Designer"
            />
            {errors.role && (
              <p className="text-sm text-destructive mt-1">
                {errors.role.message}
              </p>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Photos</h2>
        <div className="grid gap-6">
          <ImageUpload
            label="Baby Photo"
            value={babyPhoto}
            onChange={(url) => setValue("babyPhoto", url)}
            folder="theoria/team/baby"
            aspectRatio="1/1"
          />

          <ImageUpload
            label="Adult Photo"
            value={adultPhoto}
            onChange={(url) => setValue("adultPhoto", url)}
            folder="theoria/team/adult"
            aspectRatio="1/1"
          />

          <p className="text-sm text-muted-foreground">
            The baby photo is shown by default, and crossfades to the adult photo on hover.
          </p>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Contact & Links</h2>
        <div className="grid gap-6">
          <div>
            <Label htmlFor="email">Email (optional)</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="e.g., haris@theoria.co"
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="linkedin">LinkedIn URL (optional)</Label>
            <Input
              id="linkedin"
              {...register("linkedin")}
              placeholder="e.g., https://linkedin.com/in/username"
            />
            {errors.linkedin && (
              <p className="text-sm text-destructive mt-1">
                {errors.linkedin.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="cvLink">CV Link (optional)</Label>
            <Input
              id="cvLink"
              {...register("cvLink")}
              placeholder="e.g., https://theoria.co/cv"
            />
            {errors.cvLink && (
              <p className="text-sm text-destructive mt-1">
                {errors.cvLink.message}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Usually only shown for Haris
            </p>
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
          {mode === "create" ? "Create Team Member" : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/team")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
