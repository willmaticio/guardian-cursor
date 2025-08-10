"use client";

import { useMemo, useState } from "react";
import { Card } from "../../components/Card";
import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { alerts as alertsData } from "../../lib/data";
import { Alert } from "../../lib/types";


export default function AlertsPage() {
  const [severity, setSeverity] = useState<string>("All");
  const [state, setState] = useState<string>("All");
  const [selected, setSelected] = useState<Alert | null>(null);

  const filtered = useMemo(() => {
    return alertsData.filter((a) => (severity === "All" || a.severity === severity) && (state === "All" || a.state === state));
  }, [severity, state]);

  return (
    <div className="container-page space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Alerts</h1>
        <div className="flex gap-2">
          <select className="input" value={severity} onChange={(e) => setSeverity(e.target.value)}>
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>
          <select className="input" value={state} onChange={(e) => setState(e.target.value)}>
            <option>All</option>
            <option>New</option>
            <option>Acknowledged</option>
            <option>Assigned</option>
            <option>Snoozed</option>
            <option>Resolved</option>
          </select>
        </div>
      </div>

      <Card>
        <Table<Alert>
          data={filtered}
          rowKey={(r) => r.id}
          columns={[
            { key: "id", header: "ID" },
            { key: "severity", header: "Severity", render: (r) => <span className={`badge ${
              r.severity === "Critical" || r.severity === "High" ? "badge-danger" : r.severity === "Medium" ? "badge-warning" : "badge-muted"
            }`}>{r.severity}</span> },
            { key: "title", header: "Title" },
            { key: "source", header: "Source" },
            { key: "state", header: "State" },
            { key: "actions", header: "", render: (r) => (
              <div className="flex justify-end gap-2">
                <button className="btn btn-muted" onClick={() => setSelected(r)}>Open</button>
              </div>
            ) },
          ]}
        />
      </Card>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title}>
        {selected && (
          <div className="space-y-3 text-sm">
            <div><span className="text-white/70">ID:</span> {selected.id}</div>
            <div><span className="text-white/70">Severity:</span> {selected.severity}</div>
            <div><span className="text-white/70">Source:</span> {selected.source}</div>
            <div className="flex gap-2 pt-2">
              <button className="btn btn-muted">Acknowledge</button>
              <button className="btn btn-muted">Assign</button>
              <button className="btn btn-muted">Snooze</button>
              <button className="btn btn-primary">Resolve</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}