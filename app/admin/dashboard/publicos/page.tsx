"use client";
import { useState } from "react";

const interesses = [
  "Empreendedorismo", "Marketing Digital", "E-commerce", "Investimentos",
  "Saúde e Fitness", "Moda", "Tecnologia", "Educação", "Culinária", "Viagens",
];

export default function PublicosPage() {
  const [nicho, setNicho] = useState("");
  const [idadeMin, setIdadeMin] = useState("25");
  const [idadeMax, setIdadeMax] = useState("45");
  const [genero, setGenero] = useState("all");
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [payload, setPayload] = useState("");

  function toggleInteresse(i: string) {
    setSelecionados((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);
  }

  function gerar() {
    const p = {
      age_min: parseInt(idadeMin),
      age_max: parseInt(idadeMax),
      genders: genero === "all" ? [1, 2] : genero === "male" ? [1] : [2],
      geo_locations: { countries: ["BR"] },
      interests: selecionados.map((s, i) => ({ id: `${i + 1000}`, name: s })),
      custom_audiences: nicho ? [{ id: "lookalike_001", name: `Lookalike - ${nicho}` }] : [],
    };
    setPayload(JSON.stringify(p, null, 2));
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">👥 Públicos & Segmentação</h1>
        <p className="text-zinc-500 text-sm mt-1">Configure o targeting das suas campanhas Meta Ads</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card-dark rounded-2xl p-6 space-y-5">
          <h2 className="text-white font-bold">Definir Público</h2>

          <div>
            <label className="text-zinc-400 text-sm mb-1.5 block">Nicho / Produto (para Lookalike)</label>
            <input value={nicho} onChange={(e) => setNicho(e.target.value)}
              placeholder="Ex: compradores de curso online"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Idade mínima</label>
              <input type="number" value={idadeMin} onChange={(e) => setIdadeMin(e.target.value)} min={18} max={65}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 text-sm" />
            </div>
            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Idade máxima</label>
              <input type="number" value={idadeMax} onChange={(e) => setIdadeMax(e.target.value)} min={18} max={65}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 text-sm" />
            </div>
          </div>

          <div>
            <label className="text-zinc-400 text-sm mb-2 block">Gênero</label>
            <div className="flex gap-2">
              {[["all", "Todos"], ["male", "Masculino"], ["female", "Feminino"]].map(([v, l]) => (
                <button key={v} onClick={() => setGenero(v)}
                  className={`flex-1 py-2 rounded-xl text-sm border transition-all ${genero === v ? "border-orange-500 bg-orange-500/10 text-orange-400" : "border-white/10 text-zinc-400"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-zinc-400 text-sm mb-2 block">Interesses</label>
            <div className="flex flex-wrap gap-2">
              {interesses.map((i) => (
                <button key={i} onClick={() => toggleInteresse(i)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-all ${selecionados.includes(i) ? "border-orange-500 bg-orange-500/10 text-orange-400" : "border-white/10 text-zinc-400 hover:border-white/30"}`}>
                  {i}
                </button>
              ))}
            </div>
          </div>

          <button onClick={gerar}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors">
            ⚡ Gerar Configuração de Público
          </button>
        </div>

        <div className="space-y-4">
          {payload ? (
            <div className="card-dark rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white font-bold">Targeting Gerado</h2>
                <button onClick={() => navigator.clipboard.writeText(payload)}
                  className="text-orange-500 text-sm font-semibold">📋 Copiar</button>
              </div>
              <pre className="bg-zinc-900 rounded-xl p-4 text-green-400 text-xs overflow-auto max-h-80 font-mono">
                {payload}
              </pre>
            </div>
          ) : (
            <div className="card-dark rounded-2xl p-6 text-center py-20 text-zinc-600">
              <div className="text-4xl mb-3">👥</div>
              <p className="text-sm">Configure o público e gere o targeting</p>
            </div>
          )}

          <div className="card-dark rounded-2xl p-6">
            <h3 className="text-white font-bold mb-3">Tamanhos de Público Recomendados</h3>
            {[
              { tipo: "Topo de funil", tamanho: "1M – 5M pessoas", desc: "Interesses amplos, awareness" },
              { tipo: "Meio de funil", tamanho: "100K – 500K", desc: "Interesses específicos, leads" },
              { tipo: "Fundo de funil", tamanho: "10K – 100K", desc: "Lookalike, retargeting, conversão" },
            ].map((r) => (
              <div key={r.tipo} className="py-3 border-b border-white/5 last:border-0">
                <div className="flex justify-between mb-0.5">
                  <span className="text-white text-sm font-semibold">{r.tipo}</span>
                  <span className="text-orange-400 text-xs">{r.tamanho}</span>
                </div>
                <span className="text-zinc-500 text-xs">{r.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
