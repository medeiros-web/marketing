"use client";
import { useState } from "react";

const objetivos = ["LEAD_GENERATION", "SALES", "TRAFFIC", "BRAND_AWARENESS", "APP_INSTALLS"];

type GoogleCampaign = {
  campaign: { id: string; name: string; status: string };
  metrics: { clicks: string; impressions: string; costMicros: string; ctr: number; averageCpc: string };
};

export default function CampanhasPage() {
  const [aba, setAba] = useState<"meta" | "google">("meta");
  const [form, setForm] = useState({
    adAccountId: "", pageId: "", objetivo: "LEAD_GENERATION",
    budgetDiario: "", publico: "", url: "", nomeCampanha: "",
  });
  const [payload, setPayload] = useState("");
  const [googleCamps, setGoogleCamps] = useState<GoogleCampaign[]>([]);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [googleError, setGoogleError] = useState("");

  function set(key: string, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function gerarPayload() {
    const p = {
      account_id: form.adAccountId,
      name: form.nomeCampanha || `Auto-${Date.now()}-${form.objetivo}`,
      objective: form.objetivo,
      status: "PAUSED",
      daily_budget: parseInt(form.budgetDiario) * 100,
      targeting: { geo_locations: { countries: ["BR"] }, age_min: 18, age_max: 65 },
      creative_url: form.url,
      page_id: form.pageId,
    };
    setPayload(JSON.stringify(p, null, 2));
  }

  async function carregarGoogleCamps() {
    setLoadingGoogle(true);
    setGoogleError("");
    try {
      const res = await fetch("/api/google-ads/campanhas");
      const json = await res.json();
      if (!json.ok) throw new Error(json.error);
      const rows: GoogleCampaign[] = [];
      for (const batch of json.data) {
        for (const result of batch.results ?? []) rows.push(result);
      }
      setGoogleCamps(rows);
    } catch (e: unknown) {
      setGoogleError(e instanceof Error ? e.message : "Erro ao carregar");
    } finally {
      setLoadingGoogle(false);
    }
  }

  return (
    <div className="p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">🚀 Campanhas</h1>
          <p className="text-zinc-500 text-sm mt-1">Meta Ads e Google Ads integrados</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setAba("meta")}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${aba === "meta" ? "bg-blue-600 text-white" : "bg-white/5 text-zinc-400 hover:text-white"}`}>
            📘 Meta Ads
          </button>
          <button onClick={() => { setAba("google"); carregarGoogleCamps(); }}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-colors ${aba === "google" ? "bg-yellow-500 text-black" : "bg-white/5 text-zinc-400 hover:text-white"}`}>
            🟡 Google Ads
          </button>
        </div>
      </div>

      {aba === "google" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-zinc-400 text-sm">Customer ID: <span className="text-white font-mono">291-082-5941</span></div>
            <button onClick={carregarGoogleCamps} disabled={loadingGoogle}
              className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl text-sm transition-colors disabled:opacity-50">
              {loadingGoogle ? "Carregando..." : "🔄 Atualizar"}
            </button>
          </div>
          {googleError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm">
              ⚠️ {googleError}
              {googleError.includes("developer-token") || googleError.includes("Developer Token") ? (
                <div className="mt-2 text-xs">Configure o Developer Token em <strong>Configurações → Google Ads</strong></div>
              ) : null}
            </div>
          )}
          {googleCamps.length > 0 ? (
            <div className="card-dark rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-400">
                    <th className="text-left p-4">Campanha</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-right p-4">Cliques</th>
                    <th className="text-right p-4">Impressões</th>
                    <th className="text-right p-4">CTR</th>
                    <th className="text-right p-4">CPC Médio</th>
                    <th className="text-right p-4">Gasto</th>
                  </tr>
                </thead>
                <tbody>
                  {googleCamps.map((c) => (
                    <tr key={c.campaign.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-4 text-white">{c.campaign.name}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold ${c.campaign.status === "ENABLED" ? "bg-green-500/20 text-green-400" : "bg-zinc-500/20 text-zinc-400"}`}>
                          {c.campaign.status}
                        </span>
                      </td>
                      <td className="p-4 text-right text-zinc-300">{c.metrics.clicks}</td>
                      <td className="p-4 text-right text-zinc-300">{c.metrics.impressions}</td>
                      <td className="p-4 text-right text-zinc-300">{(c.metrics.ctr * 100).toFixed(2)}%</td>
                      <td className="p-4 text-right text-zinc-300">R${(parseInt(c.metrics.averageCpc) / 1_000_000).toFixed(2)}</td>
                      <td className="p-4 text-right text-zinc-300">R${(parseInt(c.metrics.costMicros) / 1_000_000).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : !loadingGoogle && !googleError ? (
            <div className="card-dark rounded-2xl p-12 text-center text-zinc-600">
              <div className="text-4xl mb-3">🟡</div>
              <p className="text-sm">Nenhuma campanha encontrada na conta Google Ads</p>
            </div>
          ) : null}
        </div>
      )}

      {aba === "meta" && <>
      <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 text-yellow-400 text-sm">
        ⚠️ <strong>Pré-requisito:</strong> Configure o Meta Ads MCP via Claude Desktop antes de criar campanhas.
        Campanhas são sempre criadas em status <strong>PAUSED</strong> para revisão manual antes de ativar.
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card-dark rounded-2xl p-6 space-y-4">
          <h2 className="text-white font-bold">Configurar Campanha</h2>

          {[
            { key: "nomeCampanha", label: "Nome da Campanha", placeholder: "Ex: Produto X - Leads - Brasil" },
            { key: "adAccountId", label: "Ad Account ID (act_XXXXXXXXX)", placeholder: "act_123456789" },
            { key: "pageId", label: "Page ID (Facebook Page)", placeholder: "123456789" },
            { key: "budgetDiario", label: "Budget Diário (R$)", placeholder: "50" },
            { key: "url", label: "URL de Destino / Creative URL", placeholder: "https://seuproduto.com" },
          ].map((f) => (
            <div key={f.key}>
              <label className="text-zinc-400 text-sm mb-1.5 block">{f.label}</label>
              <input
                value={form[f.key as keyof typeof form]}
                onChange={(e) => set(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm"
              />
            </div>
          ))}

          <div>
            <label className="text-zinc-400 text-sm mb-1.5 block">Objetivo da Campanha</label>
            <select
              value={form.objetivo}
              onChange={(e) => set("objetivo", e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 text-sm"
            >
              {objetivos.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>

          <button
            onClick={gerarPayload}
            disabled={!form.adAccountId || !form.pageId}
            className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-40 text-white font-bold py-3 rounded-xl transition-colors"
          >
            ⚡ Gerar Payload da Campanha
          </button>
        </div>

        <div className="space-y-4">
          {payload ? (
            <div className="card-dark rounded-2xl p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-white font-bold">Payload Gerado (PAUSED)</h2>
                <button
                  onClick={() => navigator.clipboard.writeText(payload)}
                  className="text-orange-500 hover:text-orange-400 text-sm font-semibold"
                >
                  📋 Copiar
                </button>
              </div>
              <pre className="bg-zinc-900 rounded-xl p-4 text-green-400 text-xs overflow-auto max-h-80 font-mono">
                {payload}
              </pre>
              <div className="mt-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-400 text-xs">
                ✓ Campanha configurada em <strong>PAUSED</strong>. Revise no Ads Manager antes de ativar.
              </div>
            </div>
          ) : (
            <div className="card-dark rounded-2xl p-6 text-center py-20 text-zinc-600">
              <div className="text-4xl mb-3">🚀</div>
              <p className="text-sm">Preencha o formulário para gerar o payload da campanha</p>
            </div>
          )}

          <div className="card-dark rounded-2xl p-6">
            <h3 className="text-white font-bold mb-3">Regras de Otimização Automática</h3>
            <div className="space-y-2 text-sm">
              {[
                { rule: "CPC < R$0,50 + CTR > 2.5%", action: "→ +30% budget (SCALE UP)", color: "text-green-400" },
                { rule: "CTR < 1% por 48h", action: "→ Pausa a campanha", color: "text-red-400" },
                { rule: "Frequency > 3", action: "→ Renova criativo", color: "text-yellow-400" },
              ].map((r) => (
                <div key={r.rule} className="flex flex-col gap-0.5 py-2 border-b border-white/5 last:border-0">
                  <span className="text-zinc-400">{r.rule}</span>
                  <span className={`font-semibold ${r.color}`}>{r.action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      </>}
    </div>
  );
}
