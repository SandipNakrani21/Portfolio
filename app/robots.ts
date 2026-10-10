import type { MetadataRoute } from "next";
import { siteUrl } from "./site-config";
export default function robots(): MetadataRoute.Robots {
  const url = siteUrl;
  return { rules: { userAgent: "*", allow: "/" }, ...(url ? { sitemap: `${url.replace(/\/$/, "")}/sitemap.xml` } : {}) };
}
