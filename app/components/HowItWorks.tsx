const steps = [
  {
    num: "01",
    icon: "🔗",
    title: "Você envia o link",
    desc: "Nos manda o link da sua landing page ou produto. Nosso agente de scraping lê headlines, copy, preços e estrutura de informação automaticamente.",
  },
  {
    num: "02",
    icon: "🎨",
    title: "IA gera os criativos",
    desc: "Agentes geram prompts otimizados e criam imagens profissionais nas dimensões certas: 1x1 (feed), 9x16 (stories) e 1.91x1 (outros formatos).",
  },
  {
    num: "03",
    icon: "✍️",
    title: "Copy A/B gerada",
    desc: "O agente de copy cria variantes A/B baseadas no scraping: headline, corpo do texto e CTA alinhados com sua oferta e público.",
  },
  {
    num: "04",
    icon: "🚀",
    title: "Campanha criada em PAUSE",
    desc: "O agente cria a campanha completa no Meta Ads em estado PAUSADO para sua aprovação. Zero risco de ativar sem querer.",
  },
  {
    num: "05",
    icon: "📊",
    title: "Monitoramento a cada 15min",
    desc: "Cron automático analisa CPC, CTR e frequência. Se CTR > 2.5% e CPC < R$0,50 → aumenta budget. Se CTR < 1% → pausa. Fadiga? Renova criativo.",
  },
  {
    num: "06",
    icon: "💬",
    title: "Alertas via Telegram e WhatsApp",
    desc: "Você recebe notificações em tempo real de cada decisão: campanhas escaladas, pausadas, criativos renovados. Controle total no seu celular.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-orange-500 text-sm font-semibold tracking-widest uppercase">
            O Pipeline
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mt-2 mb-4">
            Como a agência{" "}
            <span className="gradient-text">funciona sozinha</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Do link do seu produto à campanha otimizada rodando — sem você precisar tocar em nada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div key={step.num} className="card-dark rounded-2xl p-6 group cursor-default">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-3xl">{step.icon}</span>
                <span className="text-orange-500 font-mono text-sm font-bold">{step.num}</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mt-16 card-dark rounded-2xl overflow-hidden">
          <div className="grid grid-cols-2">
            <div className="p-6 border-r border-white/5">
              <div className="text-zinc-500 font-semibold text-sm mb-4 uppercase tracking-wide">
                Gestor Tradicional
              </div>
              {[
                "Cria campanha via prompt manual",
                "Você ativa cada execução",
                "Imagem criada manualmente",
                "Sem gestão de performance",
                "1 conta, esforço dobrado",
                "Roda apenas durante horário comercial",
                "Custo: R$ 3.000–10.000/mês",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 mb-3 text-sm text-zinc-400">
                  <span className="text-red-500">✗</span> {item}
                </div>
              ))}
            </div>
            <div className="p-6 bg-orange-500/5">
              <div className="text-orange-500 font-semibold text-sm mb-4 uppercase tracking-wide">
                Agência Automática IA
              </div>
              {[
                "Cria + monitora + otimiza sozinha",
                "Cron dispara sem intervenção",
                "Pipeline de geração com IA",
                "Regras de otimização automáticas",
                "Multi-conta, escala ilimitada",
                "Roda 24 horas, 7 dias por semana",
                "Custo: plano fixo por conta",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2 mb-3 text-sm text-white">
                  <span className="text-orange-500">✓</span> {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
