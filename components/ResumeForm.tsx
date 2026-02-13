
import React, { useState, useEffect } from 'react';
import { ResumeData, Experience, Education, CustomSection } from '../types';
import { optimizeExperienceDescription, suggestSkills, generateProfessionalSummary, suggestSectionContent, getAIInsights } from '../services/geminiService';

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
      // Prevent fetching if no job title or critical info to analyze
      if (!data.personalInfo.jobTitle && data.experience.length === 0) return;
      
      setIsInsightsLoading(true);
      try {
        const res = await getAIInsights(data);
        // Ensure res is always an array before setting state
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

  const addCustomSection = () => {
    const newSection: CustomSection = {
      id: Math.random().toString(36).substr(2, 9),
      title: 'New Section',
      content: ''
    };
    onChange({ ...data, customSections: [...data.customSections, newSection] });
    setActiveTab(newSection.id);
  };

  const updateCustomSection = (id: string, field: keyof CustomSection, value: string) => {
    onChange({
      ...data,
      customSections: data.customSections.map(s => s.id === id ? { ...s, [field]: value } : s)
    });
  };

  const removeCustomSection = (id: string) => {
    onChange({ ...data, customSections: data.customSections.filter(s => s.id !== id) });
    setActiveTab('personal');
  };

  const handleAISectionSuggestion = async (id: string, title: string) => {
    setIsOptimizing(id);
    try {
      const suggestion = await suggestSectionContent(title, data.personalInfo.jobTitle);
      updateCustomSection(id, 'content', suggestion);
    } catch (e) {
      console.error(e);
    } finally {
      setIsOptimizing(null);
    }
  };

  return (
    <div className="flex flex-col h-full bg-transparent gap-6">
      {/* AI Insight Header */}
      <div className="bg-indigo-600/10 border border-indigo-500/20 p-5 rounded-[2rem] backdrop-blur-xl">
        <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-3 flex items-center gap-2">
          <span className="animate-pulse">✨</span> AI Content Intelligence
        </h4>
        <div className="space-y-2">
          {isInsightsLoading ? (
            <div className="h-4 w-1/2 bg-indigo-500/10 rounded animate-pulse"></div>
          ) : (
            (Array.isArray(insights) ? insights : []).slice(0, 2).map((insight, i) => (
              <p key={i} className="text-xs text-black flex gap-2 font-medium">
                <span className="text-indigo-500 font-bold">•</span> {insight}
              </p>
            ))
          )}
          {!isInsightsLoading && (!insights || insights.length === 0) && (
             <p className="text-[10px] text-slate-400 italic">Add your job title to get AI insights.</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col flex-1">
        <div className="flex bg-slate-50 border-b border-slate-100 overflow-x-auto no-scrollbar px-6">
          {['personal', 'experience', 'education', 'skills', ...data.customSections.map(s => s.id)].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-2 ${
                activeTab === tab ? 'text-indigo-600 border-indigo-600 bg-white' : 'text-slate-400 border-transparent hover:text-slate-600'
              }`}
            >
              {tab === 'personal' ? 'Profile' : 
               tab === 'experience' ? 'History' : 
               tab === 'education' ? 'Education' : 
               tab === 'skills' ? 'Skills' : 
               data.customSections.find(s => s.id === tab)?.title || 'Custom'}
            </button>
          ))}
          <button 
            onClick={addCustomSection}
            className="px-6 py-5 text-indigo-400 hover:text-indigo-600 text-lg"
          >
            +
          </button>
        </div>

        <div className="p-10 flex-1 overflow-y-auto custom-scrollbar space-y-8">
          {activeTab === 'personal' && (
            <div className="grid grid-cols-2 gap-8">
              <div className="col-span-2 space-y-1">
                <label className="text-[10px] font-black uppercase text-black tracking-widest ml-1">Full Name</label>
                <input 
                  type="text" 
                  value={data.personalInfo.fullName} 
                  onChange={e => onChange({...data, personalInfo: {...data.personalInfo, fullName: e.target.value}})}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-black"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-black tracking-widest ml-1">Job Title</label>
                <input 
                  type="text" 
                  value={data.personalInfo.jobTitle} 
                  onChange={e => onChange({...data, personalInfo: {...data.personalInfo, jobTitle: e.target.value}})}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-black font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-black tracking-widest ml-1">Email</label>
                <input 
                  type="email" 
                  value={data.personalInfo.email} 
                  onChange={e => onChange({...data, personalInfo: {...data.personalInfo, email: e.target.value}})}
                  className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-black font-medium"
                />
              </div>
              <div className="col-span-2 space-y-3 pt-4">
                <div className="flex justify-between items-center">
                   <label className="text-[10px] font-black uppercase text-black tracking-widest">Bio / Summary</label>
                   <button onClick={async () => {
                     setIsOptimizing('summary');
                     try {
                       const summary = await generateProfessionalSummary(data);
                       onChange({...data, summary});
                     } finally {
                       setIsOptimizing(null);
                     }
                   }} className="text-[10px] font-black text-indigo-500 uppercase">✨ Suggest</button>
                </div>
                <textarea 
                  value={data.summary} 
                  onChange={e => onChange({...data, summary: e.target.value})}
                  rows={5}
                  className="w-full p-5 bg-slate-50 border border-slate-100 rounded-[2rem] outline-none focus:ring-2 focus:ring-indigo-500 transition-all leading-relaxed text-black font-medium"
                />
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="space-y-6">
              {data.experience.map(exp => (
                <div key={exp.id} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group">
                  <button onClick={() => onChange({...data, experience: data.experience.filter(e => e.id !== exp.id)})} className="absolute top-6 right-8 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <input placeholder="Company" value={exp.company} onChange={event => onChange({...data, experience: data.experience.map(item => item.id === exp.id ? {...item, company: event.target.value} : item)})} className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-black font-medium" />
                    <input placeholder="Role" value={exp.role} onChange={event => onChange({...data, experience: data.experience.map(item => item.id === exp.id ? {...item, role: event.target.value} : item)})} className="p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-black font-medium" />
                  </div>
                  <textarea 
                    value={exp.description} 
                    onChange={event => onChange({...data, experience: data.experience.map(item => item.id === exp.id ? {...item, description: event.target.value} : item)})}
                    className="w-full p-4 border rounded-xl min-h-[120px] outline-none focus:ring-2 focus:ring-indigo-500 text-black font-medium"
                    placeholder="Describe achievements..."
                  />
                  <button 
                    onClick={async () => {
                      setIsOptimizing(exp.id);
                      try {
                        const res = await optimizeExperienceDescription(exp.description);
                        onChange({...data, experience: data.experience.map(e => e.id === exp.id ? {...e, description: res} : e)});
                      } finally {
                        setIsOptimizing(null);
                      }
                    }}
                    className="mt-4 text-[10px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2"
                  >
                    {isOptimizing === exp.id ? 'Refining...' : '✨ Apply STAR Method'}
                  </button>
                </div>
              ))}
              <button onClick={() => onChange({...data, experience: [...data.experience, {id: Math.random().toString(36).substr(2,9), company: '', role: '', location: '', startDate: '', endDate: '', current: false, description: ''}]})} className="w-full py-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-400 font-black uppercase text-xs tracking-widest hover:border-indigo-400 hover:text-indigo-500 transition-all">
                + Add Experience
              </button>
            </div>
          )}

          {activeTab === 'education' && (
            <div className="space-y-6">
              {data.education.map(edu => (
                <div key={edu.id} className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 relative group">
                  <button onClick={() => onChange({...data, education: data.education.filter(e => e.id !== edu.id)})} className="absolute top-6 right-8 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">Remove</button>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-black tracking-widest ml-1">Institution</label>
                      <input placeholder="University Name" value={edu.institution} onChange={event => onChange({...data, education: data.education.map(item => item.id === edu.id ? {...item, institution: event.target.value} : item)})} className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-black font-medium" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-black tracking-widest ml-1">Degree</label>
                      <input placeholder="B.S. Computer Science" value={edu.degree} onChange={event => onChange({...data, education: data.education.map(item => item.id === edu.id ? {...item, degree: event.target.value} : item)})} className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-black font-medium" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase text-black tracking-widest ml-1">Graduation Date</label>
                      <input placeholder="May 2022" value={edu.graduationDate} onChange={event => onChange({...data, education: data.education.map(item => item.id === edu.id ? {...item, graduationDate: event.target.value} : item)})} className="w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 text-black font-medium" />
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => onChange({...data, education: [...data.education, {id: Math.random().toString(36).substr(2,9), institution: '', degree: '', field: '', location: '', graduationDate: ''}]})} className="w-full py-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-400 font-black uppercase text-xs tracking-widest hover:border-indigo-400 hover:text-indigo-500 transition-all">
                + Add Education
              </button>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-8">
              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill, i) => (
                  <span key={i} className="px-5 py-2 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100 flex items-center gap-3">
                    {skill}
                    <button onClick={() => onChange({...data, skills: data.skills.filter(s => s !== skill)})} className="text-indigo-300 hover:text-red-500">✕</button>
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <input 
                  id="skill-input"
                  className="flex-1 p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 text-black font-medium"
                  placeholder="Add skill (e.g. Docker)"
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
                    try {
                      const suggestions = await suggestSkills(data.personalInfo.jobTitle, data.skills);
                      onChange({...data, skills: [...data.skills, ...suggestions]});
                    } finally {
                      setIsOptimizing(null);
                    }
                  }}
                  className="bg-indigo-600 text-white px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-100"
                >
                  {isOptimizing === 'skills' ? '...' : 'Suggest'}
                </button>
              </div>
            </div>
          )}

          {data.customSections.map(s => activeTab === s.id && (
            <div key={s.id} className="space-y-8 animate-in slide-in-from-right-4">
              <div className="flex justify-between items-center">
                 <input 
                   value={s.title} 
                   onChange={e => updateCustomSection(s.id, 'title', e.target.value)}
                   className="text-2xl font-black text-black outline-none border-b-2 border-transparent focus:border-indigo-500 transition-all"
                 />
                 <button onClick={() => removeCustomSection(s.id)} className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Delete Section</button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                   <label className="text-[10px] font-black uppercase text-black tracking-widest">Section Content</label>
                   <button 
                    disabled={isOptimizing === s.id}
                    onClick={() => handleAISectionSuggestion(s.id, s.title)} 
                    className="text-[10px] font-black text-indigo-500 uppercase"
                   >
                     {isOptimizing === s.id ? 'Architecting...' : '✨ Suggest Content'}
                   </button>
                </div>
                <textarea 
                  value={s.content}
                  onChange={e => updateCustomSection(s.id, 'content', e.target.value)}
                  rows={10}
                  className="w-full p-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] outline-none focus:ring-2 focus:ring-indigo-500 leading-relaxed text-black font-medium"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
