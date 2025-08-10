"use client";

import { useMemo, useState } from "react";
import { Card } from "../../components/Card";
import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { Tabs } from "../../components/Tabs";

import { controls as controlsData, frameworks as frameworksData } from "../../lib/data";
import { Control } from "../../lib/types";

export default function FrameworksPage() {
  const [industry, setIndustry] = useState("All");
  const [selectedFramework, setSelectedFramework] = useState<string | null>("hipaa");
  const [openControl, setOpenControl] = useState<Control | null>(null);

  const frameworks = frameworksData;

  const selected = useMemo(() => frameworks.find((f) => f.id === selectedFramework) ?? frameworks.find((f) => f.enabled) ?? frameworks[0], [frameworks, selectedFramework]);
  const controls = controlsData;

  return (
    <div className="container-page space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4">
        <div className="space-y-4">
          <Card title="Framework Selector">
            <div className="space-y-2">
              <select className="input w-full" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                <option>All</option>
                <option>Healthcare</option>
                <option>Finance</option>
                <option>Education</option>
                <option>Accounting</option>
                <option>Law</option>
              </select>
              <div className="space-y-1">
                {frameworks.map((f) => (
                  <button key={f.id} className={`w-full text-left px-3 py-2 rounded-lg ${selected?.id === f.id ? "bg-white/10" : "hover:bg-white/5"}`} onClick={() => setSelectedFramework(f.id)}>
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{f.name}</div>
                      <div className="text-xs text-white/70">{f.enabled ? `${f.score}%` : "Disabled"}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </Card>
          <Card title="Bulk Actions">
            <div className="flex flex-wrap gap-2">
              <button className="btn btn-muted">Assign Owner</button>
              <button className="btn btn-muted">Set Due Date</button>
              <button className="btn btn-primary">Run AI Checks</button>
              <button className="btn btn-muted">Request Evidence</button>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card title={`${selected?.name} Details`}>
            <Tabs
              tabs={[
                {
                  key: "controls",
                  label: "Controls",
                  content: (
                    <Table<Control>
                      data={controls}
                      rowKey={(r) => r.id}
                      filterPlaceholder="Filter controls…"
                      columns={[
                        { key: "id", header: "ID" },
                        { key: "title", header: "Title" },
                        {
                          key: "status",
                          header: "Status",
                          render: (r) => (
                            <div className="flex items-center gap-2">
                              <span>{r.status}</span>
                              {r.aiConfidence != null && (
                                <span className="text-xs text-white/70">AI {Math.round(r.aiConfidence * 100)}%</span>
                              )}
                            </div>
                          ),
                        },
                        { key: "owner", header: "Owner" },
                        { key: "due", header: "Due Date" },
                        {
                          key: "actions",
                          header: "",
                          render: (r) => (
                            <div className="flex gap-2 justify-end">
                              <button className="btn btn-muted" onClick={() => setOpenControl(r)}>View</button>
                              <button className="btn btn-primary">Approve</button>
                            </div>
                          ),
                        },
                      ]}
                    />
                  ),
                },
                { key: "tests", label: "Tests", content: <Empty label="No tests defined. Use Run AI Checks to auto-generate." /> },
                { key: "gaps", label: "Gaps", content: <Empty label="No open gaps. Great job!" /> },
                { key: "policies", label: "Policies", content: <Empty label="Upload policy documents to map to controls." /> },
                { key: "evidence", label: "Mapped Evidence", content: <Empty label="No evidence mapped yet. Use Map Evidence." /> },
                { key: "reports", label: "Reports", content: <Empty label="Generate a framework report." /> },
              ]}
            />
          </Card>
        </div>
      </div>

      <Modal open={!!openControl} onClose={() => setOpenControl(null)} title={openControl?.title}>
        {openControl && (
          <div className="space-y-3">
            <div className="text-sm text-white/70">{openControl.id}</div>
            <div className="space-y-1 text-sm">
              <div><span className="font-medium">Status:</span> {openControl.status}</div>
              {openControl.aiConfidence != null && (
                <div><span className="font-medium">AI Confidence:</span> {Math.round(openControl.aiConfidence * 100)}%</div>
              )}
              {openControl.owner && <div><span className="font-medium">Owner:</span> {openControl.owner}</div>}
              {openControl.due && <div><span className="font-medium">Due:</span> {openControl.due}</div>}
            </div>
            <div className="flex gap-2">
              <button className="btn btn-primary">Request Review</button>
              <button className="btn btn-muted">Map Evidence</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Empty({ label }: { label: string }) {
  return (
    <div className="text-white/70 text-sm">{label}</div>
  );
}