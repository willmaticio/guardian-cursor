"use client";

import { useState } from "react";
import { Card } from "../../components/Card";
import { Modal } from "../../components/Modal";
import { DualStepper } from "../../components/Stepper";
import { Tabs } from "../../components/Tabs";

export default function AuditsPage() {
  const [wizardOpen, setWizardOpen] = useState(false);
  return (
    <div className="container-page space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Audits</h1>
        <button className="btn btn-primary" onClick={() => setWizardOpen(true)}>New Audit</button>
      </div>

      <Tabs
        tabs={[
          { key: "upcoming", label: "Upcoming", content: <Empty label="Next SOC 2 Type II starting 2025-09-01" /> },
          { key: "inprogress", label: "In Progress", content: <AuditRunView /> },
          { key: "completed", label: "Completed", content: <Empty label="No completed audits yet." /> },
        ]}
      />

      <AuditWizard open={wizardOpen} onClose={() => setWizardOpen(false)} />
    </div>
  );
}

function AuditRunView() {
  return (
    <div className="space-y-4">
      <Card title="Audit Run — Q3 SOC 2">
        <DualStepper
          ai={[
            { key: "plan", label: "Plan", done: true },
            { key: "collect", label: "Auto-collect Artifacts", done: true, note: "27 artifacts" },
            { key: "test", label: "Automated Tests", done: false },
            { key: "review", label: "AI Validation", done: false },
          ]}
          human={[
            { key: "plan", label: "Plan Scope & Period", done: true },
            { key: "collect", label: "Collect Manual Evidence", done: false },
            { key: "test", label: "Manual Tests", done: false },
            { key: "report", label: "Report & Sign-off", done: false },
          ]}
        />
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card title="AI Tasks">
          <ul className="space-y-2 text-sm">
            <li>Re-run failed ISO tests (confidence &lt; 0.7)</li>
            <li>Suggest remediation for policy gap</li>
          </ul>
        </Card>
        <Card title="Human Tasks">
          <ul className="space-y-2 text-sm">
            <li>Upload Access Control Policy (PDF)</li>
            <li>Approve data retention settings</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

function AuditWizard({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Modal open={open} onClose={onClose} title="New Audit Wizard">
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-1">
          <div className="text-sm">Frameworks</div>
          <select className="input" multiple>
            <option>SOC 2</option>
            <option>ISO 27001</option>
            <option>HIPAA</option>
          </select>
        </label>
        <label className="space-y-1">
          <div className="text-sm">Period</div>
          <input className="input" placeholder="2025-07-01 → 2025-09-30" />
        </label>
        <label className="space-y-1">
          <div className="text-sm">Assignees</div>
          <input className="input" placeholder="jane@org.com, alex@org.com" />
        </label>
        <label className="space-y-1">
          <div className="text-sm">Due Date</div>
          <input className="input" placeholder="2025-10-15" />
        </label>
        <div className="sm:col-span-2 flex justify-end gap-2 mt-2">
          <button type="button" className="btn btn-muted" onClick={onClose}>Cancel</button>
          <button type="button" className="btn btn-primary" onClick={onClose}>Create</button>
        </div>
      </form>
    </Modal>
  );
}

function Empty({ label }: { label: string }) {
  return <div className="text-sm text-white/70">{label}</div>;
}