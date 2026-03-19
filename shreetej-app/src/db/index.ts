import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const connectionString = process.env.DATABASE_URL;

if (!connectionString && process.env.NODE_ENV === "production") {
  console.warn("WARNING: DATABASE_URL is not set. Database features will fail.");
}

const sql = neon(connectionString || "");
export const db = drizzle(sql);
