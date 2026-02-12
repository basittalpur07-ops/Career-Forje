
import React from 'react';
import { ResumeData } from '../../types';

const MinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, customSections } = data;

  return (
    <div className="bg-white p-20 min-h-[1100px] shadow-lg max-w-[800px] mx-auto text-slate-800 font-light leading-relaxed">
      <header className="mb-20 text-center">
        <h1 className="text-4xl font-light text-slate-900 tracking-[0.3em] uppercase mb-4">{personalInfo.fullName || 'NAME'}</h1>
        <p className="text-[10px] text-slate-400 tracking-[0.5em] uppercase mb-10 border-t border-b border-slate-100 py-4 inline-block px-12">{personalInfo.jobTitle || 'PROFESSION'}</p>
        <div className="flex justify-center gap-10 text-[9px] text-slate-400 uppercase tracking-[0.2em]">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
        </div>
      </header>

      {summary && (
        <section className="mb-16">
          <p className="text-sm italic text-slate-500 max-w-xl mx-auto text-center">{summary}</p>
        </section>
      )}

      <div className="space-y-20">
        <section>
          <h2 className="text-[10px] font-bold text-slate-900 tracking-[0.5em] uppercase mb-10 text-center">Experience</h2>
          <div className="space-y-12">
            {experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-4 gap-12">
                <div className="col-span-1 text-right text-[10px] text-slate-300 uppercase tracking-widest pt-1">
                  {exp.startDate} — {exp.current ? 'NOW' : exp.endDate}
                </div>
                <div className="col-span-3">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-1">{exp.role}</h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-4 italic">{exp.company}</p>
                  <p className="text-xs text-slate-600 whitespace-pre-line leading-7">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {customSections.map(section => (
          <section key={section.id}>
             <h2 className="text-[10px] font-bold text-slate-900 tracking-[0.5em] uppercase mb-10 text-center">{section.title}</h2>
             <div className="max-w-xl mx-auto text-xs text-slate-600 whitespace-pre-line leading-7 text-center">
               {section.content}
             </div>
          </section>
        ))}

        <section>
          <h2 className="text-[10px] font-bold text-slate-900 tracking-[0.5em] uppercase mb-10 text-center">Skills</h2>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {skills.map((skill, i) => (
              <span key={i} className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">{skill}</span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MinimalTemplate;
