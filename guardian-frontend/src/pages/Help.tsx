import React, { useState } from 'react';
import {
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  DocumentTextIcon,
  PlayIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import { cn } from '../utils';

const helpCategories = [
  { id: 'frameworks', name: 'Framework Guides', count: 12 },
  { id: 'playbooks', name: 'Implementation Playbooks', count: 8 },
  { id: 'controls', name: 'Control Guidance', count: 247 },
  { id: 'getting-started', name: 'Getting Started', count: 6 }
];

const helpContent = [
  {
    id: 'soc2-guide',
    title: 'SOC 2 Type II Implementation Guide',
    category: 'frameworks',
    description: 'Complete guide to implementing SOC 2 Type II controls with practical examples and evidence requirements.',
    type: 'Guide',
    readTime: '15 min',
    popularity: 'Most Popular'
  },
  {
    id: 'tls-playbook',
    title: 'Setting up TLS Certificate Monitoring',
    category: 'playbooks',
    description: 'Step-by-step playbook for configuring automated TLS certificate monitoring and alerts.',
    type: 'Playbook',
    readTime: '8 min',
    popularity: 'Trending'
  },
  {
    id: 'access-control',
    title: 'Access Control Implementation (CC6.1)',
    category: 'controls',
    description: 'Detailed guidance on implementing logical and physical access controls for SOC 2 compliance.',
    type: 'Control Guide',
    readTime: '12 min'
  },
  {
    id: 'hipaa-risk-analysis',
    title: 'HIPAA Risk Analysis Playbook',
    category: 'playbooks',
    description: 'Comprehensive approach to conducting HIPAA risk analysis and documentation.',
    type: 'Playbook',
    readTime: '20 min'
  },
  {
    id: 'onboarding',
    title: 'Guardian Platform Onboarding',
    category: 'getting-started',
    description: 'Get started with Guardian: setup, configuration, and first compliance scan.',
    type: 'Tutorial',
    readTime: '10 min',
    popularity: 'Essential'
  }
];

export default function Help() {
  const [selectedCategory, setSelectedCategory] = useState('frameworks');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContent = helpContent.filter(content => {
    const categoryMatch = selectedCategory === 'all' || content.category === selectedCategory;
    const searchMatch = searchQuery === '' || 
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-guardian-navy-900">Help & Compliance Library</h1>
          <p className="mt-1 text-guardian-navy-600">
            Searchable guides, playbooks, and resources for compliance implementation
          </p>
        </div>
        <button className="btn-primary">
          <ChatBubbleLeftRightIcon className="h-4 w-4 mr-2" />
          Contact Support
        </button>
      </div>

      {/* Search */}
      <div className="card p-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-guardian-navy-400" />
          <input
            type="text"
            placeholder="Search guides, controls, and playbooks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-guardian-navy-300 bg-white pl-10 pr-4 py-3 text-sm placeholder-guardian-navy-400 focus:border-guardian-primary-500 focus:outline-none focus:ring-1 focus:ring-guardian-primary-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="card p-4">
        <div className="flex items-center space-x-1 overflow-x-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              selectedCategory === 'all'
                ? 'bg-guardian-primary-100 text-guardian-primary-700'
                : 'text-guardian-navy-600 hover:bg-guardian-navy-50'
            )}
          >
            All Content
          </button>
          {helpCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                'flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                selectedCategory === category.id
                  ? 'bg-guardian-primary-100 text-guardian-primary-700'
                  : 'text-guardian-navy-600 hover:bg-guardian-navy-50'
              )}
            >
              {category.name}
              <span className="ml-2 text-xs bg-guardian-navy-200 text-guardian-navy-600 px-1.5 py-0.5 rounded-full">
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredContent.map((content) => (
          <div key={content.id} className="card p-6 hover:shadow-guardian-lg transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-guardian-primary-100">
                  {content.type === 'Guide' && <BookOpenIcon className="h-5 w-5 text-guardian-primary-600" />}
                  {content.type === 'Playbook' && <PlayIcon className="h-5 w-5 text-guardian-primary-600" />}
                  {content.type === 'Control Guide' && <DocumentTextIcon className="h-5 w-5 text-guardian-primary-600" />}
                  {content.type === 'Tutorial' && <QuestionMarkCircleIcon className="h-5 w-5 text-guardian-primary-600" />}
                </div>
                <div className="ml-3">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-guardian-navy-100 text-guardian-navy-700">
                    {content.type}
                  </span>
                </div>
              </div>
              {content.popularity && (
                <span className={cn(
                  'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                  content.popularity === 'Most Popular' ? 'bg-guardian-emerald-100 text-guardian-emerald-700' :
                  content.popularity === 'Trending' ? 'bg-guardian-amber-100 text-guardian-amber-700' :
                  content.popularity === 'Essential' ? 'bg-guardian-primary-100 text-guardian-primary-700' :
                  'bg-guardian-navy-100 text-guardian-navy-700'
                )}>
                  {content.popularity}
                </span>
              )}
            </div>
            
            <h3 className="text-lg font-medium text-guardian-navy-900 mb-2">{content.title}</h3>
            <p className="text-sm text-guardian-navy-600 mb-4">{content.description}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-guardian-navy-500">
                📖 {content.readTime} read
              </span>
              <button className="text-guardian-primary-600 hover:text-guardian-primary-700 text-sm font-medium">
                Read Guide →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Quick support */}
      <div className="card p-6">
        <h2 className="text-lg font-semibold text-guardian-navy-900 mb-4">Need More Help?</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="text-center p-4 border border-guardian-navy-200 rounded-lg hover:border-guardian-primary-300 transition-colors cursor-pointer">
            <ChatBubbleLeftRightIcon className="h-8 w-8 text-guardian-primary-600 mx-auto mb-2" />
            <h3 className="font-medium text-guardian-navy-900">Live Chat</h3>
            <p className="text-sm text-guardian-navy-600">Get instant help from our support team</p>
          </div>
          <div className="text-center p-4 border border-guardian-navy-200 rounded-lg hover:border-guardian-primary-300 transition-colors cursor-pointer">
            <DocumentTextIcon className="h-8 w-8 text-guardian-primary-600 mx-auto mb-2" />
            <h3 className="font-medium text-guardian-navy-900">Documentation</h3>
            <p className="text-sm text-guardian-navy-600">Comprehensive platform documentation</p>
          </div>
          <div className="text-center p-4 border border-guardian-navy-200 rounded-lg hover:border-guardian-primary-300 transition-colors cursor-pointer">
            <QuestionMarkCircleIcon className="h-8 w-8 text-guardian-primary-600 mx-auto mb-2" />
            <h3 className="font-medium text-guardian-navy-900">Submit Ticket</h3>
            <p className="text-sm text-guardian-navy-600">Create a support ticket for complex issues</p>
          </div>
        </div>
      </div>
    </div>
  );
}