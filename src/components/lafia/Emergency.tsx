import { motion } from "framer-motion";
import scan from "@/assets/fingerprint-scan.jpg";
import er from "@/assets/emergency-room.jpg";

export function Emergency() {
  return (
    <section id="emergency" className="relative overflow-hidden py-32 lg:py-40">
      {/* dramatic bg image */}
      <div className="absolute inset-0">
        <img
          src={er}
          alt=""
          loading="lazy"
          width={1600}
          height={1100}
          className="h-full w-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.3em] text-amber">
            <span className="pulse-dot h-2 w-2 rounded-full bg-amber" />
            Section 02 - Emergency Protocol
          </div>
          <h2 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] leading-[1] tracking-[-0.02em] text-balance">
            No phone. No card. No family. <span className="italic text-amber">No problem.</span>
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            An unconscious patient arrives at the ER. The clock is already against them. With Lafia,
            one fingerprint is the entire history.
          </p>
        </motion.div>

        <div className="mt-20 grid items-stretch gap-10 lg:grid-cols-12">
          {/* Fingerprint scan visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative aspect-[5/6] overflow-hidden rounded-2xl border border-amber/40 shadow-amber-glow lg:col-span-6"
          >
            <img
              src={scan}
              alt="Fingerprint scan in emergency room"
              loading="lazy"
              width={1600}
              height={1100}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-background/40" />
            {/* scan sweep line */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden">
              <div className="scan-sweep absolute inset-x-6 h-[2px] bg-gradient-to-r from-transparent via-amber to-transparent shadow-amber-glow" />
            </div>
            <div className="absolute top-6 right-6 left-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-amber">
              <span className="flex items-center gap-2">
                <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-amber" />
                Scanning Biometric
              </span>
              <span>03:21 AM</span>
            </div>
            <div className="absolute right-6 bottom-6 left-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Match found - 0.42s
              </div>
              <div className="mt-1 font-display text-2xl">Identity confirmed</div>
            </div>
          </motion.div>

          {/* Record reveal */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15 }}
            className="rounded-2xl border border-border bg-card/80 p-8 backdrop-blur-xl lg:col-span-6 lg:p-10"
          >
            <div className="mb-8 flex items-center justify-between">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  Lafia Emergency Record
                </div>
                <div className="mt-1 font-display text-3xl">Okonkwo, Chiamaka</div>
              </div>
              <span className="rounded border border-amber/40 bg-amber/15 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-amber">
                Critical
              </span>
            </div>

            {[
              { label: "Blood Type", value: "AB-", urgent: false },
              { label: "Allergies", value: "Penicillin - Sulfa drugs", urgent: true },
              { label: "Conditions", value: "Type II Diabetes - Hypertension", urgent: false },
              {
                label: "Current Medication",
                value: "Metformin 500mg - Lisinopril 10mg",
                urgent: false,
              },
              {
                label: "Last Hospitalisation",
                value: "LUTH - 14 Mar 2026 - DKA episode",
                urgent: false,
              },
              { label: "Emergency Contact", value: "+234 80X XXX 4421 (sister)", urgent: false },
            ].map((row, i) => (
              <motion.div
                key={row.label}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                className="grid grid-cols-3 items-baseline gap-4 border-t border-border py-3.5 first:border-t-0"
              >
                <div className="col-span-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  {row.label}
                </div>
                <div
                  className={`col-span-2 text-base ${
                    row.urgent ? "font-medium text-amber" : "text-foreground"
                  }`}
                >
                  {row.value}
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-8 flex items-center justify-between border-t border-border pt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              <span>Pulled in 0.42s</span>
              <span className="flex items-center gap-1.5 text-emerald">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                Audit logged
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
