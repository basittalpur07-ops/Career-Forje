
import React from 'react';
import { ResumeData } from '../../types';

const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, customSections } = data;

  return (
    <div className="bg-white p-12 min-h-[1100px] shadow-lg max-w-[800px] mx-auto text-slate-800 flex flex-col gap-10">
      {/* Header */}
      <div className="flex justify-between items-end border-b-4 border-indigo-600 pb-8">
        <div className="max-w-[70%]">
          <h1 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4">{personalInfo.fullName || 'Professional Name'}</h1>
          <p className="text-lg text-indigo-600 font-bold uppercase tracking-[0.2em]">{personalInfo.jobTitle || 'Target Role'}</p>
        </div>
        <div className="text-right text-[10px] font-bold text-slate-500 uppercase tracking-widest space-y-1">
          <p>{personalInfo.location}</p>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.email}</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-8 space-y-10">
          {summary && (
            <section>
              <h2 className="text-[10px] font-black text-slate-900 border-b-2 border-slate-100 pb-2 mb-4 uppercase tracking-[0.3em]">Executive Summary</h2>
              <p className="text-slate-600 leading-relaxed text-sm">{summary}</p>
            </section>
          )}

          <section>
            <h2 className="text-[10px] font-black text-slate-900 border-b-2 border-slate-100 pb-2 mb-6 uppercase tracking-[0.3em]">Work Experience</h2>
            <div className="space-y-8">
              {(experience || []).map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-900 text-lg">{exp.role}</h3>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{exp.startDate} — {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold mb-3 uppercase tracking-widest">{exp.company} // {exp.location}</p>
                  <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed pl-4 border-l-2 border-indigo-50">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {(customSections || []).map(section => (
            <section key={section.id}>
              <h2 className="text-[10px] font-black text-slate-900 border-b-2 border-slate-100 pb-2 mb-4 uppercase tracking-[0.3em]">{section.title}</h2>
              <div className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">
                {section.content}
              </div>
            </section>
          ))}
        </div>

        <div className="col-span-4 space-y-10">
          <section>
            <h2 className="text-[10px] font-black text-slate-900 border-b-2 border-slate-100 pb-2 mb-4 uppercase tracking-[0.3em]">Core Skills</h2>
            <div className="flex flex-wrap gap-2">
              {(skills || []).map((skill, i) => (
                <span key={i} className="text-[10px] font-bold bg-slate-50 border border-slate-100 px-3 py-1 rounded text-slate-700 uppercase tracking-widest">{skill}</span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-[10px] font-black text-slate-900 border-b-2 border-slate-100 pb-2 mb-4 uppercase tracking-[0.3em]">Education</h2>
            <div className="space-y-6">
              {(education || []).map((edu) => (
                <div key={edu.id}>
                  <p className="font-bold text-slate-800 text-sm">{edu.degree}</p>
                  <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest mt-1">{edu.institution}</p>
                  <p className="text-[10px] text-slate-400 mt-1 uppercase font-semibold">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
