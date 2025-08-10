import React, { useState } from 'react';
import {
  FolderIcon,
  CloudArrowUpIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  LinkIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  UserIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { cn, formatDate, formatRelativeTime, getStatusColor, getOriginBadge } from '../utils';
import { mockEvidence } from '../data/mockData';

const evidenceFilters = [
  { id: 'all', name: 'All Evidence', count: mockEvidence.length },
  { id: 'pending', name: 'Pending Review', count: mockEvidence.filter(e => e.status === 'Pending Review').length },
  { id: 'approved', name: 'Approved', count: mockEvidence.filter(e => e.status === 'Approved').length },
  { id: 'ai-verified', name: 'AI-Verified', count: mockEvidence.filter(e => e.origin === 'AI-Verified').length }
];

const evidenceTypes = [
  { id: 'document', name: 'Document', icon: DocumentTextIcon },
  { id: 'screenshot', name: 'Screenshot', icon: EyeIcon },
  { id: 'certificate', name: 'Certificate', icon: ShieldCheckIcon },
  { id: 'policy', name: 'Policy', icon: DocumentTextIcon },
  { id: 'scan', name: 'Scan Result', icon: ShieldCheckIcon }
];

export default function Evidence() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<string[]>([]);

  const filteredEvidence = mockEvidence.filter(evidence => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'pending') return evidence.status === 'Pending Review';
    if (selectedFilter === 'approved') return evidence.status === 'Approved';
    if (selectedFilter === 'ai-verified') return evidence.origin === 'AI-Verified';
    return true;
  });

  const handleSelectAll = () => {
    if (selectedEvidence.length === filteredEvidence.length) {
      setSelectedEvidence([]);
    } else {
      setSelectedEvidence(filteredEvidence.map(e => e.id));
    }
  };

  const handleSelectEvidence = (evidenceId: string) => {
    if (selectedEvidence.includes(evidenceId)) {
      setSelectedEvidence(selectedEvidence.filter(id => id !== evidenceId));
    } else {
      setSelectedEvidence([...selectedEvidence, evidenceId]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-guardian-navy-900">Evidence Vault</h1>
          <p className="mt-1 text-guardian-navy-600">
            Centralized repository for compliance evidence and artifacts
          </p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="btn-primary"
        >
          <CloudArrowUpIcon className="h-4 w-4 mr-2" />
          Upload Evidence
        </button>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex items-center space-x-1 overflow-x-auto">
          {evidenceFilters.map((filter) => (
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

      {/* Evidence table */}
      <div className="card">
        {/* Bulk actions */}
        {selectedEvidence.length > 0 && (
          <div className="p-4 bg-guardian-primary-50 border-b border-guardian-primary-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-guardian-primary-700">
                {selectedEvidence.length} items selected
              </span>
              <div className="flex space-x-2">
                <button className="btn-secondary text-xs py-1">
                  <LinkIcon className="h-3 w-3 mr-1" />
                  Map to Controls
                </button>
                <button className="btn-secondary text-xs py-1">
                  <CheckCircleIcon className="h-3 w-3 mr-1" />
                  Approve
                </button>
                <button className="btn-secondary text-xs py-1">
                  <UserIcon className="h-3 w-3 mr-1" />
                  Assign Reviewer
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-guardian-navy-200">
            <thead className="bg-guardian-navy-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedEvidence.length === filteredEvidence.length}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-guardian-primary-600 focus:ring-guardian-primary-500 border-guardian-navy-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                  Evidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                  Origin
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                  Controls
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-guardian-navy-500 uppercase tracking-wider">
                  Uploaded
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-guardian-navy-200">
              {filteredEvidence.map((evidence) => {
                const originBadge = getOriginBadge(evidence.origin);
                return (
                  <tr key={evidence.id} className="hover:bg-guardian-navy-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedEvidence.includes(evidence.id)}
                        onChange={() => handleSelectEvidence(evidence.id)}
                        className="h-4 w-4 text-guardian-primary-600 focus:ring-guardian-primary-500 border-guardian-navy-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8">
                          {evidence.type === 'Document' && <DocumentTextIcon className="h-8 w-8 text-guardian-navy-400" />}
                          {evidence.type === 'Certificate' && <ShieldCheckIcon className="h-8 w-8 text-guardian-navy-400" />}
                          {evidence.type === 'Policy' && <DocumentTextIcon className="h-8 w-8 text-guardian-navy-400" />}
                          {evidence.type === 'Scan Result' && <ShieldCheckIcon className="h-8 w-8 text-guardian-navy-400" />}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-guardian-navy-900">{evidence.name}</div>
                          <div className="text-sm text-guardian-navy-500">{evidence.type} • {evidence.fileSize}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        originBadge.className
                      )}>
                        {originBadge.text}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        getStatusColor(evidence.status)
                      )}>
                        {evidence.status === 'Approved' && <CheckCircleIcon className="h-3 w-3 mr-1" />}
                        {evidence.status === 'Rejected' && <XCircleIcon className="h-3 w-3 mr-1" />}
                        {evidence.status === 'Pending Review' && <ClockIcon className="h-3 w-3 mr-1" />}
                        {evidence.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {evidence.controls.slice(0, 2).map((controlId) => (
                          <span key={controlId} className="inline-block bg-guardian-navy-100 text-guardian-navy-700 px-2 py-1 rounded text-xs font-mono">
                            {controlId}
                          </span>
                        ))}
                        {evidence.controls.length > 2 && (
                          <span className="text-xs text-guardian-navy-500">
                            +{evidence.controls.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-guardian-navy-900">
                        {formatDate(evidence.uploadedAt)}
                      </div>
                      <div className="text-sm text-guardian-navy-500">
                        by {evidence.uploadedBy === 'system' ? 'System' : evidence.uploadedBy.split('@')[0]}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-guardian-primary-600 hover:text-guardian-primary-900">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button className="text-guardian-navy-400 hover:text-guardian-navy-600">
                          <LinkIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Evidence Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <div className="fixed inset-0 bg-guardian-navy-600/75" onClick={() => setShowUploadModal(false)} />
            <div className="relative bg-white rounded-xl shadow-guardian-lg max-w-lg w-full p-6">
              <h3 className="text-lg font-medium text-guardian-navy-900 mb-4">Upload Evidence</h3>
              
              {/* Drag and drop area */}
              <div className="border-2 border-dashed border-guardian-navy-300 rounded-lg p-8 text-center hover:border-guardian-primary-400 transition-colors">
                <CloudArrowUpIcon className="h-12 w-12 text-guardian-navy-400 mx-auto mb-4" />
                <p className="text-sm text-guardian-navy-600 mb-2">
                  Drag and drop files here, or click to browse
                </p>
                <p className="text-xs text-guardian-navy-500">
                  Supports PDF, DOC, PNG, JPG, JSON (max 10MB)
                </p>
                <button className="mt-4 btn-secondary text-sm">Browse Files</button>
              </div>

              {/* Metadata form */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                    Evidence Type
                  </label>
                  <select className="w-full rounded-lg border border-guardian-navy-300 px-3 py-2 text-sm focus:border-guardian-primary-500 focus:outline-none focus:ring-1 focus:ring-guardian-primary-500">
                    <option>Select type...</option>
                    {evidenceTypes.map((type) => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                    Map to Controls (AI will suggest)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Search controls or frameworks..."
                      className="flex-1 rounded-lg border border-guardian-navy-300 px-3 py-2 text-sm focus:border-guardian-primary-500 focus:outline-none focus:ring-1 focus:ring-guardian-primary-500"
                    />
                    <button className="btn-secondary text-sm">AI Suggest</button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-guardian-navy-700 mb-2">
                    Assign Reviewer
                  </label>
                  <select className="w-full rounded-lg border border-guardian-navy-300 px-3 py-2 text-sm focus:border-guardian-primary-500 focus:outline-none focus:ring-1 focus:ring-guardian-primary-500">
                    <option>Select reviewer...</option>
                    <option>Sarah Chen (Compliance Manager)</option>
                    <option>Emily Johnson (Admin)</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button className="flex-1 btn-primary">Upload & Map</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}