"use server";

import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getProjects() {
  try {
    return await db.select().from(projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function createProject(data: any) {
  try {
    await db.insert(projects).values(data);
    revalidatePath("/admin/projects");
    revalidatePath("/commercial");
    revalidatePath("/residential");
    return { success: true };
  } catch (error) {
    console.error("Error creating project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

export async function updateProject(id: number, data: any) {
  try {
    await db.update(projects).set(data).where(eq(projects.id, id));
    revalidatePath("/admin/projects");
    revalidatePath(`/commercial/${id}`);
    revalidatePath(`/residential/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Error updating project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

export async function deleteProject(id: number) {
  try {
    await db.delete(projects).where(eq(projects.id, id));
    revalidatePath("/admin/projects");
    return { success: true };
  } catch (error) {
    console.error("Error deleting project:", error);
    return { success: false, error: "Failed to delete project" };
  }
}
