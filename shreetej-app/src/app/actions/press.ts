"use server";

import { db } from "@/db";
import { press } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getPressItems() {
  try {
    return await db.select().from(press);
  } catch (error) {
    console.error("Error fetching press items:", error);
    return [];
  }
}

export async function createPressItem(data: any) {
  try {
    await db.insert(press).values(data);
    revalidatePath("/admin/press");
    revalidatePath("/press");
    return { success: true };
  } catch (error) {
    console.error("Error creating press item:", error);
    return { success: false, error: "Failed to create press item" };
  }
}

export async function updatePressItem(id: number, data: any) {
  try {
    await db.update(press).set(data).where(eq(press.id, id));
    revalidatePath("/admin/press");
    return { success: true };
  } catch (error) {
    console.error("Error updating press item:", error);
    return { success: false, error: "Failed to update press item" };
  }
}

export async function deletePressItem(id: number) {
  try {
    await db.delete(press).where(eq(press.id, id));
    revalidatePath("/admin/press");
    return { success: true };
  } catch (error) {
    console.error("Error deleting press item:", error);
    return { success: false, error: "Failed to delete press item" };
  }
}
