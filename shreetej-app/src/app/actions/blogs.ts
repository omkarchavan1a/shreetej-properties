"use server";

import { cookies } from "next/headers";
import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Helper: Check if the request comes from an authenticated admin
async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "true";
}

export async function getBlogs() {
  try {
    return await db.select().from(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function createBlog(data: any) {
  if (!(await isAdmin())) return { success: false, error: "Unauthorized" };
  try {
    const slug = data.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    await db.insert(blogs).values({ ...data, slug });
    revalidatePath("/admin/blogs");
    revalidatePath("/blogs");
    return { success: true };
  } catch (error) {
    console.error("Error creating blog:", error);
    return { success: false, error: "Failed to create blog" };
  }
}

export async function updateBlog(id: number, data: any) {
  if (!(await isAdmin())) return { success: false, error: "Unauthorized" };
  try {
    await db.update(blogs).set(data).where(eq(blogs.id, id));
    revalidatePath("/admin/blogs");
    return { success: true };
  } catch (error) {
    console.error("Error updating blog:", error);
    return { success: false, error: "Failed to update blog" };
  }
}

export async function deleteBlog(id: number) {
  if (!(await isAdmin())) return { success: false, error: "Unauthorized" };
  try {
    await db.delete(blogs).where(eq(blogs.id, id));
    revalidatePath("/admin/blogs");
    return { success: true };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false, error: "Failed to delete blog" };
  }
}
