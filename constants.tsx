
import { ResumeData } from './types';

export const INITIAL_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: ''
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  customSections: []
};

export const SAMPLE_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Jane Doe',
    jobTitle: 'Senior Software Engineer',
    email: 'jane.doe@example.com',
    phone: '+1 (555) 012-3456',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/janedoe',
    github: 'github.com/janedoe',
    website: 'janedoe.dev'
  },
  summary: 'Innovative Software Engineer with over 8 years of experience in building scalable web applications and distributed systems. Expert in React, Node.js, and Cloud Architecture.',
  experience: [
    {
      id: 'exp1',
      company: 'Tech Giants Inc.',
      role: 'Lead Developer',
      location: 'New York, NY',
      startDate: '2020-01',
      endDate: 'Present',
      current: true,
      description: 'Led a team of 15 engineers to rebuild the core checkout platform, resulting in a 25% increase in conversion rate.'
    }
  ],
  education: [
    {
      id: 'edu1',
      institution: 'State University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Austin, TX',
      graduationDate: '2016-05'
    }
  ],
  skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'Docker'],
  projects: [],
  certifications: ['AWS Certified Solutions Architect'],
  achievements: ['Won 1st place at Global Fintech Hackathon 2022'],
  languages: ['English (Native)'],
  customSections: [
    {
      id: 'cs1',
      title: 'Volunteering',
      content: 'Mentor at Code.org, teaching underprivileged youth the basics of web development.'
    }
  ]
};
