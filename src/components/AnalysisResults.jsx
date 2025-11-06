import { useMemo } from "react";
import { Sparkles, TrendingUp, Hashtag, Target } from "lucide-react";

function ScoreBar({ label, value, color }) {
  return (
    <div>
      <div className="flex justify-between text-sm text-slate-600">
        <span>{label}</span>
        <span className="font-medium text-slate-800">{Math.round(value)}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-1">
        <div className={`h-full ${color}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function AnalysisResults({ data, loading }) {
  const computed = useMemo(() => {
    if (!data) return null;
    const length = data.text.length;
    const hasHook = /(?:(?:scopri|come|ecco|perché|perche|mai|non)|\?|!)/i.test(data.text);
    const emojiCount = (data.text.match(/[\p{Emoji}\u{1F300}-\u{1FAFF}]/gu) || []).length;
    const cta = /(seguimi|salva|condividi|commenta|link in bio|dm)/i.test(data.text);

    const hookScore = Math.min(100, (hasHook ? 60 : 20) + Math.min(40, emojiCount * 5));
    const clarityScore = Math.max(0, 100 - Math.abs(140 - length) * 0.25);
    const ctaScore = cta ? 90 : 45;
    const overall = Math.round((hookScore * 0.4 + clarityScore * 0.35 + ctaScore * 0.25));

    const suggestions = [];
    if (!hasHook) suggestions.push("Aggiungi un hook forte nelle prime 2 righe (domanda, statistica shock, promessa chiara).");
    if (length < 80) suggestions.push("Aumenta la lunghezza a 100-180 parole con esempi rapidi per dare contesto.");
    if (length > 220) suggestions.push("Riduci e snellisci: elimina ridondanze e frasi passive.");
    if (emojiCount < 2) suggestions.push("Inserisci 2-3 emoji mirate per ritmo visivo (non esagerare).");
    if (!cta) suggestions.push("Chiudi con una CTA esplicita: 'Salva per dopo' o 'Tagga un amico'.");

    const hashtags = [];
    const topic = (data.topic || "").toLowerCase().trim();
    const base = topic ? topic.split(/[^a-zàèéìòóùA-Z0-9]+/).filter(Boolean)[0] : "viral";
    const set = new Set([
      `#${base}`,
      `#${base}tips`,
      `#${base}italia`,
      `#${base}strategy`,
      "#contentcreator",
      "#reelsitalia",
      "#algoritmo",
      "#growthhacks",
    ]);
    while (set.size < 8) set.add(`#${base}${set.size}`);
    hashtags.push(...Array.from(set).slice(0, 8));

    return { hookScore, clarityScore, ctaScore, overall, suggestions, hashtags };
  }, [data]);

  if (!data) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 mt-8">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-fuchsia-600" size={18} />
            <h3 className="text-lg font-semibold text-slate-900">Valutazione del contenuto</h3>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <ScoreBar label="Hook" value={computed.hookScore} color="bg-fuchsia-500" />
            <ScoreBar label="Chiarezza" value={computed.clarityScore} color="bg-indigo-500" />
            <ScoreBar label="CTA" value={computed.ctaScore} color="bg-emerald-500" />
            <div className="rounded-xl border border-slate-100 p-4 bg-slate-50">
              <p className="text-sm text-slate-600">Punteggio totale</p>
              <p className="text-3xl font-semibold text-slate-900">{computed.overall}/100</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm font-medium text-slate-800 mb-2">Suggerimenti mirati</p>
            <ul className="list-disc ml-5 space-y-2 text-sm text-slate-700">
              {computed.suggestions.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-2 text-slate-700 font-medium mb-2">
            <TrendingUp size={16} className="text-emerald-600" />
            Hashtag suggeriti
          </div>
          <div className="flex flex-wrap gap-2">
            {computed.hashtags.map((h) => (
              <span key={h} className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs">{h}</span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-slate-700 font-medium mt-5 mb-2">
            <Target size={16} className="text-indigo-600" />
            Prossimi passi
          </div>
          <ul className="list-disc ml-5 space-y-1 text-sm text-slate-700">
            <li>Testa 2-3 varianti di hook con A/B rapido</li>
            <li>Usa sottotitoli dinamici e ritmo 0.8-1.2x</li>
            <li>Prima scena: payoff entro 3 secondi</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
