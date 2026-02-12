
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

/**
 * Helper to call Gemini models using the standardized SDK approach.
 */
async function callGemini(
  promptParts: any[], 
  isJson: boolean = false, 
  schema?: any, 
  modelName: string = 'gemini-3-flash-preview',
  systemInstruction: string = "You are a professional career assistant. Provide clear, plain text responses without any markdown formatting like asterisks, bolding, or headings."
): Promise<string> {
  try {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY is missing from environment variables.");
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: modelName,
      contents: { parts: promptParts },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: isJson ? 'application/json' : 'text/plain',
        ...(isJson && schema ? { responseSchema: schema } : {})
      }
    });

    if (!response.text) {
      throw new Error("Empty response from AI");
    }

    // Clean up any stray markdown that might have leaked through
    return response.text.replace(/[*#_~`]/g, '').trim();
  } catch (error: any) {
    console.error(`AI call failed [${modelName}]:`, error);
    if (error.message?.includes('Unsupported MIME type')) {
      throw new Error("The AI model does not support this file format. Please upload a PDF.");
    }
    throw error;
  }
}

export const getAIInsights = async (data: ResumeData): Promise<string[]> => {
  const prompt = `Analyze this resume data and provide 3 highly specific, professional plain-text suggestions. Do not use any special characters or markdown. Focus on missing sections or skill gaps for "${data.personalInfo.jobTitle}". Data: ${JSON.stringify(data)}`;
  
  const schema = {
    type: Type.ARRAY,
    items: { type: Type.STRING }
  };

  try {
    const res = await callGemini([{ text: prompt }], true, schema);
    return JSON.parse(res);
  } catch (error) {
    return ["Quantify your achievements with numbers.", "Add a certifications section.", "Refine your executive summary for keywords."];
  }
};

export const suggestSectionContent = async (sectionTitle: string, jobTitle: string): Promise<string> => {
  const prompt = `Write a professional 2-3 sentence paragraph for a resume section titled "${sectionTitle}" for a candidate seeking a "${jobTitle}" role. Use a high-impact tone. DO NOT USE MARKDOWN, BOLDING, OR ASTERISKS.`;
  return await callGemini([{ text: prompt }]);
};

export const optimizeExperienceDescription = async (text: string): Promise<string> => {
  const prompt = `Rewrite the following work experience description using the STAR method. Use plain text bullet points (starting with -). DO NOT USE ASTERISKS OR BOLDING. Original text: ${text}`;
  return await callGemini([{ text: prompt }]);
};

export const analyzeATS = async (resumeData: ResumeData | null, jobDescription: string, uploadedFile?: { data: string, mimeType: string }) => {
  const promptParts: any[] = [];
  
  if (uploadedFile) {
    promptParts.push({
      inlineData: {
        data: uploadedFile.data,
        mimeType: uploadedFile.mimeType
      }
    });
    promptParts.push({ text: `Analyze the provided resume file against this job description: ${jobDescription}. Identify specific deficiencies. Output JSON only.` });
  } else {
    promptParts.push({ text: `Analyze this resume JSON against this job description: ${jobDescription}. Resume Data: ${JSON.stringify(resumeData)}. Output JSON only.` });
  }

  const schema = {
    type: Type.OBJECT,
    properties: {
      score: { type: Type.NUMBER },
      matchAnalysis: { type: Type.STRING },
      missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
      formattingIssues: { type: Type.ARRAY, items: { type: Type.STRING } },
      improvementSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
    },
    required: ["score", "matchAnalysis", "missingKeywords", "formattingIssues", "improvementSuggestions"]
  };

  try {
    const res = await callGemini(promptParts, true, schema, 'gemini-3-pro-preview');
    return JSON.parse(res);
  } catch (error) {
    console.error("ATS Analysis Failed", error);
    throw error;
  }
};

export const applyATSFixes = async (resumeData: ResumeData, jobDescription: string): Promise<ResumeData> => {
  const prompt = `Rewrite the Summary and Experience descriptions in this JSON object to match the Job Description. DO NOT USE ANY MARKDOWN OR BOLDING IN THE TEXT FIELDS. 
  Job Description: ${jobDescription}
  Original Resume Data: ${JSON.stringify(resumeData)}`;

  try {
    const res = await callGemini([{ text: prompt }], true, undefined, 'gemini-3-pro-preview');
    return JSON.parse(res);
  } catch (error) {
    console.error("AI Fixer Failed", error);
    throw error;
  }
};

export const generateLetter = async (resumeData: ResumeData, jobDescription: string, type: 'cover' | 'referral' | 'thank-you') => {
  const prompt = `Generate a professional ${type} letter for ${resumeData.personalInfo.fullName}. Targeted Job Description: ${jobDescription}. USE PLAIN TEXT ONLY. NO BOLDING, NO ASTERISKS, NO HEADINGS.`;
  return await callGemini([{ text: prompt }], false, undefined, 'gemini-3-pro-preview');
};

export const getAIAssistantResponse = async (query: string, history: any[]) => {
  const sysInst = "You are the Career Forge AI. Provide professional career advice. USE PLAIN TEXT ONLY. Never use asterisks, hashes, or markdown formatting. No bolding. No headings. Just plain paragraphs.";
  const promptParts = [
    ...history.map(m => ({ text: m.text })),
    { text: query }
  ];
  return await callGemini(promptParts, false, undefined, 'gemini-3-pro-preview', sysInst);
};

export const generateProfessionalSummary = async (data: Partial<ResumeData>): Promise<string> => {
  const prompt = `Generate a powerful 3-sentence professional summary. Candidate: ${data.personalInfo?.fullName}, Role: ${data.personalInfo?.jobTitle}. PLAIN TEXT ONLY. NO BOLDING. NO ASTERISKS.`;
  return await callGemini([{ text: prompt }]);
};

export const suggestSkills = async (jobTitle: string, currentSkills: string[]): Promise<string[]> => {
  const prompt = `Suggest a list of 10 skills for a "${jobTitle}". Return as a simple comma-separated list of plain text. No markdown.`;
  const res = await callGemini([{ text: prompt }]);
  return res.split(',').map(s => s.trim()).filter(s => s.length > 0);
};
