import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact PhoneLocating.",
};

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
      <h1 className="text-4xl font-semibold tracking-tight text-slate-950">Contact</h1>
      <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
        Questions about reports, licensing or provider integrations? Send a message.
      </p>
      <ContactForm />
    </section>
  );
}
