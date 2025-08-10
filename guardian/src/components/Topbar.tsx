"use client";

import { useState } from "react";

export function Topbar() {
  const [org, setOrg] = useState("Acme Corp");
  const [env, setEnv] = useState<"Prod" | "Test">("Prod");
  const [q, setQ] = useState("");

  function onGlobalSearch(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder: route to a search page or open command bar
    alert(`Search: ${q}`);
  }

  return (
    <header className="h-16 shrink-0 border-b border-white/10 bg-surface/60 backdrop-blur flex items-center gap-3 px-4">
      <div className="lg:hidden flex items-center gap-2">
        <div className="h-8 w-8 rounded-lg bg-primary grid place-items-center text-white font-bold">G</div>
        <div className="text-base font-semibold">Guardian</div>
      </div>
      <div className="hidden sm:flex items-center gap-2">
        <select value={org} onChange={(e) => setOrg(e.target.value)} className="input">
          <option>Acme Corp</option>
          <option>SpecterIntel</option>
          <option>Northwind</option>
        </select>
        <select value={env} onChange={(e) => setEnv(e.target.value as "Prod" | "Test")} className="input">
          <option>Prod</option>
          <option>Test</option>
        </select>
      </div>

      <form onSubmit={onGlobalSearch} className="flex-1 max-w-xl">
        <input
          className="input w-full"
          placeholder="Search controls, alerts, evidence, audits… (press /)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </form>

      <div className="flex items-center gap-2">
        <button className="btn btn-muted" title="Notifications">🔔</button>
        <button className="btn btn-muted" title="Command Bar">⌘K</button>
        <div className="h-8 w-8 rounded-full bg-white/20 grid place-items-center">JD</div>
      </div>
    </header>
  );
}