"use client";

import { useEffect, useRef } from "react";
import SiteHeader from "./site-header";
import Icon from "./ui-icon";
import Link from "next/link";

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h16m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function backgroundSource() {
  const variant = window.innerWidth < 768 ? "mobile" : window.innerWidth > 1920 ? "4k" : "desktop";
  return `/media/hero-${variant}.mp4?v=original-video`;
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);



  useEffect(() => {
    const video = videoRef.current!;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as Navigator & {connection?: {saveData?: boolean}}).connection;
    let enabled = false;
    let resume = false;
    const syncMotion = () => {
      if (motion.matches || connection?.saveData) { video.pause(); return; }
      if (!enabled) {
        video.src = backgroundSource();
        video.load(); enabled = true;
        video.play().catch(() => {});
      }
    };
    const visibility = () => {
      if (document.hidden) { resume = !video.paused; video.pause(); }
      else if (resume && !motion.matches) video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) { resume = !video.paused; video.pause(); }
      else if (resume && !motion.matches && !document.hidden) video.play().catch(() => {});
    }, { threshold: 0.05 });
    syncMotion(); observer.observe(video);
    motion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", visibility);
    return () => { observer.disconnect(); motion.removeEventListener("change", syncMotion); document.removeEventListener("visibilitychange", visibility); video.pause(); };
  }, []);

  return <section className="hero" id="home" aria-label="Portfolio introduction">
    <div className="scene" aria-hidden="true"><video ref={videoRef} muted loop playsInline preload="none" poster="/media/hero-poster.webp?v=original-video" /><div className="scene-shade" /></div>
    <SiteHeader/>
    <div className="hero-main">
      <div className="eyebrow"><span className="eyebrow-line" /> &lt; HELLO, I’M /&gt;</div>
      <h1 className="name-heading">Sandip<br /><span>Nakrani</span></h1>
      <p className="hero-role">Senior Full Stack Developer</p>
      <p className="hero-description">I build enterprise applications with .NET, Angular, and React.<br className="desktop-break"/> From architecture to production, I own the journey.</p>
      <div className="hero-actions"><Link className="primary-action" href="/projects">View my work <Icon name="eye" size={18}/></Link><a className="hero-download" href="/documents/Sandip-Nakrani-CV.pdf" download>Download CV <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5"/></svg></a></div>
      <div className="hero-links"><a href="https://linkedin.com/in/sandip-nakrani" target="_blank" rel="noopener noreferrer" aria-label="Sandip on LinkedIn">in</a><a href="mailto:sandipdpatel2189@gmail.com" aria-label="Email Sandip">↗</a><span>AHMEDABAD, INDIA</span></div>
    </div>
    <div className="hero-facts"><div><strong>5<span>+</span></strong><span>Years of experience</span></div><div><strong>5</strong><span>Developers led</span></div><div><strong>21<span>+</span></strong><span>Projects delivered</span></div></div>
  </section>;
}
