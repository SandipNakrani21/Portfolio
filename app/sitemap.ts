import type { MetadataRoute } from "next";
import { projects } from "./content";
export default function sitemap(): MetadataRoute.Sitemap {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  return url ? ["","/about","/services","/projects","/contact",...projects.map(project=>`/projects/${project.slug}`)].map(path=>({url:`${url.replace(/\/$/, "")}${path}`,changeFrequency:"monthly" as const,priority:path === "" ? 1 : 0.8})) : [];
}
