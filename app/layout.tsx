import type { Metadata, Viewport } from "next";
import "./globals.css";
import "lenis/dist/lenis.css";
import SiteFooter from "./components/site-footer";
import MotionEffects from "./components/motion-effects";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl || "http://localhost:3000"),
  ...(siteUrl ? { alternates: { canonical: "/" } } : {}),
  title: "Sandip Nakrani | Senior Full Stack Developer — .NET, Angular & React",
  description: "Sandip Nakrani, Senior Full Stack Developer in Ahmedabad with 5+ years of experience. Enterprise .NET and Angular applications, React SaaS platforms, SQL Server, and Azure DevOps.",
  openGraph: { title: "Sandip Nakrani — Senior Full Stack Developer", description: "Enterprise applications. SaaS architecture. End-to-end delivery with .NET, Angular, and React.", type: "website", locale: "en_IN", images: [{url: "/media/og-image.jpg", width: 1200, height: 630, alt: "Sandip Nakrani — Senior Full Stack Developer"}] },
  twitter: { card: "summary_large_image", title: "Sandip Nakrani — Senior Full Stack Developer", images: ["/media/og-image.jpg"] },
  authors: [{name:"Sandip Nakrani"}],
  robots: { index: true, follow: true },
  icons: { icon: "/icon.svg" }
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#08090b" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body><div id="top"/><a className="skip-link" href="#main">Skip to content</a><MotionEffects/>{children}<SiteFooter/></body></html>;
}
