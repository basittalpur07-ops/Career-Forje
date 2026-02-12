
import React, { useState } from 'react';

interface PricingTier {
  name: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const PricingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedTier, setSelectedTier] = useState<PricingTier | null>(null);

  const tiers: PricingTier[] = [
    { 
      name: "Starter", 
      price: "$0", 
      desc: "For the early career explorer.", 
      features: ["1 Basic Template", "AI Summary Tool", "Single Resume Export", "Standard Support"], 
      cta: "Get Started Free" 
    },
    { 
      name: "Architect", 
      price: "$15", 
      desc: "For serious professionals aiming high.", 
      features: ["All Premium Templates", "ATS Engine Analysis", "AI Letter Generator", "24/7 Chat Assistant", "Unlimited PDF Exports"], 
      popular: true, 
      cta: "Go Architect" 
    },
    { 
      name: "Executive", 
      price: "$45", 
      desc: "For career domination and leadership.", 
      features: ["All Architect Features", "1-on-1 AI Training", "Unlimited ATS Scans", "Priority Forge Access", "Custom Design Consultation"], 
      cta: "Choose Executive" 
    }
  ];

  const handleSelectTier = (tier: PricingTier) => {
    setSelectedTier(tier);
    setShowCheckout(true);
  };

  return (
    <div className="pt-48 pb-32 px-6 max-w-7xl mx-auto relative">
      <header className="text-center mb-24 space-y-8 animate-in fade-in slide-in-from-top-12 duration-1000">
        <div className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 border border-white/10 rounded-full">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Subscription Plans</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
          Invest in Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-purple-400">Professional Legacy.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
          Unlock the full potential of our multi-engine AI ecosystem with a plan that fits your ambition.
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-8 relative z-10">
        {tiers.map((tier, i) => (
          <div 
            key={i} 
            className={`group p-10 rounded-[3rem] flex flex-col border transition-all duration-500 relative overflow-hidden ${
              tier.popular 
                ? 'bg-[#0d1016] border-indigo-500 shadow-[0_0_80px_rgba(79,70,229,0.15)] scale-105 z-20' 
                : 'bg-[#0d1016] border-white/5 hover:border-white/20 z-10'
            }`}
          >
            {tier.popular && (
              <div className="absolute top-0 right-0 px-8 py-2 bg-indigo-500 text-white font-black text-[9px] uppercase tracking-[0.3em] rounded-bl-3xl">
                Most Popular
              </div>
            )}
            
            <div className="mb-10">
              <h3 className="text-2xl font-black text-white mb-2 tracking-tight">{tier.name}</h3>
              <p className="text-sm font-medium text-slate-500 leading-relaxed">{tier.desc}</p>
            </div>

            <div className="mb-12">
              <div className="flex items-baseline gap-1">
                <span className="text-6xl font-black text-white tracking-tighter">{tier.price}</span>
                <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">/mo</span>
              </div>
            </div>
            
            <div className="flex-1 space-y-5 mb-12">
              {tier.features.map((f, j) => (
                <div key={j} className="flex items-center gap-4 text-sm font-medium text-slate-400">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] ${tier.popular ? 'bg-indigo-500 text-white' : 'bg-white/5 text-emerald-400'}`}>
                    ✔
                  </div>
                  {f}
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleSelectTier(tier)}
              className={`w-full py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 transform active:scale-95 ${
                tier.popular 
                  ? 'bg-white text-black hover:bg-indigo-400 hover:text-white shadow-xl' 
                  : 'bg-white/5 text-white hover:bg-white hover:text-black border border-white/10'
              }`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Checkout Modal */}
      {showCheckout && selectedTier && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 no-print">
          <div 
            className="absolute inset-0 bg-[#050608]/90 backdrop-blur-3xl animate-in fade-in duration-300"
            onClick={() => setShowCheckout(false)}
          ></div>
          
          <div className="relative w-full max-w-4xl bg-[#0d1016] border border-white/10 rounded-[4rem] shadow-[0_40px_120px_rgba(0,0,0,0.8)] grid md:grid-cols-2 overflow-hidden animate-in zoom-in-95 duration-500">
            {/* Left: Summary */}
            <div className="p-16 bg-white/5 border-r border-white/5">
              <div className="space-y-12">
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-6">Order Summary</h4>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-black text-white">{selectedTier.name} Plan</span>
                    <span className="text-2xl font-black text-white">{selectedTier.price}</span>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">Billing cycles monthly. Cancel anytime with one click.</p>
                </div>

                <div className="space-y-6">
                  {selectedTier.features.slice(0, 3).map((f, i) => (
                    <div key={i} className="flex items-center gap-4 text-sm font-medium text-slate-400">
                      <div className="w-5 h-5 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center text-[8px]">✔</div>
                      {f}
                    </div>
                  ))}
                </div>

                <div className="pt-12 border-t border-white/10">
                  <div className="flex justify-between items-center text-white mb-2">
                    <span className="font-bold text-sm">Today's total</span>
                    <span className="text-4xl font-black">{selectedTier.price}</span>
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">Secure 256-bit SSL encrypted</p>
                </div>
              </div>
            </div>

            {/* Right: Payment Form */}
            <div className="p-16 space-y-10">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-black text-white tracking-tight">Payment Detail</h3>
                <button 
                  onClick={() => setShowCheckout(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onStart(); setShowCheckout(false); }}>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Cardholder Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Jane Doe"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Card Number</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      required
                      placeholder="0000 0000 0000 0000"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                    />
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2">
                       <span className="text-slate-600 font-bold text-xs">VISA</span>
                       <span className="text-slate-600 font-bold text-xs">MC</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Expiry Date</label>
                    <input 
                      type="text" 
                      required
                      placeholder="MM / YY"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">CVC</label>
                    <input 
                      type="text" 
                      required
                      placeholder="000"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-mono"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] hover:bg-indigo-500 shadow-[0_20px_60px_rgba(79,70,229,0.3)] transition-all transform active:scale-95"
                >
                  Complete Secure Payment
                </button>
              </form>

              <div className="flex items-center justify-center gap-6 opacity-40 grayscale group hover:grayscale-0 transition-all">
                <span className="text-[10px] font-bold text-slate-500">POWERED BY STRIPE</span>
                <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                <span className="text-[10px] font-bold text-slate-500">PCI-DSS COMPLIANT</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;
