import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  HomeIcon,
  ShieldCheckIcon,
  ComputerDesktopIcon,
  ClipboardDocumentListIcon,
  FolderIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  Cog8ToothIcon,
  UsersIcon,
  QuestionMarkCircleIcon,
  Bars3Icon,
  XMarkIcon,
  MagnifyingGlassIcon,
  BellIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { cn } from '../utils';
import { mockCurrentUser, mockOrganization } from '../data/mockData';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, current: true },
  { name: 'Frameworks', href: '/frameworks', icon: ShieldCheckIcon, badge: 2 },
  { name: 'Monitors', href: '/monitors', icon: ComputerDesktopIcon },
  { name: 'Audits', href: '/audits', icon: ClipboardDocumentListIcon, badge: 1 },
  { name: 'Evidence', href: '/evidence', icon: FolderIcon },
  { name: 'Alerts', href: '/alerts', icon: ExclamationTriangleIcon, badge: 3 },
  { name: 'Reports', href: '/reports', icon: DocumentTextIcon },
  { name: 'Integrations', href: '/integrations', icon: Cog8ToothIcon },
  { name: 'Team & Settings', href: '/settings', icon: UsersIcon },
  { name: 'Help', href: '/help', icon: QuestionMarkCircleIcon }
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-guardian-navy-50">
      {/* Mobile sidebar */}
      <div className={cn(
        'fixed inset-0 z-50 lg:hidden',
        sidebarOpen ? 'block' : 'hidden'
      )}>
        <div className="fixed inset-0 bg-guardian-navy-600/75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-guardian-primary-600">
                <ShieldCheckIcon className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-lg font-semibold text-guardian-navy-900">Guardian</span>
            </div>
            <button
              type="button"
              className="text-guardian-navy-400 hover:text-guardian-navy-600"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <nav className="mt-8 px-4">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={cn(
                      'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      item.current
                        ? 'bg-guardian-primary-50 text-guardian-primary-700'
                        : 'text-guardian-navy-600 hover:bg-guardian-navy-50 hover:text-guardian-navy-900'
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                    {item.badge && (
                      <span className="ml-auto inline-flex items-center justify-center rounded-full bg-guardian-primary-600 px-2 py-1 text-xs font-medium text-white">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col bg-white border-r border-guardian-navy-200 shadow-sm">
          <div className="flex h-16 items-center px-6">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-guardian-primary-600">
                <ShieldCheckIcon className="h-5 w-5 text-white" />
              </div>
              <span className="ml-2 text-lg font-semibold text-guardian-navy-900">Guardian</span>
            </div>
          </div>
          <nav className="flex-1 px-4 py-4">
            <ul className="space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={cn(
                      'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      item.current
                        ? 'bg-guardian-primary-50 text-guardian-primary-700'
                        : 'text-guardian-navy-600 hover:bg-guardian-navy-50 hover:text-guardian-navy-900'
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
                    {item.name}
                    {item.badge && (
                      <span className="ml-auto inline-flex items-center justify-center rounded-full bg-guardian-primary-600 px-2 py-1 text-xs font-medium text-white">
                        {item.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-guardian-navy-200 shadow-sm">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6">
            <div className="flex items-center">
              <button
                type="button"
                className="text-guardian-navy-500 hover:text-guardian-navy-600 lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
              
              {/* Organization switcher */}
              <div className="ml-4 lg:ml-0">
                <button className="flex items-center rounded-lg border border-guardian-navy-300 bg-white px-3 py-2 text-sm font-medium text-guardian-navy-700 hover:bg-guardian-navy-50">
                  <div className="mr-2 h-6 w-6 rounded bg-guardian-primary-100 flex items-center justify-center">
                    <span className="text-xs font-semibold text-guardian-primary-700">
                      {mockOrganization.name.charAt(0)}
                    </span>
                  </div>
                  {mockOrganization.name}
                  <ChevronDownIcon className="ml-2 h-4 w-4" />
                </button>
              </div>

              {/* Environment badge */}
              <div className="ml-3 hidden sm:block">
                <span className="inline-flex items-center rounded-full bg-guardian-emerald-100 px-2.5 py-0.5 text-xs font-medium text-guardian-emerald-800">
                  Production
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Global search */}
              <div className="hidden sm:block">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-guardian-navy-400" />
                  <input
                    type="text"
                    placeholder="Search controls, alerts, evidence..."
                    className="w-64 rounded-lg border border-guardian-navy-300 bg-white pl-10 pr-4 py-2 text-sm placeholder-guardian-navy-400 focus:border-guardian-primary-500 focus:outline-none focus:ring-1 focus:ring-guardian-primary-500"
                  />
                </div>
              </div>

              {/* Notifications */}
              <button className="relative rounded-lg p-2 text-guardian-navy-400 hover:bg-guardian-navy-50 hover:text-guardian-navy-600">
                <BellIcon className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>

              {/* User menu */}
              <div className="flex items-center">
                <button className="flex items-center rounded-lg p-2 text-sm font-medium text-guardian-navy-700 hover:bg-guardian-navy-50">
                  <div className="h-8 w-8 rounded-full bg-guardian-primary-100 flex items-center justify-center mr-2">
                    <span className="text-sm font-medium text-guardian-primary-700">
                      {mockCurrentUser.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="hidden sm:block">{mockCurrentUser.name}</span>
                  <ChevronDownIcon className="ml-1 h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 pb-16 lg:pb-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-guardian-navy-200 lg:hidden">
        <nav className="flex">
          {navigation.slice(0, 5).map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                'flex-1 flex flex-col items-center py-2 px-1 text-xs font-medium transition-colors',
                item.current
                  ? 'text-guardian-primary-700'
                  : 'text-guardian-navy-600'
              )}
            >
              <div className="relative">
                <item.icon className="h-6 w-6" />
                {item.badge && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-guardian-primary-600 text-white text-xs flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="mt-1 truncate">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  );
}