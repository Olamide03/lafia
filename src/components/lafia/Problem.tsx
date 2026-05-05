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
    <section id="problem" className="relative border-t border-border py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div {...fadeUp} className="max-w-3xl">
          <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
            Section 01 - The Reality
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4.25rem)] leading-[1] tracking-[-0.02em] text-balance">
            Patients in Nigeria don&apos;t die from a lack of treatment.{" "}
            <span className="italic text-muted-foreground">
              They die from a lack of information.
            </span>
          </h2>
        </motion.div>

        <div className="mt-24 grid items-start gap-16 lg:grid-cols-12">
          {/* LASUTH story */}
          <motion.div {...fadeUp} className="space-y-6 lg:col-span-7">
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Case - LASUTH, Lagos
            </div>
            <h3 className="font-display text-3xl leading-tight tracking-tight text-balance md:text-4xl">
              A patient was charged N10,000 - twice - for a folder she already had.
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              At the Lagos State University Teaching Hospital - one of Nigeria&apos;s foremost
              medical institutions - a registered patient had a second hospital folder accidentally
              opened in her name.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              It is not a bug. It is the system working exactly as designed. Which means the design
              has to change.
            </p>
            <div className="hairline grid grid-cols-3 gap-6 pt-6 text-sm">
              <div>
                <div className="font-display text-3xl text-amber">N10K</div>
                <div className="mt-1 text-muted-foreground">duplicate fee</div>
              </div>
              <div>
                <div className="font-display text-3xl text-amber">2x</div>
                <div className="mt-1 text-muted-foreground">folders opened</div>
              </div>
              <div>
                <div className="font-display text-3xl text-amber">0</div>
                <div className="mt-1 text-muted-foreground">accountability</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border lg:col-span-5"
          >
            <img
              src={folders}
              alt="Stack of paper hospital folders"
              loading="lazy"
              width={1400}
              height={1750}
              className="absolute inset-0 h-full w-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute right-6 bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Records that never travel with the patient
            </div>
          </motion.div>
        </div>

        {/* Pituitary tumour story */}
        <motion.div {...fadeUp} className="mt-32 max-w-4xl lg:mt-40">
          <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
            Case Study 02 - The Tumour Nobody Knew About
          </div>
          <blockquote className="font-display text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.15] tracking-[-0.015em] text-balance">
            <span className="text-amber">&quot;</span>
            An MRI eighteen months ago had quietly identified a pituitary tumour. It sat in a
            folder, in a cabinet, in a hospital across town. The new doctors didn&apos;t know. They
            couldn&apos;t have known.
            <span className="text-amber">&quot;</span>
          </blockquote>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Tests get repeated. Money gets spent twice. Time - the only thing tissue cannot get back
            - runs out. Lafia doesn&apos;t make doctors better. It gives them the information they
            need to be better, faster.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
