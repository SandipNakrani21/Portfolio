"use client";
import { useState } from "react";
import Icon from "./ui-icon";

export default function ContactForm() {
  const [notice, setNotice] = useState("");
  function prepareEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const body = `Hi Sandip,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
    window.location.href = `mailto:sandipdpatel2189@gmail.com?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    setNotice("Your email app will open with a draft. Review it there and send when ready.");
  }
  return <form className="contact-form" onSubmit={prepareEmail}>
    <div className="form-row"><label>Your name<input name="name" placeholder="How should I call you?" autoComplete="name" required maxLength={100}/></label><label>Your email<input type="email" name="email" placeholder="you@example.com" autoComplete="email" required maxLength={200}/></label></div>
    <label>Your message<textarea name="message" placeholder="Tell me about the project or opportunity…" required rows={5} maxLength={4000}/></label>
    <button className="accent-button" type="submit">Prepare email <Icon name="mail" size={18}/></button>
    <p className="form-help" role="status">{notice || "Opens a draft in your email app. No message is sent automatically."}</p>
  </form>;
}


