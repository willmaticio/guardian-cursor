"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Dashboard", icon: "📊" },
  { href: "/frameworks", label: "Frameworks", icon: "🧩" },
  { href: "/monitors", label: "Monitors", icon: "🛰️" },
  { href: "/audits", label: "Audits", icon: "🧪" },
  { href: "/evidence", label: "Evidence", icon: "📁" },
  { href: "/alerts", label: "Alerts", icon: "🚨" },
  { href: "/reports", label: "Reports", icon: "📄" },
  { href: "/integrations", label: "Integrations", icon: "🔌" },
  { href: "/settings", label: "Team & Settings", icon: "⚙️" },
  { href: "/help", label: "Help", icon: "❓" },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <>
      <aside className="hidden lg:flex w-64 shrink-0 flex-col border-r border-white/10 bg-surface/80 backdrop-blur">
        <div className="h-16 flex items-center gap-2 px-4 border-b border-white/10">
          <div className="h-8 w-8 rounded-lg bg-primary grid place-items-center text-white font-bold">G</div>
          <div className="text-lg font-semibold">Guardian</div>
        </div>
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  active ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5"
                }`}
              >
                <span className="text-lg leading-none">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-3 text-xs text-white/50">Guardian — AI + Human Compliance</div>
      </aside>

      {/* Mobile bottom tab bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-surface/95 backdrop-blur border-t border-white/10 grid grid-cols-5 z-40">
        {nav.slice(0, 5).map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} className={`px-2 py-2 text-center text-xs ${active ? "text-white" : "text-white/70"}`}>
              <div>{item.icon}</div>
              <div className="truncate">{item.label.split(" ")[0]}</div>
            </Link>
          );
        })}
      </nav>
    </>
  );
}