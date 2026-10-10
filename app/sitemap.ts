import type { MetadataRoute } from "next";
import { projects } from "./content";
import { siteUrl } from "./site-config";
export default function sitemap(): MetadataRoute.Sitemap {
  const url = siteUrl;
  return url ? ["","/about","/services","/projects","/contact",...projects.map(project=>`/projects/${project.slug}`)].map(path=>({url:`${url.replace(/\/$/, "")}${path}`,changeFrequency:"monthly" as const,priority:path === "" ? 1 : 0.8})) : [];
}
