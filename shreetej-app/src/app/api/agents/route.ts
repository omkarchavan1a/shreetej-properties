"use server";

import { cookies } from "next/headers";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

// Helper: Check if the request comes from an authenticated admin
async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "true";
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const allAgents = await db.select().from(agents);
  return NextResponse.json(allAgents);
}

export async function POST(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const [newAgent] = await db.insert(agents).values(body).returning();
  return NextResponse.json(newAgent);
}

export async function PATCH(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, ...updates } = await req.json();
  const [updated] = await db.update(agents)
    .set(updates)
    .where(eq(agents.id, id))
    .returning();
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") || "0");
  if (!id || isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
  await db.delete(agents).where(eq(agents.id, id));
  return NextResponse.json({ success: true });
}
