"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function MotionEffects() {
  const progressRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    async function initialize() {
      const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import("gsap"), import("gsap/ScrollTrigger"), import("lenis")
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const media = gsap.matchMedia();
      const removeListeners: Array<() => void> = [];

      media.add("(prefers-reduced-motion: no-preference)", () => {
        document.documentElement.dataset.motion = "enabled";
        const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const small = window.innerWidth < 768;
        const lenis = finePointer ? new Lenis({
          lerp: 0.085, smoothWheel: true, syncTouch: false,
          anchors: { offset: -28 },
          prevent: node => node.tagName === "TEXTAREA" || node.hasAttribute("data-lenis-prevent")
        }) : null;
        const tick = (time: number) => lenis?.raf(time * 1000);
        if (lenis) {
          lenis.on("scroll", ScrollTrigger.update);
          gsap.ticker.add(tick);
        }

        const entrance = gsap.timeline({ defaults: { duration: 0.8, ease: "power3.out", clearProps: "opacity,visibility,transform" } })
          .from(".header", { y: -18, autoAlpha: 0 }, 0);
        if(document.querySelector(".hero")) entrance
          .from(".hero-main > *", { y: 32, autoAlpha: 0, stagger: 0.095 }, 0.12)
          .from(".hero-facts > div", { x: 20, autoAlpha: 0, stagger: 0.12 }, 0.65);
        else entrance.from(".page-intro > *",{y:24,opacity:0,stagger:0.08},0.12);

        gsap.utils.toArray<HTMLElement>(".hero-facts strong").forEach((number, index) => {
          gsap.to(number, {
            y: -6, duration: 2.2 + index * 0.3, delay: 1.5 + index * 0.35,
            repeat: -1, yoyo: true, ease: "sine.inOut"
          });
        });

        const reveals = gsap.utils.toArray<HTMLElement>(
          ".section-heading, .about-text, .principle, .service-card, .tech-item, .skill-group, .project-card, .work-row, .timeline-item, .education-card, .contact-form, .contact-details, .contact-code"
        );
        reveals.forEach((element, index) => {
          if (element.matches(".timeline-item")) return;
          gsap.from(element, {
            y: small ? 23 : 44, opacity: 0,
            duration: 0.8, delay: small ? 0 : (index % 3) * 0.07,
            ease: "power3.out", clearProps: "opacity,visibility,transform",
            scrollTrigger: { trigger: element, start: "top 93%", once: true }
          });
        });

        gsap.to(progressRef.current, {
          scaleX: 1, ease: "none",
          scrollTrigger: { trigger: document.documentElement, start: 0, end: "max", scrub: true }
        });

        if(document.querySelector(".hero")) gsap.fromTo(".scene video", { scale: 1.02, yPercent: 0 }, {
          scale: small ? 1.06 : 1.12, yPercent: small ? 3 : 8, ease: "none",
          scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.9 }
        });
        if(document.querySelector(".orbit-one")) gsap.fromTo(".orbit-one", { rotation: 45 }, {
          rotation: 135, ease: "none",
          scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: 1 }
        });
        if(document.querySelector(".orbit-two")) gsap.fromTo(".orbit-two", { rotation: 25 }, {
          rotation: -65, ease: "none",
          scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: 1 }
        });
        gsap.utils.toArray<HTMLElement>(".content-section").forEach(section => {
          gsap.fromTo(section, { "--section-progress": 0 }, {
            "--section-progress": 1, ease: "none",
            scrollTrigger: { trigger: section, start: "top 85%", end: "bottom 65%", scrub: 0.5 }
          });
        });
        if(document.querySelector(".timeline")) gsap.fromTo(".timeline", { "--timeline-progress": 0 }, {
          "--timeline-progress": 1, ease: "none",
          scrollTrigger: { trigger: ".timeline", start: "top 80%", end: "bottom 65%", scrub: 0.7 }
        });
        gsap.utils.toArray<HTMLElement>(".timeline-item").forEach(item => {
          const milestone = gsap.timeline({
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
            defaults: { ease: "power3.out", clearProps: "opacity,visibility,transform" }
          });
          milestone.from(item, { x: small ? 18 : 42, opacity: 0, duration: 0.85 })
            .from(item.querySelectorAll(".timeline-date, h3, .employer, p:not(.timeline-date):not(.employer), li"), {
              y: 16, opacity: 0, stagger: 0.07, duration: 0.65
            }, 0.2)
            .from(item.querySelector(".journey-step"), { scale: 0.6, rotation: -35, opacity: 0, duration: 0.65 }, 0.25)
            .from(item.querySelector(".timeline-dot"), { scale: 0.4, duration: 0.6, ease: "back.out(2)" }, 0.35);
          gsap.fromTo(item, { "--milestone-progress": 0 }, {
            "--milestone-progress": 1, ease: "none",
            scrollTrigger: { trigger: item, start: "top 80%", end: "center 45%", scrub: 0.6 }
          });
        });
        gsap.utils.toArray<HTMLElement>(".project-visual").forEach(visual => {
          gsap.fromTo(visual.querySelectorAll(".diagram-node"), { x: 10 }, {
            x: 0, stagger: 0.06, ease: "none",
            scrollTrigger: { trigger: visual, start: "top 90%", end: "bottom 45%", scrub: 0.8 }
          });
        });

        if (finePointer) {
          gsap.utils.toArray<HTMLElement>(".primary-action, .hero-download, .outline-button, .accent-button, .nav-contact").forEach(button => {
            const x = gsap.quickTo(button, "x", { duration: 0.4, ease: "power3.out" });
            const y = gsap.quickTo(button, "y", { duration: 0.4, ease: "power3.out" });
            const move = (event: PointerEvent) => {
              const bounds = button.getBoundingClientRect();
              x((event.clientX - bounds.left - bounds.width / 2) * 0.12);
              y((event.clientY - bounds.top - bounds.height / 2) * 0.15);
            };
            const leave = () => { x(0); y(0); };
            button.addEventListener("pointermove", move);
            button.addEventListener("pointerleave", leave);
            removeListeners.push(() => { button.removeEventListener("pointermove", move); button.removeEventListener("pointerleave", leave); });
          });

          gsap.utils.toArray<HTMLElement>(".principle, .service-card, .project-card, .skill-group").forEach(card => {
            // Keep hover transforms in CSS so GSAP cannot cache a partial zoom.
            const move = (event: PointerEvent) => {
              const bounds = card.getBoundingClientRect();
              const px = (event.clientX - bounds.left) / bounds.width;
              const py = (event.clientY - bounds.top) / bounds.height;
              card.style.setProperty("--pointer-x", `${px * 100}%`);
              card.style.setProperty("--pointer-y", `${py * 100}%`);
            };
            const leave = () => {
              card.style.removeProperty("--pointer-x");
              card.style.removeProperty("--pointer-y");
            };
            card.addEventListener("pointermove", move);
            card.addEventListener("pointerleave", leave);
            removeListeners.push(() => { card.removeEventListener("pointermove", move); card.removeEventListener("pointerleave", leave); card.style.removeProperty("--pointer-x"); card.style.removeProperty("--pointer-y"); });
          });
        }

        gsap.from(".footer-signature > span", {
          y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out",
          clearProps: "opacity,visibility,transform",
          scrollTrigger: { trigger: ".footer-signature", start: "top 95%", once: true }
        });
        const toggle = () => { lenis?.resize(); ScrollTrigger.refresh(); };
        const focus = (event: FocusEvent) => {
          const target = event.target as HTMLElement;
          if (target.closest(".portfolio-body")) {
            // Keyboard users must never land inside an unrevealed section.
            const reveal = reveals.find(element => element.contains(target));
            if (reveal) gsap.getTweensOf(reveal).forEach(tween => tween.progress(1));
          }
        };
        document.querySelectorAll("details").forEach(details => details.addEventListener("toggle", toggle));
        document.addEventListener("focusin", focus);
        document.fonts.ready.then(() => { if (!disposed) ScrollTrigger.refresh(); });
        ScrollTrigger.refresh();

        return () => {
          removeListeners.splice(0).forEach(remove => remove());
          document.querySelectorAll("details").forEach(details => details.removeEventListener("toggle", toggle));
          document.removeEventListener("focusin", focus);
          gsap.ticker.remove(tick); lenis?.destroy();
          delete document.documentElement.dataset.motion;
        };
      });
      cleanup = () => media.revert();
    }
    initialize().catch(() => { /* Server-rendered content remains usable if motion cannot load. */ });
    return () => { disposed = true; cleanup(); };
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true"><div ref={progressRef} className="scroll-progress-fill"/></div>;
}
