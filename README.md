# Sandip Nakrani portfolio

A responsive Next.js portfolio with Home, About, Services, Projects, Contact, and six project case-study routes. Shared profile data lives in app/content.ts. Contact details appear in the shared footer. Cards and controls use square corners, cream/yellow accents, and burgundy surfaces.

## Local preview

Run npm ci, then npm run dev. Use http://127.0.0.1:3000/. For a production preview, run npm run build and npm start.

## Public deployment

Set NEXT_PUBLIC_SITE_URL to the actual public HTTPS origin before building. The origin drives canonical URLs, Open Graph URLs, sitemap entries, Person identity, page schema, and breadcrumb schema. No public domain is inferred from the GitHub repository.

Run npm run build:release after setting the environment variable. The deployment check intentionally rejects missing, localhost, non-HTTPS, and path-containing URLs. Local builds remain available without a public domain.

## Content and contact

Edit profile, skills, services, and verified project contributions in app/content.ts. Additional biography and career content is in app/components/sections.tsx. The About page includes concise answers based on the supplied experience. Project pages provide context, technology, and contributions; richer outcomes and screenshots require approved source material.

The contact form collects First Name, Last Name, Email, Mobile, Topics, and Description. Send Email submits to /api/contact, which validates the fields and sends an HTML and plain-text email to sandipdpatel2189@gmail.com through SMTP. The authenticated sender is used for From; the visitor is set as Reply-To. Details stay in the form on failure and clear only after the SMTP server accepts the message. The website does not save submitted messages in a database or log personal details.

Copy .env.example to .env.local and set SMTP_PASSWORD to a Gmail App Password for SMTP_USER. Keep SMTP_HOST=smtp.gmail.com, SMTP_PORT=465, SMTP_SECURE=true, and SMTP_FROM matching that Gmail account. Gmail App Passwords require 2-Step Verification and may not be available for every account. See https://support.google.com/accounts/answer/185833 and https://nodemailer.com/guides/using-gmail. Never commit credentials or use NEXT_PUBLIC_ for SMTP secrets. Restart the local server after changing environment settings; configure the same variables as secrets on your hosting provider.

Other SMTP providers can use their supplied host, credentials, and verified sender, with port 587 and SMTP_SECURE=false for enforced STARTTLS, or port 465 and SMTP_SECURE=true for TLS. A Node.js hosting runtime is required; static-only hosting cannot send emails. Delivery includes the visitor's details and an IST submission timestamp, with subject `[Portfolio enquiry] Topic — First Last`. No auto-reply is sent to visitors. Basic same-origin checks, a honeypot, bounded requests, and per-process rate limits are included. For public hosting across multiple instances, configure a shared hosting-edge rate limiter or CAPTCHA. Real Gmail delivery remains to be tested once credentials are configured; SMTP acceptance does not guarantee inbox placement.

## Motion and media

The hero initially renders a responsive WebP poster. Decorative video loading starts after the initial content has rendered. Mobile uses a 768px H.264 video and other screens use a 1280px video, matching the available source detail rather than downloading an upscaled 4K file. Video pauses when off-screen or the document is hidden, resumes when appropriate, and switches variants after a viewport resize. Reduced-motion and data-saving preferences prevent playback.

Pause motion stops both the video and decorative animation. That choice persists across client navigation until a full page reload. System reduced-motion preferences take precedence. Cards briefly shrink and return to their original size; the contact form remains stable. Phone ringing, icon rotation, and footer name hover feedback remain available with motion enabled. Fine-pointer devices use GSAP, Lenis, and magnetic button movement. Touch devices use lightweight native reveal observers and retain native scrolling.

Run npm run prepare:media to regenerate optimized media from assets/source-original.mp4. The original source and locally generated master are preserved. The small source-video symbol is removed from generated variants and posters. The forward/reverse loop preserves the original 24fps timing. The unused public 4K version is no longer shipped.

## Verification

Run npm run build, start the production preview, then npm run verify. The checks cover all eleven routes at five viewport sizes, titles and descriptions, navigation, overflow, download and 404 behavior, scroll reveals, card reset, menu focus, phone validation, project breadcrumbs, pause controls, and live preference changes. Set PLAYWRIGHT_BASE_URL to test a different preview origin. Installed Chrome is required.

GitHub Actions runs the build and verification suite for pushes and pull requests. The workflow does not deploy the website. The audit and remaining external work are tracked in docs/.

Run npm run verify:contact after building to verify validation, HTML escaping, TLS SMTP delivery, recipient and Reply-To headers, rejected delivery, rate limits, and form success/error/pending states. This starts an isolated local SMTP fixture with test-only credentials; no real emails are sent. OpenSSL is required (Git for Windows includes it; OPENSSL_PATH can override its location).
