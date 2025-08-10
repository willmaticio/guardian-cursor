export type Framework = {
  id: string;
  name: string;
  enabled: boolean;
  score: number;
  controls: number;
  lastScan?: string;
};

export type Control = {
  id: string;
  title: string;
  status: "Automated Passed" | "Automated Failed" | "Needs Human" | "Not Implemented" | "Pending Review";
  owner?: string;
  due?: string;
  aiConfidence?: number;
};

export type Monitor = {
  id: string;
  type: string;
  target: string;
  cadence: string;
  status: string;
  lastRun: string;
};

export type Alert = {
  id: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  title: string;
  source: string;
  state: "New" | "Acknowledged" | "Assigned" | "Snoozed" | "Resolved";
};

export type Evidence = {
  id: string;
  name: string;
  frameworks: string[];
  origin: "AI-Verified" | "Human-Reviewed" | "AI-Suggested" | "Needs Human";
  status: "Pending Review" | "Approved" | "Rejected";
  date?: string;
  retention?: string;
  relatedControls?: string[];
};

export type UserRole = "Owner/Admin" | "Compliance Manager" | "Analyst/Reviewer" | "Read-Only/Stakeholder" | "External Auditor (Guest)";