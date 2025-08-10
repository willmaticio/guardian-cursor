export interface Framework {
  id: string;
  name: string;
  enabled: boolean;
  score: number;
  controls: number;
  lastScan: string;
  industry: string[];
  description: string;
  nextDue?: string;
}

export interface Control {
  id: string;
  frameworkId: string;
  title: string;
  description: string;
  status: 'Automated Passed' | 'Automated Failed' | 'Needs Review' | 'Not Implemented' | 'Manual Review Required';
  owner: string;
  due?: string;
  aiConfidence?: number;
  lastUpdated: string;
  evidenceCount: number;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
}

export interface Monitor {
  id: string;
  name: string;
  type: 'Website' | 'TLS' | 'DNS' | 'Network' | 'Endpoint' | 'CIS Benchmark';
  target: string;
  cadence: 'Hourly' | 'Daily' | 'Weekly' | 'Monthly';
  status: 'OK' | 'Warning' | 'Critical' | 'Unknown';
  lastRun: string;
  nextRun: string;
  linkedControls: string[];
  findings: number;
}

export interface Alert {
  id: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  title: string;
  description: string;
  source: string;
  state: 'New' | 'Acknowledged' | 'Assigned' | 'Snoozed' | 'Resolved';
  createdAt: string;
  assignee?: string;
  impactedControls: string[];
  remediation?: string;
}

export interface Evidence {
  id: string;
  name: string;
  type: 'Document' | 'Screenshot' | 'Log' | 'Certificate' | 'Policy' | 'Scan Result';
  frameworks: string[];
  controls: string[];
  origin: 'AI-Verified' | 'Human-Reviewed' | 'AI-Suggested' | 'Manual Upload';
  status: 'Pending Review' | 'Approved' | 'Rejected' | 'Expired';
  uploadedAt: string;
  uploadedBy: string;
  reviewer?: string;
  fileSize: string;
  retention: string;
  source: string;
}

export interface Audit {
  id: string;
  name: string;
  frameworks: string[];
  status: 'Planning' | 'In Progress' | 'Review' | 'Completed' | 'Overdue';
  progress: number;
  startDate: string;
  dueDate: string;
  assignees: string[];
  aiTasksComplete: number;
  aiTasksTotal: number;
  humanTasksComplete: number;
  humanTasksTotal: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Owner' | 'Admin' | 'Compliance Manager' | 'Analyst' | 'Read-Only' | 'External Auditor';
  avatar?: string;
  lastActive: string;
}

export interface Organization {
  id: string;
  name: string;
  industry: string[];
  regions: string[];
  timeZone: string;
  logo?: string;
  domains: string[];
}

export type NavigationItem = {
  id: string;
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  current?: boolean;
};