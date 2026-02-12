
import React from 'react';
import { ResumeData } from '../../types';

const CorporateTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="bg-white p-12 min-h-[1100px] shadow-lg max-w-[800px] mx-auto text-black font-serif">
      <header className="border-b-2 border-black pb-4 mb-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-wide mb-1">{personalInfo.fullName || 'FULL NAME'}</h1>
        <div className="text-sm flex flex-wrap justify-center gap-x-4 font-sans font-medium text-slate-600">
          <span>{personalInfo.location}</span>
          {personalInfo.phone && <span>| {personalInfo.phone}</span>}
          {personalInfo.email && <span>| {personalInfo.email}</span>}
        </div>
      </header>

      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-black uppercase mb-2">Professional Summary</h2>
        <p className="text-sm leading-tight text-justify">{summary}</p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-black uppercase mb-3">Work Experience</h2>
        <div className="space-y-4">
          {(experience || []).map((exp) => (
            <div key={exp.id}>
              <div className="flex justify-between font-bold text-sm italic">
                <span>{exp.company}</span>
                <span>{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
              </div>
              <div className="flex justify-between text-sm italic mb-1">
                <span>{exp.role}</span>
                <span>{exp.location}</span>
              </div>
              <p className="text-sm pl-4 leading-snug whitespace-pre-line border-l-2 border-slate-100 ml-1">{exp.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-black uppercase mb-2">Education</h2>
        <div className="space-y-2">
          {(education || []).map((edu) => (
            <div key={edu.id} className="flex justify-between text-sm">
              <div>
                <span className="font-bold">{edu.institution}</span>, {edu.degree} in {edu.field}
              </div>
              <span className="italic">{edu.graduationDate}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-bold border-b border-black uppercase mb-2">Skills</h2>
        <p className="text-sm">
          <span className="font-bold">Core Competencies: </span>
          {(skills || []).join(', ')}
        </p>
      </section>

      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-black uppercase mb-2">Projects</h2>
          <div className="space-y-2">
            {projects.map((proj) => (
              <div key={proj.id} className="text-sm">
                <span className="font-bold">{proj.name}: </span>
                {proj.description}
                <span className="italic text-slate-500 block text-xs mt-0.5">Stack: {(proj.technologies || []).join(', ')}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {certifications && certifications.length > 0 && (
        <section>
          <h2 className="text-lg font-bold border-b border-black uppercase mb-2">Certifications</h2>
          <ul className="text-sm list-disc pl-5">
            {certifications.map((cert, i) => <li key={i}>{cert}</li>)}
          </ul>
        </section>
      )}
    </div>
  );
};

export default CorporateTemplate;
