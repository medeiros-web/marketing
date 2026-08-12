const services = [
  {
    icon: "📱",
    title: "Meta Ads Automático",
    desc: "Campanhas criadas, monitoradas e otimizadas por IA no Facebook e Instagram. CPC baixo, ROAS alto, zero trabalho manual.",
    tags: ["Facebook Ads", "Instagram Ads", "Reels"],
  },
  {
    icon: "🎨",
    title: "Gerador de Criativos IA",
    desc: "Imagens profissionais geradas automaticamente nas dimensões corretas: feed 1x1, stories 9x16 e banner 1.91x1. Variações A/B ilimitadas.",
    tags: ["GPT Image", "1080x1080", "1080x1920"],
    highlight: true,
  },
  {
    icon: "✍️",
    title: "Copy Automatizada",
    desc: "Textos persuasivos baseados no scraping da sua página. Headlines, corpo e CTA criados por IA e testados em múltiplas variações.",
    tags: ["A/B Testing", "Headline", "CTA"],
  },
  {
    icon: "📊",
    title: "Dashboard de Performance",
    desc: "Painel em tempo real com CPC, CTR, ROAS, frequência e budget de todas as campanhas. Decisões automáticas registradas com audit trail.",
    tags: ["Tempo Real", "Supabase", "Analytics"],
  },
  {
    icon: "🤖",
    title: "Agente de Otimização",
    desc: "Cron a cada 15 minutos analisa métricas e toma decisões: +30% budget nos winners, pausa nos losers, refresh criativo na fadiga.",
    tags: ["15min Ciclo", "Auto-Scale", "Self-Healing"],
  },
  {
    icon: "💬",
    title: "Alertas Multicanal",
    desc: "Notificações em tempo real via WhatsApp, Telegram, Instagram e Facebook Messenger. Você sempre sabe o que aconteceu.",
    tags: ["WhatsApp", "Telegram", "Messenger"],
  },
  {
    icon: "🔍",
    title: "Scraping Inteligente",
    desc: "Agente lê sua landing page e extrai headlines, copy, preços e estrutura. Alimenta toda a cadeia de criação automaticamente.",
    tags: ["Landing Page", "Headlines", "Preços"],
  },
  {
    icon: "☁️",
    title: "Armazenamento em Nuvem",
    desc: "Criativos hospedados no Supabase Storage com URLs públicas. Integração direta com Meta Ads MCP via URL assinada.",
    tags: ["Supabase", "CDN", "URL Pública"],
  },
  {
    icon: "🏢",
    title: "Multi-Tenant / White Label",
    desc: "Gerencie múltiplos clientes e Business Managers em uma plataforma. Solução white-label para agências que querem escalar.",
    tags: ["Multi-BM", "White Label", "SaaS"],
  },
];

export default function Services() {
  return (
    <section id="servicos" className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-orange-500 text-sm font-semibold tracking-widest uppercase">
            Ferramentas
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mt-2 mb-4">
            Tudo que você precisa para{" "}
            <span className="gradient-text">dominar o tráfego</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Um ecossistema completo de ferramentas de IA trabalhando em conjunto para maximizar seus resultados.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className={`card-dark rounded-2xl p-6 ${s.highlight ? "border-orange-500/30 bg-orange-500/5" : ""}`}
            >
              {s.highlight && (
                <span className="inline-block bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded mb-3">
                  MAIS POPULAR
                </span>
              )}
              <div className="text-3xl mb-4">{s.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-4">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-white/5 border border-white/10 rounded-full px-2.5 py-0.5 text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
