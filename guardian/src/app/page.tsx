"use client";

import { Card } from "../components/Card";

import { frameworks as fw, alerts as alertsData } from "../lib/data";

export default function DashboardPage() {
  const score = Math.round(
    fw.filter((f) => f.enabled).reduce((acc, f) => acc + f.score, 0) / fw.filter((f) => f.enabled).length
  );

  return (
    <div className="container-page space-y-6">
      {/* Header Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="Overall Compliance Score">
          <div className="text-4xl font-bold">{score}%</div>
          <div className="text-white/70">Across enabled frameworks</div>
        </Card>
        <Card title="Framework Coverage">
          <div className="text-4xl font-bold">{fw.filter((f) => f.enabled).length}</div>
          <div className="text-white/70">Enabled frameworks</div>
        </Card>
        <Card title="Open Issues">
          <div className="text-4xl font-bold">12</div>
          <div className="text-white/70">Pending gaps and alerts</div>
        </Card>
        <Card title="Upcoming Deadlines">
          <div className="text-4xl font-bold">3</div>
          <div className="text-white/70">Due this month</div>
        </Card>
      </div>

      {/* Framework Posture Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card title="Framework Posture">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fw.filter((f) => f.enabled).map((f) => (
              <div key={f.id} className="card p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{f.name}</div>
                  <div className="text-sm text-white/70">{f.score}%</div>
                </div>
                <div className="text-xs text-white/70 mb-2">Last scan: {f.lastScan}</div>
                <div className="flex gap-2">
                  <a href={`/frameworks?id=${f.id}`} className="btn btn-muted">View Gaps</a>
                  <button className="btn btn-primary">Run Checks</button>
                  <button className="btn btn-muted">Upload Evidence</button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Risk Heatmap">
          <div className="aspect-square bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.2),transparent_60%),radial-gradient(circle_at_70%_30%,rgba(245,158,11,0.2),transparent_50%),radial-gradient(circle_at_30%_70%,rgba(16,185,129,0.2),transparent_50%)] rounded-lg border border-white/10" />
          <div className="text-xs text-white/70 mt-2">Likelihood × Impact</div>
        </Card>

        <Card title="Recent Alerts" actions={<a href="/alerts" className="btn btn-muted">Open Feed</a>}>
          <ul className="space-y-2">
            {alertsData.slice(0, 5).map((a) => (
              <li key={a.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{a.title}</div>
                  <div className="text-xs text-white/70">{a.source}</div>
                </div>
                <div>
                  <span className={`badge ${a.severity === "High" ? "badge-danger" : a.severity === "Medium" ? "badge-warning" : "badge-muted"}`}>{a.severity}</span>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Card title="Activity Timeline">
        <ul className="space-y-2">
          <li>AI checks completed for SOC 2 — <span className="text-white/70">Confidence 0.91</span></li>
          <li>Evidence uploaded: Access_Policy_v4.pdf — <span className="text-white/70">Pending Review</span></li>
          <li>Alert acknowledged: TLS expires in 14 days</li>
          <li>Audit milestone: Collect phase 80% complete</li>
        </ul>
      </Card>
    </div>
  );
}
