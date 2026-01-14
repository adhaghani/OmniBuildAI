'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowRightLeft } from 'lucide-react';
import type { ComplianceStandard } from '../../compliance-auditor/types';

interface StandardSelectorProps {
  fromStandard: ComplianceStandard;
  toStandard: ComplianceStandard;
  onFromChange: (val: ComplianceStandard) => void;
  onToChange: (val: ComplianceStandard) => void;
}

export function StandardSelector({
  fromStandard,
  toStandard,
  onFromChange,
  onToChange,
}: StandardSelectorProps) {
  const standards: ComplianceStandard[] = ['GBL', 'GBI', 'LEED', 'BREEAM'];

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 bg-card p-6 rounded-lg border shadow-sm">
      <div className="flex-1 w-full space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Source Standard (Current Design)
        </label>
        <Select value={fromStandard} onValueChange={onFromChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select standard" />
          </SelectTrigger>
          <SelectContent>
            {standards.map((std) => (
              <SelectItem key={`from-${std}`} value={std}>
                {std}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="hidden md:flex items-center justify-center pt-6">
        <div className="bg-muted p-2 rounded-full">
          <ArrowRightLeft className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      <div className="flex-1 w-full space-y-2">
        <label className="text-sm font-medium text-muted-foreground">
          Target Standard (Translation)
        </label>
        <Select value={toStandard} onValueChange={onToChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select standard" />
          </SelectTrigger>
          <SelectContent>
            {standards.map((std) => (
              <SelectItem
                key={`to-${std}`}
                value={std}
                disabled={std === fromStandard}
              >
                {std}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
