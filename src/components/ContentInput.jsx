import { useState } from "react";
import { Upload, ClipboardPaste, ImageIcon } from "lucide-react";

export default function ContentInput({ onAnalyze }) {
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!text.trim()) return;
    onAnalyze({ text, topic });
  }

  function pasteFromClipboard() {
    if (navigator.clipboard) {
      navigator.clipboard.readText().then((t) => setText((prev) => (prev ? prev + "\n" : "") + t));
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 mt-8">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-slate-900">Incolla il contenuto</h2>
            <button onClick={pasteFromClipboard} type="button" className="inline-flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
              <ClipboardPaste size={16} /> Incolla
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Didascaliа, hook, script del reel o idea del post..."
            className="w-full h-40 resize-y rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 px-4 py-3 text-slate-800 placeholder:slate-400"
          />

          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Niche/Target (es. fitness, finanza personale)"
              className="w-full rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/40 px-4 py-2 text-slate-800 placeholder:slate-400"
            />
            <button
              onClick={handleSubmit}
              className="inline-flex justify-center items-center gap-2 rounded-xl bg-gradient-to-br from-fuchsia-600 to-indigo-600 text-white font-medium py-2.5 px-4 shadow hover:opacity-95 active:opacity-90"
            >
              <Upload size={18} /> Analizza contenuto
            </button>
          </div>

          <p className="text-xs text-slate-500 mt-2">Suggerimento: ottieni i risultati migliori con 80-200 parole.</p>
        </div>

        <aside className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
          <div className="flex items-center gap-2 text-slate-700 font-medium mb-2">
            <ImageIcon size={16} className="text-fuchsia-600" />
            Idee supportate
          </div>
          <ul className="text-sm text-slate-600 list-disc ml-4 space-y-1">
            <li>Hook per Reels e Shorts</li>
            <li>Caption per post e caroselli</li>
            <li>Script di voiceover</li>
            <li>Call-to-Action ottimizzate</li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
