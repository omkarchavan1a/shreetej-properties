"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { cookies } from "next/headers";

// Helper: Check if the request comes from an authenticated admin
async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "true";
}

export async function uploadImage(formData: FormData) {
  if (!(await isAdmin())) return { success: false, error: "Unauthorized" };
  
  const file = formData.get("file") as File;
  if (!file || file.size === 0) return { success: true, url: null }; // No file uploaded is fine

  // Enforce PNG (at least by extension/type)
  if (!file.type.startsWith("image/png") && !file.name.toLowerCase().endsWith(".png")) {
      return { success: false, error: "Only PNG images are allowed" };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '_')}`;
    const publicPath = join(process.cwd(), "public", "assets");
    const filePath = join(publicPath, filename);

    // Ensure directory exists
    await mkdir(publicPath, { recursive: true });
    
    await writeFile(filePath, buffer);
    return { success: true, url: `/assets/${filename}` };
  } catch (error) {
    console.error("Error saving file:", error);
    return { success: false, error: "Failed to save image" };
  }
}
