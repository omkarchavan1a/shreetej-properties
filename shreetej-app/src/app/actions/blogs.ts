"use server";

import { db } from "@/db";
import { blogs } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getBlogs() {
  try {
    return await db.select().from(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

export async function createBlog(data: any) {
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
  try {
    await db.delete(blogs).where(eq(blogs.id, id));
    revalidatePath("/admin/blogs");
    return { success: true };
  } catch (error) {
    console.error("Error deleting blog:", error);
    return { success: false, error: "Failed to delete blog" };
  }
}
