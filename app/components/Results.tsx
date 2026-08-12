const metrics = [
  { value: "–62%", label: "Redução no CPC médio", detail: "Comparado à gestão manual" },
  { value: "+280%", label: "Aumento de ROAS", detail: "Em até 30 dias de otimização" },
  { value: "4–8h", label: "Economizadas por dia", detail: "Que gestores gastam manualmente" },
  { value: "∞", label: "Escala horizontal", detail: "Sem aumentar custo operacional" },
];

const cases = [
  {
    niche: "E-commerce de Moda",
    result: "CPC de R$2,30 → R$0,48 em 15 dias",
    roas: "ROAS 4.2x",
    badge: "🛍️",
  },
  {
    niche: "Infoproduto / Curso Online",
    result: "600 leads/mês → 2.400 leads/mês mesmo budget",
    roas: "CPL –73%",
    badge: "🎓",
  },
  {
    niche: "Clínica de Estética",
    result: "40 agendamentos/semana sem gestor humano",
    roas: "ROI 8x",
    badge: "✨",
  },
];

export default function Results() {
  return (
    <section id="resultados" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-orange-500 text-sm font-semibold tracking-widest uppercase">
            Resultados
          </span>
          <h2 className="text-3xl sm:text-5xl font-black mt-2 mb-4">
            Números que <span className="gradient-text">provam o resultado</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            A IA não descansa. Por isso os resultados são consistentes e crescentes.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((m) => (
            <div key={m.label} className="card-dark rounded-2xl p-6 text-center">
              <div className="text-4xl font-black gradient-text mb-2">{m.value}</div>
              <div className="text-white font-semibold text-sm mb-1">{m.label}</div>
              <div className="text-zinc-500 text-xs">{m.detail}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((c) => (
            <div key={c.niche} className="card-dark rounded-2xl p-6">
              <div className="text-4xl mb-4">{c.badge}</div>
              <div className="text-orange-400 text-sm font-semibold mb-2">{c.niche}</div>
              <div className="text-white font-bold text-lg mb-2">{c.result}</div>
              <div className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold px-3 py-1 rounded-full">
                {c.roas}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
