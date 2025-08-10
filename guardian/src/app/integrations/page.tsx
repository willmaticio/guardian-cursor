"use client";

import { useState } from "react";
import { Card } from "../../components/Card";
import { integrationsCatalog } from "../../lib/data";
import { Modal } from "../../components/Modal";

export default function IntegrationsPage() {
  const [open, setOpen] = useState<{ id: string; name: string } | null>(null);
  return (
    <div className="container-page space-y-6">
      <h1 className="text-xl font-semibold">Integrations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {integrationsCatalog.map((i) => (
          <Card key={i.id} title={`${i.name}`} actions={<button className="btn btn-primary" onClick={() => setOpen({ id: i.id, name: i.name })}>Connect</button>}>
            <div className="text-sm text-white/70">Category: {i.category}</div>
          </Card>
        ))}
      </div>

      <ConnectModal open={!!open} onClose={() => setOpen(null)} name={open?.name ?? ""} />
    </div>
  );
}

function ConnectModal({ open, onClose, name }: { open: boolean; onClose: () => void; name: string }) {
  return (
    <Modal open={open} onClose={onClose} title={`Connect ${name}`}>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-1">
          <div className="text-sm">Auth Method</div>
          <select className="input">
            <option>OAuth</option>
            <option>API Key</option>
          </select>
        </label>
        <label className="space-y-1">
          <div className="text-sm">Scopes</div>
          <input className="input" placeholder="read:security, read:iam" />
        </label>
        <div className="sm:col-span-2 text-sm text-white/70">Preview: 27 controls mapped</div>
        <div className="sm:col-span-2 flex justify-end gap-2 mt-2">
          <button type="button" className="btn btn-muted" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={onClose}>Connect</button>
        </div>
      </form>
    </Modal>
  );
}