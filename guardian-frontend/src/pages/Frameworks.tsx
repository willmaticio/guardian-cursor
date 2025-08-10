import React, { useState } from 'react';
import {
  ShieldCheckIcon,
  PlayIcon,
  EyeIcon,
  DocumentTextIcon,
  FolderIcon,
  ChartBarIcon,
  UserIcon,
  CalendarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { cn, formatDate, formatRelativeTime, getStatusColor, getScoreColor } from '../utils';
import { mockFrameworks, mockControls } from '../data/mockData';

const industryFilters = [
  { id: 'all', name: 'All Industries', count: 5 },
  { id: 'finance', name: 'Finance', count: 4 },
  { id: 'healthcare', name: 'Healthcare', count: 2 },
  { id: 'technology', name: 'Technology', count: 3 },
  { id: 'education', name: 'Education', count: 2 }
];

const controlTabs = [
  { id: 'controls', name: 'Controls', count: 64 },
  { id: 'tests', name: 'Tests', count: 28 },
  { id: 'gaps', name: 'Gaps', count: 7 },
  { id: 'policies', name: 'Policies', count: 12 },
  { id: 'evidence', name: 'Mapped Evidence', count: 156 },
  { id: 'reports', name: 'Reports', count: 3 }
];

export default function Frameworks() {
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [selectedFramework, setSelectedFramework] = useState<string | null>('soc2');
  const [selectedTab, setSelectedTab] = useState('controls');
  const [selectedControls, setSelectedControls] = useState<string[]>([]);

  const filteredFrameworks = mockFrameworks.filter(framework => 
    selectedIndustry === 'all' || 
    framework.industry.some(ind => ind.toLowerCase().includes(selectedIndustry))
  );

  const currentFramework = mockFrameworks.find(f => f.id === selectedFramework);
  const frameworkControls = mockControls.filter(c => c.frameworkId === selectedFramework);

  const handleSelectAll = () => {
    if (selectedControls.length === frameworkControls.length) {
      setSelectedControls([]);
    } else {
      setSelectedControls(frameworkControls.map(c => c.id));
    }
  };

  const handleSelectControl = (controlId: string) => {
    if (selectedControls.includes(controlId)) {
      setSelectedControls(selectedControls.filter(id => id !== controlId));
    } else {
      setSelectedControls([...selectedControls, controlId]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-guardian-navy-900">Frameworks</h1>
          <p className="mt-1 text-guardian-navy-600">
            Manage compliance frameworks and controls for your organization
          </p>
        </div>
        <button className="btn-primary">Enable Framework</button>
      </div>

      {/* Industry filter */}
      <div className="card p-4">
        <div className="flex items-center space-x-1 overflow-x-auto">
          {industryFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedIndustry(filter.id)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedIndustry === filter.id
                  ? 'bg-guardian-primary-100 text-guardian-primary-700'
                  : 'text-guardian-navy-600 hover:bg-guardian-navy-50'
              )}
            >
              {filter.name}
              <span className="ml-2 text-xs bg-guardian-navy-200 text-guardian-navy-600 px-1.5 py-0.5 rounded-full">
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Framework List */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-guardian-navy-900 mb-4">Available Frameworks</h2>
          <div className="space-y-3">
            {filteredFrameworks.map((framework) => (
              <div
                key={framework.id}
                onClick={() => setSelectedFramework(framework.id)}
                className={cn(
                  'p-4 rounded-lg border-2 cursor-pointer transition-all',
                  selectedFramework === framework.id
                    ? 'border-guardian-primary-300 bg-guardian-primary-50'
                    : 'border-guardian-navy-200 hover:border-guardian-navy-300'
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-guardian-navy-900">{framework.name}</h3>
                  <div className="flex items-center space-x-2">
                    {framework.enabled ? (
                      <CheckCircleIcon className="h-5 w-5 text-guardian-emerald-600" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-guardian-navy-400" />
                    )}
                    {framework.enabled && (
                      <span className={cn('text-lg font-bold', getScoreColor(framework.score))}>
                        {framework.score}%
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-guardian-navy-600 mb-2">{framework.description}</p>
                <div className="flex justify-between text-xs text-guardian-navy-500">
                  <span>{framework.controls} controls</span>
                  <span>{framework.industry.join(', ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Framework Detail */}
        <div className="lg:col-span-2">
          {currentFramework ? (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-guardian-navy-900 flex items-center">
                    {currentFramework.name}
                    {currentFramework.enabled ? (
                      <span className="ml-2 badge-success">Enabled</span>
                    ) : (
                      <span className="ml-2 badge-info">Disabled</span>
                    )}
                  </h2>
                  <p className="text-guardian-navy-600">{currentFramework.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="btn-secondary">
                    <PlayIcon className="h-4 w-4 mr-2" />
                    Run AI Checks
                  </button>
                  <button className="btn-primary">
                    <DocumentTextIcon className="h-4 w-4 mr-2" />
                    Generate Report
                  </button>
                </div>
              </div>

              {/* Framework stats */}
              {currentFramework.enabled && (
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-guardian-navy-50 rounded-lg">
                  <div className="text-center">
                    <div className={cn('text-2xl font-bold', getScoreColor(currentFramework.score))}>
                      {currentFramework.score}%
                    </div>
                    <div className="text-sm text-guardian-navy-600">Compliance Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-guardian-navy-900">{currentFramework.controls}</div>
                    <div className="text-sm text-guardian-navy-600">Total Controls</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-guardian-emerald-600">
                      {Math.round(currentFramework.controls * 0.8)}
                    </div>
                    <div className="text-sm text-guardian-navy-600">Implemented</div>
                  </div>
                </div>
              )}

              {/* Tabs */}
              <div className="border-b border-guardian-navy-200 mb-6">
                <nav className="-mb-px flex space-x-8">
                  {controlTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={cn(
                        'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                        selectedTab === tab.id
                          ? 'border-guardian-primary-500 text-guardian-primary-600'
                          : 'border-transparent text-guardian-navy-500 hover:text-guardian-navy-700 hover:border-guardian-navy-300'
                      )}
                    >
                      {tab.name}
                      <span className="ml-2 bg-guardian-navy-100 text-guardian-navy-600 py-0.5 px-2 rounded-full text-xs">
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Controls tab content */}
              {selectedTab === 'controls' && (
                <div>
                  {/* Bulk actions */}
                  {selectedControls.length > 0 && (
                    <div className="mb-4 p-3 bg-guardian-primary-50 rounded-lg border border-guardian-primary-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-guardian-primary-700">
                          {selectedControls.length} controls selected
                        </span>
                        <div className="flex space-x-2">
                          <button className="btn-secondary text-xs py-1">Assign Owner</button>
                          <button className="btn-secondary text-xs py-1">Set Due Date</button>
                          <button className="btn-primary text-xs py-1">Run AI Checks</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Controls table */}
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                    <table className="min-w-full divide-y divide-guardian-navy-200">
                      <thead className="bg-guardian-navy-50">
                        <tr>
                          <th className="px-6 py-3 text-left">
                            <input
                              type="checkbox"
                              checked={selectedControls.length === frameworkControls.length}
                              onChange={handleSelectAll}
                              className="h-4 w-4 text-guardian-primary-600 focus:ring-guardian-primary-500 border-guardian-navy-300 rounded"
                            />
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                            Control
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                            Owner
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                            Due Date
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                            Evidence
                          </th>
                          <th className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-guardian-navy-200">
                        {frameworkControls.map((control) => (
                          <tr key={control.id} className="hover:bg-guardian-navy-50">
                            <td className="px-6 py-4">
                              <input
                                type="checkbox"
                                checked={selectedControls.includes(control.id)}
                                onChange={() => handleSelectControl(control.id)}
                                className="h-4 w-4 text-guardian-primary-600 focus:ring-guardian-primary-500 border-guardian-navy-300 rounded"
                              />
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-start space-x-3">
                                <div className={cn(
                                  'flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium',
                                  control.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                  control.priority === 'High' ? 'bg-guardian-amber-100 text-guardian-amber-700' :
                                  control.priority === 'Medium' ? 'bg-guardian-primary-100 text-guardian-primary-700' :
                                  'bg-guardian-navy-100 text-guardian-navy-700'
                                )}>
                                  {control.priority.charAt(0)}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium text-guardian-navy-900">{control.id}</p>
                                  <p className="text-sm text-guardian-navy-600 truncate">{control.title}</p>
                                  {control.aiConfidence && (
                                    <div className="mt-1 flex items-center">
                                      <span className="text-xs text-guardian-navy-500">AI Confidence:</span>
                                      <div className="ml-2 w-16 bg-guardian-navy-200 rounded-full h-1.5">
                                        <div 
                                          className={cn(
                                            'h-1.5 rounded-full',
                                            control.aiConfidence >= 0.8 ? 'bg-guardian-emerald-500' :
                                            control.aiConfidence >= 0.6 ? 'bg-guardian-amber-500' :
                                            'bg-red-500'
                                          )}
                                          style={{ width: `${control.aiConfidence * 100}%` }}
                                        />
                                      </div>
                                      <span className="ml-2 text-xs text-guardian-navy-500">
                                        {Math.round(control.aiConfidence * 100)}%
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                                getStatusColor(control.status)
                              )}>
                                {control.status === 'Automated Passed' && <CheckCircleIcon className="h-3 w-3 mr-1" />}
                                {control.status === 'Automated Failed' && <XCircleIcon className="h-3 w-3 mr-1" />}
                                {(control.status === 'Needs Review' || control.status === 'Manual Review Required') && <ClockIcon className="h-3 w-3 mr-1" />}
                                {control.status === 'Not Implemented' && <ExclamationTriangleIcon className="h-3 w-3 mr-1" />}
                                {control.status}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <div className="h-6 w-6 rounded-full bg-guardian-primary-100 flex items-center justify-center mr-2">
                                  <span className="text-xs font-medium text-guardian-primary-700">
                                    {control.owner.split('@')[0].split('.').map(n => n[0]).join('').toUpperCase()}
                                  </span>
                                </div>
                                <span className="text-sm text-guardian-navy-900">
                                  {control.owner.split('@')[0].replace('.', ' ')}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-guardian-navy-900">
                              {control.due ? formatDate(control.due) : '—'}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <FolderIcon className="h-4 w-4 text-guardian-navy-400 mr-1" />
                                <span className="text-sm text-guardian-navy-900">{control.evidenceCount}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-right text-sm font-medium">
                              <button className="text-guardian-primary-600 hover:text-guardian-primary-900">
                                View Details
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Other tab placeholders */}
              {selectedTab !== 'controls' && (
                <div className="text-center py-12">
                  <div className="text-guardian-navy-400 mb-4">
                    <ChartBarIcon className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-guardian-navy-900 mb-2">
                    {controlTabs.find(t => t.id === selectedTab)?.name} View
                  </h3>
                  <p className="text-guardian-navy-600">
                    This section will show {selectedTab} for {currentFramework?.name}.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="card p-12 text-center">
              <ShieldCheckIcon className="h-12 w-12 text-guardian-navy-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-guardian-navy-900 mb-2">Select a Framework</h3>
              <p className="text-guardian-navy-600">
                Choose a framework from the list to view its controls and manage compliance.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}