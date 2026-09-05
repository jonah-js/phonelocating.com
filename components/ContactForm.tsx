"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import CtaButton from "@/components/CtaButton";

export default function ContactForm() {
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setStatus(data.message || data.error);
    if (response.ok) event.currentTarget.reset();
  }

  return (
    <form onSubmit={submit} className="mt-8 grid gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Name
        <input name="name" required className="rounded-md border border-slate-200 px-4 py-3" />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Email
        <input name="email" required type="email" className="rounded-md border border-slate-200 px-4 py-3" />
      </label>
      <label className="grid gap-2 text-sm font-medium text-slate-700">
        Message
        <textarea name="message" required minLength={10} rows={5} className="rounded-md border border-slate-200 px-4 py-3" />
      </label>
      <CtaButton className="w-fit">Send message</CtaButton>
      {status ? <p className="text-sm font-medium text-slate-600">{status}</p> : null}
    </form>
  );
}
