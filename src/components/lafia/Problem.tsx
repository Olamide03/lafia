import { motion } from "framer-motion";
import folders from "@/assets/paper-folders.jpg";

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, ease: "easeOut" as const },
};

export function Problem() {
  return (
    <section id="problem" className="relative py-32 lg:py-40 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div {...fadeUp} className="max-w-3xl">
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-amber mb-6">
            § 01 · The Reality
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4.25rem)] leading-[1] tracking-[-0.02em] text-balance">
            Patients in Nigeria don't die from a lack of treatment. <span className="text-muted-foreground italic">They die from a lack of information.</span>
          </h2>
        </motion.div>

        <div className="mt-24 grid lg:grid-cols-12 gap-16 items-start">
          {/* LASUTH story */}
          <motion.div {...fadeUp} className="lg:col-span-7 space-y-6">
            <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground">
              Case · LASUTH, Lagos
            </div>
            <h3 className="font-display text-3xl md:text-4xl tracking-tight leading-tight text-balance">
              A patient was charged ₦10,000 — twice — for a folder she already had.
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              At the Lagos State University Teaching Hospital — one of Nigeria's foremost medical institutions — a registered patient had a second hospital folder accidentally opened in her name.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              It is not a bug. It is the system working exactly as designed. Which means the design has to change.
            </p>
            <div className="hairline pt-6 grid grid-cols-3 gap-6 text-sm">
              <div><div className="font-display text-3xl text-amber">₦10K</div><div className="text-muted-foreground mt-1">duplicate fee</div></div>
              <div><div className="font-display text-3xl text-amber">2×</div><div className="text-muted-foreground mt-1">folders opened</div></div>
              <div><div className="font-display text-3xl text-amber">0</div><div className="text-muted-foreground mt-1">accountability</div></div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-5 relative aspect-[4/5] rounded-2xl overflow-hidden border border-border"
          >
            <img src={folders} alt="Stack of paper hospital folders" loading="lazy" width={1400} height={1750}
              className="absolute inset-0 w-full h-full object-cover grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Records that never travel with the patient
            </div>
          </motion.div>
        </div>

        {/* Pituitary tumour story */}
        <motion.div {...fadeUp} className="mt-32 lg:mt-40 max-w-4xl">
          <div className="text-[11px] font-mono uppercase tracking-[0.3em] text-muted-foreground mb-6">
            Case Study 02 · The Tumour Nobody Knew About
          </div>
          <blockquote className="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.15] tracking-[-0.015em] text-balance">
            <span className="text-amber">"</span>
            An MRI eighteen months ago had quietly identified a pituitary tumour. It sat in a folder, in a cabinet, in a hospital across town. The new doctors didn't know. They couldn't have known.
            <span className="text-amber">"</span>
          </blockquote>
          <p className="mt-8 text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Tests get repeated. Money gets spent twice. Time — the only thing tissue cannot get back — runs out. Lafia doesn't make doctors better. It gives them the information they need to be better, faster.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
