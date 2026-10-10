import Link from "next/link";

export default function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-links-row">
      <nav className="footer-nav" aria-label="Footer navigation"><Link href="/about">About</Link><Link href="/services">Services</Link><Link href="/projects">Projects</Link><Link href="/contact">Contact</Link></nav>
      <a className="footer-top" href="#top" aria-label="Back to top">↑</a>
    </div>
    <div className="footer-copyright">
      <span className="copyright-year">© 2026</span>
      <Link className="footer-signature" href="/contact" aria-label="Contact Sandip Nakrani"><span>Sandip</span>{" "}<span>Nakrani</span></Link>
      <span className="copyright-rights">. All rights reserved.</span>
    </div>
  </footer>;
}
