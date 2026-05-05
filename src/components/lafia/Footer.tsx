export function Footer() {
  return (
    <footer className="border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-10 items-start">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-md bg-emerald grid place-items-center">
              <span className="font-display text-ink font-black text-sm leading-none">L</span>
            </div>
            <span className="font-display text-xl tracking-tight">Lafia</span>
          </div>
          <p className="mt-4 text-sm text-muted-foreground max-w-xs leading-relaxed">
            Nigeria's unified health identity platform. One identity. One record. Accountable always.
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">Platform</div>
          <a href="#problem" className="block text-muted-foreground hover:text-foreground transition">The Problem</a>
          <a href="#emergency" className="block text-muted-foreground hover:text-foreground transition">Emergency</a>
          <a href="#how" className="block text-muted-foreground hover:text-foreground transition">How it Works</a>
          <a href="#features" className="block text-muted-foreground hover:text-foreground transition">Features</a>
        </div>

        <div className="text-sm">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground mb-3">Founder</div>
          <div className="font-display text-lg">Folarin Nurudeen</div>
          <div className="text-muted-foreground">Lagos, Nigeria</div>
          <a
            href="https://cheflammy.vercel.app"
            target="_blank" rel="noopener noreferrer"
            className="inline-block mt-2 text-emerald hover:underline"
          >
            cheflammy.vercel.app ↗
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono uppercase tracking-[0.25em] text-muted-foreground">
        <span>© 2026 Lafia Health · Confidential & Proprietary</span>
        <span>Built as national infrastructure</span>
      </div>
    </footer>
  );
}
