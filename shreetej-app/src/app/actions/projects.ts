"use server";

import { cookies } from "next/headers";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Helper: Check if the request comes from an authenticated admin
async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "true";
}

export async function getProjects() {
  try {
    return await db.select().from(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProjectsByType(type: string) {
  try {
    return await db.select().from(projects).where(eq(projects.type, type));
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function createProject(data: any) {
  if (!(await isAdmin())) return { success: false, error: "Unauthorized" };
  try {
    await db.insert(projects).values(data);
    revalidatePath("/admin/projects");
    revalidatePath("/commercial");
    revalidatePath("/residential");
    revalidatePath("/layouts");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(id: number, data: any) {
  if (!(await isAdmin())) return { success: false, error: "Unauthorized" };
  try {
    await db.update(projects).set(data).where(eq(projects.id, id));
    revalidatePath("/admin/projects");
    revalidatePath(`/commercial/${id}`);
    revalidatePath(`/residential/${id}`);
    revalidatePath("/layouts");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: number) {
  if (!(await isAdmin())) return { success: false, error: "Unauthorized" };
  try {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath("/admin/projects");
    revalidatePath("/layouts");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
