export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-6 md:grid-cols-3 lg:px-10">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-emerald">
              <span className="font-display text-sm leading-none font-black text-ink">L</span>
            </div>
            <span className="font-display text-xl tracking-tight">Lafia</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Nigeria&apos;s unified health identity platform. One identity. One record. Accountable
            always.
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Platform
          </div>
          <a
            href="#problem"
            className="block text-muted-foreground transition hover:text-foreground"
          >
            The Problem
          </a>
          <a
            href="#emergency"
            className="block text-muted-foreground transition hover:text-foreground"
          >
            Emergency
          </a>
          <a href="#how" className="block text-muted-foreground transition hover:text-foreground">
            How it Works
          </a>
          <a
            href="#features"
            className="block text-muted-foreground transition hover:text-foreground"
          >
            Features
          </a>
        </div>

        <div className="text-sm">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Founder
          </div>
          <div className="font-display text-lg">Folarin Nurudeen</div>
          <div className="text-muted-foreground">Lagos, Nigeria</div>
          <a
            href="https://cheflammy.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-emerald hover:underline"
          >
            cheflammy.vercel.app -&gt;
          </a>
        </div>
      </div>

      <div className="mx-auto mt-14 flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-border px-6 pt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground sm:flex-row lg:px-10">
        <span>(c) 2026 Lafia Health - Confidential &amp; Proprietary</span>
        <span>Built as national infrastructure</span>
      </div>
    </footer>
  );
}
