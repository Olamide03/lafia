import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    t: "Identity is anchored to the NIN",
    d: "Every patient's record is permanently tied to their National Identification Number - verified once, trusted everywhere.",
  },
  {
    n: "02",
    t: "Hospitals connect through one secure layer",
    d: "Public and private hospitals, labs, and pharmacies write to the same record - no integrations to rebuild for each new clinic.",
  },
  {
    n: "03",
    t: "Doctors retrieve the full record in seconds",
    d: "Allergies, conditions, prescriptions, scans, vitals - surfaced instantly at the point of care, with role-based access.",
  },
  {
    n: "04",
    t: "Every access is logged. Every page is watermarked.",
    d: "Immutable audit trails and invisible per-view watermarking make Lafia the first record system Nigerian hospitals can adopt without legal exposure.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative border-t border-border py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-3xl"
        >
          <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Section 04 - How it Works
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1] tracking-[-0.02em] text-balance">
            Built like infrastructure. Used like an instinct.
          </h2>
        </motion.div>

        <div className="overflow-hidden rounded-2xl border border-border bg-border md:grid md:grid-cols-2 md:gap-px">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group bg-background p-10 transition hover:bg-card/40 lg:p-14"
            >
              <div className="font-mono text-xs tracking-[0.3em] text-emerald">{s.n}</div>
              <h3 className="mt-6 font-display text-2xl leading-tight tracking-tight text-balance md:text-3xl">
                {s.t}
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
