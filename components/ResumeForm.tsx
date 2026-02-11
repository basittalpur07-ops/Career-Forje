
import React, { useState } from 'react';
import { ResumeData, Experience, Education, Project } from '../types';
import { optimizeExperienceDescription, suggestSkills, generateProfessionalSummary } from '../services/geminiService';

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ data, onChange }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'experience' | 'education' | 'skills' | 'extras'>('personal');
  const [isOptimizing, setIsOptimizing] = useState<string | null>(null);

  const handlePersonalChange = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

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

  const updateExperience = (id: string, field: string, value: any) => {
    onChange({
      ...data,
      experience: data.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter(exp => exp.id !== id) });
  };

  const handleOptimizeExperience = async (id: string, currentText: string) => {
    if (!currentText.trim()) return;
    setIsOptimizing(id);
    const optimized = await optimizeExperienceDescription(currentText);
    updateExperience(id, 'description', optimized);
    setIsOptimizing(null);
  };

  const handleGenerateSummary = async () => {
    setIsOptimizing('summary');
    const summary = await generateProfessionalSummary(data);
    onChange({ ...data, summary });
    setIsOptimizing(null);
  };

  const handleSuggestSkills = async () => {
    if (!data.personalInfo.jobTitle) {
      alert("Please enter a target job title first!");
      return;
    }
    setIsOptimizing('skills');
    const suggestions = await suggestSkills(data.personalInfo.jobTitle, data.skills);
    onChange({ ...data, skills: [...data.skills, ...suggestions] });
    setIsOptimizing(null);
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Math.random().toString(36).substr(2, 9),
      institution: '',
      degree: '',
      field: '',
      location: '',
      graduationDate: ''
    };
    onChange({ ...data, education: [...data.education, newEdu] });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      education: data.education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    });
  };

  const addSkill = (skill: string) => {
    if (!skill.trim() || data.skills.includes(skill)) return;
    onChange({ ...data, skills: [...data.skills, skill] });
  };

  const removeSkill = (skill: string) => {
    onChange({ ...data, skills: data.skills.filter(s => s !== skill) });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col h-full border border-slate-200">
      <div className="flex bg-slate-50 border-b border-slate-200 overflow-x-auto">
        {(['personal', 'experience', 'education', 'skills', 'extras'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
              activeTab === tab ? 'bg-white text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="p-8 flex-1 overflow-y-auto space-y-6">
        {activeTab === 'personal' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Full Name</label>
              <input 
                type="text" 
                value={data.personalInfo.fullName} 
                onChange={e => handlePersonalChange('fullName', e.target.value)}
                placeholder="John Doe"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Target Job Title</label>
              <input 
                type="text" 
                value={data.personalInfo.jobTitle} 
                onChange={e => handlePersonalChange('jobTitle', e.target.value)}
                placeholder="Software Engineer"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
              <input 
                type="email" 
                value={data.personalInfo.email} 
                onChange={e => handlePersonalChange('email', e.target.value)}
                placeholder="hello@example.com"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
              <input 
                type="text" 
                value={data.personalInfo.phone} 
                onChange={e => handlePersonalChange('phone', e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Location</label>
              <input 
                type="text" 
                value={data.personalInfo.location} 
                onChange={e => handlePersonalChange('location', e.target.value)}
                placeholder="City, State"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div className="col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-slate-500 uppercase">Professional Summary</label>
                <button 
                  onClick={handleGenerateSummary}
                  disabled={isOptimizing === 'summary'}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-800 disabled:opacity-50 flex items-center gap-1"
                >
                  {isOptimizing === 'summary' ? 'Generating...' : '✨ Generate with AI'}
                </button>
              </div>
              <textarea 
                value={data.summary} 
                onChange={e => onChange({ ...data, summary: e.target.value })}
                rows={4}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Briefly describe your professional background and key achievements..."
              />
            </div>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-8">
            {data.experience.map((exp) => (
              <div key={exp.id} className="p-6 bg-slate-50 rounded-xl border border-slate-200 relative group animate-in slide-in-from-bottom-2 duration-300">
                <button 
                  onClick={() => removeExperience(exp.id)}
                  className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors"
                >
                  Remove
                </button>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input 
                    placeholder="Company Name" 
                    value={exp.company} 
                    onChange={e => updateExperience(exp.id, 'company', e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input 
                    placeholder="Job Role" 
                    value={exp.role} 
                    onChange={e => updateExperience(exp.id, 'role', e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input 
                    placeholder="Start Date (e.g., Jan 2020)" 
                    value={exp.startDate} 
                    onChange={e => updateExperience(exp.id, 'startDate', e.target.value)}
                    className="p-2 border rounded"
                  />
                  <input 
                    placeholder="End Date" 
                    value={exp.endDate} 
                    disabled={exp.current}
                    onChange={e => updateExperience(exp.id, 'endDate', e.target.value)}
                    className="p-2 border rounded disabled:bg-slate-200"
                  />
                  <label className="flex items-center gap-2 col-span-2 text-sm text-slate-600">
                    <input 
                      type="checkbox" 
                      checked={exp.current} 
                      onChange={e => updateExperience(exp.id, 'current', e.target.checked)}
                    />
                    I currently work here
                  </label>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                    <button 
                      onClick={() => handleOptimizeExperience(exp.id, exp.description)}
                      disabled={isOptimizing === exp.id}
                      className="text-xs font-bold text-indigo-600 flex items-center gap-1"
                    >
                      {isOptimizing === exp.id ? 'Optimizing...' : '✨ Optimize with AI'}
                    </button>
                  </div>
                  <textarea 
                    value={exp.description} 
                    onChange={e => updateExperience(exp.id, 'description', e.target.value)}
                    rows={4}
                    placeholder="Describe your impact..."
                    className="w-full p-3 border rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </div>
              </div>
            ))}
            <button 
              onClick={addExperience}
              className="w-full p-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-indigo-400 hover:text-indigo-400 transition-all font-bold"
            >
              + Add Work Experience
            </button>
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-8">
            {data.education.map((edu) => (
              <div key={edu.id} className="p-6 bg-slate-50 rounded-xl border border-slate-200 relative">
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Institution" value={edu.institution} onChange={e => updateEducation(edu.id, 'institution', e.target.value)} className="p-2 border rounded" />
                  <input placeholder="Degree" value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} className="p-2 border rounded" />
                  <input placeholder="Field of Study" value={edu.field} onChange={e => updateEducation(edu.id, 'field', e.target.value)} className="p-2 border rounded" />
                  <input placeholder="Graduation Year" value={edu.graduationDate} onChange={e => updateEducation(edu.id, 'graduationDate', e.target.value)} className="p-2 border rounded" />
                </div>
              </div>
            ))}
            <button onClick={addEducation} className="w-full p-4 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:text-indigo-400 hover:border-indigo-400 transition-all font-bold">
              + Add Education
            </button>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-600 uppercase">My Professional Skills</h3>
              <button 
                onClick={handleSuggestSkills}
                disabled={isOptimizing === 'skills'}
                className="text-xs font-bold text-indigo-600 flex items-center gap-1"
              >
                {isOptimizing === 'skills' ? 'Analyzing...' : '✨ Suggest Relevant Skills'}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span key={i} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-2 group">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="text-indigo-300 hover:text-red-500">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input 
                id="new-skill-input"
                type="text" 
                placeholder="Add a skill (e.g. Python)" 
                className="flex-1 p-2 border rounded"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addSkill((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <button 
                onClick={() => {
                  const input = document.getElementById('new-skill-input') as HTMLInputElement;
                  addSkill(input.value);
                  input.value = '';
                }}
                className="bg-indigo-600 text-white px-4 py-2 rounded font-bold hover:bg-indigo-700"
              >
                Add
              </button>
            </div>
          </div>
        )}

        {activeTab === 'extras' && (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Certifications</label>
              <textarea 
                className="w-full p-3 border rounded" 
                rows={3}
                placeholder="One per line..."
                value={data.certifications.join('\n')}
                onChange={e => onChange({ ...data, certifications: e.target.value.split('\n').filter(s => s.trim()) })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Key Achievements</label>
              <textarea 
                className="w-full p-3 border rounded" 
                rows={3}
                placeholder="One per line..."
                value={data.achievements.join('\n')}
                onChange={e => onChange({ ...data, achievements: e.target.value.split('\n').filter(s => s.trim()) })}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeForm;
