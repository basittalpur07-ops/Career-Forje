
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

/**
 * Helper to call Gemini models using the standardized SDK approach.
 */
async function callGemini(
  promptParts: any[], 
  isJson: boolean = false, 
  schema?: any, 
  modelName: string = 'gemini-3-flash-preview'
): Promise<string> {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const response = await ai.models.generateContent({
      model: modelName,
      contents: { parts: promptParts },
      config: isJson ? {
        responseMimeType: 'application/json',
        responseSchema: schema
      } : undefined
    });

    if (!response.text) {
      throw new Error("Empty response from AI");
    }

    return response.text;
  } catch (error: any) {
    console.error(`AI call failed [${modelName}]:`, error);
    // Specifically handle common API errors
    if (error.message?.includes('Unsupported MIME type')) {
      throw new Error("The AI model does not support this file format. Please upload a PDF.");
    }
    throw error;
  }
}

export const getAIInsights = async (data: ResumeData): Promise<string[]> => {
  const prompt = `Analyze this resume data and provide 3-4 highly specific, professional "Smart Suggestions". Focus on missing sections or skill gaps for "${data.personalInfo.jobTitle}". Return JSON array of strings. Data: ${JSON.stringify(data)}`;
  
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
  const prompt = `Write a professional 2-3 sentence paragraph for a resume section titled "${sectionTitle}" for a candidate seeking a "${jobTitle}" role. Use a high-impact, executive tone.`;
  return await callGemini([{ text: prompt }]);
};

export const optimizeExperienceDescription = async (text: string): Promise<string> => {
  const prompt = `Rewrite the following work experience description using the STAR method (Situation, Task, Action, Result). Use strong active verbs and bullet points. Original text: ${text}`;
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
    promptParts.push({ text: `Act as an expert ATS (Applicant Tracking System). Analyze the provided resume file against this job description: ${jobDescription}. Identify specific deficiencies and missing keywords.` });
  } else {
    promptParts.push({ text: `Act as an expert ATS. Analyze this resume JSON against this job description: ${jobDescription}. Resume Data: ${JSON.stringify(resumeData)}` });
  }

  promptParts.push({ text: "Provide a detailed matching report in JSON format. Be critical and specific." });

  const schema = {
    type: Type.OBJECT,
    properties: {
      score: { type: Type.NUMBER, description: "Matching score from 0 to 100" },
      matchAnalysis: { type: Type.STRING, description: "Qualitative summary of the match" },
      missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific industry terms or skills missing" },
      formattingIssues: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Potential ATS reading hurdles" },
      improvementSuggestions: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Actionable steps to reach a 90+ score" },
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

/**
 * AI Fixer: Optimizes the actual ResumeData object based on the job description
 */
export const applyATSFixes = async (resumeData: ResumeData, jobDescription: string): Promise<ResumeData> => {
  const prompt = `Act as an expert Resume Architect. I will give you a ResumeData object and a Job Description. 
  Your goal is to REWRITE the Summary and Experience descriptions to perfectly match the Job Description while maintaining 100% truthfulness of the original roles. 
  Inject missing keywords from the JD into the bullets. 
  Return the UPDATED ResumeData object in JSON format. 
  
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
  const prompt = `Generate a high-end, professional ${type} letter for ${resumeData.personalInfo.fullName}. Targeted Job Description: ${jobDescription}. Professional background context: ${JSON.stringify(resumeData.experience)}`;
  return await callGemini([{ text: prompt }], false, undefined, 'gemini-3-pro-preview');
};

export const getAIAssistantResponse = async (query: string, history: any[]) => {
  const promptParts = [
    { text: "You are the Career Forge AI, a world-class career strategist and resume architect. Help the user with job search advice, resume tips, or interview prep. Keep responses concise and high-impact." },
    ...history.map(m => ({ text: m.text })),
    { text: query }
  ];
  return await callGemini(promptParts, false, undefined, 'gemini-3-pro-preview');
};

export const generateProfessionalSummary = async (data: Partial<ResumeData>): Promise<string> => {
  const prompt = `Generate a powerful 3-sentence professional summary for a resume. Candidate: ${data.personalInfo?.fullName}, Role: ${data.personalInfo?.jobTitle}, Core Skills: ${data.skills?.join(', ')}. Focus on unique value proposition.`;
  return await callGemini([{ text: prompt }]);
};

export const suggestSkills = async (jobTitle: string, currentSkills: string[]): Promise<string[]> => {
  const prompt = `Suggest a list of 10 essential high-demand skills for a "${jobTitle}". Return as a comma-separated list. Do not include: ${currentSkills.join(', ')}`;
  const res = await callGemini([{ text: prompt }]);
  return res.split(',').map(s => s.trim()).filter(s => s.length > 0);
};
