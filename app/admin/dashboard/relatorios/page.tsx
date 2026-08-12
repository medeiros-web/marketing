"use client";
import { useEffect, useState } from "react";

type Campaign = {
  id: string; name: string; status: string;
  budget: number; cpc: number | null; ctr: number | null;
  roas: number | null; impressions: number; clicks: number; spend: number;
  updated_at: string;
};

type Decision = {
  id: string; campaign_id: string | null; action: string; reason: string; created_at: string;
};

const PERIODOS = ["Hoje", "Últimos 7 dias", "Últimos 30 dias"];

export default function RelatoriosPage() {
  const [periodo, setPeriodo] = useState("Últimos 7 dias");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/metrics").then(r => r.json()).then(json => {
      if (json.ok) { setCampaigns(json.campaigns); setDecisions(json.decisions); }
    }).finally(() => setLoading(false));
  }, []);

  function baixarCSV() {
    const header = "Campanha,Status,Budget (R$),CPC (R$),CTR (%),ROAS,Impressões,Cliques,Gasto (R$)";
    const rows = campaigns.map(c =>
      `"${c.name}",${c.status},${c.budget},${c.cpc ?? ""},${c.ctr ?? ""},${c.roas ?? ""},${c.impressions},${c.clicks},${c.spend}`
    );
    const decisionsHeader = "\n\nDecisões Automáticas\nAção,Motivo,Data";
    const decisionRows = decisions.filter(d => d.action !== "CRON_HEARTBEAT").map(d =>
      `"${d.action}","${d.reason}","${new Date(d.created_at).toLocaleString("pt-BR")}"`
    );
    const csv = [header, ...rows, decisionsHeader, decisionsHeader, ...decisionRows].join("\n");
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url;
    a.download = `relatorio_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  }

  const totalSpend = campaigns.reduce((s, c) => s + (c.spend ?? 0), 0);
  const totalClicks = campaigns.reduce((s, c) => s + (c.clicks ?? 0), 0);
  const totalImpressions = campaigns.reduce((s, c) => s + (c.impressions ?? 0), 0);
  const avgCtr = campaigns.length ? campaigns.reduce((s, c) => s + (c.ctr ?? 0), 0) / campaigns.length : 0;
  const avgCpc = campaigns.length ? campaigns.reduce((s, c) => s + (c.cpc ?? 0), 0) / campaigns.length : 0;

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">📈 Relatórios</h1>
          <p className="text-zinc-500 text-sm mt-1">Performance consolidada de todas as campanhas</p>
        </div>
        <button onClick={baixarCSV}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
          ⬇️ Exportar CSV
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {PERIODOS.map((p) => (
          <button key={p} onClick={() => setPeriodo(p)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${periodo === p ? "bg-orange-500 text-white" : "card-dark text-zinc-400 hover:text-white"}`}>
            {p}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Gasto Total", value: loading ? "···" : `R$${totalSpend.toFixed(2)}`, icon: "💳" },
          { label: "Cliques", value: loading ? "···" : totalClicks.toLocaleString("pt-BR"), icon: "👆" },
          { label: "Impressões", value: loading ? "···" : totalImpressions.toLocaleString("pt-BR"), icon: "👁️" },
          { label: "CTR Médio", value: loading ? "···" : `${avgCtr.toFixed(2)}%`, icon: "📊" },
          { label: "CPC Médio", value: loading ? "···" : `R$${avgCpc.toFixed(2)}`, icon: "💰" },
        ].map((s) => (
          <div key={s.label} className="card-dark rounded-2xl p-4 text-center">
            <div className="text-xl mb-1">{s.icon}</div>
            <div className="text-white font-black text-lg">{s.value}</div>
            <div className="text-zinc-500 text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {campaigns.length === 0 && !loading ? (
        <div className="card-dark rounded-2xl p-12 text-center">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-white font-bold text-lg mb-2">Sem dados de campanhas ainda</h2>
          <p className="text-zinc-500 text-sm mb-6 max-w-md mx-auto">
            Crie campanhas e conecte suas contas para ver relatórios detalhados.
          </p>
          <a href="/admin/dashboard/campanhas"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors inline-block">
            🚀 Criar Primeira Campanha
          </a>
        </div>
      ) : (
        <div className="card-dark rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-white font-bold">Campanhas — {periodo}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-zinc-400">
                  <th className="text-left p-4">Campanha</th>
                  <th className="text-left p-4">Status</th>
                  <th className="text-right p-4">Budget</th>
                  <th className="text-right p-4">Gasto</th>
                  <th className="text-right p-4">Cliques</th>
                  <th className="text-right p-4">CTR</th>
                  <th className="text-right p-4">CPC</th>
                  <th className="text-right p-4">ROAS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={8} className="text-center py-8 text-zinc-600">Carregando...</td></tr>
                ) : campaigns.map((c) => (
                  <tr key={c.id} className="border-b border-white/5 hover:bg-white/5">
                    <td className="p-4 text-white font-medium">{c.name}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded-lg text-xs font-bold ${c.status === "ACTIVE" ? "bg-green-500/20 text-green-400" : "bg-zinc-700 text-zinc-400"}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4 text-right text-zinc-300">R${c.budget.toFixed(2)}</td>
                    <td className="p-4 text-right text-zinc-300">R${(c.spend ?? 0).toFixed(2)}</td>
                    <td className="p-4 text-right text-zinc-300">{c.clicks.toLocaleString("pt-BR")}</td>
                    <td className="p-4 text-right text-zinc-300">{c.ctr != null ? `${c.ctr.toFixed(2)}%` : "—"}</td>
                    <td className="p-4 text-right text-zinc-300">{c.cpc != null ? `R$${c.cpc.toFixed(2)}` : "—"}</td>
                    <td className="p-4 text-right text-zinc-300">{c.roas != null ? `${c.roas.toFixed(1)}x` : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
