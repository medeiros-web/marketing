const metrics = [
  { label: "CPC Médio", value: "—", meta: "< R$0,50", icon: "💰", ok: null },
  { label: "CTR Médio", value: "—", meta: "> 2.5%", icon: "👆", ok: null },
  { label: "ROAS", value: "—", meta: "> 3x", icon: "📈", ok: null },
  { label: "Frequência", value: "—", meta: "< 3", icon: "🔄", ok: null },
  { label: "CPL Médio", value: "—", meta: "< R$20", icon: "👥", ok: null },
  { label: "Budget Gasto", value: "R$ 0", meta: "Total hoje", icon: "💳", ok: null },
];

export default function PerformancePage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">📊 Monitor de Performance</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Métricas em tempo real de todas as campanhas ativas — atualização a cada 15 minutos
        </p>
      </div>

      <div className="mb-6 bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 text-blue-400 text-sm">
        🔗 <strong>Para ativar:</strong> Configure o Meta Ads MCP e conecte suas contas de anúncio em{" "}
        <a href="/admin/dashboard/configuracoes" className="underline">Configurações</a>.
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {metrics.map((m) => (
          <div key={m.label} className="card-dark rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <span className="text-2xl">{m.icon}</span>
              <span className="text-zinc-600 text-xs">{m.meta}</span>
            </div>
            <div className="text-3xl font-black text-zinc-600 mb-1">{m.value}</div>
            <div className="text-zinc-500 text-sm">{m.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-dark rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Campanhas Monitoradas</h2>
          <div className="text-center py-12 text-zinc-600">
            <div className="text-3xl mb-3">📡</div>
            <p className="text-sm">Nenhuma campanha conectada.</p>
            <p className="text-xs mt-1">Configure o Meta Ads MCP para iniciar o monitoramento.</p>
            <a href="/admin/dashboard/configuracoes"
              className="mt-4 inline-block text-orange-500 hover:text-orange-400 text-sm font-semibold">
              Configurar agora →
            </a>
          </div>
        </div>

        <div className="card-dark rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Log de Decisões Automáticas</h2>
          <div className="text-center py-12 text-zinc-600">
            <div className="text-3xl mb-3">🤖</div>
            <p className="text-sm">Sem decisões registradas ainda.</p>
            <p className="text-xs mt-1">O agente registrará cada otimização aqui.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
