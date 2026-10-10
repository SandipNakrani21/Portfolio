import { profile } from "./content";

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
export const siteUrl = configuredUrl
  ? new URL(configuredUrl).origin
  : undefined;
export const personId = siteUrl ? `${siteUrl}/#sandip-nakrani` : undefined;
export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  ...(personId ? { "@id": personId, url: siteUrl } : {}),
  name: profile.name,
  jobTitle: profile.role,
  email: profile.email,
  telephone: profile.phone,
  sameAs: [profile.linkedin],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Ahmedabad",
    addressRegion: "Gujarat",
    addressCountry: "IN",
  },
  knowsAbout: [
    ".NET Core",
    "C#",
    "Angular",
    "React.js",
    "SQL Server",
    "RESTful APIs",
    "Microservices",
    "Azure DevOps",
  ],
};

export function jsonLd(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
