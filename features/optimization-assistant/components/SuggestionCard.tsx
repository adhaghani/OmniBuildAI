'use client';

import { ArrowRight, Leaf, TrendingUp, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { OptimizationSuggestion } from '../types';

interface SuggestionCardProps {
  suggestion: OptimizationSuggestion;
  onApply?: () => void;
}

export function SuggestionCard({ suggestion, onApply }: SuggestionCardProps) {
  return (
    <div className="bg-card border rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-semibold text-sm">{suggestion.title}</h4>
        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
          {suggestion.category}
        </span>
      </div>

      <p className="text-xs text-muted-foreground mb-3">
        {suggestion.description}
      </p>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-1.5 text-xs">
          <Leaf className="h-3.5 w-3.5 text-green-500" />
          <span className="font-medium text-green-600">
            +{suggestion.impact.sustainability} pts
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <DollarSign className="h-3.5 w-3.5 text-blue-500" />
          <span className="font-medium text-blue-600">
            {suggestion.impact.cost} est.
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        className="w-full text-xs h-8"
        onClick={onApply}
      >
        Apply Suggestion <ArrowRight className="ml-1 h-3 w-3" />
      </Button>
    </div>
  );
}
