"use client";
import { useState } from "react";

export default function AlertasPage() {
  const [whatsapp, setWhatsapp] = useState("");
  const [telegram, setTelegram] = useState("");
  const [email, setEmail] = useState("");
  const [saved, setSaved] = useState(false);

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  const alertTypes = [
    { icon: "📈", label: "Campanha escalada (+budget)", defaultOn: true },
    { icon: "⏸️", label: "Campanha pausada (CTR baixo)", defaultOn: true },
    { icon: "🎨", label: "Criativo renovado (frequência alta)", defaultOn: true },
    { icon: "💰", label: "Budget quase esgotado (80%)", defaultOn: true },
    { icon: "🚨", label: "Campanha com erro", defaultOn: true },
    { icon: "📊", label: "Relatório diário de performance", defaultOn: false },
    { icon: "👥", label: "Novo lead capturado", defaultOn: false },
    { icon: "⚙️", label: "Status do sistema (uptime)", defaultOn: false },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">🔔 Alertas & Notificações</h1>
        <p className="text-zinc-500 text-sm mt-1">Configure onde e quando receber notificações das campanhas</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={salvar} className="card-dark rounded-2xl p-6 space-y-5">
          <h2 className="text-white font-bold">Canais de Notificação</h2>

          <div>
            <label className="text-zinc-400 text-sm mb-1.5 flex items-center gap-2">
              <span className="text-green-400">📱</span> WhatsApp (número com DDD)
            </label>
            <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="5511999999999"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm" />
          </div>

          <div>
            <label className="text-zinc-400 text-sm mb-1.5 flex items-center gap-2">
              <span className="text-sky-400">✈️</span> Telegram (chat ID ou @username)
            </label>
            <input value={telegram} onChange={(e) => setTelegram(e.target.value)}
              placeholder="@seunome ou 123456789"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm" />
          </div>

          <div>
            <label className="text-zinc-400 text-sm mb-1.5 flex items-center gap-2">
              <span className="text-orange-400">📧</span> E-mail
            </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}
              type="email" placeholder="seuemail@gmail.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm" />
          </div>

          <button type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors">
            {saved ? "✓ Salvo!" : "Salvar Configurações"}
          </button>
        </form>

        <div className="card-dark rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4">Tipos de Alerta</h2>
          <div className="space-y-3">
            {alertTypes.map((a) => (
              <div key={a.label} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-2 text-sm text-zinc-300">
                  <span>{a.icon}</span> {a.label}
                </div>
                <div className={`w-10 h-5 rounded-full flex items-center px-0.5 transition-colors cursor-pointer ${a.defaultOn ? "bg-orange-500" : "bg-zinc-700"}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${a.defaultOn ? "translate-x-5" : ""}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
