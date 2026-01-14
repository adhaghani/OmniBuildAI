// Compliance Auditor Types

export type ComplianceStandard = 'GBL' | 'GBI' | 'LEED' | 'BREEAM';

export type AuditStatus = 'achieved' | 'pending' | 'failed';

export interface AuditResult {
  id: string;
  creditCode: string;
  category: string;
  description: string;
  status: AuditStatus;
  points: number;
  maxPoints: number;
  documents?: string[];
  aiExplanation?: string;
}

export interface ComplianceScore {
  standard: ComplianceStandard;
  totalScore: number;
  maxScore: number;
  level: string;
  results: AuditResult[];
}

export interface DocumentAnalysis {
  filename: string;
  type: 'pdf' | 'ifc' | 'image' | 'spreadsheet';
  extractedData: Record<string, unknown>;
  relevantCredits: string[];
}

export interface AuditProject {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  targetStandard: ComplianceStandard;
  documents: DocumentAnalysis[];
  scores: ComplianceScore[];
}
