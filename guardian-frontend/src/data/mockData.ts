import { Framework, Control, Monitor, Alert, Evidence, Audit, User, Organization } from '../types';

export const mockOrganization: Organization = {
  id: 'org-1',
  name: 'Acme Financial Services',
  industry: ['Finance', 'Technology'],
  regions: ['US', 'EU'],
  timeZone: 'America/New_York',
  domains: ['acmefinancial.com', 'app.acmefinancial.com']
};

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@acmefinancial.com',
    role: 'Compliance Manager',
    lastActive: '2025-08-09T14:30:00Z'
  },
  {
    id: 'user-2',
    name: 'Michael Rodriguez',
    email: 'michael.rodriguez@acmefinancial.com',
    role: 'Analyst',
    lastActive: '2025-08-09T13:45:00Z'
  },
  {
    id: 'user-3',
    name: 'Emily Johnson',
    email: 'emily.johnson@acmefinancial.com',
    role: 'Admin',
    lastActive: '2025-08-09T15:12:00Z'
  }
];

export const mockFrameworks: Framework[] = [
  {
    id: 'soc2',
    name: 'SOC 2 Type II',
    enabled: true,
    score: 87,
    controls: 64,
    lastScan: '2025-08-09T10:15:00Z',
    industry: ['Finance', 'Technology', 'Healthcare'],
    description: 'System and Organization Controls for service organizations',
    nextDue: '2025-12-15'
  },
  {
    id: 'iso27001',
    name: 'ISO 27001',
    enabled: true,
    score: 92,
    controls: 114,
    lastScan: '2025-08-08T16:20:00Z',
    industry: ['Finance', 'Technology', 'Healthcare', 'Education'],
    description: 'Information security management systems',
    nextDue: '2026-03-20'
  },
  {
    id: 'pci-dss',
    name: 'PCI DSS',
    enabled: true,
    score: 78,
    controls: 78,
    lastScan: '2025-08-09T08:30:00Z',
    industry: ['Finance', 'Retail'],
    description: 'Payment Card Industry Data Security Standard'
  },
  {
    id: 'gdpr',
    name: 'GDPR',
    enabled: true,
    score: 85,
    controls: 47,
    lastScan: '2025-08-07T14:45:00Z',
    industry: ['All'],
    description: 'General Data Protection Regulation'
  },
  {
    id: 'hipaa',
    name: 'HIPAA',
    enabled: false,
    score: 0,
    controls: 84,
    lastScan: '',
    industry: ['Healthcare'],
    description: 'Health Insurance Portability and Accountability Act'
  }
];

export const mockControls: Control[] = [
  {
    id: 'SOC2-CC6.1',
    frameworkId: 'soc2',
    title: 'Logical and Physical Access Controls',
    description: 'The entity implements logical and physical access controls to protect against threats from sources outside its system boundaries.',
    status: 'Automated Passed',
    owner: 'sarah.chen@acmefinancial.com',
    due: '2025-08-15',
    aiConfidence: 0.94,
    lastUpdated: '2025-08-09T10:15:00Z',
    evidenceCount: 3,
    priority: 'High'
  },
  {
    id: 'SOC2-CC7.2',
    frameworkId: 'soc2',
    title: 'System Monitoring',
    description: 'The entity monitors system components and the operation of controls.',
    status: 'Needs Review',
    owner: 'michael.rodriguez@acmefinancial.com',
    due: '2025-08-12',
    aiConfidence: 0.67,
    lastUpdated: '2025-08-08T15:30:00Z',
    evidenceCount: 1,
    priority: 'Medium'
  },
  {
    id: 'ISO27001-A.9.1.1',
    frameworkId: 'iso27001',
    title: 'Access Control Policy',
    description: 'An access control policy shall be established, documented and reviewed based on business and information security requirements.',
    status: 'Automated Passed',
    owner: 'sarah.chen@acmefinancial.com',
    lastUpdated: '2025-08-08T16:20:00Z',
    evidenceCount: 2,
    priority: 'High'
  },
  {
    id: 'PCI-DSS-2.1',
    frameworkId: 'pci-dss',
    title: 'Always change vendor-supplied defaults',
    description: 'Always change vendor-supplied defaults and remove or disable unnecessary default accounts before installing a system on the network.',
    status: 'Manual Review Required',
    owner: 'michael.rodriguez@acmefinancial.com',
    due: '2025-08-20',
    lastUpdated: '2025-08-07T12:00:00Z',
    evidenceCount: 0,
    priority: 'Critical'
  }
];

export const mockMonitors: Monitor[] = [
  {
    id: 'tls-main-site',
    name: 'Main Website TLS',
    type: 'TLS',
    target: 'acmefinancial.com',
    cadence: 'Daily',
    status: 'Warning',
    lastRun: '2025-08-09T12:02:00Z',
    nextRun: '2025-08-10T12:02:00Z',
    linkedControls: ['SOC2-CC6.1', 'ISO27001-A.13.1.1'],
    findings: 1
  },
  {
    id: 'web-app-security',
    name: 'Web Application Security Scan',
    type: 'Website',
    target: 'app.acmefinancial.com',
    cadence: 'Weekly',
    status: 'OK',
    lastRun: '2025-08-08T20:15:00Z',
    nextRun: '2025-08-15T20:15:00Z',
    linkedControls: ['SOC2-CC6.1', 'PCI-DSS-6.1'],
    findings: 0
  },
  {
    id: 'network-ports',
    name: 'Network Port Scan',
    type: 'Network',
    target: '10.0.0.0/24',
    cadence: 'Daily',
    status: 'OK',
    lastRun: '2025-08-09T06:00:00Z',
    nextRun: '2025-08-10T06:00:00Z',
    linkedControls: ['SOC2-CC6.1', 'ISO27001-A.13.1.1'],
    findings: 0
  }
];

export const mockAlerts: Alert[] = [
  {
    id: 'AL-1029',
    severity: 'High',
    title: 'TLS Certificate expires in 14 days',
    description: 'The TLS certificate for acmefinancial.com will expire on August 23, 2025.',
    source: 'Monitor: tls-main-site',
    state: 'New',
    createdAt: '2025-08-09T12:02:00Z',
    impactedControls: ['SOC2-CC6.1', 'ISO27001-A.13.1.1'],
    remediation: 'Renew TLS certificate before expiration date'
  },
  {
    id: 'AL-1028',
    severity: 'Medium',
    title: 'Control SOC2-CC7.2 requires human review',
    description: 'AI confidence level (67%) below threshold for automatic approval.',
    source: 'Framework: SOC 2',
    state: 'Assigned',
    createdAt: '2025-08-08T15:30:00Z',
    assignee: 'michael.rodriguez@acmefinancial.com',
    impactedControls: ['SOC2-CC7.2']
  },
  {
    id: 'AL-1027',
    severity: 'Critical',
    title: 'PCI DSS control overdue',
    description: 'Control PCI-DSS-2.1 is past due date and requires immediate attention.',
    source: 'Framework: PCI DSS',
    state: 'Acknowledged',
    createdAt: '2025-08-07T09:00:00Z',
    assignee: 'sarah.chen@acmefinancial.com',
    impactedControls: ['PCI-DSS-2.1']
  }
];

export const mockEvidence: Evidence[] = [
  {
    id: 'EV-552',
    name: 'TLS_Chain_2025-08-09.pem',
    type: 'Certificate',
    frameworks: ['soc2', 'iso27001'],
    controls: ['SOC2-CC6.1', 'ISO27001-A.13.1.1'],
    origin: 'AI-Verified',
    status: 'Approved',
    uploadedAt: '2025-08-09T12:02:00Z',
    uploadedBy: 'system',
    reviewer: 'sarah.chen@acmefinancial.com',
    fileSize: '4.2 KB',
    retention: '7 years',
    source: 'TLS Monitor'
  },
  {
    id: 'EV-551',
    name: 'Access_Control_Policy_v2.1.pdf',
    type: 'Policy',
    frameworks: ['soc2', 'iso27001', 'pci-dss'],
    controls: ['SOC2-CC6.1', 'ISO27001-A.9.1.1', 'PCI-DSS-7.1'],
    origin: 'Manual Upload',
    status: 'Pending Review',
    uploadedAt: '2025-08-08T14:20:00Z',
    uploadedBy: 'michael.rodriguez@acmefinancial.com',
    fileSize: '2.8 MB',
    retention: '7 years',
    source: 'Manual Upload'
  },
  {
    id: 'EV-550',
    name: 'Vulnerability_Scan_Report_Aug_2025.json',
    type: 'Scan Result',
    frameworks: ['soc2', 'pci-dss'],
    controls: ['SOC2-CC7.1', 'PCI-DSS-11.2'],
    origin: 'AI-Verified',
    status: 'Approved',
    uploadedAt: '2025-08-07T22:00:00Z',
    uploadedBy: 'system',
    reviewer: 'sarah.chen@acmefinancial.com',
    fileSize: '156 KB',
    retention: '3 years',
    source: 'Vulnerability Scanner Integration'
  }
];

export const mockAudits: Audit[] = [
  {
    id: 'audit-1',
    name: 'SOC 2 Type II Annual Audit',
    frameworks: ['soc2'],
    status: 'In Progress',
    progress: 68,
    startDate: '2025-07-01',
    dueDate: '2025-09-30',
    assignees: ['sarah.chen@acmefinancial.com', 'michael.rodriguez@acmefinancial.com'],
    aiTasksComplete: 42,
    aiTasksTotal: 50,
    humanTasksComplete: 15,
    humanTasksTotal: 28
  },
  {
    id: 'audit-2',
    name: 'ISO 27001 Surveillance Audit',
    frameworks: ['iso27001'],
    status: 'Planning',
    progress: 12,
    startDate: '2025-09-01',
    dueDate: '2025-11-15',
    assignees: ['sarah.chen@acmefinancial.com'],
    aiTasksComplete: 8,
    aiTasksTotal: 65,
    humanTasksComplete: 2,
    humanTasksTotal: 35
  },
  {
    id: 'audit-3',
    name: 'PCI DSS Quarterly Assessment',
    frameworks: ['pci-dss'],
    status: 'Overdue',
    progress: 45,
    startDate: '2025-05-01',
    dueDate: '2025-08-01',
    assignees: ['michael.rodriguez@acmefinancial.com'],
    aiTasksComplete: 28,
    aiTasksTotal: 45,
    humanTasksComplete: 8,
    humanTasksTotal: 25
  }
];

export const mockCurrentUser: User = {
  id: 'user-1',
  name: 'Sarah Chen',
  email: 'sarah.chen@acmefinancial.com',
  role: 'Compliance Manager',
  lastActive: '2025-08-09T15:30:00Z'
};