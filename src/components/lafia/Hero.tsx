import { motion } from "framer-motion";
import heroImg from "@/assets/hero-doctor.jpg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-screen overflow-hidden gradient-hero grain pt-32 pb-24"
    >
      {/* grid lines */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:px-10">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground"
          >
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald" />
            National Health Infrastructure - Nigeria
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] text-balance"
          >
            One identity.
            <br />
            One record.
            <br />
            <span className="italic text-emerald">Accountable always.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground md:text-xl"
          >
            Lafia gives every Nigerian a permanent, NIN-anchored medical record that travels with
            them across every hospital, clinic, and emergency room - for life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#waitlist"
              className="group inline-flex items-center gap-2 rounded-md bg-emerald px-7 py-4 font-medium text-ink shadow-glow transition hover:translate-y-[-1px]"
            >
              Join the Waitlist
              <span className="transition-transform group-hover:translate-x-1">-&gt;</span>
            </a>
            <a
              href="#problem"
              className="inline-flex items-center gap-2 rounded-md border border-border px-7 py-4 text-foreground transition hover:bg-card"
            >
              Why Lafia exists
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-14 flex items-center gap-8 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
          >
            <div>
              <div className="font-display text-2xl normal-case tracking-tight text-foreground">
                220M+
              </div>
              Nigerians
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-display text-2xl normal-case tracking-tight text-foreground">
                1
              </div>
              Health ID
            </div>
            <div className="h-10 w-px bg-border" />
            <div>
              <div className="font-display text-2xl normal-case tracking-tight text-foreground">
                All
              </div>
              Hospitals
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="relative lg:col-span-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border shadow-glow">
            <img
              src={heroImg}
              alt="Nigerian doctor accessing a patient record on a tablet"
              className="absolute inset-0 h-full w-full object-cover"
              width={1600}
              height={2000}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            {/* floating record card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute right-6 bottom-6 left-6 rounded-xl border border-border bg-card/80 p-4 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                <span>Patient - NIN XXXX XXXX 7421</span>
                <span className="flex items-center gap-1.5">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald" />
                  Verified
                </span>
              </div>
              <div className="mt-2 font-display text-xl">Adeyemi O.</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Allergy: Penicillin - Blood: O+ - 32y
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* marquee */}
      <div className="relative mt-20 overflow-hidden border-y border-border py-5">
        <div className="marquee flex gap-16 whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 gap-16">
              <span>NIN-Anchored Identity</span>
              <span>-</span>
              <span>Immutable Audit Trail</span>
              <span>-</span>
              <span>NDPR Compliant</span>
              <span>-</span>
              <span>Biometric Emergency Access</span>
              <span>-</span>
              <span>NCDC Surveillance Layer</span>
              <span>-</span>
              <span>One Record For Life</span>
              <span>-</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
