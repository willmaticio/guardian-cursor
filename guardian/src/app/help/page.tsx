"use client";

import { useMemo, useState } from "react";
import { Card } from "../../components/Card";

const docs = [
  { id: "tls", title: "Set up TLS monitoring", content: "Use TLS monitors to track certificate expiry and chain." },
  { id: "soc2", title: "Prepare for SOC 2 audit", content: "Collect evidence for CC series controls and map policies." },
  { id: "hipaa", title: "HIPAA risk analysis", content: "Identify threats and vulnerabilities to ePHI." },
];

export default function HelpPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => (q ? docs.filter((d) => (d.title + d.content).toLowerCase().includes(q.toLowerCase())) : docs), [q]);

  return (
    <div className="container-page space-y-6">
      <h1 className="text-xl font-semibold">Help / Compliance Library</h1>
      <input className="input w-full" placeholder="Search guides and playbooks…" value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((d) => (
          <Card key={d.id} title={d.title}>
            <div className="text-sm text-white/70">{d.content}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}