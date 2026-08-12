"use client";
import { useState } from "react";

const objetivos = ["Leads", "Vendas", "Tráfego", "Awareness", "Engajamento"];
const tons = ["Urgente e direto", "Empático e próximo", "Inspirador", "Técnico e detalhado", "Descontraído"];

function gerarCopySet(produto: string, publico: string, objetivo: string, tom: string, beneficios: string) {
  const bens = beneficios ? beneficios.split(",").map((b) => b.trim()) : ["resultado rápido", "sem complicação", "garantia inclusa"];

  return [
    {
      tipo: "Headline A",
      titulo: `ATENÇÃO ${publico.toUpperCase() || "VOCÊ"}`,
      corpo: `Você ainda não tem ${produto}? Enquanto você lê isso, seus concorrentes já estão usando. ${bens[0] || "Resultados garantidos"} em tempo recorde.`,
      cta: objetivo === "Leads" ? "Quero saber mais →" : "Comprar agora →",
    },
    {
      tipo: "Headline B",
      titulo: `${produto}: ${bens[0] || "Resultado Real"} para ${publico || "você"}`,
      corpo: `Chega de perder tempo. ${bens[1] || "Simples e eficaz"}, ${produto} é a solução que ${publico || "empreendedores"} precisavam. ${bens[2] || "Garantia total"}.`,
      cta: objetivo === "Leads" ? "Solicitar demonstração →" : "Aproveitar oferta →",
    },
    {
      tipo: "Headline C (Pergunta)",
      titulo: `Você está cansado de ${publico ? `lutar como ${publico}` : "não ter resultados"}?`,
      corpo: `${produto} resolve isso. ${bens.slice(0, 2).join(", ")}. Simples assim. Clique e veja como funciona.`,
      cta: "Ver como funciona →",
    },
  ];
}

export default function CopyPage() {
  const [produto, setProduto] = useState("");
  const [publico, setPublico] = useState("");
  const [objetivo, setObjetivo] = useState("Leads");
  const [tom, setTom] = useState("Urgente e direto");
  const [beneficios, setBeneficios] = useState("");
  const [copies, setCopies] = useState<ReturnType<typeof gerarCopySet>>([]);
  const [loading, setLoading] = useState(false);

  function gerar() {
    if (!produto) return;
    setLoading(true);
    setTimeout(() => {
      setCopies(gerarCopySet(produto, publico, objetivo, tom, beneficios));
      setLoading(false);
    }, 600);
  }

  function copiar(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">✍️ Gerador de Copy A/B</h1>
        <p className="text-zinc-500 text-sm mt-1">Crie variações de texto para seus anúncios e teste qual converte mais</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card-dark rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-bold">Configurar Copy</h2>

          <div>
            <label className="text-zinc-400 text-sm mb-1.5 block">Produto / Serviço *</label>
            <input value={produto} onChange={(e) => setProduto(e.target.value)}
              placeholder="Ex: Mentoria de Vendas Online"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm" />
          </div>

          <div>
            <label className="text-zinc-400 text-sm mb-1.5 block">Público-alvo</label>
            <input value={publico} onChange={(e) => setPublico(e.target.value)}
              placeholder="Ex: Vendedores iniciantes"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm" />
          </div>

          <div>
            <label className="text-zinc-400 text-sm mb-1.5 block">Benefícios (separados por vírgula)</label>
            <input value={beneficios} onChange={(e) => setBeneficios(e.target.value)}
              placeholder="Ex: resultado em 30 dias, suporte incluso, garantia de 7 dias"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm" />
          </div>

          <div>
            <label className="text-zinc-400 text-sm mb-1.5 block">Objetivo da campanha</label>
            <div className="flex flex-wrap gap-2">
              {objetivos.map((o) => (
                <button key={o} onClick={() => setObjetivo(o)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${objetivo === o ? "border-orange-500 bg-orange-500/10 text-orange-400" : "border-white/10 text-zinc-400 hover:border-white/30"}`}>
                  {o}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-zinc-400 text-sm mb-1.5 block">Tom de comunicação</label>
            <select value={tom} onChange={(e) => setTom(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 text-sm">
              {tons.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>

          <button onClick={gerar} disabled={!produto || loading}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold py-3 rounded-xl transition-colors">
            {loading ? "Gerando..." : "⚡ Gerar 3 Variações A/B"}
          </button>
        </div>

        <div className="space-y-4">
          {copies.length > 0 ? copies.map((c, i) => (
            <div key={i} className="card-dark rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-orange-500 text-xs font-bold uppercase tracking-wider">{c.tipo}</span>
                <button onClick={() => copiar(`${c.titulo}\n\n${c.corpo}\n\n${c.cta}`)}
                  className="text-zinc-500 hover:text-orange-400 text-xs transition-colors">
                  📋 Copiar
                </button>
              </div>
              <div className="text-white font-bold mb-2">{c.titulo}</div>
              <div className="text-zinc-400 text-sm leading-relaxed mb-3">{c.corpo}</div>
              <div className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs px-3 py-1 rounded-full">
                {c.cta}
              </div>
            </div>
          )) : (
            <div className="card-dark rounded-2xl p-6 text-center py-20 text-zinc-600">
              <div className="text-4xl mb-3">✍️</div>
              <p className="text-sm">Preencha o formulário para gerar as variações de copy</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
