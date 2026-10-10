# Fixes and pending work — 10 October 2026

## Implemented

- Improved text contrast while retaining the existing burgundy surfaces and cream/yellow theme. Enlarged small text, footer navigation, service links, and social touch targets.
- Corrected the mobile menu's accessible name and restored focus to its button after Escape. Marked decorative text logos/icons appropriately for assistive technology.
- Added a Pause/Resume motion control, respecting system reduced-motion and data-saving preferences. Fixed video resume after live preference changes, off-screen handling, and viewport variant switching.
- Kept desktop motion and replaced the touch-device runtime with lighter native reveal observers, scroll progress, and numeric floating effects. Pause/reduced-motion cleanup restores visible content. Primary headings remain visible during initialization.
- Preserved the corrected card zoom reset. Removed scaling from the contact form, so inputs and the Send button stay stable during hover.
- Replaced the oversized mobile hero with a compact flow layout and a three-column statistics panel. The normal 390px viewport now shows all three proof points in the first screen; the narrowest 320px screen still scrolls naturally.
- Optimized media: desktop video **12.16 MB → 2.26 MB**, mobile video **4.39 MB → 0.83 MB**. Desktop poster is about 35 KB; mobile poster about 18 KB. The unused public 43 MB upscaled video was removed; original source and local master remain preserved.
- Added a responsive, high-priority poster and delayed decorative video loading until initial content is rendered.
- Added phone-number validation and made the email-draft behavior clear immediately above Send. Native mailto fallback avoids submitting form values as a page query when JavaScript is unavailable. No actual website mail delivery is claimed.
- Added complete Home / Projects / Current project breadcrumbs with linked parent pages and navigation semantics.
- Centralized public-domain configuration and shared Person identity. Added linked ProfilePage/WebPage and BreadcrumbList data when a public domain is configured. All metadata, sitemap, and robots entries use the same origin.
- Added a release-build domain check and tested canonical URLs, identity references, breadcrumb data, robots, and all 11 sitemap routes with a reserved example origin. The example was used only for verification; it is not saved as the site's domain.
- Added concise About answers based on supplied experience, and clearer project context and technology sections. No outcome metrics or confidential screenshots were invented.
- Removed 527 superseded CSS declarations/keyframe definitions and obsolete component styles, formatted the stylesheet into readable rules, removed dead Hero code, centralized repeated contact information, and updated README.
- Updated old verification expectations for square corners and configurable preview origins. Added regression tests for keyboard focus, phone validation, breadcrumb hierarchy, motion controls, reduced-motion changes, and native touch reveals.
- Added a GitHub Actions build/test workflow. This is defined in the repository; its first hosted run still requires pushing the changes.

## Verification

- Production build and TypeScript checks pass.
- All 11 routes checked at seven viewport sizes (320–2560px): no horizontal overflow or hero text/stat panel collision.
- Main verification suite passed route/layout/metadata/navigation/CV/404 checks, client navigation, and card hover resets.
- New desktop and native-touch interaction regressions pass.
- Final axe scans on six representative desktop routes reported **zero violations** in the selected WCAG/best-practice rules. The earlier mobile scans also passed after remediation. Manual video/gradient contrast and full screen-reader testing remain necessary.
- Configured-domain verification passed canonical URLs, entity links, breadcrumbs, 11 sitemap entries, and robots sitemap reference.
- Final mobile Home Lighthouse lab run: **Performance 95**, **Accessibility 100**, **Best practices 100**, **basic SEO 100**; LCP **2.8 s**, TBT **120 ms**, CLS **0**, sampled transfer **1,053 KiB**. Baseline was Performance 85, Accessibility 96, LCP 3.4 s, TBT 310 ms, and transfer 4,059 KiB. These are individual local lab runs, not field results or a complete SEO/accessibility certification.

## Baseline finding status

| Finding | Current status |
|---|---|
| I01: public domain metadata | Infrastructure fixed and tested; actual domain/hosting still needed |
| I02: text contrast | Fixed in the scanned views; manual video-frame review remains |
| I03: continuous motion control | Fixed |
| I04: loading/media cost | Substantially improved; mobile LCP and production field validation remain |
| I05: menu focus | Fixed |
| I06: video preference resume | Fixed |
| I07: moving form | Fixed |
| I08: small text | Improved across the components |
| I09: small interactive targets | Fixed for audited hero, service, and footer targets |
| I10: accessible naming | Fixed |
| I11: mobile hero | Fixed with compact flow layout |
| I12: Send expectations | Clarified and validation improved; actual server delivery is not configured |
| I13: breadcrumbs | Fixed |
| I14: case-study evidence | Structure and factual answers improved; richer evidence needs supplied/approved material |
| I15: outdated checks | Fixed; new regression suite and CI added |
| I16: stylesheet drift | Superseded declarations and removed-feature styles cleaned up; intentional breakpoint/theme overrides remain |
| I17: stale docs/dead code | Fixed |

## Pending work

1. **Actual public domain and hosting.** Supply/set the real HTTPS origin as NEXT_PUBLIC_SITE_URL. Run npm run build:release for the deployment. Verify canonicals, sitemap, robots, sharing images, redirects, and HTTPS on that host. The local sitemap remains intentionally empty until a domain is provided.
2. **Actual email delivery, if wanted.** Choose a provider and configure credentials and a verified recipient. Then implement server-side validation, abuse protection, delivery success/error states, and an appropriate privacy explanation. Until then, Send opens an email draft.
3. **Approved project evidence.** Supply accurate project dates, problem/constraint/outcome details, measurable results where available, screenshots that may be published, and any authorized demo/code links. Do not invent metrics or disclose private client work.
4. **Production performance follow-up.** Retest on the actual host and slow mobile connections. LCP improved to 2.8 s in this lab run but should be tuned toward 2.5 s or less. Measure real-user Core Web Vitals/INP after deployment before making further performance claims.
5. **Real-device/accessibility acceptance.** Check iPhone/Safari, Android/Chrome, Edge, Firefox, portrait/landscape, 200% zoom, keyboard-only navigation, screen readers, real email handlers, and moving-video contrast. Chromium emulation cannot replace every device/browser test.
6. **Search ownership and monitoring.** Verify Search Console ownership, submit the final sitemap, and validate public page/schema rendering. Decide whether analytics, conversion tracking, and error monitoring should be added; no account access or tracking preferences were available in this task.
7. **GitHub workflow verification.** Push the completed changes when requested, then confirm the first hosted build/test run. Defining the workflow locally is not evidence that GitHub Actions has already passed.

No special llms.txt file or speculative AI schema is required to address the baseline audit. The remaining AI-discoverability work is factual content quality, stable public identity, crawlability, and production validation.
