"use client";

import { useState } from "react";
import { SectionHeader } from "@/modules/shared/ui/src/components";

interface FieldProps {
  label: string;
  placeholder?: string;
}

interface ContactFormProps {
  eyebrow: string;
  title: string;
  description: string;
  fields: {
    name: FieldProps;
    email: FieldProps;
    organization: FieldProps;
    message: FieldProps;
  };
  profile: { label: string; options: string[] };
  submitLabel: string;
  successMessage: string;
  errors: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
  };
}

const MAILTO = "contacto@clusterdestartups.org";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm({
  eyebrow,
  title,
  description,
  fields,
  profile,
  submitLabel,
  successMessage,
  errors,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(profile.options[0]);
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate() {
    const next: Record<string, string | undefined> = {};
    if (!name.trim()) next.name = errors.nameRequired;
    if (!email.trim()) next.email = errors.emailRequired;
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = errors.emailInvalid;
    if (!message.trim()) next.message = errors.messageRequired;
    return next;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const next = validate();
    setFieldErrors(next);
    if (Object.keys(next).length > 0) return;

    const subject = `[Sitio web CSI] ${selectedProfile}`;
    const body = [
      `Nombre: ${name}`,
      `Correo: ${email}`,
      `Organización: ${organization || "—"}`,
      `Perfil: ${selectedProfile}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${MAILTO}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  }

  const nameErrorId = "contact-name-error";
  const emailErrorId = "contact-email-error";
  const messageErrorId = "contact-message-error";

  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="container-site">
        <div className="mb-12">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        </div>
        <form onSubmit={handleSubmit} noValidate className="card max-w-2xl p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-small text-ink">
                {fields.name.label}
              </label>
              <input
                id="contact-name"
                className="input"
                type="text"
                autoComplete="name"
                placeholder={fields.name.placeholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? nameErrorId : undefined}
              />
              {fieldErrors.name && (
                <p id={nameErrorId} role="alert" className="mt-2 text-small text-error">
                  {fieldErrors.name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-small text-ink">
                {fields.email.label}
              </label>
              <input
                id="contact-email"
                className="input"
                type="email"
                autoComplete="email"
                placeholder={fields.email.placeholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? emailErrorId : undefined}
              />
              {fieldErrors.email && (
                <p id={emailErrorId} role="alert" className="mt-2 text-small text-error">
                  {fieldErrors.email}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="contact-organization" className="mb-2 block text-small text-ink">
                {fields.organization.label}
              </label>
              <input
                id="contact-organization"
                className="input"
                type="text"
                autoComplete="organization"
                placeholder={fields.organization.placeholder}
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="contact-profile" className="mb-2 block text-small text-ink">
                {profile.label}
              </label>
              <select
                id="contact-profile"
                className="input"
                value={selectedProfile}
                onChange={(e) => setSelectedProfile(e.target.value)}
              >
                {profile.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="contact-message" className="mb-2 block text-small text-ink">
                {fields.message.label}
              </label>
              <textarea
                id="contact-message"
                className="input min-h-32"
                rows={5}
                placeholder={fields.message.placeholder}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? messageErrorId : undefined}
              />
              {fieldErrors.message && (
                <p id={messageErrorId} role="alert" className="mt-2 text-small text-error">
                  {fieldErrors.message}
                </p>
              )}
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-8">
            {submitLabel}
          </button>
          {submitted && (
            <p role="status" className="mt-4 text-small text-success">
              {successMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
