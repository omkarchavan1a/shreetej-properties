import * as dotenv from "dotenv";
dotenv.config();

const projectsToSync = [
  { id: 999, title: "Shreetej Platinum-5", type: "residential", status: "Upcoming", location: "Sangamner", description: "Exclusive Pre-Launch. Premium apartments & commercial spaces.", imageUrl: "/images/shreetej-platinum-3.jpeg" },
  { id: 101, title: "Shreetej Platinum-2", type: "residential", status: "Completed", location: "Saishradha Chowk, Ghulewadi", description: "Residential + Commercial project with modern amenities.", imageUrl: "/images/shreetej-platinum-1.jpeg" },
  { id: 102, title: "Shreetej Platinum-1", type: "commercial", status: "Completed", location: "Pune-Nashik Highway, Gunjalwadi", description: "Prime located commercial project.", imageUrl: "/images/shreetej-platinum-1.jpeg" },
  { id: 103, title: "Samarth Heights", type: "residential", status: "Completed", location: "Maldad Road, Ghulewadi", description: "Mixed use property with excellent amenities.", imageUrl: "/images/samarth-heights.jpeg" },
  { id: 104, title: "Row House", type: "residential", status: "Completed", location: "Malpani Nagar", description: "Independent row houses for a premium lifestyle.", imageUrl: "/images/layout.jpg.jpeg" },
  { id: 105, title: "Bungalow (Suresh Sawale)", type: "residential", status: "Completed", location: "Malpani Nagar", description: "Custom built bungalow.", imageUrl: "/images/suresh-sable-basnglow.jpeg" },
  { id: 106, title: "Arbitro Heights", type: "commercial", status: "Completed", location: "Ekta Chowk", description: "A major commercial hub offering numerous shops.", imageUrl: "/images/arbitro-heights.jpeg" },
  { id: 107, title: "Shreetej Platinum-3", type: "residential", status: "Completed", location: "Navin Nagar Road", description: "Mixed-use building with halls and shops.", imageUrl: "/images/shreetej-platinum-3.jpeg" },
  { id: 108, title: "Samarth Villa", type: "residential", status: "Completed", location: "Golden City", description: "A beautiful villa complex.", imageUrl: "/images/samarth-villa.jpeg" },
  { id: 110, title: "Samarth Roop", type: "residential", status: "Completed", location: "Golden City", description: "Highly sought after mixed-use project.", imageUrl: "/images/samarth-roop.jpeg" },
  { id: 111, title: "Bungalow (Nashik Nagar Bypass)", type: "residential", status: "Completed", location: "Nagar-Nashik Bypass, Ghulewadi", description: "Premium bungalow near Nashik bypass.", imageUrl: "/images/11-nashik-nagar-bypass.jpeg" },
  { id: 112, title: "Bungalow (Malpani Nagar)", type: "residential", status: "Completed", location: "Malpani Nagar", description: "Spacious bungalow in Malpani Nagar.", imageUrl: "/images/malpani-nagar-banglow-12.jpeg" },
  { id: 113, title: "Apartment (Katariya Nagar)", type: "residential", status: "Completed", location: "Katariya Nagar", description: "Apartment complex with modern facilities.", imageUrl: "/images/katariya-nagar-13.jpeg" },
  { id: 114, title: "Bungalow (Ganesh Vihar)", type: "residential", status: "Completed", location: "Ganesh Vihar", description: "Luxurious single unit bungalow.", imageUrl: "/images/ganesh-vihar.jpeg" },
  { id: 115, title: "Sai Samarth Plaza", type: "commercial", status: "Completed", location: "Maldad Road", description: "Business and shopping plaza.", imageUrl: "/images/sai-samarth-plaza.jpeg" },
  { id: 116, title: "Bungalow (Bharat Khemnar)", type: "residential", status: "Completed", location: "Malpani Nagar", description: "Custom premium bungalow design.", imageUrl: "/images/bharat-khemnar-banglow.jpeg" },
  { 
    id: 117,
    title: "Saiban Phase - 9", 
    type: "residential", 
    status: "Ongoing", 
    location: "Ghulewadi", 
    description: "Saiban Project is a thoughtfully planned residential plotting development offering a limited collection of just 24 exclusive plots, designed for those aspire to build their dream home in a peaceful and well-connected environment. Surrounded by natural greenery and a calm atmosphere, the project creates a perfect balance between nature and modern living. With clear title plots and well-demarcated layouts, Saiban ensures transparency, security, and ease of investment. The development includes essential infrastructure such as internal roads, proper drainage systems, and street lighting, ensuring a comfortable and hassle-free lifestyle. Its strategic location provides easy access to schools, markets, and daily conveniences, making it ideal for both residential living and long-term investment. With limited availability and strong growth potential, Saiban Project is a perfect opportunity to secure your future in a serene yet well-connected location.", 
    imageUrl: "/images/saiban-phase-9.jpeg",
    amenities: "Wide Roads,Proper Drainage,Street Lighting,Clear Title Plots,Natural Greenery,Peaceful Environment",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3748.5!2d74.193304!3d19.605868!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTnCsDM2JzIxLjEiTiA3NMKwMTEnMzUuOSJF!5e0!3m2!1sen!2sin!4v1711620000000"
  },
  { id: 118, title: "Bhagyoday Park", type: "plots", status: "Completed", location: "Maldad Road", description: "Fully developed NA plots.", imageUrl: "/images/untitled-bhagyoday-park.jpg.jpeg" },
  { id: 119, title: "Nizarneshwar Park", type: "plots", status: "Completed", location: "Kokangav", description: "Clear title NA plots.", imageUrl: "/images/nijarneshwar-park-1.jpg.jpeg" },
  { id: 120, title: "Kanifnath Park", type: "plots", status: "Available", location: "Ghulewadi (near Kanifnath Temple)", description: "NA approved plots behind Kanifnath temple.", imageUrl: "/images/kanifnath-park.jpg.jpeg" },
  { id: 121, title: "Madhuban Park", type: "plots", status: "Available", location: "Nasik-Pune Highway", description: "Prime located plots on Nashik Highway.", imageUrl: "/images/madhuban-park.jpg.jpeg" }
];

async function main() {
  const { db } = await import("./src/db/index");
  const { projects } = await import("./src/db/schema");
  const { eq } = await import("drizzle-orm");

  console.log("Starting database sync...");
  
  for (const project of projectsToSync) {
    try {
      const existing = await db.select().from(projects).where(eq(projects.title, project.title));
      
      if (existing.length > 0) {
        console.log(`Updating ${project.title}...`);
        await db.update(projects)
          .set({
            type: project.type,
            status: project.status,
            location: project.location,
            description: project.description,
            imageUrl: project.imageUrl,
            amenities: project.amenities ?? null,
            mapUrl: project.mapUrl ?? null
          })
          .where(eq(projects.title, project.title));
      } else {
        console.log(`Inserting ${project.title}...`);
        await db.insert(projects).values({
          title: project.title,
          type: project.type,
          status: project.status,
          location: project.location,
          description: project.description,
          imageUrl: project.imageUrl,
          amenities: project.amenities ?? null,
          mapUrl: project.mapUrl ?? null
        });
      }
    } catch (err) {
      console.error(`Error syncing ${project.title}:`, err);
    }
  }
  
  console.log("Database sync completed!");
}

main().catch(console.error);
