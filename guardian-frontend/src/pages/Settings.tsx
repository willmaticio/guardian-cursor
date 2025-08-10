import React, { useState } from 'react';
import {
  UsersIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  ClockIcon,
  GlobeAltIcon,
  CreditCardIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { cn, formatDate } from '../utils';
import { mockUsers, mockOrganization } from '../data/mockData';

const settingsTabs = [
  { id: 'organization', name: 'Organization', icon: BuildingOfficeIcon },
  { id: 'users', name: 'Users & Roles', icon: UsersIcon },
  { id: 'frameworks', name: 'Framework Settings', icon: ShieldCheckIcon },
  { id: 'automation', name: 'Automation', icon: ClockIcon },
  { id: 'privacy', name: 'Data & Privacy', icon: GlobeAltIcon },
  { id: 'billing', name: 'Billing', icon: CreditCardIcon }
];

const rolePermissions = {
  'Owner': ['All permissions', 'Billing management', 'User management', 'Organization settings'],
  'Admin': ['User management', 'Framework configuration', 'Report generation', 'Evidence approval'],
  'Compliance Manager': ['Audit management', 'Control approval', 'Report generation', 'Evidence review'],
  'Analyst': ['Evidence collection', 'Control testing', 'Monitor configuration'],
  'Read-Only': ['View dashboards', 'View reports', 'View evidence'],
  'External Auditor': ['Scoped framework access', 'Evidence review', 'Report generation']
};

export default function Settings() {
  const [selectedTab, setSelectedTab] = useState('organization');
  const [showInviteModal, setShowInviteModal] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-guardian-navy-900">Team & Settings</h1>
        <p className="mt-1 text-guardian-navy-600">
          Manage your organization, team members, and system configuration
        </p>
      </div>

      {/* Settings tabs */}
      <div className="card p-1">
        <nav className="flex space-x-1 overflow-x-auto">
          {settingsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={cn(
                'flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
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

      {/* Organization tab */}
      {selectedTab === 'organization' && (
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-guardian-navy-900 mb-4">Organization Profile</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    defaultValue={mockOrganization.name}
                    className="w-full rounded-lg border border-guardian-navy-300 px-3 py-2 text-sm focus:border-guardian-primary-500 focus:outline-none focus:ring-1 focus:ring-guardian-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                    Industry Tags
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {mockOrganization.industry.map((industry) => (
                      <span key={industry} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-guardian-primary-100 text-guardian-primary-700">
                        {industry}
                        <button className="ml-2 text-guardian-primary-500 hover:text-guardian-primary-700">
                          <XMarkIcon className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                    <button className="inline-flex items-center px-3 py-1 rounded-full text-sm border border-guardian-navy-300 text-guardian-navy-600 hover:bg-guardian-navy-50">
                      <PlusIcon className="h-3 w-3 mr-1" />
                      Add Industry
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                    Regions
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {mockOrganization.regions.map((region) => (
                      <span key={region} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-guardian-emerald-100 text-guardian-emerald-700">
                        {region}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                    Time Zone
                  </label>
                  <select className="w-full rounded-lg border border-guardian-navy-300 px-3 py-2 text-sm focus:border-guardian-primary-500 focus:outline-none focus:ring-1 focus:ring-guardian-primary-500">
                    <option value={mockOrganization.timeZone}>{mockOrganization.timeZone}</option>
                    <option>America/Los_Angeles</option>
                    <option>Europe/London</option>
                    <option>Asia/Tokyo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                    Verified Domains
                  </label>
                  <div className="space-y-2">
                    {mockOrganization.domains.map((domain) => (
                      <div key={domain} className="flex items-center justify-between p-2 border border-guardian-navy-200 rounded-lg">
                        <span className="text-sm text-guardian-navy-900 font-mono">{domain}</span>
                        <span className="badge-success">Verified</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button className="btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Users tab */}
      {selectedTab === 'users' && (
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-guardian-navy-900">Team Members</h2>
              <button 
                onClick={() => setShowInviteModal(true)}
                className="btn-primary"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Invite User
              </button>
            </div>

            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
              <table className="min-w-full divide-y divide-guardian-navy-200">
                <thead className="bg-guardian-navy-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-guardian-navy-200">
                  {mockUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-guardian-navy-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-guardian-primary-100 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-guardian-primary-700">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-guardian-navy-900">{user.name}</div>
                            <div className="text-sm text-guardian-navy-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-guardian-navy-100 text-guardian-navy-800">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-guardian-navy-900">
                        {formatDate(user.lastActive)}
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-guardian-primary-600 hover:text-guardian-primary-900">
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Role permissions */}
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-guardian-navy-900 mb-4">Role Permissions</h2>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {Object.entries(rolePermissions).map(([role, permissions]) => (
                <div key={role} className="border border-guardian-navy-200 rounded-lg p-4">
                  <h3 className="font-medium text-guardian-navy-900 mb-2">{role}</h3>
                  <ul className="space-y-1">
                    {permissions.map((permission) => (
                      <li key={permission} className="text-sm text-guardian-navy-600 flex items-center">
                        <CheckCircleIcon className="h-3 w-3 text-guardian-emerald-600 mr-2" />
                        {permission}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other tabs placeholder */}
      {selectedTab !== 'organization' && selectedTab !== 'users' && (
        <div className="card p-12 text-center">
          <div className="text-guardian-navy-400 mb-4">
            {(() => {
              const tab = settingsTabs.find(t => t.id === selectedTab);
              if (tab?.icon) {
                const IconComponent = tab.icon;
                return <IconComponent className="h-12 w-12 mx-auto" />;
              }
              return null;
            })()}
          </div>
          <h3 className="text-lg font-medium text-guardian-navy-900 mb-2">
            {settingsTabs.find(t => t.id === selectedTab)?.name} Settings
          </h3>
          <p className="text-guardian-navy-600">
            This section will contain {selectedTab} configuration options.
          </p>
        </div>
      )}

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-guardian-navy-600/75" onClick={() => setShowInviteModal(false)} />
            <div className="relative bg-white rounded-xl shadow-guardian-lg max-w-md w-full p-6">
              <h3 className="text-lg font-medium text-guardian-navy-900 mb-4">Invite Team Member</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="colleague@acmefinancial.com"
                    className="w-full rounded-lg border border-guardian-navy-300 px-3 py-2 text-sm focus:border-guardian-primary-500 focus:outline-none focus:ring-1 focus:ring-guardian-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                    Role
                  </label>
                  <select className="w-full rounded-lg border border-guardian-navy-300 px-3 py-2 text-sm focus:border-guardian-primary-500 focus:outline-none focus:ring-1 focus:ring-guardian-primary-500">
                    <option>Select role...</option>
                    {Object.keys(rolePermissions).map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                    Framework Access (optional)
                  </label>
                  <div className="space-y-2">
                    {['SOC 2', 'ISO 27001', 'PCI DSS', 'GDPR'].map((framework) => (
                      <label key={framework} className="flex items-center">
                        <input type="checkbox" className="h-4 w-4 text-guardian-primary-600 focus:ring-guardian-primary-500 border-guardian-navy-300 rounded mr-3" />
                        <span className="text-sm text-guardian-navy-900">{framework}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={() => setShowInviteModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button className="flex-1 btn-primary">Send Invitation</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}