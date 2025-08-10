"use client";

import { useState } from "react";
import { Card } from "../../components/Card";
import { Tabs } from "../../components/Tabs";
import { monitors as data } from "../../lib/data";
import { Modal } from "../../components/Modal";

export default function MonitorsPage() {
  const [open, setOpen] = useState(false);
  return (
    <div className="container-page space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Monitors</h1>
        <button className="btn btn-primary" onClick={() => setOpen(true)}>New Monitor</button>
      </div>

      <Tabs
        tabs={[
          {
            key: "web",
            label: "Website Monitors",
            content: <MonitorGrid type="web" />,
          },
          {
            key: "network",
            label: "Network Monitors",
            content: <MonitorGrid type="network" />,
          },
        ]}
      />

      <MonitorModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

function MonitorGrid({ type: _type }: { type: "web" | "network" }) {
  const list = data;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {list.map((m) => (
        <Card key={m.id} title={`${m.type}: ${m.target}`} actions={<>
          <button className="btn btn-muted">Run</button>
          <button className="btn btn-muted">Edit</button>
        </>}>
          <div className="text-sm grid grid-cols-2 gap-2">
            <div><span className="text-white/70">Status:</span> {m.status}</div>
            <div><span className="text-white/70">Cadence:</span> {m.cadence}</div>
            <div className="col-span-2"><span className="text-white/70">Last Run:</span> {new Date(m.lastRun).toLocaleString()}</div>
            <div className="col-span-2"><span className="text-white/70">Linked Controls:</span> 5</div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function MonitorModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Create Monitor">
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-1">
          <div className="text-sm">Type</div>
          <select className="input w-full">
            <option>Web</option>
            <option>Endpoint</option>
            <option>DNS</option>
            <option>TLS</option>
            <option>Ports</option>
            <option>CIS</option>
          </select>
        </label>
        <label className="space-y-1">
          <div className="text-sm">Target</div>
          <input className="input w-full" placeholder="example.com or host" />
        </label>
        <label className="space-y-1">
          <div className="text-sm">Schedule</div>
          <select className="input w-full">
            <option>Hourly</option>
            <option>Daily</option>
            <option>Weekly</option>
          </select>
        </label>
        <label className="space-y-1">
          <div className="text-sm">Threshold</div>
          <input className="input w-full" placeholder=">= 99.9% uptime" />
        </label>
        <div className="sm:col-span-2 flex justify-end gap-2 mt-2">
          <button type="button" className="btn btn-muted" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={onClose}>Save</button>
        </div>
      </form>
    </Modal>
  );
}