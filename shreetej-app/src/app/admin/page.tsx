import { redirect } from "next/navigation";

export default function AdminDashboard() {
  // Redirect to projects CMS by default
  redirect("/admin/projects");
}
