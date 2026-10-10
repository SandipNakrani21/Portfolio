"use client";
import Link from "next/link";
import Icon from "./ui-icon";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuRef.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open]);
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <header className="header">
      <Link className="wordmark" href="/" aria-label="Sandip Nakrani home">
        <span aria-hidden="true">
          S<span>N.</span>
        </span>
      </Link>
      <nav
        id="main-navigation"
        className={`navigation ${open ? "open" : ""}`}
        aria-label="Main navigation"
      >
        {links.map((link) => {
          const active =
            link.href === "/" ? path === "/" : path.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={active ? "nav-active" : ""}
              aria-current={active ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
      <Link className="nav-contact" href="/contact">
        Let’s talk{" "}
        <span className="talk-phone" aria-hidden="true">
          <Icon name="phone" size={16} />
        </span>
      </Link>
      <button
        ref={menuRef}
        className="menu-toggle"
        aria-controls="main-navigation"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? "Close −" : "Menu +"}
      </button>
    </header>
  );
}
