import { db } from "@/db";
import { agents } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  const allAgents = await db.select().from(agents);
  return NextResponse.json(allAgents);
}

export async function POST(req: Request) {
  const body = await req.json();
  const [newAgent] = await db.insert(agents).values(body).returning();
  return NextResponse.json(newAgent);
}

export async function PATCH(req: Request) {
  const { id, ...updates } = await req.json();
  const [updated] = await db.update(agents)
    .set(updates)
    .where(eq(agents.id, id))
    .returning();
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = parseInt(searchParams.get("id") || "0");
  await db.delete(agents).where(eq(agents.id, id));
  return NextResponse.json({ success: true });
}
