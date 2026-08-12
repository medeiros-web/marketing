"use client";
import { useState } from "react";

const formats = [
  { id: "feed", label: "Feed 1x1", size: "1080×1080", icon: "⬛" },
  { id: "stories", label: "Stories 9x16", size: "1080×1920", icon: "📱" },
  { id: "banner", label: "Banner 1.91x1", size: "1200×628", icon: "🖥️" },
];

const styles = [
  "Profissional e corporativo",
  "Moderno e minimalista",
  "Colorido e vibrante",
  "Dark e premium",
  "Fotorrealista",
  "Ilustração vetorial",
];

export default function CriativosPage() {
  const [produto, setProduto] = useState("");
  const [publico, setPublico] = useState("");
  const [formato, setFormato] = useState("feed");
  const [estilo, setEstilo] = useState(styles[0]);
  const [extras, setExtras] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  function gerarPrompt() {
    if (!produto) return;
    setLoading(true);
    setTimeout(() => {
      const fmt = formats.find((f) => f.id === formato);
      const p = `Crie um anúncio publicitário profissional para "${produto}".
Público-alvo: ${publico || "adultos interessados no produto"}.
Estilo visual: ${estilo}.
Formato: ${fmt?.label} (${fmt?.size}px).
${extras ? `Detalhes adicionais: ${extras}.` : ""}
O criativo deve ser atraente, com call-to-action visual claro, cores que chamem atenção e transmitam confiança.
Alta qualidade, resolução ${fmt?.size}, adequado para Meta Ads (Facebook e Instagram).`;
      setPrompt(p);
      setLoading(false);
    }, 800);
  }

  function copiarPrompt() {
    navigator.clipboard.writeText(prompt);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">🎨 Gerador de Criativos IA</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Gere prompts otimizados para criar imagens de anúncios com IA (GPT Image, Midjourney, etc.)
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulário */}
        <div className="space-y-5">
          <div className="card-dark rounded-2xl p-6 space-y-4">
            <h2 className="text-white font-bold">Informações do Anúncio</h2>

            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Produto / Serviço *</label>
              <input
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
                placeholder="Ex: Curso de Marketing Digital"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm"
              />
            </div>

            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Público-alvo</label>
              <input
                value={publico}
                onChange={(e) => setPublico(e.target.value)}
                placeholder="Ex: Empreendedores 25-45 anos"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm"
              />
            </div>

            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Formato</label>
              <div className="grid grid-cols-3 gap-2">
                {formats.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFormato(f.id)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      formato === f.id
                        ? "border-orange-500 bg-orange-500/10 text-orange-400"
                        : "border-white/10 text-zinc-400 hover:border-white/30"
                    }`}
                  >
                    <div className="text-lg">{f.icon}</div>
                    <div className="text-xs font-semibold mt-1">{f.label}</div>
                    <div className="text-xs opacity-60">{f.size}</div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Estilo Visual</label>
              <select
                value={estilo}
                onChange={(e) => setEstilo(e.target.value)}
                className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 text-sm"
              >
                {styles.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Detalhes extras (opcional)</label>
              <textarea
                value={extras}
                onChange={(e) => setExtras(e.target.value)}
                placeholder="Ex: incluir logo, cor laranja, mostrar resultado antes/depois..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm resize-none"
              />
            </div>

            <button
              onClick={gerarPrompt}
              disabled={!produto || loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold py-3 rounded-xl transition-colors"
            >
              {loading ? "Gerando..." : "⚡ Gerar Prompt de Criativo"}
            </button>
          </div>
        </div>

        {/* Resultado */}
        <div className="space-y-5">
          <div className="card-dark rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-bold">Prompt Gerado</h2>
              {prompt && (
                <button
                  onClick={copiarPrompt}
                  className="text-orange-500 hover:text-orange-400 text-sm font-semibold transition-colors"
                >
                  📋 Copiar
                </button>
              )}
            </div>

            {prompt ? (
              <div className="bg-zinc-900 rounded-xl p-4 text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                {prompt}
              </div>
            ) : (
              <div className="text-center py-16 text-zinc-600">
                <div className="text-4xl mb-3">🎨</div>
                <p className="text-sm">Preencha o formulário e clique em gerar para criar o prompt do criativo</p>
              </div>
            )}
          </div>

          {prompt && (
            <div className="card-dark rounded-2xl p-6">
              <h3 className="text-white font-bold mb-3">Próximos Passos</h3>
              <ol className="space-y-2 text-sm text-zinc-400">
                <li className="flex gap-2"><span className="text-orange-500 font-bold">1.</span> Copie o prompt acima</li>
                <li className="flex gap-2"><span className="text-orange-500 font-bold">2.</span> Cole no GPT Image, Midjourney ou DALL-E</li>
                <li className="flex gap-2"><span className="text-orange-500 font-bold">3.</span> Baixe a imagem gerada</li>
                <li className="flex gap-2"><span className="text-orange-500 font-bold">4.</span> Use na campanha Meta Ads via upload</li>
              </ol>
            </div>
          )}

          <div className="card-dark rounded-2xl p-6">
            <h3 className="text-white font-bold mb-3">Variações A/B Recomendadas</h3>
            <div className="space-y-2 text-sm text-zinc-400">
              <div className="flex gap-2"><span className="text-orange-500">→</span> Gere 3 versões com estilos diferentes</div>
              <div className="flex gap-2"><span className="text-orange-500">→</span> Teste fundo escuro vs claro</div>
              <div className="flex gap-2"><span className="text-orange-500">→</span> Versão com e sem texto na imagem</div>
              <div className="flex gap-2"><span className="text-orange-500">→</span> Uma com pessoa, uma sem pessoa</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
