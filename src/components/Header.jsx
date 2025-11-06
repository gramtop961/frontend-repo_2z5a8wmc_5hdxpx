import { Rocket, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-500 grid place-items-center text-white">
            <Rocket size={18} />
          </div>
          <div>
            <p className="font-semibold text-slate-900 leading-tight">Viral Coach</p>
            <p className="text-xs text-slate-500 -mt-0.5">Ottimizza i tuoi contenuti IG</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-600">
          <Sparkles className="text-fuchsia-600" size={16} />
          <span>Feedback in tempo reale</span>
        </div>
      </div>
    </header>
  );
}
