import { db } from "@/db";
import { agents, leads } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq, asc } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Fetch available active agents
    const activeAgents = await db.select()
      .from(agents)
      .where(eq(agents.active, "true"))
      .orderBy(asc(agents.leadCount)); // Get the ones with fewest leads first

    if (activeAgents.length === 0) {
      // Fallback: create lead without assignment if no agents found
      const [newLead] = await db.insert(leads).values({
        name,
        email,
        phone,
        message,
        status: "New"
      }).returning();
      return NextResponse.json({ success: true, leadId: newLead.id, message: "Lead saved (Unassigned)" });
    }

    // 2. Select the "fairest" agent (the one with the minimum leads)
    const assignedAgent = activeAgents[0];

    // 3. Create the lead and assign it
    const [newLead] = await db.insert(leads).values({
      name,
      email,
      phone,
      message,
      assignedAgentId: assignedAgent.id,
      status: "New"
    }).returning();

    // 4. Update the agent's lead count (Round Robin / Load Balancing)
    await db.update(agents)
      .set({ leadCount: (assignedAgent.leadCount || 0) + 1 })
      .where(eq(agents.id, assignedAgent.id));

    return NextResponse.json({ 
      success: true, 
      leadId: newLead.id, 
      assignedTo: assignedAgent.name,
      message: `Lead successfully balanced and assigned to ${assignedAgent.name}` 
    });

  } catch (error) {
    console.error("Lead assignment error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  const allLeads = await db.select().from(leads);
  return NextResponse.json(allLeads);
}
