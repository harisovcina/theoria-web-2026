import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Create Supabase client with service role for admin operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export interface UploadResult {
  url: string
  path: string
}

/**
 * Upload a file to Supabase Storage
 * @param file - File buffer or base64 string
 * @param bucket - Storage bucket name (e.g., "projects", "team")
 * @param path - File path within bucket
 * @returns Public URL and path
 */
export async function uploadToSupabase(
  file: Buffer | string,
  bucket: string,
  path: string
): Promise<UploadResult> {
  try {
    let fileBuffer: Buffer

    // Convert base64 to buffer if needed
    if (typeof file === "string") {
      const base64Data = file.split(",")[1] || file
      fileBuffer = Buffer.from(base64Data, "base64")
    } else {
      fileBuffer = file
    }

    // Upload to Supabase Storage
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(path, fileBuffer, {
        contentType: "image/*",
        upsert: true,
      })

    if (error) {
      console.error("Supabase upload error:", error)
      throw new Error(`Upload failed: ${error.message}`)
    }

    // Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(data.path)

    return {
      url: urlData.publicUrl,
      path: data.path,
    }
  } catch (error) {
    console.error("Upload error:", error)
    throw new Error("Failed to upload file to Supabase Storage")
  }
}

/**
 * Delete a file from Supabase Storage
 * @param bucket - Storage bucket name
 * @param path - File path to delete
 */
export async function deleteFromSupabase(
  bucket: string,
  path: string
): Promise<void> {
  try {
    const { error } = await supabaseAdmin.storage.from(bucket).remove([path])

    if (error) {
      console.error("Supabase delete error:", error)
      throw new Error(`Delete failed: ${error.message}`)
    }
  } catch (error) {
    console.error("Delete error:", error)
    throw new Error("Failed to delete file from Supabase Storage")
  }
}

/**
 * Get public URL for a file in Supabase Storage
 * @param bucket - Storage bucket name
 * @param path - File path
 * @returns Public URL
 */
export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabaseAdmin.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
