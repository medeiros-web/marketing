const stats = [
  { label: "Campanhas Ativas", value: "0", icon: "🚀", color: "text-orange-400" },
  { label: "Criativos Gerados", value: "0", icon: "🎨", color: "text-pink-400" },
  { label: "Leads Capturados", value: "0", icon: "👥", color: "text-blue-400" },
  { label: "ROAS Médio", value: "—", icon: "📈", color: "text-green-400" },
];

const quickTools = [
  { href: "/admin/dashboard/criativos", icon: "🎨", title: "Gerar Criativo", desc: "Crie imagens para anúncios com IA" },
  { href: "/admin/dashboard/copy", icon: "✍️", title: "Gerar Copy", desc: "Headlines e textos A/B automáticos" },
  { href: "/admin/dashboard/scraping", icon: "🔍", title: "Analisar Página", desc: "Scraping de landing page" },
  { href: "/admin/dashboard/campanhas", icon: "🚀", title: "Nova Campanha", desc: "Criar campanha no Meta Ads" },
  { href: "/admin/dashboard/performance", icon: "📊", title: "Performance", desc: "Monitorar métricas em tempo real" },
  { href: "/admin/dashboard/relatorios", icon: "📈", title: "Relatórios", desc: "Gerar relatório completo" },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Visão Geral</h1>
        <p className="text-zinc-500 text-sm mt-1">Bem-vindo ao painel de controle da agência automática.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="card-dark rounded-2xl p-5">
            <div className="text-2xl mb-2">{s.icon}</div>
            <div className={`text-3xl font-black ${s.color}`}>{s.value}</div>
            <div className="text-zinc-500 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <h2 className="text-white font-bold text-lg mb-4">Acesso Rápido às Ferramentas</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {quickTools.map((t) => (
          <a
            key={t.href}
            href={t.href}
            className="card-dark rounded-2xl p-5 hover:border-orange-500/30 transition-all group"
          >
            <div className="text-3xl mb-3">{t.icon}</div>
            <div className="text-white font-semibold group-hover:text-orange-400 transition-colors">{t.title}</div>
            <div className="text-zinc-500 text-sm mt-1">{t.desc}</div>
          </a>
        ))}
      </div>

      {/* System status */}
      <div className="card-dark rounded-2xl p-6">
        <h3 className="text-white font-bold mb-4">Status do Sistema</h3>
        <div className="space-y-3">
          {[
            { name: "Meta Ads MCP", status: "Configurar", color: "text-yellow-400", dot: "bg-yellow-400" },
            { name: "Supabase Storage", status: "Configurar", color: "text-yellow-400", dot: "bg-yellow-400" },
            { name: "Gerador de Imagens IA", status: "Configurar API Key", color: "text-yellow-400", dot: "bg-yellow-400" },
            { name: "Alertas WhatsApp", status: "Configurar", color: "text-yellow-400", dot: "bg-yellow-400" },
            { name: "Cron de Monitoramento", status: "Inativo", color: "text-zinc-500", dot: "bg-zinc-600" },
          ].map((item) => (
            <div key={item.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
              <span className="text-zinc-300 text-sm">{item.name}</span>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${item.dot}`} />
                <span className={`text-xs ${item.color}`}>{item.status}</span>
              </div>
            </div>
          ))}
        </div>
        <a
          href="/admin/dashboard/configuracoes"
          className="mt-4 inline-block text-orange-500 hover:text-orange-400 text-sm font-semibold transition-colors"
        >
          Ir para Configurações →
        </a>
      </div>
    </div>
  );
}
