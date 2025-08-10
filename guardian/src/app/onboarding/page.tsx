"use client";

import { useState } from "react";
import { Card } from "../../components/Card";
import { Tabs } from "../../components/Tabs";
import { integrationsCatalog, frameworks as fw } from "../../lib/data";

export default function OnboardingPage() {
  const [industry, setIndustry] = useState("Finance");
  const [selectedFrameworks, setSelectedFrameworks] = useState<string[]>(["soc2", "iso27001"]);
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>(["aws"]);
  const [monitors, setMonitors] = useState([{ type: "TLS", target: "example.com" }]);
  const baseline = 72;

  return (
    <div className="container-page space-y-6">
      <h1 className="text-xl font-semibold">Onboarding</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="Select Industry">
          <select className="input" value={industry} onChange={(e) => setIndustry(e.target.value)}>
            <option>Finance</option>
            <option>Healthcare</option>
            <option>Education</option>
            <option>Accounting</option>
            <option>Law</option>
          </select>
        </Card>
        <Card title="Recommended Frameworks">
          <div className="space-y-2">
            {fw.map((f) => (
              <label key={f.id} className="flex items-center justify-between p-2 rounded hover:bg-white/5">
                <div className="font-medium">{f.name}</div>
                <input type="checkbox" checked={selectedFrameworks.includes(f.id)} onChange={(e) => {
                  setSelectedFrameworks((prev) => e.target.checked ? [...prev, f.id] : prev.filter((x) => x !== f.id));
                }} />
              </label>
            ))}
          </div>
        </Card>
        <Card title="Connect Integrations">
          <div className="space-y-2">
            {integrationsCatalog.map((i) => (
              <label key={i.id} className="flex items-center justify-between p-2 rounded hover:bg-white/5">
                <div>{i.name}</div>
                <input type="checkbox" checked={selectedIntegrations.includes(i.id)} onChange={(e) => {
                  setSelectedIntegrations((prev) => e.target.checked ? [...prev, i.id] : prev.filter((x) => x !== i.id));
                }} />
              </label>
            ))}
          </div>
        </Card>
        <Card title="Create First Monitors">
          <div className="space-y-2">
            {monitors.map((m, idx) => (
              <div key={idx} className="grid grid-cols-2 gap-2">
                <input className="input" defaultValue={m.type} />
                <input className="input" defaultValue={m.target} />
              </div>
            ))}
            <button className="btn btn-muted" onClick={() => setMonitors((prev) => [...prev, { type: "TLS", target: "api.example.com" }])}>Add Monitor</button>
          </div>
        </Card>
      </div>

      <Card title="Run Initial AI Checks">
        <div className="flex items-center gap-3">
          <button className="btn btn-primary">Run AI Checks</button>
          <div className="text-sm text-white/70">Baseline score will appear below.</div>
        </div>
        <div className="mt-3 text-4xl font-bold">{baseline}%</div>
      </Card>
    </div>
  );
}