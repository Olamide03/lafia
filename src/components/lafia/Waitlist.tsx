import { motion } from "framer-motion";
import { useState } from "react";

const DEFAULT_WAITLIST_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbx_kg3m8qGVIhbOXoIJpCwy1fi-rxJOjS9wVaBpn7qAUPEDrhCOa46ATBEjOsNg5MitKw/exec";
const LOCAL_STORAGE_KEY = "lafia-waitlist-emails";

function hasSubmittedEmail(email: string) {
  try {
    const saved = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!saved) {
      return false;
    }

    const emails = JSON.parse(saved) as string[];
    return emails.includes(email.toLowerCase());
  } catch {
    return false;
  }
}

function saveSubmittedEmail(email: string) {
  try {
    const saved = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    const emails = saved ? (JSON.parse(saved) as string[]) : [];
    const normalized = email.toLowerCase();

    if (!emails.includes(normalized)) {
      emails.push(normalized);
      window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(emails));
    }
  } catch {
    // Ignore localStorage issues and keep the form usable.
  }
}

export function Waitlist() {
  const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL ?? DEFAULT_WAITLIST_ENDPOINT;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hospital, setHospital] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedHospital = hospital.trim();
    const trimmedPhone = phone.trim();
    const trimmedRole = role.trim();

    if (trimmedName.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (trimmedEmail.length > 255) {
      setError("Email is too long.");
      return;
    }

    if (trimmedHospital.length < 2) {
      setError("Please enter your hospital or organisation.");
      return;
    }

    if (trimmedRole.length < 2) {
      setError("Please enter your role.");
      return;
    }

    if (trimmedPhone && !/^[+\d\s()-]{7,20}$/.test(trimmedPhone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (hasSubmittedEmail(trimmedEmail)) {
      setError("This email has already joined the waitlist.");
      return;
    }

    if (!endpoint) {
      setError("Waitlist is not connected yet. Add your Google Sheets web app URL first.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          hospital: trimmedHospital,
          phone: trimmedPhone,
          role: trimmedRole,
          source: "lafia-waitlist",
          submittedAt: new Date().toISOString(),
        }),
      });

      saveSubmittedEmail(trimmedEmail);
      setSubmitted(true);
      setName("");
      setEmail("");
      setHospital("");
      setPhone("");
      setRole("");
    } catch {
      setError("Something went wrong while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden border-t border-border py-32 lg:py-44"
    >
      <div className="gradient-hero absolute inset-0 opacity-80" />
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-emerald">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald" />
            Phase 1 - Early Access
          </div>
          <h2 className="font-display text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] tracking-[-0.025em] text-balance">
            Be on the record <span className="italic text-emerald">from day one.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Hospitals, clinicians, regulators, and citizens - join the waitlist for the first
            national rollout.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mx-auto mt-12 max-w-2xl"
        >
          {!submitted ? (
            <>
              <div className="space-y-3 rounded-xl border border-border bg-card/80 p-3 shadow-glow backdrop-blur-xl">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    aria-label="Full name"
                    className="rounded-lg border border-border/60 bg-transparent px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    maxLength={255}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@hospital.org"
                    aria-label="Email address"
                    className="rounded-lg border border-border/60 bg-transparent px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    type="text"
                    required
                    maxLength={150}
                    value={hospital}
                    onChange={(e) => setHospital(e.target.value)}
                    placeholder="Hospital or organisation"
                    aria-label="Hospital or organisation"
                    className="rounded-lg border border-border/60 bg-transparent px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Role"
                    aria-label="Role"
                    className="rounded-lg border border-border/60 bg-transparent px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                  <input
                    type="tel"
                    maxLength={20}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number (optional)"
                    aria-label="Phone number"
                    className="rounded-lg border border-border/60 bg-transparent px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-emerald px-6 py-3.5 font-medium text-ink shadow-glow transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Submitting..." : "Request Access"}
                  </button>
                </div>
              </div>

              {error && <p className="mt-3 text-sm text-amber">{error}</p>}
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                NDPR-compliant - No spam - Unsubscribe anytime
              </p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl border border-emerald/40 bg-card/80 p-8 shadow-glow backdrop-blur-xl"
            >
              <div className="font-display text-2xl text-emerald">You&apos;re on the list.</div>
              <p className="mt-2 text-muted-foreground">
                Thanks, {name || "there"}. We&apos;ll reach out when Lafia opens the first rollout.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                Your details have been recorded for the launch waitlist.
              </p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
