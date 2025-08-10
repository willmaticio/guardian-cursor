import React, { useState } from 'react';
import {
  ComputerDesktopIcon,
  GlobeAltIcon,
  ServerIcon,
  ShieldCheckIcon,
  PlayIcon,
  PlusIcon,
  EyeIcon,
  Cog6ToothIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { cn, formatDate, formatRelativeTime, getStatusColor } from '../utils';
import { mockMonitors } from '../data/mockData';

const monitorTabs = [
  { id: 'website', name: 'Website Monitors', icon: GlobeAltIcon },
  { id: 'network', name: 'Network Monitors', icon: ServerIcon }
];

const monitorTypes = [
  { id: 'website', name: 'Website Security', description: 'Monitor web applications for security issues' },
  { id: 'tls', name: 'TLS/SSL Certificates', description: 'Track certificate expiration and configuration' },
  { id: 'dns', name: 'DNS Configuration', description: 'Monitor DNS records and security settings' },
  { id: 'network', name: 'Network Ports', description: 'Scan for open ports and network vulnerabilities' },
  { id: 'endpoint', name: 'Endpoint Security', description: 'Monitor endpoint compliance and security' },
  { id: 'cis', name: 'CIS Benchmarks', description: 'Automated CIS benchmark compliance checks' }
];

export default function Monitors() {
  const [selectedTab, setSelectedTab] = useState('website');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const filteredMonitors = mockMonitors.filter(monitor => 
    selectedTab === 'website' 
      ? ['Website', 'TLS', 'DNS'].includes(monitor.type)
      : ['Network', 'Endpoint', 'CIS Benchmark'].includes(monitor.type)
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-guardian-navy-900">Monitors</h1>
          <p className="mt-1 text-guardian-navy-600">
            Continuous monitoring of websites and network infrastructure
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="btn-primary"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Monitor
        </button>
      </div>

      {/* Monitor type tabs */}
      <div className="card p-1">
        <nav className="flex space-x-1">
          {monitorTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={cn(
                'flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedTab === tab.id
                  ? 'bg-guardian-primary-100 text-guardian-primary-700'
                  : 'text-guardian-navy-600 hover:bg-guardian-navy-50'
              )}
            >
              <tab.icon className="h-4 w-4 mr-2" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Monitor cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMonitors.map((monitor) => (
          <div key={monitor.id} className="card p-6 hover:shadow-guardian-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg',
                  monitor.status === 'OK' ? 'bg-guardian-emerald-100' :
                  monitor.status === 'Warning' ? 'bg-guardian-amber-100' :
                  monitor.status === 'Critical' ? 'bg-red-100' :
                  'bg-guardian-navy-100'
                )}>
                  {monitor.type === 'Website' && <GlobeAltIcon className="h-5 w-5 text-guardian-navy-600" />}
                  {monitor.type === 'TLS' && <ShieldCheckIcon className="h-5 w-5 text-guardian-navy-600" />}
                  {monitor.type === 'Network' && <ServerIcon className="h-5 w-5 text-guardian-navy-600" />}
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-guardian-navy-900">{monitor.name}</h3>
                  <p className="text-sm text-guardian-navy-600">{monitor.type}</p>
                </div>
              </div>
              <span className={cn(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                getStatusColor(monitor.status)
              )}>
                {monitor.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-guardian-navy-600">Target</span>
                <span className="text-guardian-navy-900 font-mono">{monitor.target}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-guardian-navy-600">Cadence</span>
                <span className="text-guardian-navy-900">{monitor.cadence}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-guardian-navy-600">Last Run</span>
                <span className="text-guardian-navy-900">{formatRelativeTime(monitor.lastRun)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-guardian-navy-600">Next Run</span>
                <span className="text-guardian-navy-900">{formatRelativeTime(monitor.nextRun)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-guardian-navy-600">Findings</span>
                <span className={cn(
                  'font-medium',
                  monitor.findings === 0 ? 'text-guardian-emerald-600' : 'text-guardian-amber-600'
                )}>
                  {monitor.findings}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-guardian-navy-600">Linked Controls</span>
                <span className="text-guardian-navy-900">{monitor.linkedControls.length}</span>
              </div>
            </div>

            <div className="mt-6 flex space-x-2">
              <button className="flex-1 btn-primary text-xs py-2">
                <PlayIcon className="h-3 w-3 mr-1" />
                Run Now
              </button>
              <button className="flex-1 btn-secondary text-xs py-2">
                <EyeIcon className="h-3 w-3 mr-1" />
                View Results
              </button>
              <button className="px-2 py-2 text-guardian-navy-400 hover:text-guardian-navy-600 hover:bg-guardian-navy-50 rounded">
                <Cog6ToothIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {/* Create new monitor card */}
        <div 
          onClick={() => setShowCreateModal(true)}
          className="card p-6 border-2 border-dashed border-guardian-navy-300 hover:border-guardian-primary-400 cursor-pointer transition-colors"
        >
          <div className="text-center">
            <PlusIcon className="h-12 w-12 text-guardian-navy-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-guardian-navy-900 mb-2">Create New Monitor</h3>
            <p className="text-guardian-navy-600">
              Set up continuous monitoring for your infrastructure
            </p>
          </div>
        </div>
      </div>

      {/* Create Monitor Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-guardian-navy-600/75" onClick={() => setShowCreateModal(false)} />
            <div className="relative bg-white rounded-xl shadow-guardian-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-guardian-navy-900 mb-4">Create New Monitor</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                    Monitor Type
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {monitorTypes.map((type) => (
                      <button
                        key={type.id}
                        className="text-left p-3 rounded-lg border border-guardian-navy-200 hover:border-guardian-primary-300 hover:bg-guardian-primary-50 transition-colors"
                      >
                        <div className="font-medium text-guardian-navy-900">{type.name}</div>
                        <div className="text-sm text-guardian-navy-600">{type.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button className="flex-1 btn-primary">Continue</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}