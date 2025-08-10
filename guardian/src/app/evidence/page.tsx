"use client";

import { useState } from "react";
import { Card } from "../../components/Card";
import { Table } from "../../components/Table";
import { Modal } from "../../components/Modal";
import { evidence as evidenceData } from "../../lib/data";
import { Evidence } from "../../lib/types";
import { OriginBadge } from "../../components/Badge";

export default function EvidencePage() {
  const [openUpload, setOpenUpload] = useState(false);
  const [selected, setSelected] = useState<Evidence | null>(null);

  return (
    <div className="container-page space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Evidence Vault</h1>
        <div className="flex gap-2">
          <button className="btn btn-muted" onClick={() => alert("Saved view")}>Saved Views</button>
          <button className="btn btn-primary" onClick={() => setOpenUpload(true)}>Upload Evidence</button>
        </div>
      </div>

      <Card>
        <Table<Evidence>
          data={evidenceData}
          rowKey={(r) => r.id}
          filterPlaceholder="Filter evidence…"
          columns={[
            { key: "name", header: "Artifact" },
            { key: "frameworks", header: "Frameworks", render: (r) => r.frameworks.join(", ") },
            { key: "origin", header: "Origin", render: (r) => <OriginBadge origin={r.origin} /> },
            { key: "status", header: "Status" },
            { key: "date", header: "Date" },
            { key: "relatedControls", header: "Controls", render: (r) => (r.relatedControls ?? []).join(", ") || "—" },
            { key: "actions", header: "", render: (r) => (
              <div className="flex justify-end gap-2">
                <button className="btn btn-muted" onClick={() => setSelected(r)}>Details</button>
                <button className="btn btn-primary">Map to Controls</button>
              </div>
            ) },
          ]}
        />
      </Card>

      <UploadModal open={openUpload} onClose={() => setOpenUpload(false)} />

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.name}>
        {selected && (
          <div className="text-sm space-y-2">
            <div><span className="text-white/70">ID:</span> {selected.id}</div>
            <div><span className="text-white/70">Origin:</span> {selected.origin}</div>
            <div><span className="text-white/70">Frameworks:</span> {selected.frameworks.join(", ")}</div>
            <div><span className="text-white/70">Chain of Custody:</span> SHA256, uploader {selected.origin.includes("AI") ? "AI Agent" : "User"}</div>
          </div>
        )}
      </Modal>
    </div>
  );
}

function UploadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="Upload Evidence">
      <div className="space-y-3">
        <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center text-white/70">Drag & drop files here</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="space-y-1">
            <div className="text-sm">Artifact Name</div>
            <input className="input w-full" placeholder="Policy.pdf" />
          </label>
          <label className="space-y-1">
            <div className="text-sm">Map to Framework(s)</div>
            <select className="input" multiple>
              <option>SOC2</option>
              <option>ISO27001</option>
              <option>HIPAA</option>
            </select>
          </label>
          <div className="sm:col-span-2 flex justify-end gap-2 mt-2">
            <button className="btn btn-muted" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={onClose}>Upload</button>
          </div>
        </div>
      </div>
    </Modal>
  );
}