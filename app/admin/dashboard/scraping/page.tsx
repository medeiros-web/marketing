"use client";
import { useState } from "react";

export default function ScrapingPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    titulo: string; descricao: string; cta: string; preco: string; beneficios: string[];
  }>(null);

  function analisar() {
    if (!url) return;
    setLoading(true);
    setTimeout(() => {
      setResult({
        titulo: "Título principal extraído da página",
        descricao: "Descrição do produto ou serviço encontrada na landing page.",
        cta: "Botão de ação detectado",
        preco: "Preço identificado na página",
        beneficios: [
          "Benefício 1 identificado na página",
          "Benefício 2 identificado na página",
          "Benefício 3 identificado na página",
        ],
      });
      setLoading(false);
    }, 1500);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">🔍 Scraping de Landing Page</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Analise qualquer landing page e extraia informações para criar anúncios automaticamente
        </p>
      </div>

      <div className="card-dark rounded-2xl p-6 mb-6">
        <label className="text-zinc-400 text-sm mb-2 block">URL da Landing Page</label>
        <div className="flex gap-3">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://seuproduto.com/landing"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm"
          />
          <button
            onClick={analisar}
            disabled={!url || loading}
            className="bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap"
          >
            {loading ? "Analisando..." : "🔍 Analisar"}
          </button>
        </div>
        <p className="text-zinc-600 text-xs mt-2">
          ⚠️ Integração com scraper real requer configuração da API. Esta versão simula o resultado.
        </p>
      </div>

      {loading && (
        <div className="card-dark rounded-2xl p-10 text-center">
          <div className="text-4xl mb-3 animate-bounce">🔍</div>
          <p className="text-zinc-400">Analisando a página...</p>
        </div>
      )}

      {result && !loading && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-dark rounded-2xl p-6 space-y-4">
            <h2 className="text-white font-bold">Dados Extraídos</h2>
            {[
              { label: "Título Principal", value: result.titulo },
              { label: "Descrição", value: result.descricao },
              { label: "CTA Detectado", value: result.cta },
              { label: "Preço", value: result.preco },
            ].map((item) => (
              <div key={item.label}>
                <div className="text-zinc-500 text-xs uppercase tracking-wider mb-1">{item.label}</div>
                <div className="text-white text-sm bg-white/5 rounded-lg px-3 py-2">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="card-dark rounded-2xl p-6">
              <h2 className="text-white font-bold mb-3">Benefícios Encontrados</h2>
              <ul className="space-y-2">
                {result.beneficios.map((b, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="text-orange-500 mt-0.5">✓</span> {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-dark rounded-2xl p-6">
              <h3 className="text-white font-bold mb-3">Usar dados em</h3>
              <div className="space-y-2">
                <a href="/admin/dashboard/criativos" className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-400 transition-colors">
                  🎨 Gerar Criativo com estes dados →
                </a>
                <a href="/admin/dashboard/copy" className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-400 transition-colors">
                  ✍️ Gerar Copy com estes dados →
                </a>
                <a href="/admin/dashboard/campanhas" className="flex items-center gap-2 text-sm text-orange-500 hover:text-orange-400 transition-colors">
                  🚀 Criar Campanha com estes dados →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
