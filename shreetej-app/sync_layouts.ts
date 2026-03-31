import * as dotenv from "dotenv";
dotenv.config();

const layoutsToSync = [
  {
    title: "Saiban phase-9",
    type: "layout",
    status: "Ongoing",
    location: "Ghulewadi",
    description: "Saiban phase-9 is a premium land development project in Ghulewadi.",
    imageUrl: "/shreetej_images/images/layout.jpg.jpeg",
    amenities: "Collector NA plots, Wall compound, 6 mtr internal roads, Street light, Underground drainage",
    mapUrl: null
  },
  {
    title: "Bhagyoday park",
    type: "layout",
    status: "Completed",
    location: "Maldad road",
    description: "Bhagyoday park offers fully developed NA plots on Maldad road.",
    imageUrl: "/shreetej_images/images/Untitled-bhagyoday park.jpg.jpeg",
    amenities: "NA Plots, Internal roads, Street light",
    mapUrl: null
  },
  {
    title: "Nizarneshwar park",
    type: "layout",
    status: "Completed",
    location: "Kokangav",
    description: "Nizarneshwar park features premium NA plots in Kokangav.",
    imageUrl: "/shreetej_images/images/nijarneshwar park 1.jpg.jpeg",
    amenities: "NA Plots, Internal roads, Street light",
    mapUrl: null
  },
  {
    title: "Kanifnath park",
    type: "layout",
    status: "Ongoing",
    location: "Ghulewadi, Kanchan comforts road besides kanifnath temple",
    description: "Kanifnath park is located near the Kanifnath temple in Ghulewadi.",
    imageUrl: "/shreetej_images/images/kanifnath park.jpg.jpeg",
    amenities: "NA plots, Compound wall, Internal roads, Street light",
    mapUrl: null
  },
  {
    title: "Madhuban park",
    type: "layout",
    status: "Ongoing",
    location: "Nasik Pune Highway",
    description: "Madhuban park is a prime location development on the Nashik-Pune Highway.",
    imageUrl: "/shreetej_images/images/madhuban park.jpg.jpeg",
    amenities: "NA plots, Internal roads, Street light",
    mapUrl: null
  }
];

async function main() {
  const { db } = await import("./src/db/index");
  const { projects } = await import("./src/db/schema");
  const { eq } = await import("drizzle-orm");

  console.log("Starting layouts sync...");
  
  for (const layout of layoutsToSync) {
    try {
      // Check if project exists with same title
      const existing = await db.select().from(projects).where(eq(projects.title, layout.title));
      
      if (existing.length > 0) {
        console.log(`Updating ${layout.title}...`);
        await db.update(projects)
          .set({
            type: layout.type,
            status: layout.status,
            location: layout.location,
            description: layout.description,
            imageUrl: layout.imageUrl,
            amenities: layout.amenities,
            mapUrl: layout.mapUrl
          })
          .where(eq(projects.title, layout.title));
      } else {
        console.log(`Inserting ${layout.title}...`);
        await db.insert(projects).values({
          title: layout.title,
          type: layout.type,
          status: layout.status,
          location: layout.location,
          description: layout.description,
          imageUrl: layout.imageUrl,
          amenities: layout.amenities,
          mapUrl: layout.mapUrl
        });
      }
    } catch (err) {
      console.error(`Error syncing ${layout.title}:`, err);
    }
  }
  
  console.log("Layouts sync completed!");
}

main().catch(console.error);
