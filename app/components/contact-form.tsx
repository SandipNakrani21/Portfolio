"use client";
import { useEffect, useRef, useState } from "react";
import Icon from "./ui-icon";

export default function ContactForm() {
  const [notice, setNotice] = useState("");
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sent, setSent] = useState(false);
  const successRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (sent) {
      successRef.current?.focus({ preventScroll: true });
      successRef.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
    }
  }, [sent]);
  async function sendEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true);
    setNotice("");
    setFailed(false);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      const result = await response.json();
      setFailed(!response.ok);
      setNotice(result.message || "Please try again.");
      if (response.ok) {
        form.reset();
        setSent(true);
      }
    } catch {
      setFailed(true);
      setNotice("Couldn't connect. Your details are still here; please try again.");
    } finally {
      setSending(false);
    }
  }
  if (sent) return (
    <section
      className="contact-form contact-success"
      ref={successRef}
      tabIndex={-1}
      role="status"
      aria-labelledby="contact-success-title"
    >
      <span className="contact-success-icon"><Icon name="check" size={32} /></span>
      <h2 id="contact-success-title">Email sent successfully</h2>
      <p>Your message has been sent to Sandip. Thank you for getting in touch!</p>
      <span className="contact-success-note">Your enquiry includes all the details you submitted.</span>
    </section>
  );
  return (
    <form className="contact-form" onSubmit={sendEmail} aria-busy={sending}>
      <fieldset disabled={sending} className="contact-fields">
      <div className="contact-honeypot" aria-hidden="true">
        <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      </div>
      <div className="form-row">
        <label>
          First Name
          <input
            name="firstName"
            placeholder="Your first name"
            autoComplete="given-name"
            required
            maxLength={100}
          />
        </label>
        <label>
          Last Name
          <input
            name="lastName"
            placeholder="Your last name"
            autoComplete="family-name"
            required
            maxLength={100}
          />
        </label>
      </div>
      <div className="form-row">
        <label>
          Email
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            maxLength={200}
          />
        </label>
        <label>
          Mobile
          <input
            type="tel"
            name="mobile"
            placeholder="Your phone number"
            autoComplete="tel"
            inputMode="tel"
            required
            maxLength={30}
            onInput={(event) => {
              const input = event.currentTarget;
              const digits = input.value.replace(/\D/g, "");
              input.setCustomValidity(
                input.value &&
                  (!/^\+?[\d\s().-]+$/.test(input.value) ||
                    digits.length < 7 ||
                    digits.length > 15)
                  ? "Enter a phone number with 7 to 15 digits, including your country code if needed."
                  : "",
              );
            }}
          />
        </label>
      </div>
      <label className="form-topic">
        Topics
        <input
          name="topic"
          placeholder="Project, opportunity, or question"
          required
          maxLength={200}
        />
      </label>
      <label>
        Description
        <textarea
          name="message"
          placeholder="Tell me about the project or opportunity…"
          required
          rows={7}
          maxLength={4000}
        />
      </label>
      <button
        className="accent-button"
        type="submit"
        disabled={sending}
      >
        {sending ? "Sending…" : "Send Email"} <Icon name="mail" size={18} />
      </button>
      </fieldset>
      {notice && (
        <p className="form-help" role={failed ? "alert" : "status"}>
          {notice}
        </p>
      )}
    </form>
  );
}
