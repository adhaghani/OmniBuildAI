'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, LayoutGrid, FileCheck, Box, MessageSquare, Settings, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  {
    name: 'Project Overview',
    href: '/dashboard',
    icon: LayoutGrid,
    description: 'Upload & Ingestion',
  },
  {
    name: 'Compliance Auditor',
    href: '/dashboard/compliance',
    icon: FileCheck,
    description: 'Automated Analysis',
  },
  {
    name: '3D Visualization',
    href: '/dashboard/visualization',
    icon: Box,
    description: 'Green Heatmap',
  },
  {
    name: 'Optimization Lab',
    href: '/dashboard/optimization',
    icon: MessageSquare,
    description: 'AI Assistant',
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-60 flex-col border-r bg-slate-900 text-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
          <Building2 className="h-6 w-6 text-white" />
        </div>
        <div>
          <div className="text-lg font-semibold">OmniBuild</div>
          <div className="text-xs text-slate-400">AI Platform</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-6">
        <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Core Functions
        </div>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-slate-800 text-emerald-400'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5" />
              <div className="flex-1">
                <div>{item.name}</div>
                <div className="text-xs text-slate-500">{item.description}</div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-slate-800 px-3 py-4 space-y-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
        <Link
          href="/dashboard/help"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <HelpCircle className="h-5 w-5" />
          <span>Help Center</span>
        </Link>
        
        {/* Project Info */}
        <div className="mt-4 rounded-lg bg-slate-800 p-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
            <span className="text-sm font-medium">Demo Project</span>
          </div>
          <div className="mt-1 text-xs text-slate-400">Nanning Office Tower</div>
        </div>
      </div>
    </div>
  );
}
