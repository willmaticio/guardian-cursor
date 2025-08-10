import React, { useState } from 'react';
import {
  ExclamationTriangleIcon,
  FunnelIcon,
  CheckIcon,
  UserIcon,
  ClockIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { cn, formatDate, formatRelativeTime, getStatusColor, getSeverityColor } from '../utils';
import { mockAlerts } from '../data/mockData';

const alertFilters = [
  { id: 'all', name: 'All Alerts', count: mockAlerts.length },
  { id: 'new', name: 'New', count: mockAlerts.filter(a => a.state === 'New').length },
  { id: 'assigned', name: 'Assigned', count: mockAlerts.filter(a => a.state === 'Assigned').length },
  { id: 'acknowledged', name: 'Acknowledged', count: mockAlerts.filter(a => a.state === 'Acknowledged').length }
];

const severityFilters = [
  { id: 'all', name: 'All Severities' },
  { id: 'critical', name: 'Critical' },
  { id: 'high', name: 'High' },
  { id: 'medium', name: 'Medium' },
  { id: 'low', name: 'Low' }
];

export default function Alerts() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  const filteredAlerts = mockAlerts.filter(alert => {
    const stateMatch = selectedFilter === 'all' || alert.state.toLowerCase() === selectedFilter;
    const severityMatch = selectedSeverity === 'all' || alert.severity.toLowerCase() === selectedSeverity;
    return stateMatch && severityMatch;
  });

  const currentAlert = mockAlerts.find(a => a.id === selectedAlert);

  const handleSelectAll = () => {
    if (selectedAlerts.length === filteredAlerts.length) {
      setSelectedAlerts([]);
    } else {
      setSelectedAlerts(filteredAlerts.map(a => a.id));
    }
  };

  const handleSelectAlert = (alertId: string) => {
    if (selectedAlerts.includes(alertId)) {
      setSelectedAlerts(selectedAlerts.filter(id => id !== alertId));
    } else {
      setSelectedAlerts([...selectedAlerts, alertId]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-guardian-navy-900">Alerts</h1>
          <p className="mt-1 text-guardian-navy-600">
            Monitor and triage compliance alerts and issues
          </p>
        </div>
        <button className="btn-primary">
          Alert Policies
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-guardian-navy-700 mb-2">Filter by Status</h3>
          <div className="flex items-center space-x-1 overflow-x-auto">
            {alertFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={cn(
                  'flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  selectedFilter === filter.id
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
        
        <div>
          <h3 className="text-sm font-medium text-guardian-navy-700 mb-2">Filter by Severity</h3>
          <div className="flex items-center space-x-1 overflow-x-auto">
            {severityFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedSeverity(filter.id)}
                className={cn(
                  'flex-shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                  selectedSeverity === filter.id
                    ? 'bg-guardian-primary-100 text-guardian-primary-700'
                    : 'text-guardian-navy-600 hover:bg-guardian-navy-50'
                )}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Alerts list */}
        <div className="lg:col-span-2">
          <div className="card">
            {/* Bulk actions */}
            {selectedAlerts.length > 0 && (
              <div className="p-4 bg-guardian-primary-50 border-b border-guardian-primary-200">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-guardian-primary-700">
                    {selectedAlerts.length} alerts selected
                  </span>
                  <div className="flex space-x-2">
                    <button className="btn-secondary text-xs py-1">
                      <CheckIcon className="h-3 w-3 mr-1" />
                      Acknowledge
                    </button>
                    <button className="btn-secondary text-xs py-1">
                      <UserIcon className="h-3 w-3 mr-1" />
                      Assign
                    </button>
                    <button className="btn-secondary text-xs py-1">
                      <ClockIcon className="h-3 w-3 mr-1" />
                      Snooze
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Alert list */}
            <div className="divide-y divide-guardian-navy-200">
              <div className="p-4 bg-guardian-navy-50">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedAlerts.length === filteredAlerts.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-guardian-primary-600 focus:ring-guardian-primary-500 border-guardian-navy-300 rounded"
                  />
                  <span className="ml-3 text-sm font-medium text-guardian-navy-700">
                    Select All ({filteredAlerts.length} alerts)
                  </span>
                </div>
              </div>
              
              {filteredAlerts.map((alert) => (
                <div 
                  key={alert.id} 
                  onClick={() => setSelectedAlert(alert.id)}
                  className="p-4 hover:bg-guardian-navy-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedAlerts.includes(alert.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSelectAlert(alert.id);
                      }}
                      className="mt-1 h-4 w-4 text-guardian-primary-600 focus:ring-guardian-primary-500 border-guardian-navy-300 rounded"
                    />
                    
                    <div className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold',
                      getSeverityColor(alert.severity)
                    )}>
                      !
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-guardian-navy-900 truncate">
                          {alert.title}
                        </h3>
                        <span className="text-xs text-guardian-navy-500">
                          {formatRelativeTime(alert.createdAt)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-guardian-navy-600 truncate">
                        {alert.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-4">
                        <span className="text-xs text-guardian-navy-500">{alert.source}</span>
                        <span className={cn(
                          'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                          getStatusColor(alert.state)
                        )}>
                          {alert.state}
                        </span>
                        {alert.assignee && (
                          <span className="text-xs text-guardian-navy-500">
                            Assigned to {alert.assignee.split('@')[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alert detail panel */}
        <div>
          {currentAlert ? (
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-guardian-navy-900">Alert Details</h3>
                <button 
                  onClick={() => setSelectedAlert(null)}
                  className="text-guardian-navy-400 hover:text-guardian-navy-600"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <span className={cn(
                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border',
                    getSeverityColor(currentAlert.severity)
                  )}>
                    {currentAlert.severity} Severity
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-guardian-navy-900 mb-1">Title</h4>
                  <p className="text-sm text-guardian-navy-700">{currentAlert.title}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-guardian-navy-900 mb-1">Description</h4>
                  <p className="text-sm text-guardian-navy-700">{currentAlert.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-guardian-navy-900 mb-1">Source</h4>
                  <p className="text-sm text-guardian-navy-700">{currentAlert.source}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-guardian-navy-900 mb-1">Impacted Controls</h4>
                  <div className="space-y-1">
                    {currentAlert.impactedControls.map((controlId) => (
                      <span key={controlId} className="inline-block bg-guardian-navy-100 text-guardian-navy-700 px-2 py-1 rounded text-xs font-mono mr-1">
                        {controlId}
                      </span>
                    ))}
                  </div>
                </div>

                {currentAlert.remediation && (
                  <div>
                    <h4 className="text-sm font-medium text-guardian-navy-900 mb-1">Suggested Remediation</h4>
                    <p className="text-sm text-guardian-navy-700">{currentAlert.remediation}</p>
                  </div>
                )}

                <div>
                  <h4 className="text-sm font-medium text-guardian-navy-900 mb-1">Created</h4>
                  <p className="text-sm text-guardian-navy-700">
                    {formatDate(currentAlert.createdAt)} ({formatRelativeTime(currentAlert.createdAt)})
                  </p>
                </div>
              </div>

              {/* Quick actions */}
              <div className="mt-6 space-y-2">
                <button className="w-full btn-primary text-sm">
                  <CheckIcon className="h-4 w-4 mr-2" />
                  Acknowledge Alert
                </button>
                <button className="w-full btn-secondary text-sm">
                  <UserIcon className="h-4 w-4 mr-2" />
                  Assign to Team Member
                </button>
                <button className="w-full btn-secondary text-sm">
                  <ChatBubbleLeftIcon className="h-4 w-4 mr-2" />
                  Add Comment
                </button>
                <button className="w-full btn-secondary text-sm">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  Snooze for 24h
                </button>
              </div>
            </div>
          ) : (
            <div className="card p-6 text-center">
              <ExclamationTriangleIcon className="h-12 w-12 text-guardian-navy-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-guardian-navy-900 mb-2">Select an Alert</h3>
              <p className="text-guardian-navy-600">
                Choose an alert from the list to view details and take action.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}