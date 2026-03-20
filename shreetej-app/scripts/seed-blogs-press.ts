import { db } from "../src/db";
import { blogs, press } from "../src/db/schema";

async function seedData() {
  console.log("Seeding sample blogs and press data...");

  try {
    // Insert sample blogs
    await db.insert(blogs).values([
      {
        title: "The Future of Sustainable Real Estate in Maharashtra",
        slug: "future-of-sustainable-real-estate-maharashtra",
        content: "<p>Sustainable real estate is no longer just a trend; it's a necessity. In Maharashtra, we are seeing a significant shift towards eco-friendly building practices, renewable energy integration, and water conservation methods in new developments.</p><p>Shreetej Properties is at the forefront of this movement, ensuring that our projects not only provide luxurious living spaces but also minimize environmental impact.</p>",
        excerpt: "Exploring the shift towards eco-friendly building practices and how Shreetej Properties leads in sustainable development in Maharashtra.",
        category: "Sustainability",
        status: "published",
        imageUrl: "/assets/shreetej/photo-1545324418-cc1a3fa10c00_d5d1e965e6.jpg",
        author: "Shreetej Team",
      },
      {
        title: "Navigating the Property Market: A Guide for First-Time Buyers",
        slug: "navigating-property-market-first-time-buyers",
        content: "<p>Buying your first property can be a daunting experience. From understanding home loans to navigating legal documentation, there are many steps involved.</p><p>At Shreetej Properties, we simplify this process for our clients. Here is our comprehensive guide to help you take that important first step onto the property ladder.</p><ul><li>Understand your budget and financing options</li><li>Location, Location, Location</li><li>Verify all legal documents</li></ul>",
        excerpt: "A comprehensive guide to help first-time buyers navigate the complex process of purchasing property, from loans to legalities.",
        category: "Guide",
        status: "published",
        imageUrl: "/assets/shreetej/photo-1517245386807-bb43f82c33c4_6fb844aac7.jpg",
        author: "Investment Advisor",
      },
      {
        title: "Why Invest in Land and Plot Development Now?",
        slug: "why-invest-in-land-and-plot-development-now",
        content: "<p>Investing in land is one of the most secure and profitable ways to grow your wealth. With rapid urbanization, the demand for well-located, legally clear plots is higher than ever.</p><p>We discuss the key factors that make plot development an excellent addition to your investment portfolio, particularly in emerging areas.</p>",
        excerpt: "Discover why investing in legally clear plots is a secure and profitable way to grow wealth amidst rapid urbanization.",
        category: "Investment",
        status: "published",
        imageUrl: "/assets/shreetej/photo-1564013799919-ab600027ffc6_2e21df726e.jpg",
        author: "Financial Expert",
      }
    ]);

    console.log("Sample blogs inserted successfully!");

    // Insert sample press updates
    await db.insert(press).values([
      {
        title: "Shreetej Properties Earns Award for Excellence in Customer Service",
        source: "Real Estate Today",
        link: "https://example.com/press1",
        imageUrl: "/assets/shreetej/Shreetej-Properties_Display-Images_PDF-1_page-0004-1024x615_4b6e1e87d3.jpg",
        excerpt: "Recognized for outstanding commitment to client satisfaction and transparent business practices in the real estate sector.",
        publishedDate: new Date("2024-02-15T00:00:00Z"),
      },
      {
        title: "New Sustainable Residential Project Launched in Pune",
        source: "Pune Times",
        link: "https://example.com/press2",
        imageUrl: "/assets/shreetej/3D-_page-0015-768x511_d5f86ce8ae.jpg",
        excerpt: "Shreetej Properties announces the launch of their latest eco-friendly residential complex, setting new standards for green living.",
        publishedDate: new Date("2024-01-20T00:00:00Z"),
      },
      {
        title: "Shreetej Foundation Funds Education for 500 Rural Girls",
        source: "Maharashtra News",
        link: "https://example.com/press3",
        imageUrl: "/assets/shreetej/IMG-20250525-WA0082-1-226x300_3180cb91da.jpg",
        excerpt: "The social arm of Shreetej Properties expands its initiative to empower women and support education in rural areas.",
        publishedDate: new Date("2023-11-10T00:00:00Z"),
      }
    ]);

    console.log("Sample press updates inserted successfully!");
    console.log("Data seeding completed.");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seedData();
