import { VertexAI } from '@google-cloud/vertexai';

// Initialize Vertex AI
// Note: Requires GOOGLE_APPLICATION_CREDENTIALS or GCLOUD_PROJECT env vars
const project = process.env.GCLOUD_PROJECT || 'omnibuild-ai';
const location = 'us-central1';

const vertexAI = new VertexAI({ project, location });

export const geminiModel = vertexAI.getGenerativeModel({
  model: 'gemini-1.5-pro-preview-0409',
  generationConfig: {
    maxOutputTokens: 2048,
    temperature: 0.2,
    topP: 0.8,
    topK: 40,
  },
});

export const geminiFlashModel = vertexAI.getGenerativeModel({
  model: 'gemini-1.5-flash-preview-0514', // Faster, cheaper for simple tasks
  generationConfig: {
    maxOutputTokens: 1024,
    temperature: 0.1,
  },
});
