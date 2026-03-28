import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const { db } = await import("./src/db/index");
  const { projects } = await import("./src/db/schema");
  const { eq } = await import("drizzle-orm");

  const result = await db.select().from(projects).where(eq(projects.id, 17));
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);
