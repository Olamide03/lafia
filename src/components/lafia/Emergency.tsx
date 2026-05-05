import { motion } from "framer-motion";
import scan from "@/assets/fingerprint-scan.jpg";
import er from "@/assets/emergency-room.jpg";

export function Emergency() {
  return (
    <section id="emergency" className="relative py-32 lg:py-40 overflow-hidden">
      {/* dramatic bg image */}
      <div className="absolute inset-0">
        <img src={er} alt="" loading="lazy" width={1600} height={1100}
          className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.3em] text-amber mb-6">
            <span className="w-2 h-2 rounded-full bg-amber pulse-dot" />
            § 02 · Emergency Protocol
          </div>
          <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] tracking-[-0.02em] text-balance">
            No phone. No card. No family. <span className="italic text-amber">No problem.</span>
          </h2>
          <p className="mt-8 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            An unconscious patient arrives at the ER. The clock is already against them. With Lafia, one fingerprint is the entire history.
          </p>
        </motion.div>

        <div className="mt-20 grid lg:grid-cols-12 gap-10 items-stretch">
          {/* Fingerprint scan visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-6 relative aspect-[5/6] rounded-2xl overflow-hidden border border-amber/40 shadow-amber-glow"
          >
            <img src={scan} alt="Fingerprint scan in emergency room" loading="lazy" width={1600} height={1100}
              className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-background/40" />
            {/* scan sweep line */}
            <div className="absolute inset-x-0 top-0 h-full overflow-hidden pointer-events-none">
              <div className="scan-sweep absolute inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-amber to-transparent shadow-amber-glow" />
            </div>
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-amber">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber pulse-dot" /> Scanning Biometric</span>
              <span>03:21 AM</span>
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Match found · 0.42s</div>
              <div className="font-display text-2xl mt-1">Identity confirmed</div>
            </div>
          </motion.div>

          {/* Record reveal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="lg:col-span-6 bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 lg:p-10"
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">Lafia Emergency Record</div>
                <div className="font-display text-3xl mt-1">Okonkwo, Chiamaka</div>
              </div>
              <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-widest bg-amber/15 text-amber border border-amber/40">
                Critical
              </span>
            </div>

            {[
              { label: "Blood Type", value: "AB−", urgent: false },
              { label: "Allergies", value: "Penicillin · Sulfa drugs", urgent: true },
              { label: "Conditions", value: "Type II Diabetes · Hypertension", urgent: false },
              { label: "Current Medication", value: "Metformin 500mg · Lisinopril 10mg", urgent: false },
              { label: "Last Hospitalisation", value: "LUTH · 14 Mar 2026 · DKA episode", urgent: false },
              { label: "Emergency Contact", value: "+234 80█ ███ 4421 (sister)", urgent: false },
            ].map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="grid grid-cols-3 gap-4 py-3.5 border-t border-border first:border-t-0 items-baseline"
              >
                <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-muted-foreground col-span-1">
                  {row.label}
                </div>
                <div className={`col-span-2 text-base ${row.urgent ? "text-amber font-medium" : "text-foreground"}`}>
                  {row.value}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 pt-6 border-t border-border flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground"
            >
              <span>Pulled in 0.42s</span>
              <span className="text-emerald flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald" /> Audit logged</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
