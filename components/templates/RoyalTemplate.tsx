
import React from 'react';
import { ResumeData } from '../../types';

const RoyalTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, skills, education } = data;

  return (
    <div className="bg-[#fdfbf7] p-16 min-h-[1100px] shadow-lg max-w-[800px] mx-auto text-[#1a1a1a] font-serif flex flex-col gap-12 border-[20px] border-white">
      <header className="text-center space-y-4 border-b-2 border-[#d4af37] pb-12">
        <h1 className="text-5xl font-light tracking-widest uppercase text-[#1a1a1a]">{personalInfo.fullName || 'DISTINGUISHED NAME'}</h1>
        <p className="text-sm font-bold tracking-[0.4em] uppercase text-[#d4af37]">{personalInfo.jobTitle}</p>
        <div className="flex justify-center gap-8 text-[10px] uppercase tracking-widest font-sans font-bold opacity-60">
          <span>{personalInfo.email}</span>
          <span>{personalInfo.phone}</span>
          <span>{personalInfo.location}</span>
        </div>
      </header>

      {summary && (
        <section className="text-center italic text-lg leading-relaxed max-w-2xl mx-auto text-[#444]">
          "{summary}"
        </section>
      )}

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-8 space-y-12">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] mb-8 border-b border-[#eee] pb-2 text-[#d4af37]">Chronicle of Experience</h2>
            <div className="space-y-10">
              {experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="text-xl font-medium">{exp.role}</h3>
                    <span className="text-[10px] font-sans font-black uppercase tracking-widest opacity-40">{exp.startDate} — {exp.current ? 'PRESENT' : exp.endDate}</span>
                  </div>
                  <p className="text-xs font-sans font-bold uppercase tracking-widest text-[#d4af37] mb-4">{exp.company}</p>
                  <p className="text-sm leading-relaxed text-[#555] whitespace-pre-line">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="col-span-4 space-y-12">
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] mb-6 border-b border-[#eee] pb-2 text-[#d4af37]">Expertise</h2>
            <div className="space-y-3">
              {skills.map((skill, i) => (
                <p key={i} className="text-[10px] font-sans font-black uppercase tracking-widest">{skill}</p>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.4em] mb-6 border-b border-[#eee] pb-2 text-[#d4af37]">Academics</h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-6">
                <p className="text-sm font-medium">{edu.degree}</p>
                <p className="text-[10px] font-sans font-bold uppercase tracking-widest opacity-60 mt-1">{edu.institution}</p>
                <p className="text-[10px] font-sans opacity-40 mt-1">{edu.graduationDate}</p>
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default RoyalTemplate;
