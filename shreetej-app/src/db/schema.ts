import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'residential', 'commercial', 'plots'
  status: text("status").notNull(), // 'Upcoming', 'Ongoing', 'Completed'
  location: text("location").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"), // HD Video
  amenities: text("amenities"), // JSON string or comma separated
  galleryUrls: text("gallery_urls"), // JSON string of urls
  mapUrl: text("map_url"), // Map location
  brochureUrl: text("brochure_url"), // Brochure link
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt"),
  category: text("category"),
  status: text("status").default("published").notNull(), // 'draft' or 'published'
  imageUrl: text("image_url"),
  author: text("author").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const press = pgTable("press", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  source: text("source").notNull(),
  link: text("link").notNull(),
  imageUrl: text("image_url"),
  excerpt: text("excerpt"),
  publishedDate: timestamp("published_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const agents = pgTable("agents", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  image: text("image"),
  active: text("active").default("true").notNull(), // 'true' or 'false'
  leadCount: serial("lead_count"), // Track number of leads assigned
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  assignedAgentId: integer("assigned_agent_id").references(() => agents.id),
  status: text("status").default("New").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
