import SiteHeader from "./site-header";
import Link from "next/link";
import { jsonLd, personId, siteUrl } from "../site-config";
export default function PageShell({
  label,
  title,
  description,
  children,
  currentProject,
}: {
  label: string;
  title: string;
  description: string;
  children: React.ReactNode;
  currentProject?: { title: string; slug: string };
}) {
  const parentPath = `/${label.toLowerCase()}`;
  const path = currentProject ? `/projects/${currentProject.slug}` : parentPath;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: label, path: parentPath },
    ...(currentProject ? [{ name: currentProject.title, path }] : []),
  ];
  const schema = siteUrl
    ? [
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: crumb.name,
            item: `${siteUrl}${crumb.path}`,
          })),
        },
        {
          "@context": "https://schema.org",
          "@type": label === "About" ? "ProfilePage" : "WebPage",
          "@id": `${siteUrl}${path}#page`,
          url: `${siteUrl}${path}`,
          name: title,
          description,
          about: { "@id": personId },
          ...(label === "About" ? { mainEntity: { "@id": personId } } : {}),
        },
      ]
    : undefined;
  return (
    <>
      <SiteHeader />
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd(schema) }}
        />
      )}
      <main id="main" className="inner-page">
        <div className="portfolio-body">
          <div className="page-intro">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <ol>
                {crumbs.map((crumb, index) => (
                  <li key={crumb.path}>
                    {index < crumbs.length - 1 ? (
                      <Link href={crumb.path}>{crumb.name}</Link>
                    ) : (
                      <span aria-current="page">{crumb.name}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            <p className="section-label">
              <span />
              {label.toUpperCase()}
            </p>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          {children}
        </div>
      </main>
    </>
  );
}
