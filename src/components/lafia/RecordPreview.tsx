import { type ReactNode, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock3,
  Fingerprint,
  Info,
  Shield,
  Stethoscope,
} from "lucide-react";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "labs", label: "Lab results" },
  { id: "visits", label: "Hospital visits" },
  { id: "meds", label: "Medications" },
  { id: "obs", label: "Obstetric history" },
  { id: "access", label: "Access log" },
] as const;

type TabId = (typeof tabs)[number]["id"];
type Tone = "neutral" | "green" | "amber" | "red" | "blue";

const overviewVitals = [
  { label: "Blood pressure", value: "118", unit: "/76 mmHg", status: "Normal" },
  { label: "Pulse rate", value: "76", unit: "bpm", status: "Normal" },
  { label: "Temperature", value: "36.7", unit: "°C", status: "Normal" },
  { label: "SpO₂", value: "98", unit: "%", status: "Normal" },
];

const immunisations = [
  ["Hepatitis B (full series)", "Mar 2020", "Complete", "green"],
  ["Tetanus toxoid", "Jan 2023 (ANC)", "Complete", "green"],
  ["COVID-19 (AstraZeneca)", "Sep 2021", "2 doses", "green"],
  ["Yellow fever", "—", "Due", "amber"],
] as const;

const fullBloodCount = [
  ["Haemoglobin", "10.4 g/dL", "12.0-16.0", "Low", "amber"],
  ["Packed cell volume", "31%", "36-46%", "Low", "amber"],
  ["WBC count", "6.8 ×10³/μL", "4.5-11.0", "Normal", "green"],
  ["Platelet count", "198 ×10³/μL", "150-400", "Normal", "green"],
  ["MCV", "72 fL", "80-100", "Low — microcytic", "amber"],
  ["MCH", "24 pg", "27-33", "Low", "amber"],
  ["Sickle cell screen", "Positive (trait)", "Negative (normal)", "AS — trait only", "amber"],
] as const;

const biochemistry = [
  ["Fasting blood glucose", "5.1 mmol/L", "3.9-5.6", "Normal", "green"],
  ["HbA1c", "5.4%", "<5.7%", "Normal", "green"],
  ["Serum ferritin", "8 ng/mL", "15-150", "Low — iron deficient", "red"],
  ["Serum iron", "7 μmol/L", "9-30", "Low", "amber"],
  ["TIBC", "72 μmol/L", "45-72", "Normal", "green"],
  ["Creatinine", "72 μmol/L", "44-97", "Normal", "green"],
  ["ALT", "18 U/L", "7-35", "Normal", "green"],
  ["TSH (thyroid)", "2.1 mIU/L", "0.4-4.0", "Normal", "green"],
  ["Vitamin D", "19 ng/mL", "30-100", "Insufficient", "amber"],
] as const;

const visits = [
  {
    hospital: "University of Nigeria Teaching Hospital (UNTH) — Enugu",
    date: "01 May 2026 · Dr. Amaka Eze (Obstetrics & Gynaecology)",
    badge: ["Most recent", "blue"] as const,
    border: "border-sky-400/40",
    complaint:
      "Heavy menstrual bleeding for 4 months, associated fatigue and exertional breathlessness. History of known uterine fibroids.",
    exam: "Pallor noted. Uterus slightly enlarged, non-tender. BP 118/76. Pulse 76.",
    diagnosis:
      "Menorrhagia secondary to uterine fibroids. Iron deficiency anaemia (Hb 10.4 g/dL, ferritin 8 ng/mL).",
    plan:
      "Start Ferrous sulphate 200mg TDS. Tranexamic acid during menstruation. Refer to fibroid clinic for assessment. Repeat USS in 3 months. Low-iron-load diet counselling. Repeat FBC in 6 weeks.",
    tags: [
      ["Fibroid clinic referral", "blue"],
      ["Anaemia — iron supplements", "amber"],
      ["Follow-up: 12 Jun 2026", "blue"],
    ] as const,
  },
  {
    hospital: "UNTH Enugu — Labour Ward",
    date: "14 August 2023 · Dr. C. Obiora (Obstetrics)",
    badge: ["Delivery", "green"] as const,
    border: "border-emerald/40",
    complaint:
      "Presented in active labour at 39+2 weeks gestation. G2P1. Previous SVD in 2021.",
    exam:
      "Spontaneous vaginal delivery at 11:42 AM. Female infant, birth weight 3.2 kg, APGAR 9 at 1 min / 10 at 5 min. No perineal tears. Placenta complete.",
    diagnosis:
      "Mother and baby well post-partum. Breastfeeding initiated within 1 hour. Post-natal vitamins prescribed. Discharged Day 2.",
    plan:
      "Infant Lafia ID assigned: LFP-BIRTH-2023-00847291 — Chidera Okafor.",
    tags: [
      ["SVD — uncomplicated", "green"],
      ["Infant record created", "blue"],
      ["Discharged Day 2", "green"],
    ] as const,
  },
  {
    hospital: "Memfys Hospital — Enugu",
    date: "22 November 2022 · Dr. O. Nwoye (Radiology + General Medicine)",
    badge: ["Radiology", "amber"] as const,
    border: "border-amber/40",
    complaint:
      "Referred from UNTH OPD for pelvic USS following complaint of lower abdominal discomfort and dysmenorrhea for 8 months.",
    exam:
      "First USS identifying two intramural fibroids (1.8 cm and 1.1 cm). No endometrial pathology. Normal ovaries.",
    diagnosis:
      "Conservative management chosen based on size, symptoms, and absence of red flags.",
    plan:
      "Annual USS surveillance recommended. Referred back to UNTH gynaecology OPD with report.",
    tags: [
      ["Fibroids first identified", "amber"],
      ["USS report uploaded", "blue"],
    ] as const,
  },
  {
    hospital: "University College Hospital (UCH) — Ibadan",
    date: "06 March 2020 · Dr. B. Adewale (General Practice)",
    badge: ["General practice", "neutral"] as const,
    border: "border-border",
    complaint:
      "New patient registration. Annual check-up. Mild intermittent headaches. No significant past medical history at that time.",
    exam:
      "BP 122/80. All systems normal. Genotype confirmed AS. Blood group A+. Hepatitis B surface antigen negative.",
    diagnosis:
      "Baseline health profile created with genotype and blood group now permanently portable.",
    plan:
      "Commenced Hep B vaccination series. Record transferred to Lafia from UCH paper folder March 2021 at patient request following relocation to Enugu.",
    tags: [
      ["Registration visit", "neutral"],
      ["Hep B series started", "green"],
      ["Record transferred to Lafia", "blue"],
    ] as const,
  },
];

const activeMedications = [
  {
    name: "Ferrous sulphate 200mg",
    detail:
      "Three times daily (TDS) with meals · Iron deficiency anaemia · Prescribed: 01 May 2026 · Dr. A. Eze",
    tone: "green" as Tone,
    status: "Active — new",
  },
  {
    name: "Tranexamic acid 500mg",
    detail:
      "Three times daily during menstruation only · Menorrhagia · Prescribed: 01 May 2026",
    tone: "green" as Tone,
    status: "Active — new",
  },
  {
    name: "Folic acid 5mg",
    detail:
      "Once daily · Ongoing — started in ANC 2023, continued post-partum · Dr. C. Obiora",
    tone: "green" as Tone,
    status: "Active",
  },
];

const dispensingLog = [
  ["Ferrous sulphate 200mg", "01 May 2026", "UNTH Pharmacy", "90 tabs"],
  ["Tranexamic acid 500mg", "01 May 2026", "UNTH Pharmacy", "30 tabs"],
  ["Folic acid 5mg", "14 Mar 2026", "MedPlus Enugu", "30 tabs"],
];

const discontinuedMedications = [
  {
    name: "Metronidazole 400mg",
    detail: "Prescribed Aug 2023 post-partum — completed course. Not ongoing.",
    status: "Completed",
    tone: "neutral" as Tone,
  },
  {
    name: "Amoxicillin 500mg",
    detail:
      "Prescribed 2021 — mild rash noted. Recorded as moderate allergy. Discontinued immediately.",
    status: "Allergy — stopped",
    tone: "red" as Tone,
  },
];

const accessLog = [
  {
    actor: "Dr. Amaka Eze — UNTH Enugu (OBG)",
    detail: "Full record view + clinical notes added",
    time: "01 May 2026, 09:17 AM",
    tag: "Treating physician",
    tone: "blue" as Tone,
  },
  {
    actor: "Clina-Lancet Laboratory — Enugu portal",
    detail: "Lab results uploaded (FBC + biochemistry)",
    time: "28 Apr 2026, 3:44 PM",
    tag: "Lab upload",
    tone: "green" as Tone,
  },
  {
    actor: "UNTH Pharmacy — Dispensing terminal",
    detail: "Prescription filled and dispensing logged",
    time: "01 May 2026, 11:02 AM",
    tag: "Pharmacy",
    tone: "green" as Tone,
  },
  {
    actor: "Dr. O. Nwoye — Memfys Hospital Enugu",
    detail: "USS report uploaded + record view",
    time: "15 Mar 2026, 2:31 PM",
    tag: "Imaging upload",
    tone: "blue" as Tone,
  },
  {
    actor: "Ngozi Okafor (Patient)",
    detail: "Patient portal — self view",
    time: "10 Mar 2026, 8:15 AM",
    tag: "Self-access",
    tone: "neutral" as Tone,
  },
  {
    actor: "Dr. C. Obiora — UNTH Labour Ward",
    detail: "Delivery record added + infant Lafia ID created",
    time: "14 Aug 2023, 12:14 PM",
    tag: "Delivery record",
    tone: "blue" as Tone,
  },
];

function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const tones: Record<Tone, string> = {
    neutral: "border-border bg-card text-muted-foreground",
    green: "border-emerald/25 bg-emerald/10 text-emerald",
    amber: "border-amber/25 bg-amber/10 text-amber",
    red: "border-red-400/25 bg-red-500/10 text-red-200",
    blue: "border-sky-400/25 bg-sky-500/10 text-sky-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

function SectionCard({
  title,
  children,
  icon,
}: {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="rounded-[1.5rem] border border-border bg-card/55 p-5 sm:p-6">
      <div className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

function KRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex gap-4 text-sm">
      <div className="min-w-32 text-muted-foreground">{label}</div>
      <div className="text-foreground">{value}</div>
    </div>
  );
}

function DataTable({
  headers,
  rows,
  columns = 4,
}: {
  headers: string[];
  rows: readonly (readonly string[])[];
  columns?: 3 | 4;
}) {
  const gridClass =
    columns === 4 ? "md:grid-cols-[2.2fr_1fr_1fr_1fr]" : "md:grid-cols-[2fr_1fr_1fr]";

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-border bg-card/55">
      <div className={`hidden border-b border-border px-5 py-4 text-xs uppercase tracking-[0.2em] text-muted-foreground md:grid ${gridClass}`}>
        {headers.map((header) => (
          <div key={header}>{header}</div>
        ))}
      </div>
      <div className="divide-y divide-border">
        {rows.map((row, index) => (
          <div key={`${row[0]}-${index}`} className={`grid gap-2 px-5 py-4 text-sm ${gridClass}`}>
            {row.slice(0, columns).map((cell, cellIndex) => (
              <div
                key={`${row[0]}-${cellIndex}`}
                className={
                  cellIndex === row.length - 1 && cell !== "Normal"
                    ? "font-medium text-amber"
                    : cellIndex === row.length - 1 && cell === "Normal"
                      ? "font-medium text-emerald"
                      : cellIndex === 0
                        ? "text-foreground"
                        : "text-muted-foreground"
                }
              >
                <span className="mb-1 block text-[11px] uppercase tracking-[0.18em] text-muted-foreground md:hidden">
                  {headers[cellIndex]}
                </span>
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ClinicalTrustStrip() {
  return (
    <div className="mb-8 grid gap-4 lg:grid-cols-3">
      <div className="rounded-[1.5rem] border border-emerald/20 bg-emerald/8 p-4">
        <div className="text-xs uppercase tracking-[0.2em] text-emerald">For the clinician</div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          See allergies, prior diagnoses, linked labs, obstetric history, and dispensing records
          before you prescribe or repeat work already done elsewhere.
        </p>
      </div>
      <div className="rounded-[1.5rem] border border-sky-400/20 bg-sky-500/8 p-4">
        <div className="text-xs uppercase tracking-[0.2em] text-sky-200">For the hospital</div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Fewer duplicate folders, fewer avoidable adverse events, better continuity across OPD,
          labour ward, lab, pharmacy, and emergency.
        </p>
      </div>
      <div className="rounded-[1.5rem] border border-amber/20 bg-amber/8 p-4">
        <div className="text-xs uppercase tracking-[0.2em] text-amber">For patient safety</div>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          A doctor can act with more confidence because the record shows not just what is happening
          now, but what happened before, where, and who entered it.
        </p>
      </div>
    </div>
  );
}

export function RecordPreview() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <section id="record-preview" className="relative border-t border-border py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 max-w-4xl"
        >
          <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.3em] text-emerald">
            Section 06 - Doctor View
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] leading-[1] tracking-[-0.02em] text-balance">
            Show a doctor the record they wish already existed.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Lafia is not only a national identity layer. It is a clinical working surface. The
            moment a doctor opens a patient record, they should immediately see allergy risk,
            relevant prior encounters, linked investigations, medication history, maternal history,
            and a defensible audit trail. That is what makes the platform useful in practice.
          </p>
        </motion.div>

        <ClinicalTrustStrip />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="overflow-hidden rounded-[2rem] border border-border bg-[linear-gradient(180deg,rgba(17,24,39,0.95),rgba(12,18,30,0.98))] shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
        >
          <div className="border-b border-border bg-card/40 px-5 py-4 sm:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock3 className="h-4 w-4 text-emerald" />
                <span>
                  Record last updated: <strong className="text-foreground">01 May 2026, 09:17 AM</strong> — Dr.
                  Amaka Eze, UNTH Enugu (Obstetrics &amp; Gynaecology)
                </span>
              </div>
              <Badge tone="green">Active record</Badge>
            </div>
          </div>

          <div className="border-b border-red-400/20 bg-red-500/8 px-5 py-4 sm:px-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
              <div>
                <div className="text-base font-semibold text-red-100">
                  Drug allergy: Cotrimoxazole (severe rash/Stevens-Johnson syndrome risk). Do NOT
                  prescribe sulphonamide-based antibiotics.
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border border-sky-400/20 bg-sky-500/10 text-2xl font-medium text-sky-200">
                  NO
                </div>
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight text-foreground">
                    Ngozi Adaeze Okafor
                  </h3>
                  <p className="mt-2 text-base text-muted-foreground">
                    Female · 34 years · DOB: 22 August 1991 · Blood type: A+ · Genotype: AS
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-xl border border-border bg-card px-4 py-2 font-mono text-xs text-muted-foreground">
                      NIN: 7731 ●●●● ●●●●
                    </span>
                    <Badge tone="amber">Gestational diabetes (resolved)</Badge>
                    <Badge tone="blue">Gravida 2 Para 2</Badge>
                    <Badge tone="green">NHIA Insured</Badge>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-card/70 px-4 py-4 text-sm xl:min-w-64">
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Lafia Patient ID
                </div>
                <div className="mt-2 font-mono text-lg text-foreground">LFP-2020-00391847</div>
                <div className="mt-1 text-xs text-muted-foreground">Registered: 11 Mar 2020</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 border-b border-border pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`border-b-2 px-1 py-3 text-sm font-medium transition sm:px-4 ${
                    activeTab === tab.id
                      ? "border-foreground text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "overview" && (
              <div className="mt-8 space-y-6">
                <div className="grid gap-5 lg:grid-cols-2">
                  <SectionCard title="Patient demographics">
                    <div className="space-y-3">
                      <KRow label="Marital status" value="Married" />
                      <KRow label="Occupation" value="Secondary school teacher" />
                      <KRow label="State of origin" value="Anambra State · Onitsha LGA" />
                      <KRow label="Religion" value="Christian (relevant for transfusion consent)" />
                      <KRow label="Phone" value="080●● ●●●●●●" />
                      <KRow label="Address" value="Enugu, Enugu State" />
                      <KRow label="NHIA number" value="NHIA-2020-ENG-047192" />
                    </div>
                  </SectionCard>

                  <SectionCard title="Next of kin">
                    <div className="space-y-3">
                      <KRow label="Name" value="Emeka Okafor" />
                      <KRow label="Relationship" value="Husband" />
                      <KRow label="Phone" value="080●● ●●●●●●" />
                      <KRow label="Alt. contact" value="Ada Nwosu (sister)" />
                      <KRow
                        label="Medical proxy"
                        value={<Badge tone="green">Authorised — Emeka Okafor</Badge>}
                      />
                    </div>

                    <div className="mt-6 border-t border-border pt-5">
                      <div className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Medical identifiers
                      </div>
                      <div className="space-y-3">
                        <KRow label="Blood type" value="A Positive (A+)" />
                        <KRow
                          label="Genotype"
                          value={<Badge tone="amber">AS — Sickle cell trait</Badge>}
                        />
                        <KRow label="Rhesus factor" value="Rh positive" />
                        <KRow label="Height" value="163 cm" />
                        <KRow label="Weight" value="71 kg" />
                        <KRow label="BMI" value="26.7 — Overweight" />
                      </div>
                    </div>
                  </SectionCard>
                </div>

                <SectionCard title="Allergies & adverse reactions">
                  <div className="flex flex-wrap gap-3">
                    <Badge tone="red">Cotrimoxazole — Stevens-Johnson risk (SEVERE)</Badge>
                    <Badge tone="amber">Amoxicillin — mild rash (moderate)</Badge>
                    <Badge tone="amber">Latex gloves — contact dermatitis</Badge>
                  </div>
                </SectionCard>

                <div className="grid gap-5 lg:grid-cols-2">
                  <SectionCard title="Chronic conditions & diagnoses" icon={<Stethoscope className="h-4 w-4 text-emerald" />}>
                    <div className="space-y-4 text-sm">
                      <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
                        <span className="text-foreground">Gestational diabetes mellitus</span>
                        <Badge tone="neutral">Resolved — 2023</Badge>
                      </div>
                      <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
                        <span className="text-foreground">Iron deficiency anaemia</span>
                        <Badge tone="amber">Managed</Badge>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-foreground">Uterine fibroids (small, multiple)</span>
                        <Badge tone="blue">Monitoring — annual USS</Badge>
                      </div>
                    </div>
                  </SectionCard>

                  <SectionCard title="Family history">
                    <div className="space-y-3">
                      <KRow label="Mother" value="Hypertension, Type 2 Diabetes" />
                      <KRow label="Father" value="Sickle cell trait (AS), deceased — stroke 2019" />
                      <KRow label="Sibling (brother)" value="Sickle cell disease (SS)" />
                      <KRow label="Maternal grandmother" value="Breast cancer" />
                    </div>
                    <div className="mt-5 border-t border-border pt-4">
                      <Badge tone="red">Genotype risk — husband&apos;s genotype critical for child planning</Badge>
                    </div>
                  </SectionCard>
                </div>

                <SectionCard title="Social history">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="rounded-2xl bg-background/30 p-4">
                      <div className="text-sm text-muted-foreground">Smoking</div>
                      <div className="mt-2 font-medium text-emerald">Non-smoker</div>
                    </div>
                    <div className="rounded-2xl bg-background/30 p-4">
                      <div className="text-sm text-muted-foreground">Alcohol</div>
                      <div className="mt-2 font-medium text-foreground">Occasional (social)</div>
                    </div>
                    <div className="rounded-2xl bg-background/30 p-4">
                      <div className="text-sm text-muted-foreground">Exercise</div>
                      <div className="mt-2 font-medium text-foreground">Light — walking 3x/week</div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Latest vitals — 01 May 2026">
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {overviewVitals.map((vital) => (
                      <div key={vital.label} className="rounded-2xl bg-background/30 p-4">
                        <div className="text-sm text-muted-foreground">{vital.label}</div>
                        <div className="mt-2 text-3xl font-semibold text-foreground">
                          {vital.value}
                          <span className="ml-1 text-sm font-normal text-muted-foreground">{vital.unit}</span>
                        </div>
                        <div className="mt-2 text-sm text-emerald">{vital.status}</div>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard title="Immunisation record">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-[2fr_1fr_1fr]">
                    <div className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground md:block">Vaccine</div>
                    <div className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground md:block">Date</div>
                    <div className="hidden text-xs uppercase tracking-[0.2em] text-muted-foreground md:block">Status</div>
                    {immunisations.map(([name, date, status, tone]) => (
                      <>
                        <div key={`${name}-name`} className="border-t border-border pt-3 text-foreground md:border-t-0 md:pt-0">
                          {name}
                        </div>
                        <div key={`${name}-date`} className="text-muted-foreground">{date}</div>
                        <div key={`${name}-status`}>
                          <Badge tone={tone}>{status}</Badge>
                        </div>
                      </>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard title="Linked family records" icon={<Fingerprint className="h-4 w-4 text-emerald" />}>
                  <div className="rounded-[1.25rem] border border-sky-400/40 bg-sky-500/6 p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald/16 text-emerald">
                          CI
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-foreground">Chidera Okafor</div>
                          <div className="mt-1 text-sm text-muted-foreground">
                            Female · Age 2 years 9 months · DOB: 14 August 2023
                          </div>
                          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-sky-200">
                            <span>⇢ Linked Lafia ID: LFP-BIRTH-2023-00847291</span>
                            <Badge tone="blue" className="text-[10px]">Birth record</Badge>
                          </div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            Delivered at UNTH Enugu · 14 Aug 2023 · Birth weight: 3.2 kg · APGAR 9/10 · Genotype: AS
                          </div>
                        </div>
                      </div>
                      <Badge tone="green">Active</Badge>
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl bg-background/30 px-4 py-3 text-sm text-muted-foreground">
                    Previous pregnancy (2021): Full-term delivery, healthy male infant. Linked ID:
                    {" "}LFP-BIRTH-2021-00294710 — Chukwuemeka Okafor, Age 4.
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === "labs" && (
              <div className="mt-8 space-y-6">
                <SectionCard title="Full blood count — 28 April 2026 · Clina-Lancet Laboratories Enugu">
                  <DataTable
                    headers={["Test", "Result", "Reference", "Flag"]}
                    rows={fullBloodCount}
                    columns={4}
                  />
                </SectionCard>

                <SectionCard title="Biochemistry panel — 28 April 2026 · Clina-Lancet">
                  <DataTable
                    headers={["Test", "Result", "Reference", "Flag"]}
                    rows={biochemistry}
                    columns={4}
                  />
                </SectionCard>

                <SectionCard title="Imaging — Pelvic ultrasound · 15 March 2026 · Memfys Hospital Enugu">
                  <div className="rounded-2xl bg-background/30 p-5 text-sm leading-8 text-foreground">
                    <strong>Radiologist report:</strong> Uterus anteverted, measures 8.4 × 5.2 × 4.1 cm.
                    Three intramural fibroids identified: largest measuring 2.1 cm in the posterior wall,
                    two smaller fibroids anteriorly (1.3 cm and 0.9 cm). No submucosal component.
                    Endometrium regular, 7 mm (normal for cycle day). Both ovaries normal in size. No
                    free fluid in the pouch of Douglas.
                    <span className="mt-4 block text-muted-foreground">
                      Impression: Multiple small intramural fibroids. Recommend annual surveillance. No
                      intervention required at this time.
                    </span>
                  </div>
                </SectionCard>

                <SectionCard title="Cervical smear (pap smear) — 10 January 2026 · UNTH Enugu">
                  <DataTable
                    headers={["Test", "Result", "Flag"]}
                    rows={[["Cervical cytology", "NILM", "Normal"]]}
                    columns={3}
                  />
                  <p className="mt-4 text-sm text-muted-foreground">
                    NILM = Negative for Intraepithelial Lesion or Malignancy. Next smear due: January 2029.
                  </p>
                </SectionCard>
              </div>
            )}

            {activeTab === "visits" && (
              <div className="mt-8 space-y-5">
                <div className="flex items-start gap-3 rounded-[1.5rem] border border-sky-400/40 bg-sky-500/8 p-5 text-sm text-sky-200">
                  <Info className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    3 hospitals on record · 6 total encounters logged on Lafia · Records transferred from
                    UCH Ibadan (2020) at patient request.
                  </span>
                </div>

                {visits.map((visit) => (
                  <div
                    key={`${visit.hospital}-${visit.date}`}
                    className={`rounded-[1.5rem] border ${visit.border} bg-card/30 p-5 sm:p-6`}
                  >
                    <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="text-2xl font-semibold tracking-tight text-foreground">
                          {visit.hospital}
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">{visit.date}</div>
                      </div>
                      <Badge tone={visit.badge[1]}>{visit.badge[0]}</Badge>
                    </div>

                    <div className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                      <p>
                        <strong className="text-foreground">Complaint:</strong> {visit.complaint}
                      </p>
                      <p>
                        <strong className="text-foreground">Examination / findings:</strong> {visit.exam}
                      </p>
                      <p>
                        <strong className="text-foreground">Diagnosis / assessment:</strong> {visit.diagnosis}
                      </p>
                      <p>
                        <strong className="text-foreground">Plan:</strong> {visit.plan}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {visit.tags.map(([label, tone]) => (
                        <Badge key={label} tone={tone}>
                          {label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "meds" && (
              <div className="mt-8 space-y-6">
                <SectionCard title="Active medications — as of 01 May 2026">
                  <div className="space-y-5">
                    {activeMedications.map((med) => (
                      <div
                        key={med.name}
                        className="flex flex-col gap-4 border-b border-border pb-5 last:border-b-0 last:pb-0 md:flex-row md:items-start md:justify-between"
                      >
                        <div>
                          <div className="text-2xl font-semibold tracking-tight text-foreground">{med.name}</div>
                          <div className="mt-2 text-sm text-muted-foreground">{med.detail}</div>
                        </div>
                        <Badge tone={med.tone}>{med.status}</Badge>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard title="Pharmacy dispensing log">
                  <DataTable
                    headers={["Drug dispensed", "Date", "Pharmacy", "Qty"]}
                    rows={dispensingLog}
                    columns={4}
                  />
                </SectionCard>

                <SectionCard title="Discontinued medications">
                  <div className="space-y-5">
                    {discontinuedMedications.map((med) => (
                      <div
                        key={med.name}
                        className="flex flex-col gap-4 border-b border-border pb-5 last:border-b-0 last:pb-0 md:flex-row md:items-start md:justify-between"
                      >
                        <div>
                          <div className="text-2xl font-semibold tracking-tight text-foreground">{med.name}</div>
                          <div className="mt-2 text-sm text-muted-foreground">{med.detail}</div>
                        </div>
                        <Badge tone={med.tone}>{med.status}</Badge>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === "obs" && (
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-3 rounded-[1.5rem] border border-sky-400/40 bg-sky-500/8 p-5 text-sm text-sky-200">
                  <Info className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    Obstetric summary: Gravida 2, Para 2, No miscarriages, No caesarean sections.
                    Both deliveries spontaneous vaginal at term.
                  </span>
                </div>

                <SectionCard title="Obstetric history summary">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-2xl bg-background/30 p-5">
                      <div className="text-sm text-muted-foreground">Gravida (total pregnancies)</div>
                      <div className="mt-2 text-4xl font-semibold text-foreground">2</div>
                    </div>
                    <div className="rounded-2xl bg-background/30 p-5">
                      <div className="text-sm text-muted-foreground">Para (deliveries ≥20 weeks)</div>
                      <div className="mt-2 text-4xl font-semibold text-foreground">2</div>
                    </div>
                    <div className="rounded-2xl bg-background/30 p-5">
                      <div className="text-sm text-muted-foreground">Miscarriages / abortions</div>
                      <div className="mt-2 text-4xl font-semibold text-emerald">0</div>
                    </div>
                    <div className="rounded-2xl bg-background/30 p-5">
                      <div className="text-sm text-muted-foreground">Living children</div>
                      <div className="mt-2 text-4xl font-semibold text-foreground">2</div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Pregnancy 2 — 2023 (most recent)">
                  <div className="space-y-3">
                    <KRow label="EDD" value="20 August 2023" />
                    <KRow label="Actual delivery" value="14 August 2023 (39+2 weeks)" />
                    <KRow label="Hospital" value="UNTH Enugu — Labour Ward" />
                    <KRow label="Mode of delivery" value="Spontaneous vaginal delivery (SVD)" />
                    <KRow label="Outcome" value="Live female infant — 3.2 kg, APGAR 9/10" />
                    <KRow label="Complications" value={<Badge tone="green">None</Badge>} />
                    <KRow
                      label="Gestational diabetes"
                      value="Diagnosed at 28 weeks — managed with diet, resolved post-partum"
                    />
                  </div>
                  <div className="mt-6 border-t border-border pt-5">
                    <div className="mb-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      Antenatal visits (ANC) — 8 visits logged
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-2xl bg-background/30 p-4 text-sm">
                        <div className="text-muted-foreground">Visit 1 · 12 weeks</div>
                        <div className="mt-2 text-foreground">BP 116/74 · Booking bloods done</div>
                      </div>
                      <div className="rounded-2xl bg-background/30 p-4 text-sm">
                        <div className="text-muted-foreground">Visit 4 · 28 weeks</div>
                        <div className="mt-2 text-amber">GDM diagnosed · OGTT 9.8 mmol/L</div>
                      </div>
                      <div className="rounded-2xl bg-background/30 p-4 text-sm">
                        <div className="text-muted-foreground">Visit 8 · 38 weeks</div>
                        <div className="mt-2 text-foreground">Cephalic presentation · NST reactive</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 border-t border-border pt-5 text-sm text-sky-200">
                    ⇢ Child&apos;s Lafia record: LFP-BIRTH-2023-00847291 — Chidera Okafor (F, age 2)
                  </div>
                </SectionCard>

                <SectionCard title="Pregnancy 1 — 2021">
                  <div className="space-y-3">
                    <KRow label="Delivery" value="Full term (40+1 weeks) · SVD · UNTH Enugu" />
                    <KRow label="Outcome" value="Live male infant — 3.5 kg, APGAR 10/10" />
                    <KRow label="Complications" value={<Badge tone="green">None</Badge>} />
                  </div>
                  <div className="mt-6 border-t border-border pt-5 text-sm text-sky-200">
                    ⇢ Child&apos;s Lafia record: LFP-BIRTH-2021-00294710 — Chukwuemeka Okafor (M, age 4)
                  </div>
                </SectionCard>
              </div>
            )}

            {activeTab === "access" && (
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-3 rounded-[1.5rem] border border-sky-400/40 bg-sky-500/8 p-5 text-sm text-sky-200">
                  <Info className="mt-0.5 h-5 w-5 shrink-0" />
                  <span>
                    Every access is permanently logged and cannot be deleted. All rendered pages carry
                    invisible watermarks traceable to the accessing account.
                  </span>
                </div>

                <SectionCard title="Access log — last 6 entries" icon={<Shield className="h-4 w-4 text-emerald" />}>
                  <div className="space-y-4">
                    {accessLog.map((entry) => (
                      <div
                        key={`${entry.actor}-${entry.time}`}
                        className="flex flex-col gap-3 border-b border-border pb-4 last:border-b-0 last:pb-0 md:flex-row md:items-start md:justify-between"
                      >
                        <div>
                          <div className="text-2xl font-semibold tracking-tight text-foreground">{entry.actor}</div>
                          <div className="mt-2 text-sm text-muted-foreground">
                            {entry.detail} · {entry.time}
                          </div>
                        </div>
                        <Badge tone={entry.tone}>{entry.tag}</Badge>
                      </div>
                    ))}
                  </div>
                </SectionCard>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
