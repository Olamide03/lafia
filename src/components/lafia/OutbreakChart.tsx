import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

// Generate surveillance-like data: flat baseline, sharp spike, intervention drop
function generatePoints(width: number, height: number) {
  const N = 60;
  const baseline = height * 0.7;
  const points: { x: number; y: number; date: string }[] = [];
  const startDate = new Date(2026, 2, 1);

  for (let i = 0; i < N; i++) {
    let v = baseline + (Math.random() - 0.5) * 12;

    if (i >= 28 && i <= 42) {
      // exponential spike peaking around i=36
      const t = (i - 28) / 8;
      const spike = Math.exp(-Math.pow(t - 1, 2) * 1.8) * (height * 0.55);
      v = baseline - spike + (Math.random() - 0.5) * 8;
    }

    if (i > 42) {
      // intervention drop
      const decay = Math.exp(-(i - 42) / 5);
      v = baseline - height * 0.15 * decay + (Math.random() - 0.5) * 6;
    }

    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    points.push({
      x: (i / (N - 1)) * width,
      y: Math.max(10, Math.min(height - 10, v)),
      date: d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
    });
  }

  return points;
}

export function OutbreakChart() {
  const W = 1000;
  const H = 400;
  const points = useMemo(() => generatePoints(W, H), []);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
  const area = `${path} L ${W} ${H} L 0 ${H} Z`;

  // peak point
  const peak = points.reduce((a, b) => (b.y < a.y ? b : a), points[0]);

  return (
    <section className="relative border-t border-border py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 max-w-3xl"
        >
          <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-emerald">
            Section 03 - Public Health Surveillance
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1] tracking-[-0.02em] text-balance">
            An outbreak detected, in real time, before it ever has a name.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Anonymised symptom clusters across hospitals feed a live national signal - the kind of
            infrastructure that turns a regional spike into a national response, in hours instead of
            weeks.
          </p>
        </motion.div>

        <div
          ref={ref}
          className="relative rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm md:p-10"
        >
          {/* header */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                NCDC - Lafia Signal
              </div>
              <div className="mt-1 font-display text-2xl">
                Suspected viral cluster - Lagos State
              </div>
            </div>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-sm bg-emerald" /> Baseline
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <span className="h-2 w-2 rounded-sm bg-amber" /> Anomaly
              </span>
            </div>
          </div>

          <div className="relative">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="h-[320px] w-full md:h-[400px]"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.17 65)" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="oklch(0.78 0.17 65)" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="oklch(0.72 0.16 158)" />
                  <stop offset="45%" stopColor="oklch(0.72 0.16 158)" />
                  <stop offset="55%" stopColor="oklch(0.78 0.17 65)" />
                  <stop offset="100%" stopColor="oklch(0.72 0.16 158)" />
                </linearGradient>
              </defs>

              {/* gridlines */}
              {[0.25, 0.5, 0.75].map((t) => (
                <line
                  key={t}
                  x1={0}
                  x2={W}
                  y1={H * t}
                  y2={H * t}
                  stroke="oklch(0.30 0.02 250)"
                  strokeWidth={1}
                  strokeDasharray="2 6"
                />
              ))}

              {/* threshold line */}
              <line
                x1={0}
                x2={W}
                y1={H * 0.4}
                y2={H * 0.4}
                stroke="oklch(0.78 0.17 65 / 0.5)"
                strokeWidth={1}
                strokeDasharray="6 6"
              />
              <text
                x={W - 8}
                y={H * 0.4 - 8}
                textAnchor="end"
                fill="oklch(0.78 0.17 65)"
                style={{ font: "10px ui-monospace, monospace", letterSpacing: "0.15em" }}
              >
                ALERT THRESHOLD
              </text>

              {/* area */}
              <motion.path
                d={area}
                fill="url(#areaGrad)"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 1.8, duration: 1 }}
              />

              {/* line */}
              <motion.path
                d={path}
                fill="none"
                stroke="url(#lineGrad)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={inView ? { pathLength: 1 } : {}}
                transition={{ duration: 2.6, ease: "easeInOut" }}
              />

              {/* peak dot */}
              <motion.circle
                cx={peak.x}
                cy={peak.y}
                r={6}
                fill="oklch(0.78 0.17 65)"
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: 1.8, duration: 0.4 }}
              />
              <motion.circle
                cx={peak.x}
                cy={peak.y}
                r={6}
                fill="none"
                stroke="oklch(0.78 0.17 65)"
                strokeWidth={2}
                initial={{ scale: 1, opacity: 0 }}
                animate={inView ? { scale: 3, opacity: [0.6, 0] } : {}}
                transition={{ delay: 1.9, duration: 1.6, repeat: Infinity }}
              />
            </svg>

            {/* alert badge floating at peak */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 2.1, duration: 0.6, type: "spring" }}
              className="pointer-events-none absolute"
              style={{
                left: `${(peak.x / W) * 100}%`,
                top: `${(peak.y / H) * 100}%`,
                transform: "translate(-50%, -130%)",
              }}
            >
              <div className="whitespace-nowrap rounded-lg bg-amber px-3 py-2 text-ink shadow-amber-glow">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-80">
                  Outbreak Alert - Auto-flagged
                </div>
                <div className="mt-0.5 text-sm font-medium">+428% above baseline - {peak.date}</div>
              </div>
              <div className="-mt-1 mx-auto h-2 w-2 rotate-45 bg-amber" />
            </motion.div>
          </div>

          {/* x axis labels */}
          <div className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>{points[0].date}</span>
            <span>{points[Math.floor(points.length / 2)].date}</span>
            <span>{points[points.length - 1].date}</span>
          </div>

          <div className="mt-8 grid gap-6 border-t border-border pt-6 text-sm sm:grid-cols-3">
            <div>
              <div className="font-display text-2xl text-emerald">14d</div>
              <div className="mt-1 text-muted-foreground">earlier than legacy reporting</div>
            </div>
            <div>
              <div className="font-display text-2xl text-amber">+428%</div>
              <div className="mt-1 text-muted-foreground">case spike auto-detected</div>
            </div>
            <div>
              <div className="font-display text-2xl text-emerald">Delta -62%</div>
              <div className="mt-1 text-muted-foreground">post-intervention drop</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
