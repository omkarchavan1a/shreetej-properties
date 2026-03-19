"use server";

import { db } from "@/db";
import { agents, leads } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, asc } from "drizzle-orm";
import { cookies } from "next/headers";

// Helper: Check if the request comes from an authenticated admin
async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "true";
}

// Validate and sanitize email
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Sanitize string input to prevent XSS
function sanitize(input: string): string {
  return input.replace(/[<>"'&]/g, (char) => {
    const map: Record<string, string> = { '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;', '&': '&amp;' };
    return map[char] || char;
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    // Input validation
    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (typeof name !== "string" || typeof email !== "string" || typeof phone !== "string" || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid input types" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (name.length > 200 || email.length > 200 || phone.length > 20 || message.length > 5000) {
      return NextResponse.json({ error: "Input too long" }, { status: 400 });
    }

    // Sanitize inputs
    const cleanName = sanitize(name.trim());
    const cleanEmail = sanitize(email.trim().toLowerCase());
    const cleanPhone = sanitize(phone.trim());
    const cleanMessage = sanitize(message.trim());

    // 1. Fetch available active agents
    const activeAgents = await db.select()
      .from(agents)
      .where(eq(agents.active, "true"))
      .orderBy(asc(agents.leadCount));

    if (activeAgents.length === 0) {
      const [newLead] = await db.insert(leads).values({
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        message: cleanMessage,
        status: "New"
      }).returning();
      return NextResponse.json({ success: true, leadId: newLead.id, message: "Lead saved (Unassigned)" });
    }

    // 2. Select the agent with the fewest leads
    const assignedAgent = activeAgents[0];

    // 3. Create the lead
    const [newLead] = await db.insert(leads).values({
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      message: cleanMessage,
      assignedAgentId: assignedAgent.id,
      status: "New"
    }).returning();

    // 4. Update agent lead count
    await db.update(agents)
      .set({ leadCount: (assignedAgent.leadCount || 0) + 1 })
      .where(eq(agents.id, assignedAgent.id));

    return NextResponse.json({ 
      success: true, 
      leadId: newLead.id, 
      message: "Thank you! We will contact you soon." 
    });

  } catch (error) {
    console.error("Lead assignment error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  // Only authenticated admins can view leads
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const allLeads = await db.select().from(leads);
  return NextResponse.json(allLeads);
}
