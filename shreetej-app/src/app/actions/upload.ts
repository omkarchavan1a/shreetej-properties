"use server";

import { put } from "@vercel/blob";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { cookies } from "next/headers";

// Helper: Check if the request comes from an authenticated admin
async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "true";
}

const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
];

const ALLOWED_IMAGE_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

const ALLOWED_VIDEO_TYPES = ["video/mp4"];
const ALLOWED_VIDEO_EXTENSIONS = [".mp4"];

export async function uploadImage(formData: FormData) {
  if (!(await isAdmin())) return { success: false, error: "Unauthorized" };

  const file = formData.get("file") as File;
  if (!file || file.size === 0) return { success: true, url: null };

  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (
    !ALLOWED_IMAGE_TYPES.includes(file.type) &&
    !ALLOWED_IMAGE_EXTENSIONS.includes(ext)
  ) {
    return {
      success: false,
      error: "Only PNG, JPG, JPEG, and WebP images are allowed",
    };
  }

  try {
    // Check if Vercel Blob is configured (production)
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(file.name, file, {
        access: "public",
        addRandomSuffix: true,
      });
      return { success: true, url: blob.url };
    }

    // Local fallback (Development only)
    if (process.env.NODE_ENV === "production") {
      return { success: false, error: "Cloud storage not configured. Please set UPLOADTHING_SECRET or BLOB_READ_WRITE_TOKEN." };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const publicPath = join(process.cwd(), "public", "assets");
    const filePath = join(publicPath, filename);

    await mkdir(publicPath, { recursive: true });
    await writeFile(filePath, buffer);
    return { success: true, url: `/assets/${filename}` };
  } catch (error) {
    console.error("Error saving file:", error);
    return { success: false, error: "Failed to save image. " + (error as Error).message };
  }
}

export async function uploadMultipleImages(formData: FormData) {
  if (!(await isAdmin())) return { success: false, error: "Unauthorized", urls: [] };

  const files = formData.getAll("files") as File[];
  if (!files || files.length === 0) return { success: true, urls: [] };

  const urls: string[] = [];
  
  for (const file of files) {
    if (file.size === 0) continue;

    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (
      !ALLOWED_IMAGE_TYPES.includes(file.type) &&
      !ALLOWED_IMAGE_EXTENSIONS.includes(ext)
    ) {
      return {
        success: false,
        error: `File "${file.name}" is not allowed. Only PNG, JPG, JPEG, and WebP.`,
        urls: [],
      };
    }

    try {
      console.log(`Uploading file: ${file.name} (${file.size} bytes)`);
      if (process.env.BLOB_READ_WRITE_TOKEN) {
        const blob = await put(file.name, file, {
          access: "public",
          addRandomSuffix: true,
        });
        urls.push(blob.url);
      } else {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
        const publicPath = join(process.cwd(), "public", "assets");
        const filePath = join(publicPath, filename);
        await mkdir(publicPath, { recursive: true });
        await writeFile(filePath, buffer);
        urls.push(`/assets/${filename}`);
      }
      console.log(`Successfully uploaded: ${file.name}`);
    } catch (error) {
      console.error(`Error saving file ${file.name}:`, error);
      return { success: false, error: `Failed to save "${file.name}": ${(error as Error).message}`, urls: [] };
    }
  }

  console.log(`Batch upload completed. Total images: ${urls.length}`);
  return { success: true, urls };
}

export async function uploadVideo(formData: FormData) {
  if (!(await isAdmin())) return { success: false, error: "Unauthorized" };

  const file = formData.get("file") as File;
  if (!file || file.size === 0) return { success: true, url: null };

  const ext = "." + file.name.split(".").pop()?.toLowerCase();
  if (
    !ALLOWED_VIDEO_TYPES.includes(file.type) &&
    !ALLOWED_VIDEO_EXTENSIONS.includes(ext)
  ) {
    return { success: false, error: "Only MP4 videos are allowed" };
  }

  if (file.size > 100 * 1024 * 1024) {
    return { success: false, error: "Video must be under 100MB" };
  }

  try {
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(file.name, file, {
        access: "public",
        addRandomSuffix: true,
      });
      return { success: true, url: blob.url };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
    const publicPath = join(process.cwd(), "public", "assets");
    const filePath = join(publicPath, filename);

    await mkdir(publicPath, { recursive: true });
    await writeFile(filePath, buffer);
    return { success: true, url: `/assets/${filename}` };
  } catch (error) {
    console.error("Error saving video:", error);
    return { success: false, error: "Failed to save video" };
  }
}
