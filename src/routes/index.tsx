import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/lafia/Nav";
import { Hero } from "@/components/lafia/Hero";
import { Problem } from "@/components/lafia/Problem";
import { Emergency } from "@/components/lafia/Emergency";
import { OutbreakChart } from "@/components/lafia/OutbreakChart";
import { HowItWorks } from "@/components/lafia/HowItWorks";
import { Features } from "@/components/lafia/Features";
import { RecordPreview } from "@/components/lafia/RecordPreview";
import { Waitlist } from "@/components/lafia/Waitlist";
import { Footer } from "@/components/lafia/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Lafia | Nigeria's Unified Health Identity Platform" },
      {
        name: "description",
        content:
          "One identity. One record. Accountable always. Lafia gives every Nigerian a permanent NIN-anchored medical record across every hospital.",
      },
      { property: "og:title", content: "Lafia | Nigeria's Unified Health Identity" },
      {
        property: "og:description",
        content:
          "Built on the NIN. A permanent, portable, secure medical record for every Nigerian - for life.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Problem />
      <Emergency />
      <OutbreakChart />
      <HowItWorks />
      <Features />
      <RecordPreview />
      <Waitlist />
      <Footer />
    </main>
  );
}
