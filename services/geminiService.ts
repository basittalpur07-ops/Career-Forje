
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

const cleanJsonResponse = (text: string): string => {
  return text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim();
};

async function callMultiAi(
  prompt: string, 
  isJson: boolean = false, 
  systemInstruction: string = "You are a professional career assistant.",
  useSearch: boolean = false
): Promise<any> {
  const apiKey = process.env.API_KEY;
  if (!apiKey) throw new Error("API Key missing");

  // Upgrade to gemini-3-pro-image-preview for high-quality real-time information with googleSearch tool
  const modelName = useSearch ? 'gemini-3-pro-image-preview' : 'gemini-3-flash-preview';
  
  const ai = new GoogleGenAI({ apiKey });
  
  const config: any = {
    systemInstruction,
    // Disable responseMimeType when using search tool to avoid potential Rpc errors
    ...(isJson && !useSearch ? { responseMimeType: 'application/json' } : {}),
  };

  if (useSearch) {
    config.tools = [{ googleSearch: {} }];
  }

  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config
    });

    if (useSearch) {
      return {
        text: response.text,
        grounding: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
      };
    }

    return isJson ? cleanJsonResponse(response.text) : response.text.replace(/[*#_~`]/g, '').trim();
  } catch (e) {
    console.error("AI Call failed", e);
    throw e;
  }
}

export const searchJobs = async (data: ResumeData, locationInfo: { coords?: { lat: number, lng: number }, text?: string }) => {
  const title = data.personalInfo.jobTitle || "Professional";
  const skills = data.skills.slice(0, 5).join(", ");
  
  const locationContext = locationInfo.coords 
    ? `near coordinates ${locationInfo.coords.lat}, ${locationInfo.coords.lng}` 
    : `in ${locationInfo.text || data.personalInfo.location || "Remote"}`;

  const prompt = `FIND REAL CURRENT JOBS: Use Google Search to find 5 ACTUAL and RECENT job openings for a "${title}" ${locationContext}. 
  Focus on the absolute NEAREST real-world opportunities posted on LinkedIn, Indeed, Glassdoor, or company websites.
  
  Prioritize roles matching: ${skills}.
  
  MANDATORY: Return ONLY a valid JSON object. Do not include any other text. 
  
  JSON Structure:
  {
    "jobs": [
      {
        "title": "exact job title found in search",
        "company": "real company name",
        "location": "specific area/neighborhood",
        "distance": "estimated distance from user if known",
        "matchScore": 0-100,
        "reasoning": "why this matches based on profile",
        "postedDate": "real posting date info"
      }
    ]
  }
  
  I will extract the URLs from your grounding chunks. Ensure you ground each job to a real URL.`;

  try {
    const res = await callMultiAi(prompt, true, "You are a specialized Recruitment Scout. You MUST find REAL, existing job postings using Google Search. Do not hallucinate links.", true);
    
    const jsonStr = cleanJsonResponse(res.text);
    const parsedData = JSON.parse(jsonStr);
    
    const jobs = (parsedData.jobs || []).map((job: any, index: number) => {
      // Find a matching grounding chunk. We try to be more intelligent than just index matching.
      // Filter for chunks that have a web URI.
      const groundingLinks = res.grounding
        .filter((chunk: any) => chunk.web?.uri)
        .map((chunk: any) => chunk.web.uri);
      
      // Fallback to index or first available link
      const url = groundingLinks[index] || groundingLinks[0] || "#";
      return { ...job, url };
    });

    return jobs;
  } catch (error) {
    console.error("Job search failed", error);
    return [];
  }
};

export const getAIInsights = async (data: ResumeData): Promise<string[]> => {
  const prompt = `Analyze this resume and provide exactly 3 plain-text professional improvement tips. Output as a JSON array of strings only. Data: ${JSON.stringify(data)}`;
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
    return `Highly experienced in ${sectionTitle} within the ${jobTitle} domain.`;
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
    const apiKey = process.env.API_KEY;
    if (!apiKey) throw new Error("API Key missing");
    const ai = new GoogleGenAI({ apiKey });
    
    const contents: any = file ? 
      { parts: [{ inlineData: { data: file.data, mimeType: file.mimeType } }, { text: prompt }] } : 
      prompt;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents,
      config: {
        systemInstruction: "Expert ATS Analyst. Return valid JSON only.",
        responseMimeType: 'application/json',
      }
    });
    return JSON.parse(cleanJsonResponse(response.text));
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
  const prompt = `Generate a professional ${type} letter for ${resumeData.personalInfo.fullName}. JD: ${jobDescription}. Plain text only.`;
  try {
    return await callMultiAi(prompt);
  } catch (e) {
    return "Failed to generate letter.";
  }
};

export const getAIAssistantResponse = async (query: string, history: any[]) => {
  const prompt = `History: ${JSON.stringify(history)}. User Query: ${query}. Career advice in plain text.`;
  try {
    return await callMultiAi(prompt);
  } catch (e) {
    return "I'm currently resting.";
  }
};

export const generateProfessionalSummary = async (data: Partial<ResumeData>): Promise<string> => {
  const prompt = `Generate a powerful 3-sentence summary for a ${data.personalInfo?.jobTitle || 'Professional'}. Plain text only.`;
  try {
    return await callMultiAi(prompt);
  } catch (e) {
    return "Experienced professional with a proven track record.";
  }
};

export const suggestSkills = async (jobTitle: string, currentSkills: string[]): Promise<string[]> => {
  const prompt = `Suggest 10 skills for a "${jobTitle}". Return as a comma-separated list of plain text only.`;
  try {
    const res = await callMultiAi(prompt);
    return res.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
  } catch (e) {
    return ["Communication", "Leadership"];
  }
};
