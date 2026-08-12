"use client";
import { usePathname, useRouter } from "next/navigation";

const tools = [
  { href: "/admin/dashboard", icon: "🏠", label: "Visão Geral" },
  { href: "/admin/dashboard/criativos", icon: "🎨", label: "Gerador de Criativos" },
  { href: "/admin/dashboard/copy", icon: "✍️", label: "Gerador de Copy A/B" },
  { href: "/admin/dashboard/campanhas", icon: "🚀", label: "Campanhas Meta Ads" },
  { href: "/admin/dashboard/scraping", icon: "🔍", label: "Scraping de Landing Page" },
  { href: "/admin/dashboard/performance", icon: "📊", label: "Monitor de Performance" },
  { href: "/admin/dashboard/publicos", icon: "👥", label: "Públicos & Segmentação" },
  { href: "/admin/dashboard/alertas", icon: "🔔", label: "Alertas & Notificações" },
  { href: "/admin/dashboard/relatorios", icon: "📈", label: "Relatórios" },
  { href: "/admin/dashboard/configuracoes", icon: "⚙️", label: "Configurações" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
  }

  return (
    <aside className="w-64 bg-black border-r border-white/5 flex flex-col min-h-screen">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚡</span>
          <span className="font-bold text-white">
            Marketing<span className="text-orange-500">IA</span>
          </span>
        </div>
        <div className="mt-2 text-xs text-zinc-600">Painel Admin</div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {tools.map((t) => {
          const active =
            t.href === "/admin/dashboard"
              ? pathname === t.href
              : pathname.startsWith(t.href);
          return (
            <a
              key={t.href}
              href={t.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active
                  ? "bg-orange-500/15 text-orange-400 border border-orange-500/20"
                  : "text-zinc-500 hover:text-white hover:bg-white/5"
              }`}
            >
              <span>{t.icon}</span>
              {t.label}
            </a>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 text-xs font-bold">
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-xs font-semibold truncate">Admin</div>
            <div className="text-zinc-600 text-xs truncate">medeirosassessor</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 text-zinc-500 hover:text-red-400 text-sm transition-colors rounded-xl hover:bg-red-500/5"
        >
          🚪 Sair
        </button>
      </div>
    </aside>
  );
}
