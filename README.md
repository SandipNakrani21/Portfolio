# Animated Next.js portfolio

A complete responsive multipage portfolio for Sandip Nakrani, populated from his supplied CV. The animated hero uses the original MP4; the original JPEG frames are preserved. Routes include Home (`/`), About with experience, education and skills (`/about`), Services (`/services`), Projects (`/projects`), Contact (`/contact`), and six individual project pages (`/projects/[slug]`). The landing page is a complete scrolling overview with about, capabilities, technology, all six projects, experience, education, and the contact form. Section links open the dedicated pages; About includes the complete skill groups and career contributions, Services adds the working process, and project pages explain individual contributions. Shared navigation highlights the active page. Every page has its own title and description; the domain-aware sitemap includes all routes.

Project cards use wide cream panels with burgundy hover titles, outlined numbers, technology tags, and expandable contribution lists, inspired by the supplied screen recording. Toolkit cards use dark rounded panels with icon tiles and outlined numbers. The shared footer includes a large Sandip Nakrani name link that changes color on hover. Contact links use the CV's email, phone, and LinkedIn; the form prepares a local email draft and does not send automatically. The original CV is available for download at `/documents/Sandip-Nakrani-CV.pdf`.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open http://localhost:3000. For a production preview, run `npm.cmd run build` followed by `npm.cmd start`.

## Animation

`npm.cmd run prepare:media` uses `assets/source-original.mp4` to create a 3840×2160 master in the project root, three H.264 background versions, a WebP poster, and a social sharing image. To change the input, pass a video path after `--`. The source video is 1280×720 at 24 fps: the 4K output is upscaled, not native 4K, and cannot restore missing detail. Its original timing is retained. The sequence plays forward and backward for a smooth 20-second loop.

Mobile uses a 1280px video, desktop uses 1920px, and screens wider than 1920px use the 3840px video. All use cover cropping to fit the viewport. The lighter gradient preserves text contrast without unnecessarily darkening the workspace. Reduced-motion and data-saving preferences show the poster by default. Video pauses while the page is hidden or the hero is off-screen.

## Personalize

- Edit the profile, project records, capabilities, and skill groups in `app/content.ts`.
- Edit the introduction and employment/education sections in `app/components/hero.tsx` and `app/components/sections.tsx`.
- Edit page title, description, and sharing metadata in `app/layout.tsx`.
- Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the real public domain before deployment. Canonical links and sitemap URLs then use that domain.

Server-rendered text, one primary heading, descriptive metadata, Person structured data, Open Graph / Twitter sharing images, robots.txt, and a domain-aware sitemap provide the SEO foundation. Public indexing requires deployment to a public domain. `node scripts/update-social-image.mjs` regenerates the personalized social sharing image without re-encoding the videos.

## Motion

GSAP ScrollTrigger drives staggered content reveals, hero video parallax, section borders, timeline progress, and the footer name reveal. Fine-pointer devices also get Lenis smooth wheel/anchor scrolling, magnetic buttons, card tilt, and pointer-following highlights. Touch devices keep native scrolling with smaller reveal distances. Every animation respects live reduced-motion changes; content remains server-rendered and visible if JavaScript is unavailable. Project expansion refreshes the scroll measurements.

The animation controller cleans up and reinitializes GSAP and smooth scrolling on client-side page navigation. It only creates hero, orbit, or timeline effects when those elements exist on the current page.

## Verification commands

```powershell
npm.cmd run build
node scripts/verify-pages.mjs
```

The page verifier expects a running server at localhost:3000 and installed Chrome. It checks all eleven routes at five viewport sizes, unique metadata, active navigation, mobile menu behavior, CV download, invalid project 404s, and animation initialization after client navigation. The older `verify-preview.mjs` and `verify-motion.mjs` entry points delegate to this verifier.
