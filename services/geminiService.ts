
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

if (typeof (window as any).process === 'undefined') {
  (window as any).process = { env: {} };
}

const viteEnv = (import.meta as any).env || {};
if (viteEnv.VITE_API_KEY) (process.env as any).API_KEY = viteEnv.VITE_API_KEY;
if (viteEnv.VITE_GEMINI_KEY_2) (process.env as any).GEMINI_KEY_2 = viteEnv.VITE_GEMINI_KEY_2;
if (viteEnv.VITE_GROQ_KEY_1) (process.env as any).GROQ_KEY_1 = viteEnv.VITE_GROQ_KEY_1;
if (viteEnv.VITE_GROQ_KEY_2) (process.env as any).GROQ_KEY_2 = viteEnv.VITE_GROQ_KEY_2;
if (viteEnv.VITE_OPENROUTER_KEY_1) (process.env as any).OPENROUTER_KEY_1 = viteEnv.VITE_OPENROUTER_KEY_1;
if (viteEnv.VITE_OPENROUTER_KEY_2) (process.env as any).OPENROUTER_KEY_2 = viteEnv.VITE_OPENROUTER_KEY_2;

/**
 * Helper to clean JSON strings from AI response (removes markdown backticks)
 */
const cleanJsonResponse = (text: string): string => {
  return text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();
};

async function callMultiAi(
  prompt: string, 
  isJson: boolean = false, 
  systemInstruction: string = "You are a professional career assistant. Provide plain text responses without any markdown, asterisks, or headings.",
  file?: { data: string, mimeType: string }
): Promise<string> {
  
  // Note: Using Flash for general tasks to avoid 429 quota limits of Pro
  const engines = [
    { 
      name: 'Gemini Primary', 
      provider: 'gemini', 
      key: process.env.API_KEY, 
      model: isJson ? 'gemini-3-flash-preview' : 'gemini-3-flash-preview' 
    },
    { 
      name: 'Gemini Secondary', 
      provider: 'gemini', 
      key: (process.env as any).GEMINI_KEY_2, 
      model: 'gemini-3-flash-preview' 
    },
    { 
      name: 'Groq Primary', 
      provider: 'groq', 
      key: (process.env as any).GROQ_KEY_1, 
      model: 'llama-3.3-70b-versatile' 
    },
    { 
      name: 'OpenRouter Primary', 
      provider: 'openrouter', 
      key: (process.env as any).OPENROUTER_KEY_1, 
      model: 'google/gemini-2.0-flash-exp:free' 
    },
  ];

  let lastError = null;

  for (const engine of engines) {
    if (!engine.key) continue;

    try {
      if (engine.provider === 'gemini') {
        const ai = new GoogleGenAI({ apiKey: engine.key });
        const contents: any = file ? 
          { parts: [{ inlineData: { data: file.data, mimeType: file.mimeType } }, { text: prompt }] } : 
          prompt;

        const response = await ai.models.generateContent({
          model: engine.model,
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
            responseMimeType: isJson ? 'application/json' : 'text/plain',
          }
        });
        
        if (response.text) {
          const cleaned = isJson ? cleanJsonResponse(response.text) : response.text.replace(/[*#_~`]/g, '').trim();
          return cleaned;
        }
      } 
      else {
        const url = engine.provider === 'groq' 
          ? 'https://api.groq.com/openai/v1/chat/completions' 
          : 'https://openrouter.ai/api/v1/chat/completions';
          
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${engine.key}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: engine.model,
            messages: [
              { role: 'system', content: systemInstruction },
              { role: 'user', content: prompt }
            ],
            ...(isJson ? { response_format: { type: 'json_object' } } : {})
          })
        });

        if (res.ok) {
          const data = await res.json();
          const content = data.choices?.[0]?.message?.content;
          if (content) {
            return isJson ? cleanJsonResponse(content) : content.replace(/[*#_~`]/g, '').trim();
          }
        }
      }
    } catch (e) {
      console.warn(`[Career Forge AI] ${engine.name} fail/quota:`, e);
      lastError = e;
    }
  }

  throw lastError || new Error("Quota exceeded or Connection failed.");
}

export const getAIInsights = async (data: ResumeData): Promise<string[]> => {
  const prompt = `Analyze this resume and provide exactly 3 plain-text professional improvement tips. Output as a JSON array of strings only. Example: ["Tip 1", "Tip 2", "Tip 3"]. Data: ${JSON.stringify(data)}`;
  try {
    const res = await callMultiAi(prompt, true, "Expert Resume Coach. Return JSON array only.");
    const parsed = JSON.parse(res);
    return Array.isArray(parsed) ? parsed : ["Quantify achievements", "Optimize summary", "Add skills"];
  } catch (error) {
    return ["Quantify your impact with data.", "Add more technical keywords.", "Stronger professional summary needed."];
  }
};

export const suggestSectionContent = async (sectionTitle: string, jobTitle: string): Promise<string> => {
  const prompt = `Write a professional 3-sentence paragraph for a resume section titled "${sectionTitle}" for a "${jobTitle}" role. Plain text only.`;
  try {
    return await callMultiAi(prompt);
  } catch (e) {
    return `Highly experienced in ${sectionTitle} within the ${jobTitle} domain. Focused on delivering high-quality results and operational excellence.`;
  }
};

export const optimizeExperienceDescription = async (text: string): Promise<string> => {
  const prompt = `Rewrite using STAR method. Plain text bullet points starting with -. No bolding. Text: ${text}`;
  try {
    return await callMultiAi(prompt);
  } catch (e) {
    return text;
  }
};

export const analyzeATS = async (resumeData: ResumeData | null, jobDescription: string, file?: { name: string, data: string, mimeType: string }) => {
  const prompt = `Analyze resume against JD. Resume: ${JSON.stringify(resumeData)}. JD: ${jobDescription}. Return JSON with: score (0-100), matchAnalysis, missingKeywords, formattingIssues, improvementSuggestions.`;
  try {
    const res = await callMultiAi(prompt, true, "Expert ATS Analyst. Return valid JSON only.", file);
    return JSON.parse(res);
  } catch (error) {
    throw error;
  }
};

export const applyATSFixes = async (resumeData: ResumeData, jobDescription: string): Promise<ResumeData> => {
  const prompt = `Update Summary and Experience in this JSON to align with JD. NO MARKDOWN. Return updated JSON only. JD: ${jobDescription} Data: ${JSON.stringify(resumeData)}`;
  try {
    const res = await callMultiAi(prompt, true, "Resume writing expert. Return updated JSON only.");
    return JSON.parse(res);
  } catch (error) {
    return resumeData;
  }
};

export const generateLetter = async (resumeData: ResumeData, jobDescription: string, type: string) => {
  const prompt = `Generate a professional ${type} letter for ${resumeData.personalInfo.fullName}. JD: ${jobDescription}. Experience: ${JSON.stringify(resumeData.experience)}. Plain text only.`;
  try {
    return await callMultiAi(prompt);
  } catch (e) {
    return "Failed to generate letter. Please check your connection.";
  }
};

export const getAIAssistantResponse = async (query: string, history: any[]) => {
  const prompt = `History: ${JSON.stringify(history)}. User Query: ${query}. Career advice in plain text.`;
  try {
    return await callMultiAi(prompt);
  } catch (e) {
    return "I'm currently resting. Please try again in a moment.";
  }
};

export const generateProfessionalSummary = async (data: Partial<ResumeData>): Promise<string> => {
  const prompt = `Generate a powerful 3-sentence summary for a ${data.personalInfo?.jobTitle || 'Professional'}. Plain text only.`;
  try {
    return await callMultiAi(prompt);
  } catch (e) {
    return "Experienced professional with a proven track record of success.";
  }
};

export const suggestSkills = async (jobTitle: string, currentSkills: string[]): Promise<string[]> => {
  const prompt = `Suggest 10 skills for a "${jobTitle}". Return as a comma-separated list of plain text only.`;
  try {
    const res = await callMultiAi(prompt);
    return res.split(',').map(s => s.trim()).filter(s => s.length > 0);
  } catch (e) {
    return ["Communication", "Leadership", "Problem Solving"];
  }
};
