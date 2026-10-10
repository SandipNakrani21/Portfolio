"use client";

import { useEffect, useRef, useState } from "react";
import SiteHeader from "./site-header";
import Icon from "./ui-icon";
import Link from "next/link";
import { profile } from "../content";

function backgroundSource() {
  const variant = window.innerWidth < 768 ? "mobile" : "desktop";
  return `/media/hero-${variant}.mp4?v=optimized-video`;
}

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const video = videoRef.current!;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean } }
    ).connection;
    let inView = true;
    let ready = false;
    let resizeTimer: ReturnType<typeof setTimeout>;
    const syncMotion = () => {
      setReduced(motion.matches || !!connection?.saveData);
      const userPaused =
        document.documentElement.dataset.userMotion === "paused";
      setPaused(userPaused);
      if (
        !ready ||
        userPaused ||
        motion.matches ||
        connection?.saveData ||
        document.hidden ||
        !inView
      ) {
        video.pause();
        return;
      }
      const source = backgroundSource();
      if (video.getAttribute("src") !== source) {
        video.src = source;
        video.load();
      }
      video.play().catch(() => {});
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        syncMotion();
      },
      { threshold: 0.05 },
    );
    const resize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(syncMotion, 200);
    };
    // Let the poster, heading, and navigation render before loading decorative video.
    const startTimer = setTimeout(() => {
      ready = true;
      syncMotion();
    }, 1800);
    syncMotion();
    observer.observe(video);
    motion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", syncMotion);
    window.addEventListener("portfolio-motion", syncMotion);
    window.addEventListener("resize", resize);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(resizeTimer);
      observer.disconnect();
      motion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", syncMotion);
      window.removeEventListener("portfolio-motion", syncMotion);
      window.removeEventListener("resize", resize);
      video.pause();
    };
  }, []);

  return (
    <section className="hero" id="home" aria-label="Portfolio introduction">
      <div className="scene" aria-hidden="true">
        <picture>
          <source
            media="(max-width:767px)"
            srcSet="/media/hero-poster-mobile.webp"
          />
          <img
            className="hero-poster"
            src="/media/hero-poster.webp?v=optimized-video"
            alt=""
            fetchPriority="high"
            width="1280"
            height="720"
          />
        </picture>
        <video ref={videoRef} muted loop playsInline preload="none" poster="/media/hero-poster.webp?v=optimized-video" />
        <div className="scene-shade" />
      </div>
      <SiteHeader />
      <div className="hero-main">
        <div className="eyebrow">
          <span className="eyebrow-line" /> &lt; HELLO, I’M /&gt;
        </div>
        <h1 className="name-heading">
          Sandip
          <br />
          <span>Nakrani</span>
        </h1>
        <p className="hero-role">Senior Full Stack Developer</p>
        <p className="hero-description">
          I build enterprise applications with .NET, Angular, and React.
          <br className="desktop-break" /> From architecture to production, I
          own the journey.
        </p>
        <div className="hero-actions">
          <Link className="primary-action" href="/projects">
            View my work <Icon name="eye" size={18} />
          </Link>
          <a
            className="hero-download"
            href="/documents/Sandip-Nakrani-CV.pdf"
            download
          >
            Download CV{" "}
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5" />
            </svg>
          </a>
        </div>
        <div className="hero-links">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Sandip on LinkedIn"
          >
            <span aria-hidden="true">in</span>
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email Sandip">
            <Icon name="mail" size={20} />
          </a>
          <span>AHMEDABAD, INDIA</span>
        </div>
      </div>
      <div className="hero-facts">
        <div>
          <strong>
            5<span>+</span>
          </strong>
          <span>Years of experience</span>
        </div>
        <div>
          <strong>5</strong>
          <span>Developers led</span>
        </div>
        <div>
          <strong>
            21<span>+</span>
          </strong>
          <span>Projects delivered</span>
        </div>
      </div>
      <button
        className="hero-motion-toggle"
        type="button"
        disabled={reduced}
        aria-pressed={paused}
        onClick={() => {
          const next = !paused;
          document.documentElement.dataset.userMotion = next
            ? "paused"
            : "playing";
          window.dispatchEvent(new Event("portfolio-motion"));
          setPaused(next);
        }}
      >
        {reduced ? "Motion reduced" : paused ? "Resume motion" : "Pause motion"}
      </button>
    </section>
  );
}
