import React, { useState } from 'react';
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  Cog6ToothIcon,
  PlusIcon,
  ShareIcon,
  CalendarIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { cn, formatDate } from '../utils';

const reportTemplates = [
  {
    id: 'executive-summary',
    name: 'Executive Summary',
    description: 'High-level compliance overview for leadership',
    frameworks: ['SOC 2', 'ISO 27001'],
    lastGenerated: '2025-08-05T10:00:00Z',
    icon: DocumentTextIcon,
    color: 'bg-guardian-primary-100 text-guardian-primary-600'
  },
  {
    id: 'auditor-package',
    name: 'Auditor Package',
    description: 'Complete evidence package for external auditors',
    frameworks: ['SOC 2'],
    lastGenerated: '2025-08-01T14:30:00Z',
    icon: DocumentTextIcon,
    color: 'bg-guardian-emerald-100 text-guardian-emerald-600'
  },
  {
    id: 'customer-assurance',
    name: 'Customer Assurance',
    description: 'Trust portal ready compliance summary',
    frameworks: ['SOC 2', 'ISO 27001', 'GDPR'],
    lastGenerated: '2025-07-28T09:15:00Z',
    icon: DocumentTextIcon,
    color: 'bg-guardian-amber-100 text-guardian-amber-600'
  },
  {
    id: 'evidence-index',
    name: 'Evidence Index',
    description: 'Comprehensive listing of all compliance evidence',
    frameworks: ['All'],
    lastGenerated: '2025-08-08T16:45:00Z',
    icon: DocumentTextIcon,
    color: 'bg-guardian-navy-100 text-guardian-navy-600'
  }
];

const recentReports = [
  {
    id: 'report-1',
    name: 'SOC 2 Type II Executive Summary Q3 2025',
    template: 'Executive Summary',
    createdAt: '2025-08-05T10:00:00Z',
    createdBy: 'Sarah Chen',
    status: 'Ready',
    size: '2.4 MB'
  },
  {
    id: 'report-2',
    name: 'ISO 27001 Evidence Package July 2025',
    template: 'Auditor Package',
    createdAt: '2025-08-01T14:30:00Z',
    createdBy: 'Michael Rodriguez',
    status: 'Ready',
    size: '15.7 MB'
  },
  {
    id: 'report-3',
    name: 'Customer Trust Report Q2 2025',
    template: 'Customer Assurance',
    createdAt: '2025-07-28T09:15:00Z',
    createdBy: 'Sarah Chen',
    status: 'Shared',
    size: '1.8 MB'
  }
];

export default function Reports() {
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-guardian-navy-900">Reports</h1>
          <p className="mt-1 text-guardian-navy-600">
            Generate and manage compliance reports for stakeholders
          </p>
        </div>
        <button 
          onClick={() => setShowBuilderModal(true)}
          className="btn-primary"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Create Report
        </button>
      </div>

      {/* Report templates */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-guardian-navy-900 mb-4">Report Templates</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {reportTemplates.map((template) => (
            <div key={template.id} className="border border-guardian-navy-200 rounded-lg p-4 hover:border-guardian-primary-300 transition-colors">
              <div className="flex items-center mb-3">
                <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg', template.color)}>
                  <template.icon className="h-5 w-5" />
                </div>
                <h3 className="ml-3 font-medium text-guardian-navy-900">{template.name}</h3>
              </div>
              <p className="text-sm text-guardian-navy-600 mb-3">{template.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-guardian-navy-500">
                  <span>Frameworks</span>
                  <span>{template.frameworks.join(', ')}</span>
                </div>
                <div className="flex justify-between text-xs text-guardian-navy-500">
                  <span>Last Generated</span>
                  <span>{formatDate(template.lastGenerated)}</span>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <button 
                  onClick={() => {
                    setSelectedTemplate(template.id);
                    setShowBuilderModal(true);
                  }}
                  className="flex-1 btn-primary text-xs py-2"
                >
                  Generate
                </button>
                <button className="px-2 py-2 text-guardian-navy-400 hover:text-guardian-navy-600 hover:bg-guardian-navy-50 rounded">
                  <Cog6ToothIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent reports */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-guardian-navy-900 mb-4">Recent Reports</h2>
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-guardian-navy-200">
            <thead className="bg-guardian-navy-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                  Report
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                  Template
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-guardian-navy-200">
              {recentReports.map((report) => (
                <tr key={report.id} className="hover:bg-guardian-navy-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-8 w-8 text-guardian-navy-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-guardian-navy-900">{report.name}</div>
                        <div className="text-sm text-guardian-navy-500">Created by {report.createdBy}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-guardian-navy-900">{report.template}</td>
                  <td className="px-6 py-4 text-sm text-guardian-navy-900">{formatDate(report.createdAt)}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                      report.status === 'Ready' ? 'bg-guardian-emerald-100 text-guardian-emerald-800' :
                      report.status === 'Shared' ? 'bg-guardian-primary-100 text-guardian-primary-800' :
                      'bg-guardian-navy-100 text-guardian-navy-800'
                    )}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-guardian-navy-900">{report.size}</td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-guardian-primary-600 hover:text-guardian-primary-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-guardian-navy-400 hover:text-guardian-navy-600">
                        <ArrowDownTrayIcon className="h-4 w-4" />
                      </button>
                      <button className="text-guardian-navy-400 hover:text-guardian-navy-600">
                        <ShareIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Report Builder Modal */}
      {showBuilderModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-guardian-navy-600/75" onClick={() => setShowBuilderModal(false)} />
            <div className="relative bg-white rounded-xl shadow-guardian-lg max-w-3xl w-full p-6">
              <h3 className="text-lg font-medium text-guardian-navy-900 mb-6">Report Builder</h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                      Report Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Q3 2025 Compliance Summary"
                      className="w-full rounded-lg border border-guardian-navy-300 px-3 py-2 text-sm focus:border-guardian-primary-500 focus:outline-none focus:ring-1 focus:ring-guardian-primary-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                      Template
                    </label>
                    <select className="w-full rounded-lg border border-guardian-navy-300 px-3 py-2 text-sm focus:border-guardian-primary-500 focus:outline-none focus:ring-1 focus:ring-guardian-primary-500">
                      <option>Select template...</option>
                      {reportTemplates.map((template) => (
                        <option key={template.id} value={template.id}>{template.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-lg border border-guardian-navy-300 px-3 py-2 text-sm focus:border-guardian-primary-500 focus:outline-none focus:ring-1 focus:ring-guardian-primary-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-lg border border-guardian-navy-300 px-3 py-2 text-sm focus:border-guardian-primary-500 focus:outline-none focus:ring-1 focus:ring-guardian-primary-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                      Include Sections
                    </label>
                    <div className="space-y-2">
                      {[
                        'Executive Summary',
                        'Framework Compliance Status',
                        'Control Test Results',
                        'Evidence Inventory',
                        'Risk Assessment',
                        'Remediation Plan'
                      ].map((section) => (
                        <label key={section} className="flex items-center">
                          <input type="checkbox" defaultChecked className="h-4 w-4 text-guardian-primary-600 focus:ring-guardian-primary-500 border-guardian-navy-300 rounded mr-3" />
                          <span className="text-sm text-guardian-navy-900">{section}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                      Export Format
                    </label>
                    <div className="space-y-2">
                      {['PDF Report', 'CSV Data Export', 'JSON API Export', 'Sharable Link'].map((format) => (
                        <label key={format} className="flex items-center">
                          <input type="checkbox" defaultChecked={format === 'PDF Report'} className="h-4 w-4 text-guardian-primary-600 focus:ring-guardian-primary-500 border-guardian-navy-300 rounded mr-3" />
                          <span className="text-sm text-guardian-navy-900">{format}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex space-x-3">
                <button 
                  onClick={() => setShowBuilderModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button className="btn-secondary">
                  <EyeIcon className="h-4 w-4 mr-2" />
                  Preview
                </button>
                <button className="btn-primary">
                  <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}