'use client';

import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ComplianceScoreCardProps {
  standard: 'GBL' | 'GBI' | 'LEED' | 'BREEAM';
  score: number;
  maxScore: number;
  level: string;
  achievedCredits: number;
  pendingCredits: number;
  failedCredits: number;
}

export function ComplianceScoreCard({
  standard,
  score,
  maxScore,
  level,
  achievedCredits,
  pendingCredits,
  failedCredits,
}: ComplianceScoreCardProps) {
  const percentage = Math.round((score / maxScore) * 100);

  const getStandardColor = (std: string) => {
    const colors: Record<string, string> = {
      GBL: 'from-green-500 to-emerald-600',
      GBI: 'from-blue-500 to-cyan-600',
      LEED: 'from-lime-500 to-green-600',
      BREEAM: 'from-teal-500 to-emerald-600',
    };
    return colors[std] || 'from-gray-500 to-gray-600';
  };

  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
      <div
        className={`bg-gradient-to-r ${getStandardColor(standard)} p-4 text-white`}
      >
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">{standard}</span>
          <span className="text-2xl font-bold">{level}</span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold">{percentage}%</div>
          <div className="text-sm text-muted-foreground">
            {score} / {maxScore} points
          </div>
        </div>

        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getStandardColor(standard)} transition-all duration-500`}
            style={{ width: `${percentage}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="p-2 bg-green-50 dark:bg-green-950 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 mx-auto mb-1" />
            <div className="font-medium text-green-600">{achievedCredits}</div>
            <div className="text-xs text-muted-foreground">Achieved</div>
          </div>
          <div className="p-2 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
            <AlertCircle className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
            <div className="font-medium text-yellow-600">{pendingCredits}</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
          <div className="p-2 bg-red-50 dark:bg-red-950 rounded-lg">
            <XCircle className="h-5 w-5 text-red-600 mx-auto mb-1" />
            <div className="font-medium text-red-600">{failedCredits}</div>
            <div className="text-xs text-muted-foreground">Failed</div>
          </div>
        </div>
      </div>
    </div>
  );
}
