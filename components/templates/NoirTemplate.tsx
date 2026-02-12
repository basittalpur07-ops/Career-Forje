
import React from 'react';
import { ResumeData } from '../../types';

const NoirTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, skills, customSections } = data;

  return (
    <div className="bg-[#0f1115] p-16 min-h-[1100px] shadow-2xl max-w-[800px] mx-auto text-white flex flex-col print:bg-white print:text-slate-900 transition-colors duration-700">
      <header className="mb-12 border-b border-white/10 pb-12 print:border-slate-200">
        <h1 className="text-6xl font-black tracking-tighter mb-4 leading-none uppercase">{personalInfo.fullName || 'EXECUTIVE NAME'}</h1>
        <div className="flex justify-between items-end">
          <p className="text-xl font-bold text-indigo-400 print:text-indigo-600 tracking-widest uppercase">{personalInfo.jobTitle}</p>
          <div className="text-right text-[9px] font-black uppercase tracking-[0.3em] opacity-50 space-y-1">
            <p>{personalInfo.email}</p>
            <p>{personalInfo.phone}</p>
            <p>{personalInfo.location}</p>
          </div>
        </div>
      </header>

      <div className="space-y-12">
        {summary && (
          <section>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-6 text-indigo-400">Statement</h2>
            <p className="text-sm font-medium leading-relaxed opacity-80 print:opacity-100">{summary}</p>
          </section>
        )}

        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-8 text-indigo-400">Track Record</h2>
          <div className="space-y-10">
            {experience.map((exp) => (
              <div key={exp.id} className="relative pl-8 border-l border-white/10 print:border-slate-200">
                <div className="absolute top-0 left-[-4px] w-2 h-2 rounded-full bg-indigo-500"></div>
                <div className="flex justify-between items-baseline mb-2">
                  <h3 className="text-lg font-black uppercase tracking-tight">{exp.role}</h3>
                  <span className="text-[9px] font-black opacity-40">{exp.startDate} — {exp.current ? 'PRESENT' : exp.endDate}</span>
                </div>
                <p className="text-[10px] font-black text-indigo-400 mb-4 tracking-widest uppercase">{exp.company} // {exp.location}</p>
                <p className="text-xs leading-relaxed opacity-70 print:opacity-100 whitespace-pre-line">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        {customSections.map(s => (
          <section key={s.id}>
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-6 text-indigo-400">{s.title}</h2>
            <p className="text-sm leading-relaxed opacity-80 print:opacity-100 whitespace-pre-line">{s.content}</p>
          </section>
        ))}

        <section>
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] mb-6 text-indigo-400">Arsenal</h2>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {skills.map((skill, i) => (
              <span key={i} className="text-xs font-bold uppercase tracking-widest">{skill}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default NoirTemplate;
