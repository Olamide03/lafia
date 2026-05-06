import { motion } from "framer-motion";
import { useState } from "react";

const DEFAULT_WAITLIST_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbx_kg3m8qGVIhbOXoIJpCwy1fi-rxJOjS9wVaBpn7qAUPEDrhCOa46ATBEjOsNg5MitKw/exec";

export function Waitlist() {
  const endpoint = import.meta.env.VITE_GOOGLE_SHEETS_WEB_APP_URL ?? DEFAULT_WAITLIST_ENDPOINT;
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (trimmed.length > 255) {
      setError("Email is too long.");
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
          email: trimmed,
          source: "lafia-waitlist",
          submittedAt: new Date().toISOString(),
        }),
      });

      setSubmitted(true);
      setEmail("");
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
          className="mx-auto mt-12 max-w-xl"
        >
          {!submitted ? (
            <>
              <div className="flex flex-col gap-3 rounded-xl border border-border bg-card/80 p-2 shadow-glow backdrop-blur-xl sm:flex-row sm:p-2">
                <input
                  type="email"
                  required
                  maxLength={255}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@hospital.org"
                  aria-label="Email address"
                  className="flex-1 bg-transparent px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-emerald px-6 py-3.5 font-medium text-ink shadow-glow transition hover:translate-y-[-1px]"
                >
                  {isSubmitting ? "Submitting..." : "Request Access"}
                </button>
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
                We&apos;ll be in touch as the first hospitals come online.
              </p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
