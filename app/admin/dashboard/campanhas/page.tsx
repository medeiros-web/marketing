"use client";
import { useState } from "react";

const objetivos = ["LEAD_GENERATION", "SALES", "TRAFFIC", "BRAND_AWARENESS", "APP_INSTALLS"];

export default function CampanhasPage() {
  const [form, setForm] = useState({
    adAccountId: "", pageId: "", objetivo: "LEAD_GENERATION",
    budgetDiario: "", publico: "", url: "", nomeCampanha: "",
  });
  const [payload, setPayload] = useState("");

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

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">🚀 Campanhas Meta Ads</h1>
        <p className="text-zinc-500 text-sm mt-1">Configure e gere o payload para criar campanhas via Meta Ads MCP</p>
      </div>

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
    </div>
  );
}
