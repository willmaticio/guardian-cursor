"use client";

import React, { useState } from "react";

export function Tabs({
  tabs,
  initial,
}: {
  tabs: { key: string; label: string; content: React.ReactNode }[];
  initial?: string;
}) {
  const initialKey = initial ?? tabs[0]?.key;
  const [active, setActive] = useState(initialKey);
  const activeTab = tabs.find((t) => t.key === active);
  return (
    <div className="w-full">
      <div className="flex gap-2 border-b border-white/10">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-3 py-2 text-sm rounded-t-lg ${active === t.key ? "bg-white/10" : "text-white/70 hover:text-white"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{activeTab?.content}</div>
    </div>
  );
}