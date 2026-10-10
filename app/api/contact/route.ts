import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { contactEmail, validateContact } from "../../lib/contact-email";
import { profile } from "../../content";

export const runtime = "nodejs";

// Best-effort per-process protection. Use a shared rate limiter at the hosting edge
// when deploying multiple instances; this map never stores submitted messages.
const attempts = new Map<string, { count: number; expires: number }>();
function limited(email: string) {
  const now = Date.now();
  for (const [key, value] of attempts) if (value.expires <= now) attempts.delete(key);
  const keys = ["all", email.toLowerCase()];
  if (keys.some((key) => (attempts.get(key)?.count || 0) >= (key === "all" ? 60 : 3))) return true;
  for (const key of keys) {
    const value = attempts.get(key) || { count: 0, expires: now + 15 * 60 * 1000 };
    value.count++;
    attempts.set(key, value);
  }
  return false;
}

function reply(message: string, status: number) {
  return NextResponse.json({ message }, { status, headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const publicOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  let sameHost = false;
  try { sameHost = !!origin && new URL(origin).host === request.headers.get("host"); } catch {}
  if (!origin || (!sameHost && origin !== publicOrigin?.replace(/\/$/, ""))) {
    return reply("Please send your message from the website contact form.", 403);
  }
  if (!request.headers.get("content-type")?.includes("application/json")) return reply("Invalid submission format.", 415);
  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply("Please complete the contact form.", 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 20_000) {
        await reader.cancel();
        return reply("Your message is too long.", 413);
      }
      chunks.push(value);
    }
    const raw = Buffer.concat(chunks).toString("utf8");
    body = JSON.parse(raw);
  } catch {
    return reply("Please check your details and try again.", 400);
  }
  const details = validateContact(body);
  if (!details) return reply("Please complete all fields with a valid email and mobile number.", 400);
  if (typeof (body as Record<string, unknown>).website === "string" && (body as Record<string, unknown>).website) {
    return reply("Please check your details and try again.", 400);
  }
  const { SMTP_HOST: host, SMTP_USER: user, SMTP_PASSWORD: pass } = process.env;
  const port = Number(process.env.SMTP_PORT || "465");
  const secure = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465;
  const from = process.env.SMTP_FROM || user;
  if (!host || !user || !pass || !from || !Number.isInteger(port) || port < 1 || port > 65535) {
    return reply("Email sending is temporarily unavailable. Please email Sandip directly at sandipdpatel2189@gmail.com.", 503);
  }
  if (limited(details.email)) return reply("Too many messages. Please try again in 15 minutes.", 429);
  const transport = nodemailer.createTransport({
    host, port, secure, requireTLS: !secure,
    auth: { user, pass }, connectionTimeout: 10_000, greetingTimeout: 10_000, socketTimeout: 15_000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  try {
    const result = await transport.sendMail({
      from: { name: "Sandip Nakrani Portfolio", address: from },
      to: profile.email,
      replyTo: { name: `${details.firstName} ${details.lastName}`, address: details.email },
      ...contactEmail(details),
    });
    if (!result.accepted.length) throw new Error("Recipient not accepted");
    return reply("Your message has been sent. Thank you for getting in touch!", 200);
  } catch {
    // Do not log credentials, submitted personal details, or SMTP provider responses.
    console.error("Contact email delivery failed.");
    return reply("We couldn't send your message. Please try again or email sandipdpatel2189@gmail.com directly.", 502);
  } finally {
    transport.close();
  }
}
