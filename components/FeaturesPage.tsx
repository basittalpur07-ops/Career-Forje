
import React from 'react';

const FeaturesPage: React.FC = () => {
  const features = [
    { title: "Multi-Engine AI", desc: "Seamless failover between OpenRouter, Grok, and Gemini ensuring your career architecting never stops.", icon: "🛰️" },
    { title: "STAR Method Optimization", desc: "Our proprietary linguistic model transforms passive experience into impact-oriented achievements.", icon: "🔥" },
    { title: "ATS Radar Analysis", desc: "Real-time scanning against industry platforms to ensure zero-filter rejection from automated bots.", icon: "📡" },
    { title: "Letter Architect", desc: "Instantly generate persuasive cover letters and referral requests tailored to your profile.", icon: "✍️" },
    { title: "Premium Style Studio", desc: "Forge your own custom templates with real-time CSS sculpting and .forge exports.", icon: "🏗️" },
    { title: "Cloud Identity Sync", desc: "Securely manage your career assets through Firebase-powered multi-device synchronization.", icon: "🔒" }
  ];

  return (
    <div className="pt-48 pb-32 px-6 max-w-7xl mx-auto">
      <header className="text-center mb-32 space-y-8 animate-in fade-in slide-in-from-top-12 duration-1000">
        <div className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 border border-white/10 rounded-full">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">System Capabilities</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
          The Architect's <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-purple-400">Toolbox.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Explore the suite of intelligent tools designed to elevate your professional presence to the executive tier.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <div key={i} className="p-10 bg-[#0d1016] border border-white/5 rounded-[3rem] hover:border-indigo-500/30 hover:bg-indigo-900/10 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity text-6xl">{f.icon}</div>
            <div className="text-4xl mb-8 group-hover:scale-110 transition-transform inline-block bg-white/5 w-16 h-16 flex items-center justify-center rounded-2xl">{f.icon}</div>
            <h3 className="text-2xl font-black text-white mb-6 tracking-tight">{f.title}</h3>
            <p className="text-slate-500 leading-relaxed text-sm font-medium">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesPage;
