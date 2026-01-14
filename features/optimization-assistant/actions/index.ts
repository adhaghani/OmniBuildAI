'use server';

import { geminiModel } from '@/src/lib/ai/gemini';
import type { ChatMessage, OptimizationSuggestion } from '../types';

/**
 * Sends a user message to Gemini and retrieves optimization suggestions
 * Maintains conversation context related to the specific project
 */
export async function sendOptimizationMessage(
  projectId: string,
  message: string,
  history: ChatMessage[]
): Promise<{
  response: string;
  suggestions?: OptimizationSuggestion[];
}> {
  try {
    // Build conversation context
    const conversationHistory = history
      .map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n\n');

    const systemPrompt = `You are an expert AI assistant for green building optimization specializing in China-ASEAN construction standards (GBL, GBI, LEED, BREEAM).

Project ID: ${projectId}

Previous Conversation:
${conversationHistory}

Current User Message: ${message}

Your role is to:
1. Answer questions about green building compliance
2. Suggest specific, actionable improvements with cost-benefit analysis
3. Recommend local suppliers and materials (China-ASEAN region)
4. Explain compliance requirements in simple, practical terms
5. Provide quantified impact (e.g., "This will add 5 points to your Energy Efficiency score")

Format your response in a helpful, conversational tone. If you identify optimization opportunities, mention them clearly.`;

    const result = await geminiModel.generateContent(systemPrompt);
    const response = await result.response.text();

    // Try to extract structured suggestions from response
    const suggestions = extractOptimizationSuggestions(response);

    return {
      response,
      suggestions,
    };
  } catch (error) {
    console.error('Chat failed:', error);
    return {
      response: "I apologize, but I'm having trouble connecting to the optimization engine. Please try again.",
    };
  }
}

/**
 * Generates optimization suggestions based on current project state
 */
export async function generateOptimizationSuggestions(
  projectId: string,
  currentScore: number,
  targetScore: number,
  standard: string
): Promise<OptimizationSuggestion[]> {
  try {
    const prompt = `Generate specific optimization suggestions for a green building project.

Project ID: ${projectId}
Standard: ${standard}
Current Score: ${currentScore} points
Target Score: ${targetScore} points
Gap: ${targetScore - currentScore} points needed

Provide 5-7 actionable suggestions with:
- Title (brief, action-oriented)
- Description (what to do and specific why)
- Impact level: high/medium/low (based on points gained)
- Cost level: high/medium/low
- Related credits (e.g., ["EE-3", "EE-7"])
- Estimated points gained

Format as a JSON array.`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response.text();

    try {
      // Try to parse JSON from response
      const jsonMatch = response.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('Failed to parse suggestions:', e);
    }

    // Return default suggestions if parsing fails
    return getDefaultSuggestions();
  } catch (error) {
    console.error('Suggestion generation failed:', error);
    return getDefaultSuggestions();
  }
}

/**
 * Helper: Extract suggestions from AI response
 */
function extractOptimizationSuggestions(response: string): OptimizationSuggestion[] {
  try {
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // Silently fail and return empty array
  }
  return [];
}

/**
 * Helper: Default suggestions for fallback
 */
function getDefaultSuggestions(): OptimizationSuggestion[] {
  return [
    {
      id: '1',
      title: 'Upgrade to Low-E Glass',
      description: 'Replace standard glass with Low-E coated glass to improve thermal performance and reduce HVAC load',
      impact: 'high',
      cost: 'medium',
      credits: ['EE-3', 'EE-7'],
    },
    {
      id: '2',
      title: 'Install Rainwater Harvesting',
      description: 'Add rainwater collection system (50m³ capacity) for irrigation and toilet flushing',
      impact: 'medium',
      cost: 'low',
      credits: ['WC-2'],
    },
  ];
}
