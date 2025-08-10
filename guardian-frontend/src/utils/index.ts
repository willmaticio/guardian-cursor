import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistance } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date, formatString: string = 'MMM dd, yyyy') {
  return format(new Date(date), formatString);
}

export function formatRelativeTime(date: string | Date) {
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'automated passed':
    case 'approved':
    case 'ok':
    case 'completed':
      return 'text-guardian-emerald-700 bg-guardian-emerald-100';
    case 'automated failed':
    case 'critical':
    case 'overdue':
    case 'rejected':
      return 'text-red-700 bg-red-100';
    case 'needs review':
    case 'manual review required':
    case 'warning':
    case 'pending review':
      return 'text-guardian-amber-700 bg-guardian-amber-100';
    case 'not implemented':
    case 'new':
    case 'assigned':
      return 'text-guardian-navy-700 bg-guardian-navy-100';
    default:
      return 'text-guardian-navy-600 bg-guardian-navy-50';
  }
}

export function getSeverityColor(severity: string): string {
  switch (severity.toLowerCase()) {
    case 'critical':
      return 'text-red-700 bg-red-100 border-red-200';
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'medium':
      return 'text-guardian-amber-700 bg-guardian-amber-100 border-guardian-amber-200';
    case 'low':
      return 'text-guardian-navy-600 bg-guardian-navy-50 border-guardian-navy-200';
    default:
      return 'text-guardian-navy-600 bg-guardian-navy-50 border-guardian-navy-200';
  }
}

export function getOriginBadge(origin: string): { text: string; className: string } {
  switch (origin) {
    case 'AI-Verified':
      return { text: 'AI-Verified', className: 'text-guardian-primary-700 bg-guardian-primary-100' };
    case 'Human-Reviewed':
      return { text: 'Human-Reviewed', className: 'text-guardian-emerald-700 bg-guardian-emerald-100' };
    case 'AI-Suggested':
      return { text: 'AI-Suggested', className: 'text-guardian-amber-700 bg-guardian-amber-100' };
    case 'Manual Upload':
      return { text: 'Manual', className: 'text-guardian-navy-700 bg-guardian-navy-100' };
    default:
      return { text: 'Unknown', className: 'text-guardian-navy-600 bg-guardian-navy-50' };
  }
}

export function calculateOverallScore(frameworks: any[]): number {
  const enabledFrameworks = frameworks.filter(f => f.enabled);
  if (enabledFrameworks.length === 0) return 0;
  
  const totalScore = enabledFrameworks.reduce((sum, f) => sum + f.score, 0);
  return Math.round(totalScore / enabledFrameworks.length);
}

export function getScoreColor(score: number): string {
  if (score >= 90) return 'text-guardian-emerald-600';
  if (score >= 75) return 'text-guardian-amber-600';
  if (score >= 60) return 'text-orange-600';
  return 'text-red-600';
}