
import React from 'react';

const PricingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <header className="text-center mb-20">
        <h1 className="text-5xl font-black text-white mb-6">Invest in Your Future.</h1>
        <p className="text-slate-500 max-w-xl mx-auto">Transparent pricing for every stage of your professional journey.</p>
      </header>

      <div className="grid md:grid-cols-3 gap-10">
        {[
          { name: "Starter", price: "$0", desc: "For the early explorer.", features: ["1 Basic Template", "AI Summary Tool", "Single Resume Export"], cta: "Get Started Free" },
          { name: "Architect", price: "$15", desc: "For serious professionals.", features: ["All Premium Templates", "ATS Engine Analysis", "AI Letter Generator", "Chat Assistant"], popular: true, cta: "Go Architect" },
          { name: "Executive", price: "$45", desc: "For career domination.", features: ["All Architect Features", "1-on-1 AI Training", "Unlimited ATS Scans", "Priority Forge Access"], cta: "Choose Executive" }
        ].map((tier, i) => (
          <div key={i} className={`p-10 rounded-[2.5rem] flex flex-col border transition-all ${
            tier.popular ? 'bg-indigo-600 border-indigo-400 scale-105 shadow-2xl shadow-indigo-500/20' : 'bg-[#151921] border-white/10'
          }`}>
            <h3 className="text-2xl font-bold text-white mb-2">{tier.name}</h3>
            <p className="text-sm opacity-60 mb-8">{tier.desc}</p>
            <div className="text-5xl font-black text-white mb-10">{tier.price}<span className="text-lg opacity-40 font-normal">/mo</span></div>
            
            <div className="flex-1 space-y-4 mb-12">
              {tier.features.map((f, j) => (
                <div key={j} className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-5 h-5 bg-white/10 rounded-full flex items-center justify-center text-[10px]">✔</div>
                  {f}
                </div>
              ))}
            </div>

            <button 
              onClick={onStart}
              className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                tier.popular ? 'bg-white text-indigo-600 hover:bg-slate-100' : 'bg-white/5 text-white hover:bg-white/10'
              }`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;
