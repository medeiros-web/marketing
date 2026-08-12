"use client";

export default function RelatoriosPage() {
  function baixarCSV() {
    const csv = `Campanha,CPC,CTR,ROAS,Budget Gasto,Leads,Status\nSem dados ainda,—,—,—,R$ 0,0,Aguardando conexão`;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-white">📈 Relatórios</h1>
          <p className="text-zinc-500 text-sm mt-1">Gere relatórios completos de performance das suas campanhas</p>
        </div>
        <button onClick={baixarCSV}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
          ⬇️ Exportar CSV
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {["Hoje", "Últimos 7 dias", "Últimos 30 dias"].map((p) => (
          <button key={p}
            className={`card-dark rounded-xl py-3 text-sm font-semibold transition-all ${p === "Últimos 7 dias" ? "border-orange-500/50 text-orange-400 bg-orange-500/5" : "text-zinc-400 hover:text-white"}`}>
            {p}
          </button>
        ))}
      </div>

      <div className="card-dark rounded-2xl p-8 text-center">
        <div className="text-4xl mb-4">📊</div>
        <h2 className="text-white font-bold text-lg mb-2">Sem dados de campanhas ainda</h2>
        <p className="text-zinc-500 text-sm mb-6 max-w-md mx-auto">
          Conecte suas contas Meta Ads para começar a ver relatórios detalhados de CPC, CTR, ROAS, leads e conversões.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href="/admin/dashboard/configuracoes"
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors">
            ⚙️ Configurar Meta Ads
          </a>
          <a href="/admin/dashboard/campanhas"
            className="border border-white/20 hover:border-orange-500/50 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors">
            🚀 Criar Primeira Campanha
          </a>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="card-dark rounded-2xl p-6">
          <h3 className="text-white font-bold mb-3">Métricas que serão exibidas</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            {["CPC (Custo por Clique)", "CTR (Taxa de Cliques)", "ROAS (Retorno sobre Ad Spend)", "CPL (Custo por Lead)",
              "Impressões e Alcance", "Frequência", "Budget gasto x restante", "Decisões do agente de otimização"].map((m) => (
              <li key={m} className="flex gap-2"><span className="text-orange-500">•</span> {m}</li>
            ))}
          </ul>
        </div>
        <div className="card-dark rounded-2xl p-6">
          <h3 className="text-white font-bold mb-3">Formatos de exportação</h3>
          <ul className="space-y-2 text-sm text-zinc-400">
            {["CSV para Excel / Google Sheets", "PDF executivo (em breve)", "Compartilhamento por link (em breve)",
              "Envio automático por e-mail (em breve)", "Relatório por WhatsApp (em breve)"].map((f) => (
              <li key={f} className="flex gap-2"><span className="text-orange-500">•</span> {f}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
