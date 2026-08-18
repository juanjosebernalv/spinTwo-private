"use client";

import { type FormEvent, useState } from "react";

import { Hero } from "@/components/Hero/Hero";
import { useTranslation } from "@/hooks/useTranslation";

type SubmitStatus = "idle" | "success" | "error";

export default function ContactUsPage() {
  const { t } = useTranslation();
  const page = t.pages.contactUs;
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Placeholder submit handler - wire up to the contact API endpoint
    // once it is available.
    setStatus("success");
  }

  return (
    <>
      <Hero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        subtitle={page.hero.subtitle}
      />
      <section className="mx-auto max-w-2xl px-6 py-16">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          noValidate
        >
          <Field
            id="name"
            label={page.form.name}
            placeholder={page.form.namePlaceholder}
            type="text"
            required
          />
          <Field
            id="email"
            label={page.form.email}
            placeholder={page.form.emailPlaceholder}
            type="email"
            required
          />
          <Field
            id="company"
            label={page.form.company}
            placeholder={page.form.companyPlaceholder}
            type="text"
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-sm font-medium">
              {page.form.message}
            </label>
            <textarea
              id="message"
              name="message"
              placeholder={page.form.messagePlaceholder}
              required
              rows={5}
              className="rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-current/40 dark:border-white/15"
            />
          </div>

          <button
            type="submit"
            className="mt-2 self-start rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            {page.form.submit}
          </button>

          {status === "success" ? (
            <p role="status" className="text-sm text-current/70">
              {page.form.successMessage}
            </p>
          ) : null}
          {status === "error" ? (
            <p role="alert" className="text-sm text-red-500">
              {page.form.errorMessage}
            </p>
          ) : null}
        </form>
      </section>
    </>
  );
}

function Field({
  id,
  label,
  placeholder,
  type,
  required,
}: {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-xl border border-black/10 bg-transparent px-4 py-3 text-sm outline-none focus:border-current/40 dark:border-white/15"
      />
    </div>
  );
}
