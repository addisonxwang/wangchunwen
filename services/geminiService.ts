import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PORTFOLIO_OWNER, OWNER_BIO, EXPERIENCES, PROJECTS, MILESTONES } from '../constants';

// Initialize Gemini Client
// IMPORTANT: API Key is assumed to be in process.env.API_KEY as per instructions.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are a friendly and professional AI assistant for ${PORTFOLIO_OWNER}'s personal portfolio website.
Your goal is to answer visitor questions about ${PORTFOLIO_OWNER} based on the following context.

Bio: ${OWNER_BIO}

${MILESTONES.length > 0 ? `Key Milestones & Achievements:\n${MILESTONES.map(m => `- ${m.title}: ${m.description}`).join('\n')}` : ''}

${EXPERIENCES.length > 0 ? `Experience:\n${EXPERIENCES.map(e => `- ${e.role} at ${e.company} (${e.period}): ${e.description}`).join('\n')}` : ''}

${PROJECTS.length > 0 ? `Projects:\n${PROJECTS.map(p => `- ${p.title}: ${p.description} (Tags: ${p.tags.join(', ')})`).join('\n')}` : ''}

Guidelines:
- Keep answers concise, professional, yet warm.
- If asked about contact info, refer them to the social links on the page.
- Do not make up facts.
`;

export const sendMessageToGemini = async (userMessage: string): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    // Extract text directly from the response object property
    return response.text || "I'm having trouble thinking of a response right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm currently unable to connect to the AI service. Please try again later.";
  }
};