
import React from 'react';
import { ResumeData } from '../../types';

const ModernTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications, achievements, languages } = data;

  return (
    <div className="bg-white p-10 min-h-[1100px] shadow-lg max-w-[800px] mx-auto text-slate-800 flex flex-col gap-8">
      {/* Header */}
      <div className="flex justify-between items-start border-b-4 border-indigo-600 pb-6">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">{personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-xl text-indigo-600 font-semibold mt-1 uppercase tracking-widest">{personalInfo.jobTitle || 'Target Job Title'}</p>
        </div>
        <div className="text-right text-sm text-slate-500 space-y-1">
          <p>{personalInfo.location}</p>
          <p>{personalInfo.phone}</p>
          <p>{personalInfo.email}</p>
          <div className="flex gap-2 justify-end mt-2">
            {personalInfo.linkedin && <span className="text-indigo-600 font-medium">LI</span>}
            {personalInfo.github && <span className="text-indigo-600 font-medium">GH</span>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8 flex-1">
        {/* Main Content */}
        <div className="col-span-8 space-y-8">
          {summary && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-1 mb-3 uppercase tracking-wider">Professional Summary</h2>
              <p className="text-slate-600 leading-relaxed text-sm">{summary}</p>
            </section>
          )}

          <section>
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-1 mb-4 uppercase tracking-wider">Work Experience</h2>
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-800">{exp.role}</h3>
                    <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                  </div>
                  <p className="text-sm text-slate-500 mb-2 italic">{exp.company}, {exp.location}</p>
                  <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {projects.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-1 mb-4 uppercase tracking-wider">Selected Projects</h2>
              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id}>
                    <h3 className="font-bold text-slate-800 text-sm">{proj.name}</h3>
                    <p className="text-slate-600 text-sm">{proj.description}</p>
                    <p className="text-xs text-indigo-600 mt-1 font-mono">{proj.technologies.join(' • ')}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="col-span-4 space-y-8">
          <section>
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-1 mb-4 uppercase tracking-wider">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded-md text-slate-700 font-medium">{skill}</span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-1 mb-4 uppercase tracking-wider">Education</h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <p className="font-bold text-slate-800 text-sm">{edu.degree}</p>
                  <p className="text-xs text-slate-500">{edu.institution}</p>
                  <p className="text-xs text-slate-400 mt-1">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </section>

          {certifications.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-1 mb-4 uppercase tracking-wider">Certifications</h2>
              <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4">
                {certifications.map((cert, i) => <li key={i}>{cert}</li>)}
              </ul>
            </section>
          )}

          {languages.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-1 mb-4 uppercase tracking-wider">Languages</h2>
              <div className="text-xs text-slate-600 space-y-1">
                {languages.map((lang, i) => <p key={i}>{lang}</p>)}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
