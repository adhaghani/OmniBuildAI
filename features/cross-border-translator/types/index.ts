// Cross-Border Translator Types
import type { ComplianceStandard } from '../../compliance-auditor/types';

export type GapSeverity = 'high' | 'medium' | 'low';

export interface StandardGap {
  id: string;
  title: string;
  category: string; // e.g., 'Water Efficiency', 'Energy'
  description: string;
  currentValue: string; // value in source standard
  requiredValue: string; // value in target standard
  severity: GapSeverity;
  actionRequired?: string;
  sourceCredit?: string;
  targetCredit?: string;
}

export interface TranslationRequest {
  projectId: string;
  sourceStandard: ComplianceStandard;
  targetStandard: ComplianceStandard;
}
