
import React, { useState, useEffect, useMemo } from 'react';
import { ResumeData, TemplateId, UITheme } from './types';
import { INITIAL_RESUME_DATA } from './constants';
import ResumeForm from './components/ResumeForm';
import TemplateSwitcher from './components/TemplateSwitcher';
import ModernTemplate from './components/templates/ModernTemplate';
import MinimalTemplate from './components/templates/MinimalTemplate';
import CorporateTemplate from './components/templates/CorporateTemplate';
import NoirTemplate from './components/templates/NoirTemplate';
import NeonTemplate from './components/templates/NeonTemplate';
import RoyalTemplate from './components/templates/RoyalTemplate';
import CustomTemplate from './components/templates/CustomTemplate';
import LandingPage from './components/LandingPage';
import FeaturesPage from './components/FeaturesPage';
import PricingPage from './components/PricingPage';
import FAQPage from './components/FAQPage';
import ContactPage from './components/ContactPage';
import ATSChecker from './components/ATSChecker';
import LetterGenerator from './components/LetterGenerator';
import AIAssistant from './components/AIAssistant';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import CustomStyleEditor from './components/CustomStyleEditor';
import Footer from './components/Footer';
import { authService } from './services/firebase';

type ViewState = 'landing' | 'features' | 'pricing' | 'faq' | 'contact' | 'builder';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(TemplateId.MODERN);
  const [subView, setSubView] = useState<'editor' | 'preview' | 'ats' | 'letters' | 'architect'>('editor');
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [view, setView] = useState<ViewState>('landing');
  const [uiTheme, setUiTheme] = useState<UITheme>('crystal');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Re-initialize Lucide icons whenever the view or subView changes
  useEffect(() => {
    if (typeof (window as any).lucide !== 'undefined') {
      (window as any).lucide.createIcons();
    }
  }, [view, subView, isAuthOpen]);

  useEffect(() => {
    const unsubscribe = authService.onAuthState((u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  const handleDownloadPDF = () => {
    window.print();
  };

  const handleLogout = async () => {
    await authService.logout();
    setView('landing');
  };

  const healthScore = useMemo(() => {
    let score = 0;
    if (resumeData.personalInfo.fullName) score += 10;
    if (resumeData.personalInfo.jobTitle) score += 10;
    if (resumeData.summary && resumeData.summary.length > 50) score += 20;
    if (resumeData.experience && resumeData.experience.length > 0) score += 20;
    if (resumeData.skills && resumeData.skills.length > 5) score += 20;
    if (resumeData.education && resumeData.education.length > 0) score += 10;
    if (resumeData.customSections && resumeData.customSections.length > 0) score += 10;
    return Math.min(score, 100);
  }, [resumeData]);

  const getInitial = () => {
    if (!user) return '?';
    if (user.displayName) return user.displayName[0].toUpperCase();
    if (user.email) return user.email[0].toUpperCase();
    return 'U';
  };

  const themeClasses = {
    crystal: "bg-[#f8f9fc] text-slate-900",
    onyx: "bg-[#0a0c10] text-slate-100",
    forge: "bg-[#050608] text-indigo-100"
  };

  const renderLetterPreview = () => (
    <div className="bg-white p-16 md:p-24 min-h-[1100px] shadow-2xl max-w-[800px] mx-auto text-slate-800 font-serif leading-relaxed animate-in fade-in zoom-in-95 duration-700">
      <div className="mb-16 border-b-2 border-slate-100 pb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase mb-2">
          {resumeData.personalInfo.fullName || 'PROFESSIONAL NAME'}
        </h2>
        <div className="flex flex-wrap gap-x-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>{resumeData.personalInfo.email}</span>
          <span>{resumeData.personalInfo.phone}</span>
          <span>{resumeData.personalInfo.location}</span>
        </div>
      </div>
      
      {generatedLetter ? (
        <div className="whitespace-pre-wrap text-base text-slate-700 font-medium leading-loose">
          {generatedLetter}
        </div>
      ) : (
        <div className="h-full flex flex-col items-center justify-center text-center py-40 opacity-20 grayscale">
          <div className="text-6xl mb-6">✍️</div>
          <p className="text-sm font-black uppercase tracking-[0.3em]">Architecting your letter...</p>
          <p className="text-xs mt-2">Use the controls on the left to begin.</p>
        </div>
      )}

      <div className="mt-20 pt-8 border-t border-slate-50">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Sincerely,</p>
        <p className="text-lg font-black mt-4 font-sans tracking-tight">{resumeData.personalInfo.fullName}</p>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className={`min-h-screen ${themeClasses[uiTheme]} flex flex-col pt-24 selection:bg-indigo-500 selection:text-white transition-colors duration-500`}>
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 border-b no-print ${
        uiTheme === 'crystal' ? 'bg-white/90 border-slate-100' : 
        uiTheme === 'onyx' ? 'bg-[#0a0c10]/90 border-white/5' : 
        'bg-[#050608]/90 border-indigo-500/10'
      } backdrop-blur-3xl`}>
        <div className="max-w-[1900px] mx-auto px-6 lg:px-10 flex justify-between items-center h-24">
          <div className="flex items-center gap-6 lg:gap-12">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setView('landing')}>
              <h1 className={`text-xl lg:text-2xl font-black tracking-tighter uppercase transition-colors ${
                uiTheme === 'crystal' ? 'text-slate-900 group-hover:text-indigo-600' : 'text-white group-hover:text-indigo-400'
              }`}>Career Forge</h1>
            </div>

            <div className={`hidden md:flex items-center gap-4 p-1.5 rounded-[1.5rem] border ${
              uiTheme === 'crystal' ? 'bg-slate-50 border-slate-100' : 'bg-white/5 border-white/10'
            }`}>
               <div className={`flex items-center gap-3 px-5 py-2 rounded-xl shadow-sm border ${
                 uiTheme === 'crystal' ? 'bg-white border-slate-200' : 'bg-[#0d1016] border-white/10'
               }`}>
                  <div className={`w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)] ${
                    healthScore > 80 ? 'bg-emerald-500' : healthScore > 50 ? 'bg-amber-500' : 'bg-rose-500'
                  }`}></div>
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Identity: {healthScore}% Verified</span>
               </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="hidden lg:flex p-1 rounded-xl border bg-slate-100 border-slate-200">
              {(['crystal', 'onyx', 'forge'] as UITheme[]).map((t) => (
                <button 
                  key={t}
                  onClick={() => setUiTheme(t)}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
                    uiTheme === t ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500'
                  }`}
                >
                  {t === 'crystal' ? '☀️' : t === 'onyx' ? '🌙' : '⚡'}
                </button>
              ))}
            </div>

            <div className="hidden xl:flex gap-1">
              {['editor', 'preview', 'ats', 'letters', 'architect'].map((v: any) => (
                <button 
                  key={v}
                  onClick={() => setSubView(v)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black transition-all uppercase tracking-[0.2em] ${
                    subView === v 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                    : `${uiTheme === 'crystal' ? 'text-slate-400 hover:text-slate-900' : 'text-slate-500 hover:text-white'}`
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <button 
              onClick={handleDownloadPDF}
              className="bg-slate-900 text-white px-6 lg:px-10 py-3 lg:py-4 rounded-[1.5rem] font-black text-[10px] tracking-[0.2em] shadow-2xl hover:bg-indigo-600 transition-all uppercase active:scale-95"
            >
              <span className="hidden sm:inline">Deploy PDF</span>
              <span className="sm:hidden">Print</span>
            </button>

            <button 
              onClick={handleLogout}
              className={`w-12 h-12 lg:w-14 lg:h-14 rounded-[1.5rem] border-2 flex items-center justify-center font-black text-lg shadow-sm transition-all hover:border-indigo-500 ${
                uiTheme === 'crystal' ? 'bg-white border-slate-100 text-slate-900' : 'bg-white/5 border-white/10 text-white'
              }`}
            >
              {getInitial()}
            </button>
          </div>
        </div>
      </header>

      {/* Sub-nav for mobile when builder is active */}
      <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] bg-white/90 backdrop-blur-xl border border-slate-200 p-2 rounded-2xl flex gap-2 shadow-2xl no-print">
        {['editor', 'preview', 'ats', 'letters'].map((v: any) => (
          <button 
            key={v}
            onClick={() => setSubView(v)}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${subView === v ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
          >
            {v}
          </button>
        ))}
      </div>

      <main className="flex-1 max-w-[1900px] mx-auto w-full px-6 lg:px-10 py-8 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-1000 print:block print:p-0 print:m-0">
        <div className={`lg:col-span-5 h-[calc(100vh-220px)] no-print ${subView === 'preview' ? 'hidden lg:block' : 'block'}`}>
          <div className="h-full overflow-hidden flex flex-col gap-6">
            {subView === 'ats' ? (
              <div className="h-full overflow-y-auto custom-scrollbar pr-4">
                <ATSChecker 
                  data={resumeData} 
                  onChange={setResumeData} 
                  onNavigateToEditor={() => setSubView('editor')} 
                />
              </div>
            ) : subView === 'letters' ? (
              <div className="h-full overflow-y-auto custom-scrollbar pr-4">
                <LetterGenerator 
                  data={resumeData} 
                  letter={generatedLetter}
                  onLetterUpdate={setGeneratedLetter}
                />
              </div>
            ) : subView === 'architect' ? (
              <div className="h-full overflow-y-auto custom-scrollbar pr-4"><CustomStyleEditor data={resumeData} onChange={setResumeData} /></div>
            ) : (
              <ResumeForm data={resumeData} onChange={setResumeData} />
            )}
          </div>
        </div>

        <div className={`lg:col-span-7 h-[calc(100vh-220px)] flex flex-col items-center gap-8 print:h-auto print:block ${subView === 'editor' || subView === 'ats' || subView === 'architect' ? 'hidden lg:flex' : 'flex'}`}>
          {subView !== 'letters' && (
             <div className="no-print w-full"><TemplateSwitcher selected={selectedTemplate} onSelect={setSelectedTemplate} /></div>
          )}
          
          <div className={`w-full max-w-[900px] flex-1 overflow-y-auto custom-scrollbar rounded-[2rem] lg:rounded-[4rem] shadow-2xl ring-1 ring-white/10 p-2 print:shadow-none print:p-0 print:ring-0 print:bg-white print:overflow-visible ${
            uiTheme === 'crystal' ? 'bg-slate-200/20' : 'bg-black/40'
          }`}>
            <div className="origin-top transition-transform duration-700 lg:scale-[0.95] lg:hover:scale-100 print:scale-100">
              {subView === 'letters' ? renderLetterPreview() : (() => {
                switch (selectedTemplate) {
                  case TemplateId.MODERN: return <ModernTemplate data={resumeData} />;
                  case TemplateId.MINIMAL: return <MinimalTemplate data={resumeData} />;
                  case TemplateId.CORPORATE: return <CorporateTemplate data={resumeData} />;
                  case TemplateId.NOIR: return <NoirTemplate data={resumeData} />;
                  case TemplateId.NEON: return <NeonTemplate data={resumeData} />;
                  case TemplateId.ROYAL: return <RoyalTemplate data={resumeData} />;
                  case TemplateId.CUSTOM: return <CustomTemplate data={resumeData} />;
                  default: return <ModernTemplate data={resumeData} />;
                }
              })()}
            </div>
          </div>
        </div>
      </main>
      
      <style>{`
        @media print {
          @page { margin: 0; }
          body { background: white !important; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          main { display: block !important; padding: 0 !important; margin: 0 !important; overflow: visible !important; }
          .lg\\:col-span-7 { width: 100% !important; margin: 0 !important; padding: 0 !important; overflow: visible !important; display: block !important; }
          .origin-top { transform: scale(1) !important; width: 100% !important; }
          div { box-shadow: none !important; border: none !important; border-radius: 0 !important; }
        }
      `}</style>
    </div>
  );

  const renderPublicPage = () => (
    <div className="min-h-screen bg-[#050608] flex flex-col">
      <Navbar 
        currentView={view} 
        setView={setView} 
        isLoggedIn={!!user} 
        user={user}
        onAuthClick={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />
      <div className="flex-1">
        {(() => {
          switch (view) {
            case 'landing': return <LandingPage onStart={() => user ? setView('builder') : setIsAuthOpen(true)} />;
            case 'features': return <FeaturesPage />;
            case 'pricing': return <PricingPage onStart={() => user ? setView('builder') : setIsAuthOpen(true)} />;
            case 'faq': return <FAQPage />;
            case 'contact': return <ContactPage />;
            default: return <LandingPage onStart={() => setIsAuthOpen(true)} />;
          }
        })()}
      </div>
      <Footer />
      {isAuthOpen && (
        <AuthModal 
          onClose={() => setIsAuthOpen(false)} 
          onSuccess={() => {
            setIsAuthOpen(false);
            setView('builder');
          }} 
        />
      )}
    </div>
  );

  return (
    <div className="selection:bg-indigo-500 selection:text-white">
      <AIAssistant />
      {view === 'builder' && user ? renderDashboard() : renderPublicPage()}
    </div>
  );
};

export default App;