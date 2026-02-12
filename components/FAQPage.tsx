
import React, { useState } from 'react';

const FAQPage: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How does the Multi-Engine AI work?",
      answer: "Career Forge utilizes a proprietary failover system. We primary process requests through OpenRouter (Gemini 2.0). If rate limits are reached, the system automatically cycles through Grok-3 and Google's native Gemini 2.5 Flash engines to ensure 100% uptime for your career planning."
    },
    {
      question: "Will my resume pass through Applicant Tracking Systems (ATS)?",
      answer: "Yes. Our templates are architected following standard industry schemas (JSON-LD) and tested against major ATS providers like Workday, Greenhouse, and Lever. We also provide a real-time ATS Radar tool to score your document before you apply."
    },
    {
      question: "What is the STAR method used by the AI?",
      answer: "The AI optimizes your experience descriptions using the Situation, Task, Action, and Result framework. This ensures every bullet point highlights your specific contributions and the measurable impact you had on your organization."
    },
    {
      question: "Is my personal data secure?",
      answer: "Your privacy is our priority. We use Firebase's enterprise-grade encryption for identity management. Your resume data is either stored locally or synced via secure protocols that meet modern security standards. We do not sell your professional data to third parties."
    },
    {
      question: "Can I create a custom template?",
      answer: "Absolutely. Our 'Architect' mode allows you to sculpt your own design with real-time CSS controls. You can export these as .forge files to reuse or share them later."
    },
    {
      question: "What formats can I export my resume in?",
      answer: "Currently, we prioritize high-fidelity PDF exports via our native print engine, ensuring pixel-perfect layouts for both human recruiters and automated scanners."
    }
  ];

  return (
    <div className="pt-48 pb-32 px-6 max-w-4xl mx-auto">
      <header className="text-center mb-24 space-y-8 animate-in fade-in slide-in-from-top-12 duration-1000">
        <div className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 border border-white/10 rounded-full">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Knowledge Base</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
          Common <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-purple-400">Questions.</span>
        </h1>
      </header>

      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className="group bg-[#0d1016] border border-white/5 rounded-[2rem] overflow-hidden transition-all hover:border-white/10"
          >
            <button 
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              className="w-full p-8 text-left flex justify-between items-center gap-6"
            >
              <span className="text-xl font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">
                {faq.question}
              </span>
              <span className={`text-2xl transition-transform duration-500 ${activeIndex === i ? 'rotate-180 text-indigo-400' : 'text-slate-600'}`}>
                {activeIndex === i ? '−' : '+'}
              </span>
            </button>
            <div 
              className={`px-8 overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === i ? 'max-h-96 pb-8' : 'max-h-0'
              }`}
            >
              <p className="text-slate-400 leading-relaxed font-medium">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-24 p-12 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[3rem] text-center space-y-6 shadow-2xl">
        <h3 className="text-3xl font-black text-white">Still have questions?</h3>
        <p className="text-indigo-100/70 max-w-lg mx-auto">Our support architects are standing by to help you forge your professional legacy.</p>
        <button className="px-10 py-4 bg-white text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQPage;
