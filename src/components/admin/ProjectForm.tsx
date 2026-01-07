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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { ImageUpload } from "./ImageUpload"
import { Loader2Icon } from "lucide-react"

const projectSchema = z.object({
  name: z.string().min(1, "Name is required"),
  client: z.string().min(1, "Client is required"),
  summary: z.string().optional(),
  startYear: z.string().regex(/^\d{4}$/, "Start year must be 4 digits"),
  endYear: z.string().optional(),
  services: z.string(),
  industry: z.string(),
  heroImage: z.string().min(1, "Hero image is required"),
  deviceMockup: z.string().min(1, "Device mockup is required"),
  deviceType: z.enum(["laptop", "mobile"]),
  layoutVariant: z.enum(["A", "B", "C", "D", "E", "F"]),
  caseStudy: z.string().optional(),
  comingSoon: z.boolean(),
})

type ProjectFormData = z.infer<typeof projectSchema>

interface ProjectFormProps {
  project?: any
  mode: "create" | "edit"
}

export function ProjectForm({ project, mode }: ProjectFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Parse services and industry from JSON strings
  const parseJsonField = (field: string | undefined) => {
    if (!field) return ""
    try {
      const parsed = JSON.parse(field)
      return Array.isArray(parsed) ? parsed.join(", ") : ""
    } catch {
      return field
    }
  }

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: project?.name || "",
      client: project?.client || "",
      summary: project?.summary || "",
      startYear: project?.startYear?.toString() || new Date().getFullYear().toString(),
      endYear: project?.endYear?.toString() || "",
      services: parseJsonField(project?.services),
      industry: parseJsonField(project?.industry),
      heroImage: project?.heroImage || "",
      deviceMockup: project?.deviceMockup || "",
      deviceType: project?.deviceType || "laptop",
      layoutVariant: project?.layoutVariant || "A",
      caseStudy: project?.caseStudy || "",
      comingSoon: project?.comingSoon ?? true,
    },
  })

  const heroImage = watch("heroImage")
  const deviceMockup = watch("deviceMockup")
  const deviceType = watch("deviceType")
  const layoutVariant = watch("layoutVariant")
  const comingSoon = watch("comingSoon")

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsSubmitting(true)

      const payload = {
        ...data,
        services: data.services.split(",").map((s) => s.trim()).filter(Boolean),
        industry: data.industry.split(",").map((i) => i.trim()).filter(Boolean),
        summary: data.summary || null,
        startYear: parseInt(data.startYear),
        endYear: data.endYear ? parseInt(data.endYear) : null,
        caseStudy: data.caseStudy || null,
      }

      const url =
        mode === "create"
          ? "/api/admin/projects"
          : `/api/admin/projects/${project.id}`
      const method = mode === "create" ? "POST" : "PUT"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) throw new Error("Failed to save project")

      toast.success(
        mode === "create" ? "Project created" : "Project updated"
      )
      router.push("/admin/projects")
      router.refresh()
    } catch (error) {
      console.error("Submit error:", error)
      toast.error("Failed to save project")
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
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="e.g., Dashboard Redesign"
            />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="client">Client</Label>
            <Input
              id="client"
              {...register("client")}
              placeholder="e.g., Acme Corp"
            />
            {errors.client && (
              <p className="text-sm text-destructive mt-1">
                {errors.client.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="summary">Project Summary</Label>
            <Textarea
              id="summary"
              {...register("summary")}
              placeholder="Short description shown on hover..."
              rows={3}
            />
            {errors.summary && (
              <p className="text-sm text-destructive mt-1">
                {errors.summary.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startYear">Start Year</Label>
              <Input
                id="startYear"
                {...register("startYear")}
                placeholder="2024"
                maxLength={4}
              />
              {errors.startYear && (
                <p className="text-sm text-destructive mt-1">
                  {errors.startYear.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="endYear">End Year (optional, leave empty if ongoing)</Label>
              <Input
                id="endYear"
                {...register("endYear")}
                placeholder="2025"
                maxLength={4}
              />
              {errors.endYear && (
                <p className="text-sm text-destructive mt-1">
                  {errors.endYear.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="services">Services (comma-separated)</Label>
            <Input
              id="services"
              {...register("services")}
              placeholder="e.g., UX Design, UI Design, Prototyping"
            />
          </div>

          <div>
            <Label htmlFor="industry">Industry (comma-separated)</Label>
            <Input
              id="industry"
              {...register("industry")}
              placeholder="e.g., FinTech, SaaS"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Media</h2>
        <div className="grid gap-6">
          <ImageUpload
            label="Hero Image"
            value={heroImage}
            onChange={(url) => setValue("heroImage", url)}
            folder="theoria/projects/heroes"
            aspectRatio="16/9"
          />

          <ImageUpload
            label="Device Mockup"
            value={deviceMockup}
            onChange={(url) => setValue("deviceMockup", url)}
            folder="theoria/projects/mockups"
            aspectRatio={deviceType === "laptop" ? "16/10" : "9/19.5"}
          />

          <div>
            <Label htmlFor="deviceType">Device Type</Label>
            <Select
              value={deviceType}
              onValueChange={(value) =>
                setValue("deviceType", value as "laptop" | "mobile")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="laptop">Laptop</SelectItem>
                <SelectItem value="mobile">Mobile</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Layout & Content</h2>
        <div className="grid gap-6">
          <div>
            <Label htmlFor="layoutVariant">Layout Variant</Label>
            <Select
              value={layoutVariant}
              onValueChange={(value) =>
                setValue("layoutVariant", value as "A" | "B" | "C" | "D" | "E" | "F")
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">A - Centered (title above, device below)</SelectItem>
                <SelectItem value="B">B - Left text, right device</SelectItem>
                <SelectItem value="C">C - Left device, right text</SelectItem>
                <SelectItem value="D">D - Top text, wide device bottom</SelectItem>
                <SelectItem value="E">E - Top device, bottom text</SelectItem>
                <SelectItem value="F">F - Editorial offset</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="caseStudy">Case Study (Markdown)</Label>
            <Textarea
              id="caseStudy"
              {...register("caseStudy")}
              placeholder="Write your case study in Markdown format..."
              rows={10}
              className="font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Leave empty if project is coming soon
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="comingSoon"
              checked={comingSoon}
              onCheckedChange={(checked) =>
                setValue("comingSoon", checked as boolean)
              }
            />
            <Label
              htmlFor="comingSoon"
              className="text-sm font-normal cursor-pointer"
            >
              Coming Soon (dim pill, no case study access)
            </Label>
          </div>
        </div>
      </Card>

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2Icon className="w-4 h-4 mr-2 animate-spin" />}
          {mode === "create" ? "Create Project" : "Save Changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/projects")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
