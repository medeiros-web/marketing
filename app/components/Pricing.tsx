const plans = [
  {
    name: "Starter",
    price: "R$ 997",
    period: "/mês",
    desc: "Para negócios começando a automatizar",
    features: [
      "1 conta de anúncio",
      "Até 5 campanhas ativas",
      "Geração de criativos (20/mês)",
      "Monitoramento a cada 1h",
      "Alertas via WhatsApp",
      "Dashboard básico",
    ],
    cta: "Começar Agora",
    highlight: false,
  },
  {
    name: "Pro",
    price: "R$ 1.997",
    period: "/mês",
    desc: "Para negócios que querem escalar rápido",
    features: [
      "3 contas de anúncio",
      "Campanhas ilimitadas",
      "Geração de criativos (100/mês)",
      "Monitoramento a cada 15min",
      "Alertas via WhatsApp + Telegram",
      "Dashboard avançado + relatórios",
      "Copy A/B automático",
      "Suporte prioritário",
    ],
    cta: "Quero o Pro",
    highlight: true,
  },
  {
    name: "Agency",
    price: "R$ 4.997",
    period: "/mês",
    desc: "Para agências gerenciando múltiplos clientes",
    features: [
      "Business Managers ilimitados",
      "Clientes ilimitados (multi-tenant)",
      "Criativos ilimitados",
      "Monitoramento em tempo real",
      "Alertas multicanal completos",
      "White label (sua marca)",
      "API de integração",
      "Gerente de conta dedicado",
    ],
    cta: "Falar com Comercial",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="precos" className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-orange-500 text-sm font-semibold tracking-widest uppercase">
            Planos
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mt-2 mb-4">
            Margem de software,{" "}
            <span className="gradient-text">não de serviço</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Substitua um gestor de tráfego de R$ 5–10k/mês por automação inteligente por uma fração do custo.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? "bg-orange-500/10 border-2 border-orange-500 relative"
                  : "card-dark"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full">
                  MAIS ESCOLHIDO
                </div>
              )}
              <div className="mb-6">
                <div className="text-zinc-400 text-sm mb-1">{plan.name}</div>
                <div className="text-4xl font-black text-white">
                  {plan.price}
                  <span className="text-xl text-zinc-500">{plan.period}</span>
                </div>
                <div className="text-zinc-500 text-sm mt-2">{plan.desc}</div>
              </div>

              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="text-orange-500 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full text-center font-bold py-3 px-6 rounded-xl transition-all ${
                  plan.highlight
                    ? "bg-orange-500 hover:bg-orange-600 text-white"
                    : "border border-white/20 hover:border-orange-500/50 hover:bg-white/5 text-white"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-500 text-sm mt-8">
          Não tem certeza? Fale com a gente e montamos um plano sob medida para o seu negócio.
        </p>
      </div>
    </section>
  );
}
