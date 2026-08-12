"use client";
import { useEffect, useState } from "react";

type Campaign = {
  id: string; name: string; status: string;
  budget: number; cpc: number | null; ctr: number | null;
  roas: number | null; frequency: number | null;
  impressions: number; clicks: number; spend: number;
  updated_at: string;
};

type Decision = {
  id: string; campaign_id: string | null; action: string;
  reason: string; old_value: number | null; new_value: number | null;
  created_at: string;
};

const ACTION_LABELS: Record<string, { label: string; color: string }> = {
  SCALE_BUDGET:     { label: "📈 Budget escalado",      color: "text-green-400" },
  PAUSE:            { label: "⏸️ Campanha pausada",      color: "text-red-400" },
  REFRESH_CREATIVE: { label: "🎨 Criativo renovado",     color: "text-yellow-400" },
  BUDGET_ALERT:     { label: "💰 Alerta de budget",      color: "text-orange-400" },
  CRON_HEARTBEAT:   { label: "🤖 Cron executado",        color: "text-zinc-500" },
};

export default function PerformancePage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState("");

  async function carregar() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/metrics");
      const json = await res.json();
      if (json.ok) {
        setCampaigns(json.campaigns);
        setDecisions(json.decisions.filter((d: Decision) => d.action !== "CRON_HEARTBEAT"));
        setLastUpdate(new Date().toLocaleTimeString("pt-BR"));
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { carregar(); }, []);

  const ativas = campaigns.filter(c => c.status === "ACTIVE");
  const avgCpc = ativas.length ? ativas.reduce((s, c) => s + (c.cpc ?? 0), 0) / ativas.length : null;
  const avgCtr = ativas.length ? ativas.reduce((s, c) => s + (c.ctr ?? 0), 0) / ativas.length : null;
  const avgRoas = ativas.length ? ativas.reduce((s, c) => s + (c.roas ?? 0), 0) / ativas.length : null;
  const avgFreq = ativas.length ? ativas.reduce((s, c) => s + (c.frequency ?? 0), 0) / ativas.length : null;
  const totalSpend = campaigns.reduce((s, c) => s + (c.spend ?? 0), 0);

  const metrics = [
    { label: "CPC Médio", value: avgCpc != null ? `R$${avgCpc.toFixed(2)}` : "—", meta: "< R$0,50", icon: "💰", ok: avgCpc != null ? avgCpc < 0.5 : null },
    { label: "CTR Médio", value: avgCtr != null ? `${avgCtr.toFixed(2)}%` : "—", meta: "> 2.5%", icon: "👆", ok: avgCtr != null ? avgCtr > 2.5 : null },
    { label: "ROAS", value: avgRoas != null ? `${avgRoas.toFixed(1)}x` : "—", meta: "> 3x", icon: "📈", ok: avgRoas != null ? avgRoas > 3 : null },
    { label: "Frequência", value: avgFreq != null ? avgFreq.toFixed(1) : "—", meta: "< 3", icon: "🔄", ok: avgFreq != null ? avgFreq < 3 : null },
    { label: "Campanhas Ativas", value: String(ativas.length), meta: `${campaigns.length} total`, icon: "🚀", ok: ativas.length > 0 },
    { label: "Total Gasto", value: `R$${totalSpend.toFixed(2)}`, meta: "Acumulado", icon: "💳", ok: null },
  ];

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">📊 Monitor de Performance</h1>
          <p className="text-zinc-500 text-sm mt-1">Dados em tempo real do Supabase — cron a cada 15 minutos via pg_cron</p>
        </div>
        <button onClick={carregar} disabled={loading}
          className="bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white font-semibold px-4 py-2 rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center gap-2">
          {loading ? "⏳" : "🔄"} {lastUpdate ? `Atualizado ${lastUpdate}` : "Atualizar"}
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {metrics.map((m) => (
          <div key={m.label} className="card-dark rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{m.icon}</span>
              <div className="flex items-center gap-2">
                {m.ok === true && <span className="w-2 h-2 rounded-full bg-green-500" />}
                {m.ok === false && <span className="w-2 h-2 rounded-full bg-red-500" />}
                <span className="text-zinc-600 text-xs">{m.meta}</span>
              </div>
            </div>
            <div className={`text-3xl font-black mb-1 ${m.ok === true ? "text-green-400" : m.ok === false ? "text-red-400" : "text-white"}`}>
              {loading ? <span className="text-zinc-700 animate-pulse">···</span> : m.value}
            </div>
            <div className="text-zinc-500 text-sm">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-dark rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Campanhas Monitoradas</h2>
          {campaigns.length === 0 ? (
            <div className="text-center py-10 text-zinc-600">
              <div className="text-3xl mb-3">📡</div>
              <p className="text-sm">Nenhuma campanha cadastrada ainda.</p>
              <a href="/admin/dashboard/campanhas" className="mt-3 inline-block text-orange-500 text-sm font-semibold">Criar campanha →</a>
            </div>
          ) : (
            <div className="space-y-3">
              {campaigns.map((c) => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <div className="text-white text-sm font-semibold">{c.name}</div>
                    <div className="text-zinc-500 text-xs mt-0.5">
                      CPC: {c.cpc != null ? `R$${c.cpc.toFixed(2)}` : "—"} · CTR: {c.ctr != null ? `${c.ctr.toFixed(2)}%` : "—"} · Gasto: R${(c.spend ?? 0).toFixed(2)}
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${c.status === "ACTIVE" ? "bg-green-500/20 text-green-400" : c.status === "PAUSED" ? "bg-zinc-700 text-zinc-400" : "bg-red-500/20 text-red-400"}`}>
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card-dark rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Log de Decisões Automáticas</h2>
          {decisions.length === 0 ? (
            <div className="text-center py-10 text-zinc-600">
              <div className="text-3xl mb-3">🤖</div>
              <p className="text-sm">Sem decisões registradas ainda.</p>
              <p className="text-xs mt-1">O agente registrará cada otimização aqui.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {decisions.map((d) => {
                const a = ACTION_LABELS[d.action] ?? { label: d.action, color: "text-zinc-400" };
                return (
                  <div key={d.id} className="py-2 border-b border-white/5 last:border-0">
                    <div className={`text-sm font-semibold ${a.color}`}>{a.label}</div>
                    <div className="text-zinc-500 text-xs mt-0.5">{d.reason}</div>
                    <div className="text-zinc-700 text-xs">{new Date(d.created_at).toLocaleString("pt-BR")}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
