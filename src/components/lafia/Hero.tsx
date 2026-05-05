import { motion } from "framer-motion";
import heroImg from "@/assets/hero-doctor.jpg";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen pt-32 pb-24 overflow-hidden gradient-hero grain">
      {/* grid lines */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
      }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.25em] text-muted-foreground border border-border rounded-full px-3 py-1.5 mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald pulse-dot" />
            National Health Infrastructure · Nigeria
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-[-0.03em] text-balance"
          >
            One identity.<br />
            One record.<br />
            <span className="italic text-emerald">Accountable always.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed text-balance"
          >
            Lafia gives every Nigerian a permanent, NIN-anchored medical record that travels
            with them across every hospital, clinic, and emergency room — for life.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#waitlist"
              className="group inline-flex items-center gap-2 px-7 py-4 rounded-md bg-emerald text-ink font-medium shadow-glow hover:translate-y-[-1px] transition"
            >
              Join the Waitlist
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href="#problem"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-md border border-border text-foreground hover:bg-card transition"
            >
              Why Lafia exists
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-14 flex items-center gap-8 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground"
          >
            <div><div className="text-foreground text-2xl font-display normal-case tracking-tight">220M+</div>Nigerians</div>
            <div className="w-px h-10 bg-border" />
            <div><div className="text-foreground text-2xl font-display normal-case tracking-tight">1</div>Health ID</div>
            <div className="w-px h-10 bg-border" />
            <div><div className="text-foreground text-2xl font-display normal-case tracking-tight">∞</div>Hospitals</div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.3 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border shadow-glow">
            <img
              src={heroImg}
              alt="Nigerian doctor accessing a patient record on a tablet"
              className="absolute inset-0 w-full h-full object-cover"
              width={1600}
              height={2000}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            {/* floating record card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute bottom-6 left-6 right-6 backdrop-blur-xl bg-card/80 border border-border rounded-xl p-4"
            >
              <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground">
                <span>Patient · NIN ████ ████ 7421</span>
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald pulse-dot" /> Verified</span>
              </div>
              <div className="mt-2 font-display text-xl">Adeyemi O.</div>
              <div className="mt-1 text-xs text-muted-foreground">Allergy: Penicillin · Blood: O+ · 32y</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* marquee */}
      <div className="relative mt-20 border-y border-border py-5 overflow-hidden">
        <div className="flex gap-16 marquee whitespace-nowrap text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex gap-16 shrink-0">
              <span>NIN-Anchored Identity</span><span>·</span>
              <span>Immutable Audit Trail</span><span>·</span>
              <span>NDPR Compliant</span><span>·</span>
              <span>Biometric Emergency Access</span><span>·</span>
              <span>NCDC Surveillance Layer</span><span>·</span>
              <span>One Record For Life</span><span>·</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
