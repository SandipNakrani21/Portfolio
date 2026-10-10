export type ContactDetails = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  topic: string;
  message: string;
};

export function validateContact(value: unknown): ContactDetails | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const limits = { firstName: 100, lastName: 100, email: 200, mobile: 30, topic: 200, message: 4000 };
  const details = {} as ContactDetails;
  for (const [key, limit] of Object.entries(limits)) {
    const field = key as keyof ContactDetails;
    if (typeof input[field] !== "string") return null;
    const text = input[field].trim();
    if (!text || text.length > limit || /\u0000/.test(text)) return null;
    if (field !== "message" && /[\r\n]/.test(text)) return null;
    details[field] = text;
  }
  if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/.test(details.email)) return null;
  const digits = details.mobile.replace(/\D/g, "");
  if (!/^\+?[\d\s().-]+$/.test(details.mobile) || digits.length < 7 || digits.length > 15) return null;
  return details;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

export function contactEmail(details: ContactDetails, received = new Date()) {
  const name = `${details.firstName} ${details.lastName}`;
  const timestamp = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long", timeStyle: "short", timeZone: "Asia/Kolkata",
  }).format(received) + " IST";
  const rows = [
    ["First name", details.firstName], ["Last name", details.lastName],
    ["Email", details.email], ["Mobile", details.mobile],
    ["Topic", details.topic], ["Received", timestamp],
  ];
  return {
    subject: `[Portfolio enquiry] ${details.topic.slice(0, 100)} — ${name}`,
    text: `New portfolio enquiry\n\n${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}\n\nDescription:\n${details.message}\n\nReply to this email to contact ${name} at ${details.email}.`,
    html: `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>New portfolio enquiry</title></head><body style="margin:0;padding:24px 12px;background:#0d0809;font-family:Arial,Helvetica,sans-serif;color:#241719"><table role="presentation" style="width:100%;max-width:640px;margin:auto;border-collapse:collapse;background:#dfc7a5"><tr><td style="padding:28px;background:#7e272e;color:#dfc7a5"><p style="margin:0 0 10px;font-size:12px;letter-spacing:2px">SANDIP NAKRANI · PORTFOLIO</p><h1 style="margin:0;font-size:26px">New contact enquiry</h1></td></tr><tr><td style="padding:28px"><p style="margin:0 0 20px;line-height:1.6">${escapeHtml(name)} submitted an enquiry through your portfolio.</p><table style="width:100%;border-collapse:collapse;font-size:14px">${rows.map(([label, value]) => `<tr><th scope="row" style="text-align:left;vertical-align:top;padding:10px 12px 10px 0;width:110px;color:#7e272e">${label}</th><td style="padding:10px 0;overflow-wrap:anywhere">${escapeHtml(value)}</td></tr>`).join("")}</table><h2 style="margin:24px 0 12px;font-size:18px;color:#7e272e">Description</h2><div style="padding:18px;background:#f0dfc7;line-height:1.7;overflow-wrap:anywhere">${escapeHtml(details.message).replace(/\r?\n/g, "<br>")}</div><p style="margin:24px 0 0;font-size:13px;line-height:1.6">Reply to this email to respond directly to ${escapeHtml(name)}.</p></td></tr></table></body></html>`,
  };
}
