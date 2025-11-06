import { useState } from "react";
import Header from "./components/Header";
import ContentInput from "./components/ContentInput";
import AnalysisResults from "./components/AnalysisResults";
import TipsPanel from "./components/TipsPanel";

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze(payload) {
    setLoading(true);
    // In questa versione iniziale, analizziamo lato client con euristiche leggere
    // In futuro possiamo spostare la logica su backend per risultati più avanzati
    await new Promise((r) => setTimeout(r, 400));
    setAnalysis(payload);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-fuchsia-50 via-indigo-50 to-sky-50">
      <Header />

      <main className="py-6">
        <section className="max-w-6xl mx-auto px-4 text-center mt-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Analizzatore di contenuti per Instagram
          </h1>
          <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
            Incolla il tuo testo e ricevi feedback mirato su hook, chiarezza, CTA e hashtag per aumentare le probabilità di viralità.
          </p>
        </section>

        <ContentInput onAnalyze={handleAnalyze} />
        <AnalysisResults data={analysis} loading={loading} />
        <TipsPanel />
      </main>

      <footer className="py-8 text-center text-xs text-slate-500">
        Costruito con cura per creators e brand. ✦
      </footer>
    </div>
  );
}

export default App;
