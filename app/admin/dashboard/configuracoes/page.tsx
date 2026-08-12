"use client";
import { useState } from "react";

export default function ConfiguracoesPage() {
  const [saved, setSaved] = useState(false);

  function salvar(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">⚙️ Configurações</h1>
        <p className="text-zinc-500 text-sm mt-1">Configure as integrações e APIs da agência automática</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={salvar} className="space-y-6">
          {/* Meta Ads */}
          <div className="card-dark rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-blue-400 text-xl">📘</span>
              <h2 className="text-white font-bold">Meta Ads MCP</h2>
            </div>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-3 text-yellow-400 text-xs">
              Configure via Claude Desktop → Customize → Connectors → Meta Ads MCP
            </div>
            {[
              { label: "Ad Account ID Padrão", placeholder: "act_123456789", type: "text" },
              { label: "Facebook Page ID", placeholder: "123456789", type: "text" },
              { label: "Business Manager ID", placeholder: "987654321", type: "text" },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-zinc-400 text-sm mb-1.5 block">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm" />
              </div>
            ))}
          </div>

          {/* OpenAI */}
          <div className="card-dark rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-green-400 text-xl">🤖</span>
              <h2 className="text-white font-bold">OpenAI (Geração de Imagens)</h2>
            </div>
            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">API Key</label>
              <input type="password" placeholder="sk-proj-..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm" />
            </div>
            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Modelo de imagem</label>
              <select className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm">
                <option>gpt-image-1</option>
                <option>dall-e-3</option>
              </select>
            </div>
          </div>

          {/* Supabase */}
          <div className="card-dark rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-emerald-400 text-xl">🗄️</span>
              <h2 className="text-white font-bold">Supabase (DB + Storage)</h2>
            </div>
            {[
              { label: "Supabase URL", placeholder: "https://xxxxx.supabase.co", type: "text" },
              { label: "Anon Key", placeholder: "eyJhbGc...", type: "password" },
              { label: "Service Role Key", placeholder: "eyJhbGc...", type: "password" },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-zinc-400 text-sm mb-1.5 block">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm" />
              </div>
            ))}
          </div>

          {/* Google Ads */}
          <div className="card-dark rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-yellow-400 text-xl">🟡</span>
              <h2 className="text-white font-bold">Google Ads</h2>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 text-blue-300 text-xs space-y-1">
              <div className="font-semibold">Como obter as credenciais:</div>
              <div>1. <span className="text-white">Customer ID</span> → ads.google.com → canto superior direito (xxx-xxx-xxxx)</div>
              <div>2. <span className="text-white">Developer Token</span> → ads.google.com → Ferramentas → API Center</div>
              <div>3. <span className="text-white">Client ID/Secret</span> → console.cloud.google.com → APIs → Credenciais → OAuth 2.0</div>
            </div>
            {[
              { label: "Conta Google vinculada", placeholder: "medeirosassessor.adv@gmail.com", type: "email" },
              { label: "Customer ID", placeholder: "291-082-5941", type: "text" },
              { label: "Developer Token", placeholder: "ABcDeFgHiJkLmN...", type: "password" },
              { label: "Client ID (OAuth)", placeholder: "123456789-abc...apps.googleusercontent.com", type: "text" },
              { label: "Client Secret (OAuth)", placeholder: "GOCSPX-...", type: "password" },
              { label: "Refresh Token", placeholder: "1//0e...", type: "password" },
            ].map((f) => (
              <div key={f.label}>
                <label className="text-zinc-400 text-sm mb-1.5 block">{f.label}</label>
                <input type={f.type} placeholder={f.placeholder}
                  defaultValue={f.type === "email" ? "medeirosassessor.adv@gmail.com" : ""}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm" />
              </div>
            ))}
          </div>

          {/* Cron */}
          <div className="card-dark rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-purple-400 text-xl">⏱️</span>
              <h2 className="text-white font-bold">Cron de Monitoramento</h2>
            </div>
            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">CRON_SECRET (segurança do endpoint)</label>
              <input type="password" placeholder="Chave secreta do cron"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500/50 text-sm" />
            </div>
            <div>
              <label className="text-zinc-400 text-sm mb-1.5 block">Frequência</label>
              <select className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white text-sm">
                <option value="*/15 * * * *">A cada 15 minutos</option>
                <option value="0 * * * *">A cada hora</option>
                <option value="0 */6 * * *">A cada 6 horas</option>
              </select>
            </div>
          </div>

          <button type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors text-lg">
            {saved ? "✓ Configurações Salvas!" : "💾 Salvar Todas as Configurações"}
          </button>
        </form>

        <div className="space-y-6">
          <div className="card-dark rounded-2xl p-6">
            <h3 className="text-white font-bold mb-4">Checklist de Configuração</h3>
            <div className="space-y-3">
              {[
                { label: "Meta Ads MCP configurado no Claude Desktop", done: false },
                { label: "Ad Account ID informado", done: false },
                { label: "Google Ads Customer ID informado", done: false },
                { label: "Google Ads Developer Token configurado", done: false },
                { label: "Google Ads OAuth (Client ID + Secret + Refresh Token)", done: false },
                { label: "OpenAI API Key configurada", done: false },
                { label: "Supabase conectado", done: true },
                { label: "Cron de monitoramento ativo (pg_cron 15min)", done: true },
                { label: "Alertas WhatsApp/Telegram ativos", done: false },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${item.done ? "border-green-500 bg-green-500" : "border-zinc-600"}`}>
                    {item.done && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`text-sm ${item.done ? "text-zinc-300" : "text-zinc-500"}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-dark rounded-2xl p-6">
            <h3 className="text-white font-bold mb-3">Guia Rápido</h3>
            <div className="space-y-3 text-sm text-zinc-400">
              <div>
                <div className="text-orange-400 font-semibold mb-1">1. Meta Ads MCP</div>
                <p>Claude Desktop → Customize → Connectors → Adicionar Meta Ads MCP → Vincular conta</p>
              </div>
              <div>
                <div className="text-orange-400 font-semibold mb-1">2. Supabase</div>
                <p>supabase.com → New Project → Connect → API Keys (Legacy) → Copiar keys</p>
              </div>
              <div>
                <div className="text-orange-400 font-semibold mb-1">3. Google Ads</div>
                <p>ads.google.com → Ferramentas → API Center → Developer Token → console.cloud.google.com para OAuth</p>
              </div>
              <div>
                <div className="text-orange-400 font-semibold mb-1">4. OpenAI</div>
                <p>platform.openai.com → API Keys → Create new key → Copiar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
