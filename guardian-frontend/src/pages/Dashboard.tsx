import React from 'react';
import {
  ShieldCheckIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  PlayIcon,
  EyeIcon,
  ArrowUpIcon,
  ClockIcon,
  FolderIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';
import { cn, formatDate, formatRelativeTime, getStatusColor, calculateOverallScore, getScoreColor } from '../utils';
import { mockFrameworks, mockAlerts, mockAudits } from '../data/mockData';

const stats = [
  {
    name: 'Overall Compliance Score',
    value: calculateOverallScore(mockFrameworks),
    unit: '%',
    icon: ShieldCheckIcon,
    change: '+2.1%',
    changeType: 'increase'
  },
  {
    name: 'Framework Coverage',
    value: mockFrameworks.filter(f => f.enabled).length,
    unit: '/' + mockFrameworks.length,
    icon: ChartBarIcon,
    change: '+1',
    changeType: 'increase'
  },
  {
    name: 'Open Issues',
    value: mockAlerts.filter(a => a.state !== 'Resolved').length,
    unit: 'alerts',
    icon: ExclamationTriangleIcon,
    change: '-2',
    changeType: 'decrease'
  },
  {
    name: 'Upcoming Deadlines',
    value: 4,
    unit: 'this month',
    icon: CalendarIcon,
    change: '+1',
    changeType: 'increase'
  }
];

const riskMatrix = [
  { impact: 'High', likelihood: 'Low', count: 2, color: 'bg-guardian-amber-200' },
  { impact: 'High', likelihood: 'Medium', count: 1, color: 'bg-orange-300' },
  { impact: 'High', likelihood: 'High', count: 0, color: 'bg-red-400' },
  { impact: 'Medium', likelihood: 'Low', count: 5, color: 'bg-guardian-navy-200' },
  { impact: 'Medium', likelihood: 'Medium', count: 3, color: 'bg-guardian-amber-200' },
  { impact: 'Medium', likelihood: 'High', count: 1, color: 'bg-orange-300' },
  { impact: 'Low', likelihood: 'Low', count: 8, color: 'bg-guardian-emerald-200' },
  { impact: 'Low', likelihood: 'Medium', count: 4, color: 'bg-guardian-navy-200' },
  { impact: 'Low', likelihood: 'High', count: 2, color: 'bg-guardian-amber-200' }
];

const recentActivity = [
  {
    id: 1,
    type: 'ai_check',
    title: 'AI completed SOC 2 control verification',
    description: 'CC6.1 - Logical and Physical Access Controls',
    timestamp: '2025-08-09T14:30:00Z',
    icon: ShieldCheckIcon,
    iconColor: 'text-guardian-primary-600 bg-guardian-primary-100'
  },
  {
    id: 2,
    type: 'evidence_upload',
    title: 'Evidence uploaded by Michael Rodriguez',
    description: 'Access Control Policy v2.1',
    timestamp: '2025-08-08T14:20:00Z',
    icon: FolderIcon,
    iconColor: 'text-guardian-navy-600 bg-guardian-navy-100'
  },
  {
    id: 3,
    type: 'approval',
    title: 'Control approved by Sarah Chen',
    description: 'ISO 27001 A.9.1.1 - Access Control Policy',
    timestamp: '2025-08-08T16:20:00Z',
    icon: ShieldCheckIcon,
    iconColor: 'text-guardian-emerald-600 bg-guardian-emerald-100'
  },
  {
    id: 4,
    type: 'audit_milestone',
    title: 'SOC 2 audit reached 68% completion',
    description: 'Planning phase completed, evidence collection in progress',
    timestamp: '2025-08-07T10:15:00Z',
    icon: ClipboardDocumentListIcon,
    iconColor: 'text-guardian-amber-600 bg-guardian-amber-100'
  }
];

export default function Dashboard() {
  const overallScore = calculateOverallScore(mockFrameworks);
  const enabledFrameworks = mockFrameworks.filter(f => f.enabled);
  const openAlerts = mockAlerts.filter(a => a.state !== 'Resolved');

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-guardian-navy-900">Dashboard</h1>
        <p className="mt-1 text-guardian-navy-600">
          Overview of your compliance posture and recent activity
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-guardian-primary-100">
                  <stat.icon className="h-6 w-6 text-guardian-primary-600" />
                </div>
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-baseline">
                  <p className={cn("text-2xl font-semibold", getScoreColor(stat.name === 'Overall Compliance Score' ? stat.value : 85))}>
                    {stat.value}
                    <span className="ml-1 text-sm font-medium text-guardian-navy-500">{stat.unit}</span>
                  </p>
                  <div className={cn(
                    'ml-2 flex items-center text-sm font-medium',
                    stat.changeType === 'increase' ? 'text-guardian-emerald-600' : 'text-red-600'
                  )}>
                    <ArrowUpIcon className={cn(
                      'h-4 w-4',
                      stat.changeType === 'decrease' && 'rotate-180'
                    )} />
                    {stat.change}
                  </div>
                </div>
                <p className="text-sm text-guardian-navy-600">{stat.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Framework Posture Grid */}
        <div className="lg:col-span-2">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-guardian-navy-900">Framework Posture</h2>
              <button className="btn-secondary text-sm">Manage Frameworks</button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {enabledFrameworks.map((framework) => (
                <div key={framework.id} className="border border-guardian-navy-200 rounded-lg p-4 hover:border-guardian-primary-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-guardian-navy-900">{framework.name}</h3>
                    <span className={cn('text-xl font-bold', getScoreColor(framework.score))}>
                      {framework.score}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-guardian-navy-600">
                      <span>Controls</span>
                      <span>{framework.controls}</span>
                    </div>
                    <div className="flex justify-between text-sm text-guardian-navy-600">
                      <span>Last Scan</span>
                      <span>{formatRelativeTime(framework.lastScan)}</span>
                    </div>
                    {framework.nextDue && (
                      <div className="flex justify-between text-sm text-guardian-navy-600">
                        <span>Next Due</span>
                        <span>{formatDate(framework.nextDue)}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 btn-primary text-xs py-1.5">
                      <PlayIcon className="h-3 w-3 mr-1" />
                      Run Checks
                    </button>
                    <button className="flex-1 btn-secondary text-xs py-1.5">
                      <EyeIcon className="h-3 w-3 mr-1" />
                      View Gaps
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Heatmap */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-guardian-navy-900 mb-6">Risk Heatmap</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-1 text-xs text-guardian-navy-600">
              <div></div>
              <div className="text-center">Low</div>
              <div className="text-center">Medium</div>
              <div className="text-center">High</div>
            </div>
            {['High', 'Medium', 'Low'].map((impact, impactIndex) => (
              <div key={impact} className="grid grid-cols-4 gap-1">
                <div className="text-xs text-guardian-navy-600 flex items-center">{impact}</div>
                {['Low', 'Medium', 'High'].map((likelihood, likelihoodIndex) => {
                  const risk = riskMatrix.find(r => r.impact === impact && r.likelihood === likelihood);
                  return (
                    <div
                      key={`${impact}-${likelihood}`}
                      className={cn(
                        'h-12 rounded flex items-center justify-center text-sm font-medium text-guardian-navy-700',
                        risk?.color || 'bg-guardian-navy-100'
                      )}
                    >
                      {risk?.count || 0}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-guardian-navy-500">
            <div className="flex justify-between">
              <span>← Likelihood →</span>
              <span>Impact ↑</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Alerts */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-guardian-navy-900">Recent Alerts</h2>
            <a href="/alerts" className="text-sm text-guardian-primary-600 hover:text-guardian-primary-700">
              View all
            </a>
          </div>
          <div className="space-y-4">
            {openAlerts.slice(0, 4).map((alert) => (
              <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-lg border border-guardian-navy-200 hover:border-guardian-primary-300 transition-colors">
                <div className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium',
                  alert.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                  alert.severity === 'High' ? 'bg-red-50 text-red-600' :
                  alert.severity === 'Medium' ? 'bg-guardian-amber-100 text-guardian-amber-700' :
                  'bg-guardian-navy-100 text-guardian-navy-600'
                )}>
                  !
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-guardian-navy-900 truncate">
                    {alert.title}
                  </p>
                  <p className="text-sm text-guardian-navy-600 truncate">
                    {alert.source}
                  </p>
                  <div className="mt-1 flex items-center space-x-2">
                    <span className={cn(
                      'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                      getStatusColor(alert.state)
                    )}>
                      {alert.state}
                    </span>
                    <span className="text-xs text-guardian-navy-500">
                      {formatRelativeTime(alert.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button className="text-guardian-navy-400 hover:text-guardian-navy-600">
                    <EyeIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-guardian-navy-900">Recent Activity</h2>
            <button className="text-sm text-guardian-primary-600 hover:text-guardian-primary-700">
              View all
            </button>
          </div>
          <div className="flow-root">
            <ul className="-mb-8">
              {recentActivity.map((activity, activityIdx) => (
                <li key={activity.id}>
                  <div className="relative pb-8">
                    {activityIdx !== recentActivity.length - 1 ? (
                      <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-guardian-navy-200" aria-hidden="true" />
                    ) : null}
                    <div className="relative flex space-x-3">
                      <div>
                        <span className={cn(
                          'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white',
                          activity.iconColor
                        )}>
                          <activity.icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </div>
                      <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                        <div>
                          <p className="text-sm text-guardian-navy-900">{activity.title}</p>
                          <p className="text-sm text-guardian-navy-600">{activity.description}</p>
                        </div>
                        <div className="whitespace-nowrap text-right text-sm text-guardian-navy-500">
                          <ClockIcon className="inline h-3 w-3 mr-1" />
                          {formatRelativeTime(activity.timestamp)}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Active Audits */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-guardian-navy-900">Active Audits</h2>
          <button className="btn-primary">New Audit</button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockAudits.filter(audit => audit.status !== 'Completed').map((audit) => (
            <div key={audit.id} className="border border-guardian-navy-200 rounded-lg p-4 hover:border-guardian-primary-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-guardian-navy-900 truncate">{audit.name}</h3>
                <span className={cn(
                  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                  getStatusColor(audit.status)
                )}>
                  {audit.status}
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-sm text-guardian-navy-600 mb-1">
                  <span>Progress</span>
                  <span>{audit.progress}%</span>
                </div>
                <div className="w-full bg-guardian-navy-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-guardian-primary-500 to-guardian-primary-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${audit.progress}%` }}
                  />
                </div>
              </div>

              {/* AI vs Human tasks */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center">
                  <div className="text-lg font-semibold text-guardian-primary-600">
                    {audit.aiTasksComplete}/{audit.aiTasksTotal}
                  </div>
                  <div className="text-xs text-guardian-navy-600">AI Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-guardian-emerald-600">
                    {audit.humanTasksComplete}/{audit.humanTasksTotal}
                  </div>
                  <div className="text-xs text-guardian-navy-600">Human Tasks</div>
                </div>
              </div>

              <div className="flex justify-between text-sm text-guardian-navy-600">
                <span>Due: {formatDate(audit.dueDate)}</span>
                <span>{audit.assignees.length} assignees</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}