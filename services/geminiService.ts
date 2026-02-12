
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

// Configuration for all available engines.
// Strictly using process.env.API_KEY for Gemini as per guidelines.
const AI_ENGINES = [
  { name: 'Gemini Primary', provider: 'gemini', key: process.env.API_KEY },
  { name: 'Groq Primary', provider: 'groq', key: process.env.GROQ_KEY_1, model: 'llama-3.3-70b-versatile' },
  { name: 'OpenRouter Primary', provider: 'openrouter', key: process.env.OPENROUTER_KEY_1, model: 'google/gemini-2.0-flash-exp:free' },
];

/**
 * Universal call function with failover logic.
 * Updated to support optional file parts for document analysis.
 */
async function callMultiAi(
  prompt: string, 
  isJson: boolean = false, 
  systemInstruction: string = "You are a professional career assistant. Provide plain text responses without any markdown, asterisks, or headings.",
  file?: { data: string, mimeType: string }
): Promise<string> {
  let lastError = null;

  for (const engine of AI_ENGINES) {
    if (!engine.key) continue;

    try {
      console.log(`Attempting with: ${engine.name}...`);
      
      if (engine.provider === 'gemini') {
        // Initializing with named parameter apiKey from process.env.API_KEY.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
        
        // Using recommended models based on task complexity.
        // Document analysis and JSON tasks use gemini-3-pro-preview.
        const modelName = (isJson || file) ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview';
        
        const parts: any[] = [{ text: prompt }];
        if (file) {
          parts.push({
            inlineData: {
              data: file.data,
              mimeType: file.mimeType
            }
          });
        }

        const response = await ai.models.generateContent({
          model: modelName,
          contents: { parts },
          config: {
            systemInstruction: systemInstruction,
            responseMimeType: isJson ? 'application/json' : 'text/plain',
          }
        });
        
        // Accessing text property directly (not as a function).
        if (response.text) return response.text.replace(/[*#_~`]/g, '').trim();
      } 
      
      else if (engine.provider === 'groq' || engine.provider === 'openrouter') {
        const url = engine.provider === 'groq' 
          ? 'https://api.groq.com/openai/v1/chat/completions' 
          : 'https://openrouter.ai/api/v1/chat/completions';
          
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${engine.key}`,
            'Content-Type': 'application/json',
            ...(engine.provider === 'openrouter' ? { 'HTTP-Referer': window.location.origin, 'X-Title': 'Career Forge' } : {})
          },
          body: JSON.stringify({
            model: engine.model,
            messages: [
              { role: 'system', content: systemInstruction },
              { role: 'user', content: prompt }
            ],
            response_format: isJson ? { type: 'json_object' } : undefined
          })
        });

        const data = await response.json();
        if (data.choices?.[0]?.message?.content) {
          return data.choices[0].message.content.replace(/[*#_~`]/g, '').trim();
        }
      }
    } catch (e) {
      console.warn(`${engine.name} failed:`, e);
      lastError = e;
    }
  }

  throw lastError || new Error("All AI Engines failed to respond.");
}

export const getAIInsights = async (data: ResumeData): Promise<string[]> => {
  const prompt = `Analyze this resume data and provide 3 highly specific plain-text professional suggestions. Output as a JSON array of strings only. Data: ${JSON.stringify(data)}`;
  try {
    const res = await callMultiAi(prompt, true);
    return JSON.parse(res);
  } catch (error) {
    return ["Quantify your achievements.", "Add a certifications section.", "Refine your executive summary."];
  }
};

export const suggestSectionContent = async (sectionTitle: string, jobTitle: string): Promise<string> => {
  const prompt = `Write a professional 3-sentence paragraph for a resume section titled "${sectionTitle}" for a "${jobTitle}" role. Plain text only, no markdown.`;
  return await callMultiAi(prompt);
};

export const optimizeExperienceDescription = async (text: string): Promise<string> => {
  const prompt = `Rewrite this experience description using STAR method. Use plain text bullet points starting with - . No bolding. Text: ${text}`;
  return await callMultiAi(prompt);
};

/**
 * Fixed analyzeATS signature to accept 3 arguments (including optional file) 
 * to resolve the TypeScript error in ATSChecker.tsx.
 */
export const analyzeATS = async (
  resumeData: ResumeData | null, 
  jobDescription: string, 
  file?: { name: string, data: string, mimeType: string }
) => {
  const prompt = `Analyze this resume against this job description. Resume: ${JSON.stringify(resumeData)}. JD: ${jobDescription}. Output a JSON with score (0-100), matchAnalysis (string), missingKeywords (array), formattingIssues (array), improvementSuggestions (array).`;
  try {
    const res = await callMultiAi(prompt, true, undefined, file);
    return JSON.parse(res);
  } catch (error) {
    throw error;
  }
};

export const applyATSFixes = async (resumeData: ResumeData, jobDescription: string): Promise<ResumeData> => {
  const prompt = `Rewrite the Summary and Experience in this JSON to match the Job Description. DO NOT USE MARKDOWN. Return updated JSON only. JD: ${jobDescription} Data: ${JSON.stringify(resumeData)}`;
  try {
    const res = await callMultiAi(prompt, true);
    return JSON.parse(res);
  } catch (error) {
    return resumeData;
  }
};

export const generateLetter = async (resumeData: ResumeData, jobDescription: string, type: string) => {
  const prompt = `Generate a professional ${type} letter for ${resumeData.personalInfo.fullName}. JD: ${jobDescription}. Background: ${JSON.stringify(resumeData.experience)}. Plain text only.`;
  return await callMultiAi(prompt);
};

export const getAIAssistantResponse = async (query: string, history: any[]) => {
  const prompt = `History: ${JSON.stringify(history)}. User Query: ${query}`;
  return await callMultiAi(prompt);
};

export const generateProfessionalSummary = async (data: Partial<ResumeData>): Promise<string> => {
  const prompt = `Generate a powerful 3-sentence professional summary for ${data.personalInfo?.jobTitle}. Plain text only.`;
  return await callMultiAi(prompt);
};

export const suggestSkills = async (jobTitle: string, currentSkills: string[]): Promise<string[]> => {
  const prompt = `Suggest 10 skills for a "${jobTitle}". Return as a comma-separated list of plain text.`;
  const res = await callMultiAi(prompt);
  return res.split(',').map(s => s.trim()).filter(s => s.length > 0);
};
