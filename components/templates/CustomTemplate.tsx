
import React from 'react';
import { ResumeData, CustomStyle } from '../../types';

const DEFAULT_STYLE: CustomStyle = {
  primaryColor: '#1e293b',
  accentColor: '#4f46e5',
  fontFamily: 'sans',
  fontSize: '14px',
  spacing: '1.5',
  borderRadius: '4px'
};

const CustomTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  const style = data.customStyle || DEFAULT_STYLE;
  const fontClass = style.fontFamily === 'serif' ? 'font-serif' : style.fontFamily === 'mono' ? 'font-mono' : 'font-sans';

  const containerStyle = {
    color: style.primaryColor,
    fontSize: style.fontSize,
    lineHeight: style.spacing,
    fontFamily: style.fontFamily
  };

  return (
    <div 
      className={`bg-white p-12 min-h-[1100px] shadow-lg max-w-[800px] mx-auto ${fontClass}`}
      style={containerStyle}
    >
      <header className="mb-10 text-center border-b pb-8" style={{ borderColor: style.accentColor }}>
        <h1 className="text-4xl font-black uppercase tracking-tighter" style={{ color: style.accentColor }}>
          {data.personalInfo.fullName || 'Your Name'}
        </h1>
        <p className="text-lg font-bold opacity-70 mt-2">{data.personalInfo.jobTitle}</p>
        <div className="flex justify-center gap-4 text-xs mt-4 opacity-60">
          <span>{data.personalInfo.email}</span>
          <span>{data.personalInfo.phone}</span>
          <span>{data.personalInfo.location}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-10">
        <section>
          <h2 className="text-sm font-black uppercase tracking-widest mb-4 border-l-4 pl-4" style={{ borderColor: style.accentColor }}>
            Executive Summary
          </h2>
          <p className="text-justify">{data.summary}</p>
        </section>

        <section>
          <h2 className="text-sm font-black uppercase tracking-widest mb-4 border-l-4 pl-4" style={{ borderColor: style.accentColor }}>
            Professional Experience
          </h2>
          <div className="space-y-6">
            {data.experience.map(exp => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline font-bold">
                  <span className="text-lg">{exp.role}</span>
                  <span className="text-xs opacity-60">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <div className="text-sm italic opacity-80 mb-2" style={{ color: style.accentColor }}>
                  {exp.company}, {exp.location}
                </div>
                <p className="whitespace-pre-line opacity-90">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 gap-8">
          <section>
            <h2 className="text-sm font-black uppercase tracking-widest mb-4 border-l-4 pl-4" style={{ borderColor: style.accentColor }}>
              Skills & Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((s, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 text-xs border"
                  style={{ borderColor: style.accentColor, borderRadius: style.borderRadius }}
                >
                  {s}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-black uppercase tracking-widest mb-4 border-l-4 pl-4" style={{ borderColor: style.accentColor }}>
              Academic History
            </h2>
            <div className="space-y-4">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <p className="font-bold">{edu.degree}</p>
                  <p className="text-xs opacity-70">{edu.institution}</p>
                  <p className="text-[10px] opacity-50 uppercase font-black">{edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CustomTemplate;
