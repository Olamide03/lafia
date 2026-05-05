import { motion } from "framer-motion";
import { useState } from "react";

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function onSubmit(e: React.FormEvent) {
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
    setError("");
    setSubmitted(true);
  }

  return (
    <section id="waitlist" className="relative py-32 lg:py-44 border-t border-border overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-80" />
      <div className="absolute inset-0 grain" />
      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-emerald mb-6 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald pulse-dot" />
            Phase 1 · Early Access
          </div>
          <h2 className="font-display text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] tracking-[-0.025em] text-balance">
            Be on the record <span className="italic text-emerald">from day one.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Hospitals, clinicians, regulators, and citizens — join the waitlist for the first national rollout.
          </p>
        </motion.div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 max-w-xl mx-auto"
        >
          {!submitted ? (
            <>
              <div className="flex flex-col sm:flex-row gap-3 p-2 sm:p-2 bg-card/80 backdrop-blur-xl border border-border rounded-xl shadow-glow">
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
                  className="px-6 py-3.5 rounded-lg bg-emerald text-ink font-medium hover:translate-y-[-1px] transition shadow-glow"
                >
                  Request Access
                </button>
              </div>
              {error && <p className="mt-3 text-sm text-amber">{error}</p>}
              <p className="mt-4 text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">
                NDPR-compliant · No spam · Unsubscribe anytime
              </p>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card/80 backdrop-blur-xl border border-emerald/40 rounded-xl p-8 shadow-glow"
            >
              <div className="font-display text-2xl text-emerald">You're on the list.</div>
              <p className="mt-2 text-muted-foreground">We'll be in touch as the first hospitals come online.</p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}
