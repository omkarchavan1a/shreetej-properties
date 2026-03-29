import { createUploadthing, type FileRouter } from "uploadthing/next";
import { cookies } from "next/headers";

const f = createUploadthing();

// Helper: Check if the request comes from an authenticated admin
async function isAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session?.value === "true";
}

// FileRouter for our app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Gallery Route
  imageUploader: f({ image: { maxFileSize: "32MB", maxFileCount: 10 } })
    .middleware(async () => {
      if (!(await isAdmin())) throw new Error("Unauthorized");
      return { userId: "admin" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Gallery upload complete:", file.url);
      return { uploadedBy: metadata.userId };
    }),

  // Single Cover Image Route
  coverImage: f({ image: { maxFileSize: "32MB", maxFileCount: 1 } })
    .middleware(async () => {
      if (!(await isAdmin())) throw new Error("Unauthorized");
      return { userId: "admin" };
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Cover image upload complete:", file.url);
    }),

  // HD Video Route
  projectVideo: f({ video: { maxFileSize: "256MB", maxFileCount: 1 } })
    .middleware(async () => {
      if (!(await isAdmin())) throw new Error("Unauthorized");
      return { userId: "admin" };
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Video upload complete:", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
