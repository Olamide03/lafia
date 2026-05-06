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

export default function App() {
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
