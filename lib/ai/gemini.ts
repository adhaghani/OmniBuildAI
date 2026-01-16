import OpenAI from 'openai';

// Initialize OpenAI client for DeepSeek V3.2
// DeepSeek uses OpenAI-compatible API
const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com',
});

export const deepseekModel = openai;

// Main model for complex tasks (DeepSeek V3.2)
export const generateContent = async (prompt: string, options?: {
  maxTokens?: number;
  temperature?: number;
}) => {
  const response = await openai.chat.completions.create({
    model: 'deepseek-chat',
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: options?.maxTokens || 2048,
    temperature: options?.temperature || 0.2,
    top_p: 0.8,
  });

  return response.choices[0].message.content || '';
};

// Fast model for simpler tasks (DeepSeek V3.2 with lower temperature)
export const generateContentFast = async (prompt: string) => {
  return generateContent(prompt, {
    maxTokens: 1024,
    temperature: 0.1,
  });
};
