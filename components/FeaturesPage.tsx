
import React from 'react';

const FeaturesPage: React.FC = () => {
  const features = [
    { title: "Forge Engine AI", desc: "Our proprietary linguistic model transforms passive experience into high-impact achievements using industry-standard action verbs.", icon: "🔥" },
    { title: "ATS Radar", desc: "Real-time scanning against 50+ HR platforms to ensure your resume is never filtered out by automated bots.", icon: "📡" },
    { title: "Letter Architect", desc: "Instantly generate tailored cover letters, referral requests, and thank-you notes that echo your resume's unique voice.", icon: "✍️" },
    { title: "Smart Summaries", desc: "Let AI synthesize your entire career history into a 3-sentence powerful narrative that grabs attention in 6 seconds.", icon: "💎" },
    { title: "Modern Vault", desc: "Securely store multiple versions of your career profile and switch between premium templates with one click.", icon: "🔒" },
    { title: "Global Context", desc: "Support for international formats and multi-language career architecting for global opportunities.", icon: "🌍" }
  ];

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <header className="text-center mb-24 space-y-6">
        <h2 className="text-sm font-black text-indigo-400 uppercase tracking-[0.4em]">The Architecture</h2>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-tight">
          Everything You Need to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Own Your Career.</span>
        </h1>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="p-8 bg-[#151921] border border-white/5 rounded-[2rem] hover:border-indigo-500/50 hover:bg-indigo-900/10 transition-all group">
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
            <h3 className="text-xl font-bold text-white mb-4">{f.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
