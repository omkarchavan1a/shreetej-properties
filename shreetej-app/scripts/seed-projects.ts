import { db } from "../src/db";
import { projects } from "../src/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  await db.insert(projects).values({
    title: "Shreetej Platinum 5",
    type: "residential",
    status: "Upcoming",
    location: "Sangamner",
    description: "New Launching Project — Shreetej Platinum 5. Premium apartments with modern amenities.",
    imageUrl: "/images/shreetej platinum 3.jpeg", // using plat 3 image if plat 5 is unavailable (per instructions to map context or leave comment)
  });

  console.log("Seeded Shreetej Platinum 5!");
}

main().catch(console.error);
