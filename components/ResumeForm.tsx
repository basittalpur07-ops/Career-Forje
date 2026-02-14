
import React, { useState, useEffect } from 'react';
import { ResumeData, Experience, Education, CustomSection } from '../types';
import { optimizeExperienceDescription, suggestSkills, generateProfessionalSummary, getAIInsights } from '../services/geminiService';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<string>('personal');
  const [isOptimizing, setIsOptimizing] = useState<string | null>(null);
  const [insights, setInsights] = useState<string[]>([]);
  const [isInsightsLoading, setIsInsightsLoading] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      if (!data.personalInfo.jobTitle && data.experience.length === 0) return;
      setIsInsightsLoading(true);
      try {
        const res = await getAIInsights(data);
        setInsights(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Failed to fetch insights", err);
        setInsights([]);
      } finally {
        setIsInsightsLoading(false);
      }
    };
    const timer = setTimeout(fetchInsights, 2000);
    return () => clearTimeout(timer);
  }, [data.experience.length, data.skills.length, data.personalInfo.jobTitle]);

  const addExperience = () => {
    const newExp: Experience = {
      id: Math.random().toString(36).substr(2, 9),
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange({ ...data, experience: [...data.experience, newExp] });
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  const inputClass = "w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 px-4 py-2.5 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all dark:text-white placeholder:text-slate-400";
  const labelClass = "text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 block uppercase tracking-wide";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* AI Assistant Tip Bar */}
      <div className={`p-4 rounded-lg border transition-all ${
        isInsightsLoading 
          ? 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700' 
          : 'bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700'
      }`}>
        <div className="flex items-center gap-2 mb-2">
          <i data-lucide="info" className="w-3.5 h-3.5 text-indigo-600"></i>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase">Resume Assistant</span>
        </div>
        <div className="space-y-1.5">
          {isInsightsLoading ? (
            <div className="h-4 bg-slate-100 dark:bg-slate-700 rounded w-full animate-pulse"></div>
          ) : (
            insights.length > 0 ? insights.slice(0, 1).map((ins, i) => (
              <p key={i} className="text-xs text-slate-600 dark:text-slate-400">
                {ins}
              </p>
            )) : <p className="text-xs text-slate-400">Add experience to see AI improvement tips.</p>
          )}
        </div>
      </div>

      {/* Dashboard Tabs */}
      <div className="flex items-center gap-6 overflow-x-auto no-scrollbar border-b border-slate-200 dark:border-slate-800">
        {['personal', 'experience', 'education', 'skills'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-xs font-bold uppercase tracking-widest transition-all border-b-2 relative ${
              activeTab === tab 
                ? 'border-indigo-600 text-indigo-600' 
                : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab === 'personal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className={labelClass}>Full Name</label>
              <input 
                type="text" 
                value={data.personalInfo.fullName} 
                onChange={e => onChange({...data, personalInfo: {...data.personalInfo, fullName: e.target.value}})}
                className={inputClass}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className={labelClass}>Target Job Title</label>
              <input 
                type="text" 
                value={data.personalInfo.jobTitle} 
                onChange={e => onChange({...data, personalInfo: {...data.personalInfo, jobTitle: e.target.value}})}
                className={inputClass}
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input 
                type="email" 
                value={data.personalInfo.email} 
                onChange={e => onChange({...data, personalInfo: {...data.personalInfo, email: e.target.value}})}
                className={inputClass}
                placeholder="john@example.com"
              />
            </div>
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-1.5">
                <label className={labelClass}>Summary</label>
                <button 
                  onClick={async () => {
                    setIsOptimizing('summary');
                    const res = await generateProfessionalSummary(data);
                    onChange({...data, summary: res});
                    setIsOptimizing(null);
                  }}
                  className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 uppercase tracking-wider"
                >
                  <i data-lucide="wand-2" className="w-3 h-3"></i>
                  {isOptimizing === 'summary' ? 'Drafting...' : 'AI Draft'}
                </button>
              </div>
              <textarea 
                rows={4}
                value={data.summary}
                onChange={e => onChange({...data, summary: e.target.value})}
                className={`${inputClass} leading-relaxed resize-none`}
                placeholder="Tell recruiters about your key achievements..."
              />
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id} className="p-5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg space-y-4 relative group">
                <button 
                  onClick={() => onChange({...data, experience: data.experience.filter(e => e.id !== exp.id)})} 
                  className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors"
                >
                  <i data-lucide="trash-2" className="w-4 h-4"></i>
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={labelClass}>Organization</label>
                    <input value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Position</label>
                    <input value={exp.role} onChange={e => updateExperience(exp.id, 'role', e.target.value)} className={inputClass} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className={labelClass}>Job Description</label>
                    <button 
                      onClick={async () => {
                        setIsOptimizing(exp.id);
                        const res = await optimizeExperienceDescription(exp.description);
                        updateExperience(exp.id, 'description', res);
                        setIsOptimizing(null);
                      }}
                      className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 uppercase tracking-wider"
                    >
                      <i data-lucide="zap" className="w-3 h-3"></i>
                      {isOptimizing === exp.id ? 'Improving...' : 'AI Optimize'}
                    </button>
                  </div>
                  <textarea 
                    rows={3}
                    value={exp.description}
                    onChange={e => updateExperience(exp.id, 'description', e.target.value)}
                    className={`${inputClass} leading-relaxed resize-none text-xs`}
                    placeholder="Describe your role and impact..."
                  />
                </div>
              </div>
            ))}
            <button 
              onClick={addExperience}
              className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 hover:text-indigo-600 hover:border-indigo-600 transition-all font-bold text-xs uppercase"
            >
              + Add Work History
            </button>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600 rounded-md text-xs font-semibold flex items-center gap-2">
                  {skill}
                  <button onClick={() => onChange({...data, skills: data.skills.filter(s => s !== skill)})} className="hover:text-rose-500">
                    <i data-lucide="x" className="w-3 h-3"></i>
                  </button>
                </span>
              ))}
            </div>
            
            <div className="flex flex-col md:flex-row gap-2">
               <input 
                 id="skill-input"
                 placeholder="Enter a skill (e.g. Python, Agile)..."
                 className={`${inputClass} flex-1`}
                 onKeyDown={e => {
                   if (e.key === 'Enter') {
                     const val = (e.target as HTMLInputElement).value;
                     if (val && !data.skills.includes(val)) onChange({...data, skills: [...data.skills, val]});
                     (e.target as HTMLInputElement).value = '';
                   }
                 }}
               />
               <button 
                onClick={async () => {
                  setIsOptimizing('skills');
                  const sug = await suggestSkills(data.personalInfo.jobTitle, data.skills);
                  onChange({...data, skills: [...data.skills, ...sug]});
                  setIsOptimizing(null);
                }}
                className="bg-slate-900 dark:bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold text-xs uppercase hover:opacity-90 transition-all flex items-center justify-center gap-2"
               >
                 <i data-lucide="sparkles" className="w-4 h-4"></i>
                 {isOptimizing === 'skills' ? 'Searching...' : 'AI Suggestions'}
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeForm;
