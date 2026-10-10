import Link from "next/link";
import Icon from "./ui-icon";
import { profile } from "../content";

export default function SiteFooter() {
  return <footer className="site-footer">
    <address className="footer-contact-details" aria-label="Contact details">
      <a href={`mailto:${profile.email}`}><span className="footer-contact-icon"><Icon name="mail"/></span><div><span>Email</span><strong>{profile.email}</strong></div></a>
      <a href="tel:+917878782189"><span className="footer-contact-icon"><Icon name="phone"/></span><div><span>Phone</span><strong>{profile.phone}</strong></div></a>
      <div><span className="footer-contact-icon"><Icon name="pin"/></span><div><span>Based in</span><strong>{profile.location}</strong></div></div>
      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><span className="footer-contact-icon"><span className="linkedin-mark">in</span></span><div><span>Connect on LinkedIn</span><strong>Sandip Nakrani ↗</strong></div></a>
    </address>
    <div className="footer-links-row">
      <nav className="footer-nav" aria-label="Footer navigation"><Link href="/about">About</Link><Link href="/services">Services</Link><Link href="/projects">Projects</Link><Link href="/contact">Contact</Link></nav>
      <a className="footer-top" href="#top" aria-label="Back to top">↑</a>
    </div>
    <div className="footer-copyright">
      <span className="copyright-year">© 2026</span>
      <Link className="footer-signature" href="/contact" aria-label="Contact Sandip Nakrani"><span>Sandip</span>{" "}<span>Nakrani</span></Link>
      <span className="copyright-rights">All rights reserved.</span>
    </div>
  </footer>;
}
