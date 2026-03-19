import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

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
  imageUrl: text("image_url"),
  author: text("author").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const press = pgTable("press", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  source: text("source").notNull(),
  link: text("link").notNull(),
  publishedDate: timestamp("published_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
