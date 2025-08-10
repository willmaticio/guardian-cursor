"use client";

import { useState } from "react";
import { Card } from "../../components/Card";
import { Tabs } from "../../components/Tabs";
import { frameworks as frameworksData } from "../../lib/data";

export default function SettingsPage() {
  return (
    <div className="container-page space-y-6">
      <h1 className="text-xl font-semibold">Team & Settings</h1>
      <Tabs
        tabs={[
          { key: "org", label: "Org Profile", content: <OrgProfile /> },
          { key: "users", label: "Users & Roles", content: <UsersRoles /> },
          { key: "frameworks", label: "Framework Settings", content: <FrameworkSettings /> },
          { key: "automation", label: "Automation", content: <Automation /> },
          { key: "privacy", label: "Data & Privacy", content: <Privacy /> },
          { key: "billing", label: "Billing", content: <Billing /> },
        ]}
      />
    </div>
  );
}

function OrgProfile() {
  return (
    <Card>
      <form className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-1">
          <div className="text-sm">Organization Name</div>
          <input className="input" defaultValue="Acme Corp" />
        </label>
        <label className="space-y-1">
          <div className="text-sm">Industry</div>
          <select className="input"><option>Finance</option><option>Healthcare</option><option>Education</option><option>Accounting</option><option>Law</option></select>
        </label>
        <label className="space-y-1">
          <div className="text-sm">Regions</div>
          <input className="input" placeholder="US, EU" />
        </label>
        <label className="space-y-1">
          <div className="text-sm">Time Zone</div>
          <input className="input" placeholder="UTC-5" />
        </label>
      </form>
    </Card>
  );
}

function UsersRoles() {
  return (
    <Card>
      <div className="text-sm text-white/70">Invite users and configure RBAC presets.</div>
    </Card>
  );
}

function FrameworkSettings() {
  const [items, setItems] = useState(frameworksData);
  return (
    <Card>
      <div className="space-y-2">
        {items.map((f, idx) => (
          <label key={f.id} className="flex items-center justify-between gap-2 p-2 rounded hover:bg-white/5">
            <div>
              <div className="font-medium">{f.name}</div>
              <div className="text-xs text-white/70">{f.enabled ? "Enabled" : "Disabled"}</div>
            </div>
            <input type="checkbox" checked={f.enabled} onChange={(e) => {
              const copy = [...items];
              copy[idx] = { ...copy[idx], enabled: e.target.checked };
              setItems(copy);
            }} />
          </label>
        ))}
      </div>
    </Card>
  );
}

function Automation() {
  return (
    <Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-1">
          <div className="text-sm">AI Check Schedule</div>
          <select className="input"><option>Daily</option><option>Weekly</option></select>
        </label>
        <label className="space-y-1">
          <div className="text-sm">Alert SLA</div>
          <input className="input" placeholder=">= 4 hours" />
        </label>
      </div>
    </Card>
  );
}

function Privacy() {
  return (
    <Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <label className="space-y-1">
          <div className="text-sm">Data Residency</div>
          <select className="input"><option>US</option><option>EU</option></select>
        </label>
        <label className="space-y-1">
          <div className="text-sm">Retention</div>
          <input className="input" placeholder=">= 1 year" />
        </label>
      </div>
    </Card>
  );
}

function Billing() {
  return (
    <Card>
      <div className="text-sm text-white/70">Plan: Pro. Usage: 12 seats. Invoices: July, August.</div>
    </Card>
  );
}