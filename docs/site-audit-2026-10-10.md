# Portfolio audit — 10 October 2026

This is the **baseline audit before remediation**. See [the fixes and current pending work](site-fixes-and-pending-2026-10-10.md) for the latest status.

Audited the local production build at http://127.0.0.1:3000/. This is an audit and backlog, not a set of implemented fixes. The application source was not changed during this audit.

## Coverage and results

- 11 routes: Home, About, Services, Projects, Contact, and all six project detail pages.
- Seven viewport sizes: 2560×1440, 1920×1080, 1440×900, 1024×768, 768×1024, 390×844, and 320×740. That is 77 route/viewport combinations.
- Chromium layout checks, desktop/tablet/mobile screenshots, internal links, CV download, metadata, structured data, invalid-project 404, keyboard behavior, client navigation, hover resets, scroll reveals, project expansion, and live reduced-motion changes.
- axe-core accessibility scans on six representative desktop routes and three mobile routes. Many gradient/video contrast cases remain manual-review items; an automated pass is not a complete accessibility certification.
- Lighthouse 13.5.0 on Home using mobile and desktop presets. Scores are single local lab runs, not production or real-user performance measurements.
- TypeScript check passed. The preceding production build passed. npm's production dependency audit reported zero known vulnerabilities at audit time; this is not a security guarantee.

| Check | Result |
|---|---|
| Horizontal page overflow | None in all 77 combinations |
| Hero text/stat panel collision | None in all seven tested sizes |
| Primary headings | One h1 on each route |
| Internal links and CV | Checked internal targets returned 200 |
| Unknown project | Correct 404 response |
| Browser exceptions | None in the layout and motion runs |
| Server-rendered content | Project heading and contribution content available with JavaScript disabled |
| Card hover reset | Service, toolkit, project, and form panels returned to their original dimensions after interrupted hover |
| Client navigation | Motion reinitialized across Home/About/Services/Projects/Contact |
| Icon effects | Phone ring, eye rotation, and email rotation started as configured |
| Reduced motion enabled | Video paused; sampled running animations dropped to zero |

| Lighthouse Home lab metric | Mobile | Desktop |
|---|---:|---:|
| Performance | 85/100 | 100/100 |
| Accessibility | 96/100 | 96/100 |
| Basic SEO checks | 100/100 | 100/100 |
| Best practices | 100/100 | 100/100 |
| Largest contentful paint | 3.4 s | 0.8 s |
| Total blocking time | 310 ms | 0 ms |
| Cumulative layout shift | 0 | 0 |
| Sampled total transfer | 4,059 KiB | 10,983 KiB |

The basic SEO score does not test the site's readiness for public indexing, quality of case studies, or eligibility for AI citations. The empty sitemap and missing public-domain metadata below remain important despite that score.

## List 1 — Issues found

Priority: **P1** = address before public launch; **P2** = usability, content, or reliability improvement; **P3** = maintenance cleanup. Design/content findings are identified as such, rather than presented as crashes or standards violations.

| ID | Priority | Issue and evidence | Location / impact | Recommended correction |
|---|---|---|---|---|
| I01 | P1 | Public domain is unconfigured in this build. Canonicals are absent, sitemap.xml has zero URLs, robots.txt has no sitemap reference, and Open Graph images resolve to localhost. | app/layout.tsx, app/page-metadata.ts, app/sitemap.ts, app/robots.ts. Launch configuration gap, not proof that a public deployment is currently broken. | Configure NEXT_PUBLIC_SITE_URL before rebuilding, then verify all 11 canonical URLs, sharing assets, and sitemap entries on the actual HTTPS domain. |
| I02 | P1 | Accent text fails normal-text contrast. axe measured 4.38:1 on the dark background, and 3.86:1 for the active navigation/eyebrow over the Home poster, versus 4.5:1 required for these small text sizes. | app/globals.css: section labels, active navigation, some inline links. Video/gradient contrast needs further manual sampling. | Use a lighter text accent while retaining the brand red for surfaces; adjust the hero overlay and focus colors as needed. |
| I03 | P1 | The hero video loops for 20 seconds and numeric stats float continuously with no in-page pause/stop control. Reduced-motion support exists but is not an equivalent user control for everyone. | hero.tsx and motion-effects.tsx. Continuous background motion can distract users. | Provide a discreet, keyboard-accessible motion toggle that pauses both the video and continuous decorative movement. [W3C guidance](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html). |
| I04 | P1 | Mobile lab performance needs improvement: LCP 3.4 s, TBT 310 ms. Video dominates transfer; files are about 4.39 MB mobile, 12.16 MB desktop, and 43.17 MB large desktop. The 4K file is upscaled from a 720p source. | public/media and hero.tsx. Large-screen playback costs substantially more bandwidth without native 4K detail. | Reduce bitrate/duration/resolution, start video after critical content, prioritize the poster, and remove unnecessary main-thread animation work. Validate on the deployed site. |
| I05 | P1 | Escape closes the mobile menu but leaves focus on the now-hidden About link. Reproduced with keyboard focus inside the menu. | site-header.tsx. Keyboard users lose visible focus. | Return focus to the menu button when closing with Escape. |
| I06 | P2 | Turning reduced motion on pauses the video; turning it off again leaves it paused. The sampled currentTime stayed unchanged while other motion reinitialized. | hero.tsx: syncMotion only starts playback when enabled is false. | Reconcile playback whenever the preference changes, while respecting visibility and any user pause state. |
| I07 | P2 | Hover scales the entire contact form down to about 94%, including focused fields and the Send button. This is a design/usability problem even though it resets correctly. | globals.css: .contact-form:hover. Inputs move as the pointer enters the form. | Keep the form's geometry stable and apply hover feedback to its border/background and individual controls. |
| I08 | P2 | Several labels, descriptions, tags, and navigation items remain 9–11px. Mobile footer navigation is 9px; hero CTAs are 10px. Large-desktop navigation/CTAs remain very small relative to the hero. | globals.css, confirmed through computed styles at 390px and 2560px. Readability/design concern; font size alone is not a WCAG failure. | Establish a consistent type scale with larger body text, secondary labels, and CTA text. |
| I09 | P2 | Several interactive targets are short: mobile footer links about 13.5px high, service links about 15px high, and hero social icons around 15×20px. | Hero links, service links, footer nav. Touch usability concern; spacing exceptions require separate evaluation before calling every target a WCAG violation. | Add generous clickable padding and aim for approximately 44px touch heights where practical. |
| I10 | P2 | Visible Menu text has the accessible name Open navigation, which does not contain Menu. Lighthouse also flags the textual SN. logo and in social mark. | site-header.tsx and hero.tsx. Menu label mismatch can affect voice control. | Use an accessible name containing Menu. Review brand/social marks as icons with appropriate semantics rather than mismatched textual labels. [W3C guidance](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html). |
| I11 | P2 | Mobile hero is 1,030–1,080px tall. At 390×844 the stats begin around y=705 and finish around y=982; at 320×740 all stats start below the initial viewport. This is a design tradeoff, not clipping. | Hero responsive rules. The first screen hides some or all proof points and delays the next section. | Consider a compact stats row/grid below the CTAs on mobile, preserving the vertical rail on larger screens. |
| I12 | P2 | Send opens a mailto draft rather than submitting to the site. The help text is honest, but the prominent label can suggest a completed submission. Mobile has native email validation; the Mobile field only checks that it is not empty. | contact-form.tsx. Works only if an email handler is configured; no delivery confirmation is available. | Decide whether to retain the email-draft flow or add a delivery service. If retaining it, make the action clear near the button; if sending directly, add validation, error states, spam controls, and real delivery status. |
| I13 | P2 | Project breadcrumbs are Home / Projects only, with Projects rendered as plain text and the current project omitted. Breadcrumbs are a paragraph rather than a labeled breadcrumb navigation. | page-shell.tsx. Weak hierarchy and no direct breadcrumb route back to the project list. | Render Home / Projects / Current project, link parent levels, and add breadcrumb semantics. |
| I14 | P2 | Case studies are brief descriptions plus two to four contribution bullets. They lack problem/constraint/result narratives, approved screenshots, and documented outcome evidence. Some project dates use broad employment ranges. | content.ts and projects/[slug]/page.tsx. Content-depth and trust gap for visitors, SEO, and answer extraction. | Expand each case study with verified problem, role, decisions, delivery, and outcome evidence. Never invent numbers or disclose confidential material. |
| I15 | P2 | The design-motion verifier still asserts nonzero button corner radius, although the intended design now uses square corners. Most old verifiers hard-code localhost:3000 while the working preview here uses 127.0.0.1:3000. | scripts/verify-design-motion.mjs and older verify scripts. Tests can fail on correct designs or reach a different listener. | Update assertions and allow an explicit base URL. Add regression coverage for focus restoration and live video preference changes. |
| I16 | P3 | globals.css contains repeated component rules, overlapping breakpoint overrides, duplicate card/control keyframe names, and styling for removed controls. Final behavior depends heavily on rule order. | app/globals.css. Raises regression risk when changing layout or motion. | Consolidate component styles and breakpoints into a clear cascade; keep one definition per animation. |
| I17 | P3 | Documentation still describes rounded cards, card tilt, and section borders that were removed. hero.tsx still contains an unused Arrow component; content/contact values are repeated across several files. | README.md, hero.tsx, sections.tsx, contact-form.tsx. Maintenance/documentation drift. | Update the documentation, remove dead code, and centralize shared profile/contact data. |

## SEO, AEO, GEO, and LLMO interpretation

The site already exposes crawlable HTML, descriptive page titles and descriptions, distinct project URLs, internal links, a downloadable CV, and homepage Person structured data. These are useful foundations for both conventional search and answer systems.

The homepage Person entity has no stable public url or @id, and detail pages do not connect their content to that entity through structured data. Adding those links and matching WebPage/ProfilePage/BreadcrumbList markup would improve explicit structure; their absence is an enhancement opportunity, not a guarantee of ranking failure. Schema must match visible, factual content.

Content currently describes skills well but gives answer systems little evidence about project outcomes, scope, delivery choices, and availability. Useful additions are a concise factual profile summary, stronger case studies, and short answers to actual hiring/project questions. A generic FAQ section, keyword repetition, or invented performance claims would not resolve the evidence gap.

There is no meaningful universal AEO/GEO/LLMO score, and this local audit cannot verify inclusion in AI answers or search indexes. Google says its AI search features use the existing SEO foundations and do not require special AI text files or special schema. Therefore, missing llms.txt is **not** treated as a defect. [Google's official guidance](https://developers.google.com/search/docs/appearance/ai-features).

## List 2 — Pending work

1. **Launch configuration:** confirm the public domain and hosting, configure the domain before build, verify HTTPS, all canonicals, sitemap, robots, social previews, redirects, and 404 behavior on that host. Do not assume a GitHub push is a deployment.
2. **Accessibility fixes:** resolve contrast, menu focus restoration, menu label naming, touch padding, and motion controls (I02, I03, I05, I08–I10). Recheck video frames and gradients manually.
3. **Motion/interaction fixes:** repair video resume after preference changes, stabilize form geometry, and keep the card reset regression test (I06–I07). Test rapid hover movement, scroll, resizing/orientation changes, and route navigation together.
4. **Performance work:** optimize video delivery and initialization, investigate Lighthouse main-thread/forced-reflow findings, compress the poster where useful, then rerun mobile and desktop audits (I04). Confirm field Core Web Vitals after launch; this audit did not measure real-user INP.
5. **Form decision and implementation:** choose email-draft behavior versus actual website sending. For actual delivery, configure a verified destination and provider, server-side validation, failure/success messages, abuse protection, and a privacy explanation appropriate to the data collected. Test real delivery end to end (I12).
6. **Design polish:** improve the type scale and compact mobile hero stats; preserve the current square corners, theme, aligned footer, and restored card sizes (I08–I11).
7. **Content and AI discoverability:** expand approved case studies, verify dates and delivery claims, provide concise factual answers to relevant questions, and strengthen identity linkage in structured data. Add public project/code links only where available and authorized (I14).
8. **Breadcrumb and schema work:** add complete project breadcrumbs; validate Person/ProfilePage/WebPage/BreadcrumbList as appropriate against actual visible content and the final public URLs (I13).
9. **Code/test cleanup:** consolidate CSS, remove unused styling/components, centralize repeated profile fields, update README, repair old test expectations, and connect meaningful checks to a repeatable CI command (I15–I17).
10. **Production monitoring:** verify Search Console ownership and submit the final sitemap. Decide whether analytics/conversion tracking is wanted before adding it. Establish error monitoring and check crawling on the public host.
11. **Final acceptance testing:** real iPhone/Safari and Android/Chrome, Edge and Firefox, 200% browser zoom, portrait/landscape, keyboard-only navigation, a screen reader, slow-network/data-saving behavior, and actual email handling. These were not all covered by Chromium viewport emulation.

## Evidence

The machine results, screenshot set, motion traces, and mobile Lighthouse HTML report are in `C:/Users/sandi/AppData/Local/Temp/portfolio-audit-2026-10-10/`. The compact results are summarized in `site-audit-evidence-2026-10-10.json` next to this report. Temporary evidence may be removed by system cleanup; this report and compact evidence are saved in the repository workspace.
