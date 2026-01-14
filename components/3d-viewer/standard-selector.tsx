'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

export interface Standard {
  id: string;
  name: string;
  flag: string;
  score: number;
}

const standards: Standard[] = [
  { id: 'china-gbl', name: 'China GBL', flag: '🇨🇳', score: 76 },
  { id: 'malaysia-gbi', name: 'Malaysia GBI', flag: '🇲🇾', score: 68 },
];

export interface StandardSelectorProps {
  onStandardChange?: (standard: Standard) => void;
}

export function StandardSelector({ onStandardChange }: StandardSelectorProps) {
  const [activeStandard, setActiveStandard] = useState(standards[0]);

  const handleStandardChange = (standard: Standard) => {
    setActiveStandard(standard);
    onStandardChange?.(standard);
  };

  return (
    <div className="flex items-center gap-2">
      {standards.map((standard) => {
        const isActive = activeStandard.id === standard.id;
        return (
          <button
            key={standard.id}
            onClick={() => handleStandardChange(standard)}
            className={cn(
              'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all',
              isActive
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border'
            )}
          >
            <span className="text-xl">{standard.flag}</span>
            <span>{standard.name}</span>
            <span className={cn(
              'ml-1 font-semibold',
              isActive ? 'text-white' : 'text-emerald-600'
            )}>
              {standard.score}%
            </span>
          </button>
        );
      })}
      
      {/* Compare button */}
      <button className="flex h-10 w-10 items-center justify-center rounded-lg border bg-white hover:bg-gray-50 transition-colors">
        <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      </button>
    </div>
  );
}
