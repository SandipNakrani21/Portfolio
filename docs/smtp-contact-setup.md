# SMTP contact form — 11 October 2026

Implemented a server-side SMTP contact form replacing the mailto draft flow. All fields are required: First Name, Last Name, Email, Mobile, Topics, and Description. Messages go to sandipdpatel2189@gmail.com. The authenticated sender is used as From and the visitor is set as Reply-To.

Subject: `[Portfolio enquiry] Project discussion — First Last`

The cream and burgundy HTML template and plain-text alternative contain each field, the description, and a submission timestamp in IST. User content is HTML escaped. Success is shown only after SMTP acceptance; errors retain all entered details. The draft explanation has been removed.

## Complete private configuration

1. Enable Google 2-Step Verification and generate an App Password for the sending Gmail account: https://support.google.com/accounts/answer/185833.
2. In the ignored .env.local file, set SMTP_PASSWORD to that App Password. The example already specifies smtp.gmail.com, port 465, TLS, and sandipdpatel2189@gmail.com as the sending account. If using another account, change SMTP_USER and SMTP_FROM together.
3. Restart the local server. On deployment, add the same SMTP settings as private server environment variables. A Node.js runtime is required.
4. Submit one real enquiry and confirm receipt, formatting, and Reply-To in the inbox. No real inbox delivery has been verified without credentials.

Do not put passwords in chat, the browser code, NEXT_PUBLIC_ variables, or Git. Reference: https://nodemailer.com/guides/using-gmail.

## Verification and remaining work

The local TLS SMTP fixture passes validation, header injection rejection, template escaping, target recipient, Reply-To, accepted/rejected SMTP delivery, rate limiting, pending state, retained fields on error, and cleared fields on success. Test-only messages stay on the local computer.

Pending: private SMTP credentials; real inbox verification; Node.js deployment settings; shared edge rate limiting or CAPTCHA for public deployments with multiple server instances. Current limits are per process (3 attempts per sender and 60 total per 15 minutes). SMTP acceptance does not guarantee final inbox placement.
