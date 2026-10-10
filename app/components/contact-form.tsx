"use client";
import { useState } from "react";
import Icon from "./ui-icon";

export default function ContactForm() {
  const [notice, setNotice] = useState("");
  function prepareEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = [data.get("firstName"), data.get("lastName")].map(value => String(value || "").trim()).join(" ");
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const mobile = String(data.get("mobile") || "").trim();
    const topic = String(data.get("topic") || "").trim();
    const body = `Hi Sandip,\n\n${message}\n\nTopic: ${topic}\nFrom: ${name}\nEmail: ${email}\nMobile: ${mobile}`;
    window.location.href = `mailto:sandipdpatel2189@gmail.com?subject=${encodeURIComponent(`${topic} — ${name}`)}&body=${encodeURIComponent(body)}`;
    setNotice("Your email app will open with a draft. Review it there and send when ready.");
  }
  return <form className="contact-form" onSubmit={prepareEmail}>
    <div className="form-row"><label>First Name<input name="firstName" placeholder="Your first name" autoComplete="given-name" required maxLength={100}/></label><label>Last Name<input name="lastName" placeholder="Your last name" autoComplete="family-name" required maxLength={100}/></label></div>
    <div className="form-row"><label>Email<input type="email" name="email" placeholder="you@example.com" autoComplete="email" required maxLength={200}/></label><label>Mobile<input type="tel" name="mobile" placeholder="Your phone number" autoComplete="tel" required maxLength={30}/></label></div>
    <label className="form-topic">Topics<input name="topic" placeholder="Project, opportunity, or question" required maxLength={200}/></label>
    <label>Description<textarea name="message" placeholder="Tell me about the project or opportunity…" required rows={7} maxLength={4000}/></label>
    <button className="accent-button" type="submit">Send <Icon name="mail" size={18}/></button>
    <p className="form-help" role="status">{notice || "Opens a draft in your email app. No message is sent automatically."}</p>
  </form>;
}


