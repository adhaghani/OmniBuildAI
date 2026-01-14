'use client';

import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import type { StandardGap } from '../types';

interface TranslationResultProps {
  gaps: StandardGap[];
  isLoading?: boolean;
}

export function TranslationResult({ gaps, isLoading }: TranslationResultProps) {
  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        <div className="h-20 bg-muted rounded-lg" />
        <div className="h-20 bg-muted rounded-lg" />
        <div className="h-20 bg-muted rounded-lg" />
      </div>
    );
  }

  if (gaps.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
        <h3 className="text-lg font-medium">Select standards to compare</h3>
        <p className="text-muted-foreground">
          Identify gaps between green building certifications automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg flex items-center gap-2">
        Gap Analysis Report
        <span className="text-sm font-normal text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {gaps.length} Requirement(s) Identified
        </span>
      </h3>

      <div className="grid gap-4">
        {gaps.map((gap) => (
          <div
            key={gap.id}
            className={`p-4 rounded-lg border-l-4 shadow-sm bg-card ${
              gap.severity === 'high'
                ? 'border-l-red-500'
                : gap.severity === 'medium'
                ? 'border-l-yellow-500'
                : 'border-l-blue-500'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-1">
                {gap.severity === 'high' ? (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                ) : gap.severity === 'medium' ? (
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-blue-500" />
                )}
              </div>
              
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{gap.title}</h4>
                  <span className="text-xs font-medium uppercase text-muted-foreground border px-2 py-0.5 rounded">
                    {gap.category}
                  </span>
                </div>
                
                <p className="text-sm text-foreground/90 description">
                  {gap.description}
                </p>

                <div className="grid md:grid-cols-2 gap-4 mt-3 bg-muted/50 p-3 rounded text-sm">
                  <div>
                    <span className="font-medium text-muted-foreground block text-xs mb-1">
                      Current (Source)
                    </span>
                    <p>{gap.currentValue}</p>
                  </div>
                  <div>
                    <span className="font-medium text-muted-foreground block text-xs mb-1">
                      Required (Target)
                    </span>
                    <p className="font-medium">{gap.requiredValue}</p>
                  </div>
                </div>

                {gap.actionRequired && (
                  <div className="text-sm bg-blue-50 dark:bg-blue-950 p-3 rounded-md text-blue-800 dark:text-blue-200 mt-2">
                    <strong>Action Required:</strong> {gap.actionRequired}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
