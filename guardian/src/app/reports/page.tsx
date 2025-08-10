"use client";

import { Card } from "../../components/Card";
import { downloadJson, downloadText } from "../../lib/download";
import { frameworks, controls, evidence } from "../../lib/data";

export default function ReportsPage() {
  function exportPdf() {
    downloadText("executive-summary.pdf", "PDF content placeholder");
  }
  function exportCsv() {
    const csv = ["control_id,title,status"].concat(controls.map((c) => `${c.id},${c.title},${c.status}`)).join("\n");
    downloadText("controls.csv", csv);
  }
  function exportJson() {
    downloadJson("findings.json", { frameworks, controls, evidence });
  }

  return (
    <div className="container-page space-y-6">
      <h1 className="text-xl font-semibold">Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Executive Summary" actions={<button className="btn btn-primary" onClick={exportPdf}>Export PDF</button>}>
          <div className="text-sm text-white/70">High-level overview of compliance posture.</div>
        </Card>
        <Card title="Per-Framework Evidence Index" actions={<button className="btn btn-primary" onClick={exportCsv}>Export CSV</button>}>
          <div className="text-sm text-white/70">List of controls and mapped evidence.</div>
        </Card>
        <Card title="JSON Findings" actions={<button className="btn btn-primary" onClick={exportJson}>Export JSON</button>}>
          <div className="text-sm text-white/70">Machine-readable findings bundle.</div>
        </Card>
      </div>
      <Card title="Builder">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="space-y-1">
            <div className="text-sm">Include Sections</div>
            <select className="input" multiple>
              <option>Executive Summary</option>
              <option>Framework Posture</option>
              <option>Evidence Index</option>
              <option>Attestations</option>
            </select>
          </label>
          <label className="space-y-1">
            <div className="text-sm">Branding</div>
            <input className="input" placeholder="Company Name" />
          </label>
        </div>
      </Card>
    </div>
  );
}