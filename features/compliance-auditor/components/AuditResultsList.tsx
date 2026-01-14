'use client';

import { CheckCircle, XCircle, AlertCircle, FileText } from 'lucide-react';
import type { AuditResult } from '../types';

interface AuditResultsListProps {
  results: AuditResult[];
  onItemClick?: (result: AuditResult) => void;
}

export function AuditResultsList({ results, onItemClick }: AuditResultsListProps) {
  const getStatusIcon = (status: AuditResult['status']) => {
    switch (status) {
      case 'achieved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusBg = (status: AuditResult['status']) => {
    switch (status) {
      case 'achieved':
        return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800';
      case 'pending':
        return 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800';
      case 'failed':
        return 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800';
    }
  };

  const groupedResults = results.reduce(
    (acc, result) => {
      if (!acc[result.category]) {
        acc[result.category] = [];
      }
      acc[result.category].push(result);
      return acc;
    },
    {} as Record<string, AuditResult[]>
  );

  return (
    <div className="space-y-6">
      {Object.entries(groupedResults).map(([category, categoryResults]) => (
        <div key={category}>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
            {category}
          </h3>
          <div className="space-y-2">
            {categoryResults.map((result) => (
              <div
                key={result.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${getStatusBg(result.status)}`}
                onClick={() => onItemClick?.(result)}
              >
                <div className="flex items-start gap-3">
                  {getStatusIcon(result.status)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{result.creditCode}</span>
                      <span className="text-xs text-muted-foreground">
                        {result.points} pts
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {result.description}
                    </p>
                    {result.documents && result.documents.length > 0 && (
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <FileText className="h-3 w-3" />
                        {result.documents.length} document(s)
                      </div>
                    )}
                    {result.aiExplanation && (
                      <p className="text-xs text-muted-foreground mt-2 italic">
                        AI: {result.aiExplanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
