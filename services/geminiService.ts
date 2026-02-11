
import { GoogleGenAI, Type } from "@google/genai";
import { ResumeData } from "../types";

// Always use the direct process.env.API_KEY as per guidelines
const getAIClient = () => {
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const optimizeExperienceDescription = async (text: string): Promise<string> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an expert resume writer. Rewrite the following work experience description to be professional, ATS-friendly, and impact-oriented using the STAR method. Keep it concise as bullet points.
      
      Original: ${text}`,
    });
    return response.text || text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return text;
  }
};

export const analyzeATS = async (resumeData: ResumeData, jobDescription: string) => {
  const ai = getAIClient();
  try {
    const prompt = `Act as an expert Applicant Tracking System (ATS). Analyze the following resume against the provided job description.
    
    JOB DESCRIPTION:
    ${jobDescription || "General Professional Role"}

    RESUME CONTENT:
    Name: ${resumeData.personalInfo.fullName}
    Title: ${resumeData.personalInfo.jobTitle}
    Experience: ${JSON.stringify(resumeData.experience)}
    Skills: ${resumeData.skills.join(', ')}

    Return a JSON object with:
    - score: number (0-100)
    - matchAnalysis: string (brief summary)
    - missingKeywords: string[]
    - formattingIssues: string[]
    - improvementSuggestions: string[]
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            matchAnalysis: { type: Type.STRING },
            missingKeywords: { type: Type.ARRAY, items: { type: Type.STRING } },
            formattingIssues: { type: Type.ARRAY, items: { type: Type.STRING } },
            improvementSuggestions: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["score", "matchAnalysis", "missingKeywords", "formattingIssues", "improvementSuggestions"]
        }
      }
    });
    
    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("ATS Analysis Error:", error);
    return null;
  }
};

export const generateLetter = async (resumeData: ResumeData, jobDescription: string, type: 'cover' | 'referral' | 'thank-you') => {
  const ai = getAIClient();
  try {
    const prompt = `Generate a highly professional ${type} letter for:
    Name: ${resumeData.personalInfo.fullName}
    Target Job: ${jobDescription}
    My Background: ${resumeData.summary} and key skills: ${resumeData.skills.join(', ')}

    Ensure the tone is persuasive, modern, and highlights specific values. Length: Approx 250 words.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "";
  } catch (error) {
    console.error("Letter Error:", error);
    return "Failed to generate letter.";
  }
};

export const getAIAssistantResponse = async (query: string, history: any[]) => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        { text: "You are the Career Forge Assistant. You provide expert advice on careers, job searching, interviews, and professional growth. Be concise, encouraging, and helpful." },
        ...history,
        { text: query }
      ]
    });
    return response.text || "I'm sorry, I couldn't process that.";
  } catch (error) {
    console.error("Assistant Error:", error);
    return "Something went wrong.";
  }
};

export const generateProfessionalSummary = async (data: Partial<ResumeData>): Promise<string> => {
  const ai = getAIClient();
  try {
    const prompt = `Generate a high-impact, professional resume summary (3-4 sentences) for:
    Name: ${data.personalInfo?.fullName}
    Target Role: ${data.personalInfo?.jobTitle}
    Skills: ${data.skills?.join(', ')}
    
    Focus on value proposition and modern leadership/technical skills.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "";
  }
};

export const suggestSkills = async (jobTitle: string, currentSkills: string[]): Promise<string[]> => {
  const ai = getAIClient();
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Based on the job title "${jobTitle}", suggest 10 relevant professional skills. Return as plain comma-separated list. Exclude: ${currentSkills.join(', ')}`,
    });
    const skillsText = response.text || "";
    return skillsText.split(',').map(s => s.trim()).filter(s => s.length > 0);
  } catch (error) {
    console.error("Gemini Error:", error);
    return [];
  }
};
