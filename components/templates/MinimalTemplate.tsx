
import React from 'react';
import { ResumeData } from '../../types';

const MinimalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects } = data;

  return (
    <div className="bg-white p-16 min-h-[1100px] shadow-lg max-w-[800px] mx-auto text-slate-700 font-light tracking-wide leading-loose">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-light text-slate-900 tracking-[0.2em] uppercase mb-2">{personalInfo.fullName || 'YOUR NAME'}</h1>
        <p className="text-sm text-slate-400 tracking-[0.3em] uppercase mb-6">{personalInfo.jobTitle || 'PROFESSIONAL TITLE'}</p>
        <div className="flex justify-center gap-6 text-[10px] text-slate-500 uppercase tracking-widest border-t border-b border-slate-100 py-3">
          <span>{personalInfo.location}</span>
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
        </div>
      </header>

      {summary && (
        <section className="mb-12">
          <p className="text-sm text-center italic max-w-xl mx-auto">{summary}</p>
        </section>
      )}

      <div className="space-y-12">
        <section>
          <h2 className="text-xs font-bold text-slate-900 tracking-[0.4em] uppercase mb-8 border-b border-slate-100 pb-2">Experience</h2>
          <div className="space-y-10">
            {experience.map((exp) => (
              <div key={exp.id} className="grid grid-cols-4 gap-8">
                <div className="col-span-1 text-right text-[10px] text-slate-400 uppercase pt-1">
                  {exp.startDate} — {exp.current ? 'Now' : exp.endDate}
                </div>
                <div className="col-span-3">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-1">{exp.role}</h3>
                  <p className="text-[11px] text-slate-400 uppercase mb-3">{exp.company} • {exp.location}</p>
                  <p className="text-xs text-slate-600 whitespace-pre-line leading-6">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold text-slate-900 tracking-[0.4em] uppercase mb-8 border-b border-slate-100 pb-2">Skills</h2>
          <p className="text-xs text-center space-x-4">
            {skills.map((skill, i) => (
              <span key={i} className="inline-block mb-2 uppercase tracking-widest px-3 py-1 bg-slate-50 rounded">{skill}</span>
            ))}
          </p>
        </section>

        <section>
          <h2 className="text-xs font-bold text-slate-900 tracking-[0.4em] uppercase mb-8 border-b border-slate-100 pb-2">Education</h2>
          <div className="space-y-6">
            {education.map((edu) => (
              <div key={edu.id} className="grid grid-cols-4 gap-8">
                <div className="col-span-1 text-right text-[10px] text-slate-400 uppercase pt-1">
                  {edu.graduationDate}
                </div>
                <div className="col-span-3">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">{edu.degree}</h3>
                  <p className="text-[11px] text-slate-400 uppercase">{edu.institution}, {edu.field}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MinimalTemplate;
