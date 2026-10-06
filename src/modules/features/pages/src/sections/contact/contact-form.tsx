"use client";

import { useEffect, useState } from "react";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { SectionHeader } from "@/modules/shared/ui/src/components";
import { track } from "@/modules/cores/analytics/src/track";

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
  infoCardLabel: string;
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
  alreadySentMessage: string;
  errorMessage: string;
  privacyNote: string;
  privacyLinkLabel: string;
  locale: "es" | "en";
  errors: {
    nameRequired: string;
    emailRequired: string;
    emailInvalid: string;
    messageRequired: string;
  };
}

const WEBHOOK_URL = "https://hook.us2.make.com/4xy5fcj1baogs2tv2m7mj5kskvv7fv6q";
const SENT_KEY = "csi-contact-sent";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function hasSentFlag() {
  try {
    return localStorage.getItem(SENT_KEY) === "1";
  } catch {
    return false;
  }
}

export function ContactForm({
  eyebrow,
  title,
  description,
  fields,
  profile,
  infoCardLabel,
  submitLabel,
  sendingLabel,
  successMessage,
  alreadySentMessage,
  errorMessage,
  privacyNote,
  privacyLinkLabel,
  locale,
  errors,
}: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(profile.options[0]);
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string | undefined>>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [alreadySent, setAlreadySent] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    // Restore the device lock after hydration; localStorage is not available during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (hasSentFlag()) setAlreadySent(true);
  }, []);

  function validate() {
    const next: Record<string, string | undefined> = {};
    if (!name.trim()) next.name = errors.nameRequired;
    if (!email.trim()) next.email = errors.emailRequired;
    else if (!EMAIL_PATTERN.test(email.trim())) next.email = errors.emailInvalid;
    if (!message.trim()) next.message = errors.messageRequired;
    return next;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || alreadySent || hasSentFlag()) {
      if (hasSentFlag()) setAlreadySent(true);
      return;
    }

    const next = validate();
    setFieldErrors(next);
    if (Object.keys(next).length > 0) {
      setSubmitted(false);
      setSubmitError(false);
      return;
    }

    setSending(true);
    setSubmitted(false);
    setSubmitError(false);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          organization: organization.trim(),
          profile: selectedProfile,
          message: message.trim(),
          locale,
          source: window.location.href,
        }),
      });

      if (!response.ok) {
        setSubmitError(true);
        return;
      }

      try {
        localStorage.setItem(SENT_KEY, "1");
      } catch {
        // The send already succeeded; the flag is only a device lock.
      }
      setName("");
      setEmail("");
      setOrganization("");
      setMessage("");
      setSelectedProfile(profile.options[0]);
      setAlreadySent(true);
      setSubmitted(true);
      track("registro_startup", { locale, profile: selectedProfile });
    } catch {
      setSubmitError(true);
    } finally {
      setSending(false);
    }
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
        <form onSubmit={handleSubmit} noValidate className="mx-auto max-w-xl space-y-6">
          <div className="card p-6">
            <p className="text-micro uppercase tracking-wide text-ink-muted mb-4">{infoCardLabel}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-small text-ink">
                  {fields.name.label}
                </label>
                <input
                  id="contact-name"
                  className="input"
                  type="text"
                  autoComplete="name"
                  placeholder={fields.name.placeholder}
                  value={name}
                  disabled={alreadySent}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={Boolean(fieldErrors.name)}
                  aria-describedby={fieldErrors.name ? nameErrorId : undefined}
                />
                {fieldErrors.name && (
                  <p id={nameErrorId} role="alert" className="mt-1.5 text-small text-error">
                    {fieldErrors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-small text-ink">
                  {fields.email.label}
                </label>
                <input
                  id="contact-email"
                  className="input"
                  type="email"
                  autoComplete="email"
                  placeholder={fields.email.placeholder}
                  value={email}
                  disabled={alreadySent}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(fieldErrors.email)}
                  aria-describedby={fieldErrors.email ? emailErrorId : undefined}
                />
                {fieldErrors.email && (
                  <p id={emailErrorId} role="alert" className="mt-1.5 text-small text-error">
                    {fieldErrors.email}
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <label htmlFor="contact-organization" className="mb-1.5 block text-small text-ink">
                {fields.organization.label}
              </label>
              <input
                id="contact-organization"
                className="input"
                type="text"
                autoComplete="organization"
                placeholder={fields.organization.placeholder}
                value={organization}
                disabled={alreadySent}
                onChange={(e) => setOrganization(e.target.value)}
              />
            </div>
          </div>
          <div className="card p-6">
            <p className="text-micro uppercase tracking-wide text-ink-muted mb-4">{profile.label}</p>
            <div className="flex flex-wrap gap-2">
              {profile.options.map((option) => (
                <button
                  key={option}
                  type="button"
                  disabled={alreadySent}
                  onClick={() => setSelectedProfile(option)}
                  className={`rounded-full border px-3 py-1.5 text-small transition ${
                    selectedProfile === option
                      ? "border-brand bg-brand text-on-brand"
                      : "border-line bg-surface text-ink-secondary hover:border-brand"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <label htmlFor="contact-message" className="mb-1.5 block text-small text-ink">
                {fields.message.label}
              </label>
              <textarea
                id="contact-message"
                className="input min-h-24"
                rows={3}
                placeholder={fields.message.placeholder}
                value={message}
                disabled={alreadySent}
                onChange={(e) => setMessage(e.target.value)}
                aria-invalid={Boolean(fieldErrors.message)}
                aria-describedby={fieldErrors.message ? messageErrorId : undefined}
              />
              {fieldErrors.message && (
                <p id={messageErrorId} role="alert" className="mt-1.5 text-small text-error">
                  {fieldErrors.message}
                </p>
              )}
            </div>
            <p className="mt-4 text-small text-ink-muted">
              {privacyNote}{" "}
              <Link href="/aviso-de-privacidad" className="text-link">
                {privacyLinkLabel}
              </Link>
              .
            </p>
            <button
              type="submit"
              className="btn btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-70"
              disabled={sending || alreadySent}
            >
              {sending ? sendingLabel : submitLabel}
            </button>
          </div>
          {(submitted || alreadySent) && (
            <p role="status" className="text-center text-small text-success">
              {submitted ? successMessage : alreadySentMessage}
            </p>
          )}
          {submitError && (
            <p role="alert" className="text-center text-small text-error">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
