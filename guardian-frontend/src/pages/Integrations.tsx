import React, { useState } from 'react';
import {
  Cog8ToothIcon,
  CloudIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  CheckCircleIcon,
  PlusIcon,
  LinkIcon
} from '@heroicons/react/24/outline';
import { cn } from '../utils';

const integrationCategories = [
  { id: 'cloud', name: 'Cloud Providers', icon: CloudIcon },
  { id: 'identity', name: 'Identity & Access', icon: ShieldCheckIcon },
  { id: 'security', name: 'Security Tools', icon: ShieldCheckIcon },
  { id: 'monitoring', name: 'Monitoring & SIEM', icon: ChartBarIcon }
];

const availableIntegrations = [
  {
    id: 'aws',
    name: 'Amazon Web Services',
    category: 'cloud',
    description: 'Monitor AWS resources and security configurations',
    logo: '🏛️',
    status: 'connected',
    lastSync: '2025-08-09T12:00:00Z'
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    category: 'cloud',
    description: 'Azure resource compliance and security monitoring',
    logo: '☁️',
    status: 'available'
  },
  {
    id: 'okta',
    name: 'Okta',
    category: 'identity',
    description: 'Identity and access management integration',
    logo: '🔐',
    status: 'connected',
    lastSync: '2025-08-09T10:30:00Z'
  },
  {
    id: 'crowdstrike',
    name: 'CrowdStrike',
    category: 'security',
    description: 'Endpoint detection and response integration',
    logo: '🛡️',
    status: 'available'
  },
  {
    id: 'splunk',
    name: 'Splunk',
    category: 'monitoring',
    description: 'SIEM and log analysis integration',
    logo: '📊',
    status: 'available'
  }
];

export default function Integrations() {
  const [selectedCategory, setSelectedCategory] = useState('cloud');
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

  const filteredIntegrations = availableIntegrations.filter(
    integration => integration.category === selectedCategory
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-guardian-navy-900">Integrations</h1>
          <p className="mt-1 text-guardian-navy-600">
            Connect Guardian with your existing security and compliance tools
          </p>
        </div>
        <button className="btn-primary">
          <PlusIcon className="h-4 w-4 mr-2" />
          Request Integration
        </button>
      </div>

      {/* Category tabs */}
      <div className="card p-1">
        <nav className="flex space-x-1">
          {integrationCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedCategory === category.id
                  ? 'bg-guardian-primary-100 text-guardian-primary-700'
                  : 'text-guardian-navy-600 hover:bg-guardian-navy-50'
              )}
            >
              <category.icon className="h-4 w-4 mr-2" />
              {category.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Integration cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredIntegrations.map((integration) => (
          <div key={integration.id} className="card p-6 hover:shadow-guardian-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="text-2xl mr-3">{integration.logo}</div>
                <div>
                  <h3 className="font-medium text-guardian-navy-900">{integration.name}</h3>
                  <p className="text-sm text-guardian-navy-600">{integration.description}</p>
                </div>
              </div>
              {integration.status === 'connected' ? (
                <CheckCircleIcon className="h-6 w-6 text-guardian-emerald-600" />
              ) : (
                <div className="h-6 w-6 rounded-full border-2 border-guardian-navy-300" />
              )}
            </div>

            {integration.status === 'connected' && integration.lastSync && (
              <div className="mb-4 p-3 bg-guardian-emerald-50 rounded-lg">
                <div className="text-sm text-guardian-emerald-700">
                  ✓ Connected • Last sync: {new Date(integration.lastSync).toLocaleString()}
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              {integration.status === 'connected' ? (
                <>
                  <button className="flex-1 btn-secondary text-sm">
                    <Cog8ToothIcon className="h-4 w-4 mr-2" />
                    Configure
                  </button>
                  <button className="flex-1 btn-secondary text-sm">
                    Sync Now
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => {
                    setSelectedIntegration(integration.id);
                    setShowConnectionModal(true);
                  }}
                  className="w-full btn-primary text-sm"
                >
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Connect
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Connection Modal */}
      {showConnectionModal && selectedIntegration && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-guardian-navy-600/75" onClick={() => setShowConnectionModal(false)} />
            <div className="relative bg-white rounded-xl shadow-guardian-lg max-w-lg w-full p-6">
              <h3 className="text-lg font-medium text-guardian-navy-900 mb-4">
                Connect {availableIntegrations.find(i => i.id === selectedIntegration)?.name}
              </h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-guardian-navy-50 rounded-lg">
                  <h4 className="font-medium text-guardian-navy-900 mb-2">What this integration provides:</h4>
                  <ul className="text-sm text-guardian-navy-600 space-y-1">
                    <li>• Automated evidence collection</li>
                    <li>• Real-time compliance monitoring</li>
                    <li>• Security configuration assessment</li>
                    <li>• Mapped to relevant compliance controls</li>
                  </ul>
                </div>

                <div>
                  <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                    Connection Method
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center p-3 border border-guardian-navy-200 rounded-lg hover:bg-guardian-navy-50">
                      <input type="radio" name="connection" className="h-4 w-4 text-guardian-primary-600 focus:ring-guardian-primary-500 border-guardian-navy-300 mr-3" defaultChecked />
                      <div>
                        <div className="text-sm font-medium text-guardian-navy-900">OAuth 2.0 (Recommended)</div>
                        <div className="text-xs text-guardian-navy-600">Secure, automated authentication</div>
                      </div>
                    </label>
                    <label className="flex items-center p-3 border border-guardian-navy-200 rounded-lg hover:bg-guardian-navy-50">
                      <input type="radio" name="connection" className="h-4 w-4 text-guardian-primary-600 focus:ring-guardian-primary-500 border-guardian-navy-300 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-guardian-navy-900">API Key</div>
                        <div className="text-xs text-guardian-navy-600">Manual key configuration</div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={() => setShowConnectionModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button className="flex-1 btn-primary">Connect</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}