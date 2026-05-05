import { motion } from "framer-motion";

export function Nav() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-emerald grid place-items-center">
            <span className="font-display text-ink font-black text-sm leading-none">L</span>
          </div>
          <span className="font-display text-xl tracking-tight">Lafia</span>
          <span className="hidden sm:inline-block ml-2 text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground border border-border rounded px-1.5 py-0.5">
            Health ID
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#problem" className="hover:text-foreground transition">The Problem</a>
          <a href="#emergency" className="hover:text-foreground transition">Emergency</a>
          <a href="#how" className="hover:text-foreground transition">How it Works</a>
          <a href="#features" className="hover:text-foreground transition">Features</a>
        </nav>
        <a
          href="#waitlist"
          className="text-sm font-medium px-4 py-2 rounded-md bg-foreground text-ink hover:bg-foreground/90 transition"
        >
          Join Waitlist
        </a>
      </div>
    </motion.header>
  );
}
