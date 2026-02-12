
import React from 'react';
import { ResumeData } from '../../types';

const NeonTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, skills, education } = data;

  return (
    <div className="bg-[#050608] p-12 min-h-[1100px] shadow-2xl max-w-[800px] mx-auto text-slate-400 font-mono flex flex-col gap-8 print:bg-white print:text-slate-900 border-[10px] border-indigo-900/20 print:border-none">
      <header className="space-y-4">
        <div className="inline-block px-4 py-1 bg-indigo-500 text-black text-[10px] font-black uppercase tracking-widest mb-2">System.Profile_Active</div>
        <h1 className="text-5xl font-black text-white print:text-slate-900 tracking-tighter uppercase">{personalInfo.fullName || 'USER_ID'}</h1>
        <div className="flex justify-between items-center text-[10px] border-t border-b border-indigo-500/30 py-4 print:border-slate-200">
          <span className="text-indigo-400 font-bold uppercase">{personalInfo.jobTitle}</span>
          <div className="flex gap-4">
            <span>{personalInfo.email}</span>
            <span>{personalInfo.location}</span>
          </div>
        </div>
      </header>

      <section className="space-y-4">
        <h2 className="text-indigo-500 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-indigo-500 animate-pulse"></span> [01] Summary
        </h2>
        <p className="text-xs leading-relaxed border-l-2 border-indigo-500/20 pl-6">{summary}</p>
      </section>

      <section className="space-y-8">
        <h2 className="text-indigo-500 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
           <span className="w-2 h-2 bg-indigo-500 animate-pulse"></span> [02] Experience_Logs
        </h2>
        <div className="space-y-8">
          {experience.map(exp => (
            <div key={exp.id} className="group">
              <div className="flex justify-between text-[11px] mb-2">
                <span className="text-white print:text-slate-900 font-bold">{exp.role} @ {exp.company}</span>
                <span className="opacity-40">{exp.startDate} :: {exp.current ? 'NULL' : exp.endDate}</span>
              </div>
              <p className="text-[10px] leading-relaxed opacity-60 print:opacity-100 pl-4">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-indigo-500 text-sm font-bold uppercase tracking-widest flex items-center gap-2">
           <span className="w-2 h-2 bg-indigo-500 animate-pulse"></span> [03] Tech_Stack
        </h2>
        <div className="grid grid-cols-4 gap-2">
          {skills.map((skill, i) => (
            <div key={i} className="p-2 border border-indigo-500/20 text-center text-[9px] uppercase hover:bg-indigo-500 hover:text-black transition-colors">
              {skill}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default NeonTemplate;
