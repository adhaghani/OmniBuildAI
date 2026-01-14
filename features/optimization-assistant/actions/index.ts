'use server';

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
    // TODO: Implement Gemini chat session
    // 1. Retrieve project context (BIM data, current score)
    // 2. Format history for Vertex AI
    // 3. Send prompt with "Green Building Expert" persona
    // 4. Parse response for structured suggestions

    console.log('Sending message to AI assistant:', message);

    return {
      response: "I'm analyzing your request against the project's current compliance status. This feature requires the Vertex AI integration.",
      suggestions: [],
    };
  } catch (error) {
    console.error('Chat failed:', error);
    return {
      response: "I apologize, but I'm having trouble connecting to the optimization engine right now.",
    };
  }
}
