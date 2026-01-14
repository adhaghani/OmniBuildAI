// Optimization Assistant Types

export type MessageRole = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  createdAt: Date;
  suggestions?: OptimizationSuggestion[];
}

export interface OptimizationSuggestion {
  id: string;
  title: string;
  description: string;
  category: 'Materials' | 'Energy' | 'Water' | 'Design';
  impact: {
    sustainability: number; // Points gained
    cost: string; // e.g. "Low", "Medium", "High"
    difficulty: string;
  };
  actions?: {
    type: 'replace_material' | 'adjust_design';
    targetId: string;
    params: Record<string, unknown>;
  }[];
}
