import { Lightbulb, BookmarkPlus, Link as LinkIcon } from "lucide-react";

export default function TipsPanel() {
  const tips = [
    {
      title: "Formula Hook 3-3-3",
      body: "3 secondi per catturare, 3 benefici chiari, 3 parole chiave della nicchia.",
    },
    {
      title: "Struttura PAS",
      body: "Problema → Agita → Soluzione. Funziona benissimo in 15-30s reels.",
    },
    {
      title: "CTA che convertono",
      body: "'Salva per dopo', 'Tagga un amico', 'Scrivi SI se vuoi la guida'.",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 mt-8">
      <div className="bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-200 rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute right-6 top-6 text-amber-500/30">
          <Lightbulb size={90} />
        </div>
        <div className="flex items-center gap-2 text-amber-700 font-semibold">
          <Lightbulb size={18} />
          Playbook rapido
        </div>
        <div className="grid sm:grid-cols-3 gap-4 mt-3">
          {tips.map((t) => (
            <div key={t.title} className="rounded-xl bg-white/70 backdrop-blur p-4 border border-amber-100">
              <p className="font-medium text-slate-900">{t.title}</p>
              <p className="text-sm text-slate-600 mt-1">{t.body}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 mt-4 text-sm text-amber-800">
          <BookmarkPlus size={16} /> Salva questo schema e riusalo sui prossimi post.
          <span className="inline-flex items-center gap-1 ml-auto">
            <LinkIcon size={14} />
            <a href="https://www.instagram.com/creators/" target="_blank" rel="noreferrer" className="underline">Best practices IG</a>
          </span>
        </div>
      </div>
    </section>
  );
}
