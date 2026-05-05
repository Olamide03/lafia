import { motion } from "framer-motion";
import {
  Fingerprint,
  ShieldCheck,
  Activity,
  FlaskConical,
  Baby,
  Radio,
  FileText,
  AlertTriangle,
} from "lucide-react";

const features = [
  {
    icon: Fingerprint,
    t: "NIN-Anchored Identity",
    d: "One permanent record per Nigerian. No duplicates. No lost folders. Verified through National Identity.",
  },
  {
    icon: FileText,
    t: "Universal Medical Record",
    d: "Allergies, conditions, prescriptions, surgeries, vaccinations, family history - all in one continuous timeline.",
  },
  {
    icon: AlertTriangle,
    t: "Allergy & Interaction Alerts",
    d: "Real-time prescription warnings powered by the patient's own history. Adverse events become preventable.",
  },
  {
    icon: FlaskConical,
    t: "Lab & Imaging Integration",
    d: "Results flow directly from labs and imaging centres. No more rerunning MRIs that already exist.",
  },
  {
    icon: Baby,
    t: "Birth-to-Life Continuity",
    d: "A Lafia ID begins the moment a child is born. Vaccinations, milestones, growth - tracked for life.",
  },
  {
    icon: Radio,
    t: "Public Health Surveillance",
    d: "Anonymised signals stream to the NCDC - turning Lafia from a hospital tool into national infrastructure.",
  },
  {
    icon: ShieldCheck,
    t: "Immutable Audit Trail",
    d: "Every record view is logged with staff, hospital, time, and device. Watermarking traces every leaked screenshot.",
  },
  {
    icon: Activity,
    t: "Emergency Biometric Access",
    d: "A fingerprint pulls a full record in seconds - even when the patient cannot speak for themselves.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative border-t border-border py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-3xl"
        >
          <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-emerald">
            Section 05 - Capabilities
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1] tracking-[-0.02em] text-balance">
            What lives inside a Lafia record.
          </h2>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08 }}
              className="relative group bg-background p-8 transition hover:bg-card/40"
            >
              <div className="grid h-11 w-11 place-items-center rounded-lg border border-border bg-card text-emerald transition group-hover:border-emerald/60">
                <f.icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h3 className="mt-6 font-display text-xl tracking-tight">{f.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
