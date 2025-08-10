import React, { useState } from 'react';
import {
  ClipboardDocumentListIcon,
  PlusIcon,
  PlayIcon,
  EyeIcon,
  CheckCircleIcon,
  ClockIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  CpuChipIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { cn, formatDate, formatRelativeTime, getStatusColor } from '../utils';
import { mockAudits } from '../data/mockData';

const auditSteps = [
  { id: 'plan', name: 'Plan', description: 'Define scope and requirements' },
  { id: 'collect', name: 'Collect', description: 'Gather evidence and artifacts' },
  { id: 'test', name: 'Test', description: 'Execute control testing' },
  { id: 'review', name: 'Review', description: 'Human review and validation' },
  { id: 'report', name: 'Report', description: 'Generate audit report' },
  { id: 'signoff', name: 'Sign-off', description: 'Final approval and closure' }
];

export default function Audits() {
  const [selectedView, setSelectedView] = useState('overview');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAudit, setSelectedAudit] = useState<string | null>('audit-1');

  const currentAudit = mockAudits.find(a => a.id === selectedAudit);

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-guardian-navy-900">Audits</h1>
          <p className="mt-1 text-guardian-navy-600">
            Manage compliance audits with AI automation and human oversight
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          New Audit
        </button>
      </div>

      {/* View selector */}
      <div className="card p-1">
        <nav className="flex space-x-1">
          {[
            { id: 'overview', name: 'Audit Overview' },
            { id: 'taskboard', name: 'Task Board' },
            { id: 'timeline', name: 'Timeline' }
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setSelectedView(view.id)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedView === view.id
                  ? 'bg-guardian-primary-100 text-guardian-primary-700'
                  : 'text-guardian-navy-600 hover:bg-guardian-navy-50'
              )}
            >
              {view.name}
            </button>
          ))}
        </nav>
      </div>

      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Audit list */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {mockAudits.map((audit) => (
                <div 
                  key={audit.id} 
                  onClick={() => setSelectedAudit(audit.id)}
                  className={cn(
                    'card p-6 cursor-pointer transition-all',
                    selectedAudit === audit.id ? 'ring-2 ring-guardian-primary-500' : 'hover:shadow-guardian-lg'
                  )}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-medium text-guardian-navy-900">{audit.name}</h3>
                      <p className="text-sm text-guardian-navy-600">
                        {audit.frameworks.join(', ')} • {audit.assignees.length} assignees
                      </p>
                    </div>
                    <span className={cn(
                      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                      getStatusColor(audit.status)
                    )}>
                      {audit.status}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-guardian-navy-600 mb-2">
                      <span>Overall Progress</span>
                      <span>{audit.progress}%</span>
                    </div>
                    <div className="w-full bg-guardian-navy-200 rounded-full h-2">
                      <div 
                        className={cn(
                          'h-2 rounded-full transition-all duration-500',
                          audit.status === 'Overdue' ? 'bg-red-500' : 'bg-gradient-to-r from-guardian-primary-500 to-guardian-primary-600'
                        )}
                        style={{ width: `${audit.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* AI vs Human tasks */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-guardian-primary-50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <CpuChipIcon className="h-4 w-4 text-guardian-primary-600 mr-1" />
                        <span className="text-sm font-medium text-guardian-primary-700">AI Tasks</span>
                      </div>
                      <div className="text-xl font-bold text-guardian-primary-600">
                        {audit.aiTasksComplete}/{audit.aiTasksTotal}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-guardian-emerald-50 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <UserIcon className="h-4 w-4 text-guardian-emerald-600 mr-1" />
                        <span className="text-sm font-medium text-guardian-emerald-700">Human Tasks</span>
                      </div>
                      <div className="text-xl font-bold text-guardian-emerald-600">
                        {audit.humanTasksComplete}/{audit.humanTasksTotal}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-guardian-navy-600">
                    <span>Started: {formatDate(audit.startDate)}</span>
                    <span className={cn(
                      'font-medium',
                      audit.status === 'Overdue' ? 'text-red-600' : 'text-guardian-navy-900'
                    )}>
                      Due: {formatDate(audit.dueDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit detail */}
          <div>
            {currentAudit ? (
              <div className="card p-6">
                <h3 className="text-lg font-medium text-guardian-navy-900 mb-4">Audit Progress</h3>
                
                {/* Stepper */}
                <div className="space-y-4">
                  {auditSteps.map((step, stepIdx) => {
                    const isCompleted = stepIdx < Math.floor(currentAudit.progress / 16.67);
                    const isCurrent = stepIdx === Math.floor(currentAudit.progress / 16.67);
                    
                    return (
                      <div key={step.id} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className={cn(
                            'flex h-8 w-8 items-center justify-center rounded-full',
                            isCompleted ? 'bg-guardian-emerald-100 text-guardian-emerald-600' :
                            isCurrent ? 'bg-guardian-primary-100 text-guardian-primary-600' :
                            'bg-guardian-navy-100 text-guardian-navy-400'
                          )}>
                            {isCompleted ? (
                              <CheckCircleIcon className="h-5 w-5" />
                            ) : (
                              <span className="text-sm font-medium">{stepIdx + 1}</span>
                            )}
                          </div>
                        </div>
                        <div className="ml-3 flex-1">
                          <p className={cn(
                            'text-sm font-medium',
                            isCompleted || isCurrent ? 'text-guardian-navy-900' : 'text-guardian-navy-500'
                          )}>
                            {step.name}
                          </p>
                          <p className="text-xs text-guardian-navy-600">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Quick actions */}
                <div className="mt-6 space-y-2">
                  <button className="w-full btn-primary text-sm">
                    <PlayIcon className="h-4 w-4 mr-2" />
                    Continue Audit
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    <EyeIcon className="h-4 w-4 mr-2" />
                    View Details
                  </button>
                  <button className="w-full btn-secondary text-sm">
                    <UserGroupIcon className="h-4 w-4 mr-2" />
                    Manage Team
                  </button>
                </div>
              </div>
            ) : (
              <div className="card p-6 text-center">
                <ClipboardDocumentListIcon className="h-12 w-12 text-guardian-navy-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-guardian-navy-900 mb-2">Select an Audit</h3>
                <p className="text-guardian-navy-600">
                  Choose an audit from the list to view progress and manage tasks.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {selectedView === 'taskboard' && currentAudit && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* AI Tasks */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <CpuChipIcon className="h-5 w-5 text-guardian-primary-600 mr-2" />
                <h3 className="text-lg font-medium text-guardian-navy-900">AI Tasks</h3>
              </div>
              <span className="text-sm text-guardian-navy-600">
                {currentAudit.aiTasksComplete}/{currentAudit.aiTasksTotal} completed
              </span>
            </div>
            
            <div className="space-y-3">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className={cn(
                  'p-3 rounded-lg border',
                  i < currentAudit.aiTasksComplete ? 'border-guardian-emerald-200 bg-guardian-emerald-50' : 'border-guardian-navy-200'
                )}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {i < currentAudit.aiTasksComplete ? (
                        <CheckCircleIcon className="h-4 w-4 text-guardian-emerald-600 mr-2" />
                      ) : (
                        <ClockIcon className="h-4 w-4 text-guardian-navy-400 mr-2" />
                      )}
                      <span className="text-sm font-medium text-guardian-navy-900">
                        Verify control SOC2-CC{i + 1}.{i + 1}
                      </span>
                    </div>
                    <span className="text-xs text-guardian-navy-500">
                      {i < currentAudit.aiTasksComplete ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Human Tasks */}
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <UserIcon className="h-5 w-5 text-guardian-emerald-600 mr-2" />
                <h3 className="text-lg font-medium text-guardian-navy-900">Human Tasks</h3>
              </div>
              <span className="text-sm text-guardian-navy-600">
                {currentAudit.humanTasksComplete}/{currentAudit.humanTasksTotal} completed
              </span>
            </div>
            
            <div className="space-y-3">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className={cn(
                  'p-3 rounded-lg border',
                  i < currentAudit.humanTasksComplete ? 'border-guardian-emerald-200 bg-guardian-emerald-50' : 'border-guardian-navy-200'
                )}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {i < currentAudit.humanTasksComplete ? (
                        <CheckCircleIcon className="h-4 w-4 text-guardian-emerald-600 mr-2" />
                      ) : (
                        <ClockIcon className="h-4 w-4 text-guardian-navy-400 mr-2" />
                      )}
                      <span className="text-sm font-medium text-guardian-navy-900">
                        Review evidence for CC{i + 1}.{i + 1}
                      </span>
                    </div>
                    <span className="text-xs text-guardian-navy-500">
                      {i < currentAudit.humanTasksComplete ? 'Completed' : 'Assigned to Sarah'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Audit Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-guardian-navy-600/75" onClick={() => setShowCreateModal(false)} />
            <div className="relative bg-white rounded-xl shadow-guardian-lg max-w-2xl w-full p-6">
              <h3 className="text-lg font-medium text-guardian-navy-900 mb-6">New Audit Wizard</h3>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                      Audit Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., SOC 2 Type II Annual Audit"
                      className="w-full rounded-lg border border-guardian-navy-300 px-3 py-2 text-sm focus:border-guardian-primary-500 focus:outline-none focus:ring-1 focus:ring-guardian-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                      Due Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-lg border border-guardian-navy-300 px-3 py-2 text-sm focus:border-guardian-primary-500 focus:outline-none focus:ring-1 focus:ring-guardian-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                    Select Frameworks
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {mockAudits[0].frameworks.map((framework) => (
                      <label key={framework} className="flex items-center p-3 border border-guardian-navy-200 rounded-lg hover:bg-guardian-navy-50">
                        <input type="checkbox" className="h-4 w-4 text-guardian-primary-600 focus:ring-guardian-primary-500 border-guardian-navy-300 rounded mr-3" />
                        <span className="text-sm text-guardian-navy-900">{framework.toUpperCase()}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                    Assign Team Members
                  </label>
                  <div className="space-y-2">
                    {['Sarah Chen (Compliance Manager)', 'Michael Rodriguez (Analyst)', 'Emily Johnson (Admin)'].map((member) => (
                      <label key={member} className="flex items-center p-2 border border-guardian-navy-200 rounded-lg hover:bg-guardian-navy-50">
                        <input type="checkbox" className="h-4 w-4 text-guardian-primary-600 focus:ring-guardian-primary-500 border-guardian-navy-300 rounded mr-3" />
                        <span className="text-sm text-guardian-navy-900">{member}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button className="flex-1 btn-primary">Create Audit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}