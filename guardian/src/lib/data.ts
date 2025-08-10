import { Alert, Control, Evidence, Framework, Monitor, UserRole } from "./types";

export const currentUser = {
  name: "Jane Doe",
  email: "jane@org.com",
  role: "Compliance Manager" as UserRole,
};

export const frameworks: Framework[] = [
  { id: "soc2", name: "SOC 2", enabled: true, score: 82, controls: 120, lastScan: "2025-08-08" },
  { id: "iso27001", name: "ISO 27001", enabled: true, score: 76, controls: 93, lastScan: "2025-08-08" },
  { id: "hipaa", name: "HIPAA", enabled: true, score: 78, controls: 84, lastScan: "2025-08-08" },
  { id: "gdpr", name: "GDPR", enabled: false, score: 0, controls: 0 },
  { id: "ccpa", name: "CCPA", enabled: false, score: 0, controls: 0 },
];

export const controls: Control[] = [
  { id: "HIPAA-164.308(a)(1)", title: "Security Management Process", status: "Needs Human", owner: "jane@org.com", due: "2025-08-20", aiConfidence: 0.62 },
  { id: "SOC2-CC1.1", title: "Control Environment", status: "Automated Passed", aiConfidence: 0.93 },
  { id: "ISO-Annex A 5.1", title: "Policies for information security", status: "Automated Failed", aiConfidence: 0.41, due: "2025-08-22" },
  { id: "HIPAA-164.308(a)(5)", title: "Security Awareness and Training", status: "Pending Review", owner: "alex@org.com", aiConfidence: 0.71 },
];

export const monitors: Monitor[] = [
  { id: "tls-main-site", type: "TLS", target: "specterintel.io", cadence: "daily", status: "OK", lastRun: "2025-08-09T12:02:00Z" },
  { id: "dns-root", type: "DNS", target: "specterintel.io", cadence: "daily", status: "WARN", lastRun: "2025-08-09T08:12:00Z" },
  { id: "vuln-scan", type: "Ports", target: "prod-web-01", cadence: "weekly", status: "OK", lastRun: "2025-08-07T06:00:00Z" },
];

export const alerts: Alert[] = [
  { id: "AL-1029", severity: "High", title: "TLS expires in 14 days", source: "Monitor: tls-main-site", state: "New" },
  { id: "AL-1030", severity: "Medium", title: "New public S3 bucket detected", source: "AWS Integration", state: "Assigned" },
  { id: "AL-1031", severity: "Low", title: "Stale evidence older than 1 year", source: "Evidence Vault", state: "Snoozed" },
];

export const evidence: Evidence[] = [
  { id: "EV-552", name: "TLS_Chain_2025-08-09.pem", frameworks: ["SOC2", "ISO27001"], origin: "AI-Verified", status: "Pending Review", date: "2025-08-09", relatedControls: ["SOC2-CC1.1"] },
  { id: "EV-553", name: "Access_Policy_v4.pdf", frameworks: ["SOC2"], origin: "Human-Reviewed", status: "Approved", date: "2025-08-06", relatedControls: ["ISO-Annex A 5.1"] },
];

export const integrationsCatalog = [
  { id: "aws", name: "AWS", category: "Cloud" },
  { id: "azure", name: "Azure", category: "Cloud" },
  { id: "gcp", name: "GCP", category: "Cloud" },
  { id: "okta", name: "Okta", category: "IdP" },
  { id: "gsuite", name: "Google Workspace", category: "IdP" },
  { id: "jira", name: "Jira", category: "Ticketing" },
  { id: "intune", name: "Intune", category: "Endpoint/MDM" },
  { id: "jamf", name: "Jamf", category: "Endpoint/MDM" },
  { id: "cloudflare", name: "Cloudflare", category: "WAF/CDN" },
];

export function fakeApi<T>(result: T, ms = 600): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(result), ms));
}