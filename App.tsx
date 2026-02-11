
import React, { useState, useEffect } from 'react';
import { ResumeData, TemplateId } from './types';
import { INITIAL_RESUME_DATA, SAMPLE_RESUME_DATA } from './constants';
import ResumeForm from './components/ResumeForm';
import TemplateSwitcher from './components/TemplateSwitcher';
import ModernTemplate from './components/templates/ModernTemplate';
import MinimalTemplate from './components/templates/MinimalTemplate';
import CorporateTemplate from './components/templates/CorporateTemplate';
import CustomTemplate from './components/templates/CustomTemplate';
import LandingPage from './components/LandingPage';
import FeaturesPage from './components/FeaturesPage';
import PricingPage from './components/PricingPage';
import ContactPage from './components/ContactPage';
import ATSChecker from './components/ATSChecker';
import LetterGenerator from './components/LetterGenerator';
import AIAssistant from './components/AIAssistant';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import CustomStyleEditor from './components/CustomStyleEditor';
import { authService } from './services/firebase';

type ViewState = 'landing' | 'features' | 'pricing' | 'contact' | 'builder';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(TemplateId.MODERN);
  const [subView, setSubView] = useState<'editor' | 'preview' | 'ats' | 'letters' | 'architect'>('editor');
  const [view, setView] = useState<ViewState>('landing');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [logoError, setLogoError] = useState(false);

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

  const getInitial = () => {
    if (!user) return '?';
    if (user.displayName) return user.displayName[0].toUpperCase();
    if (user.email) return user.email[0].toUpperCase();
    return 'U';
  };

  const renderDashboard = () => (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-24">
      <header className="bg-white border-b border-slate-200 fixed top-0 left-0 w-full z-40 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
            <div className="relative w-10 h-10">
              {!logoError ? (
                <img 
                  src="logo.png" 
                  alt="Career Forge" 
                  className="w-full h-full rounded-xl shadow-lg shadow-indigo-100 object-contain p-1 border border-slate-100 bg-white" 
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="w-full h-full bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-indigo-100">
                  C
                </div>
              )}
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight hidden md:block uppercase">Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-1 rounded-xl flex hidden xl:flex">
              {['editor', 'preview', 'ats', 'letters', 'architect'].map((v: any) => (
                <button 
                  key={v}
                  onClick={() => setSubView(v)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase ${
                    subView === v ? 'bg-white shadow-sm text-indigo-600' : 'text-slate-500'
                  }`}
                >
                  {v === 'architect' ? '🎨 Architect' : v}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={handleDownloadPDF}
                className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-black text-xs shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                DOWNLOAD
              </button>

              <div className="relative group">
                <button 
                  onClick={handleLogout}
                  className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-200 flex items-center justify-center text-white font-black text-sm shadow-md hover:scale-105 transition-transform"
                >
                  {getInitial()}
                </button>
                <div className="absolute right-0 top-full mt-2 hidden group-hover:block w-48 bg-white border border-slate-200 rounded-xl p-3 shadow-2xl animate-in fade-in slide-in-from-top-2">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2 px-1 truncate">{user?.email}</p>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-xs font-bold text-rose-500 hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
        <div className={`lg:col-span-5 h-[calc(100vh-160px)] no-print ${subView === 'preview' ? 'hidden lg:block' : 'block'}`}>
          {subView === 'ats' ? (
            <ATSChecker data={resumeData} />
          ) : subView === 'letters' ? (
            <LetterGenerator data={resumeData} />
          ) : subView === 'architect' ? (
            <CustomStyleEditor data={resumeData} onChange={setResumeData} />
          ) : (
            <ResumeForm data={resumeData} onChange={setResumeData} />
          )}
        </div>

        <div className={`lg:col-span-7 h-[calc(100vh-160px)] overflow-y-auto custom-scrollbar pb-10 flex flex-col items-center ${subView === 'editor' || subView === 'ats' || subView === 'letters' || subView === 'architect' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="w-full max-w-[800px] animate-in zoom-in-95 duration-500">
            <TemplateSwitcher selected={selectedTemplate} onSelect={setSelectedTemplate} />
            <div className="rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden bg-white">
              {(() => {
                switch (selectedTemplate) {
                  case TemplateId.MODERN: return <ModernTemplate data={resumeData} />;
                  case TemplateId.MINIMAL: return <MinimalTemplate data={resumeData} />;
                  case TemplateId.CORPORATE: return <CorporateTemplate data={resumeData} />;
                  case TemplateId.CUSTOM: return <CustomTemplate data={resumeData} />;
                  default: return <ModernTemplate data={resumeData} />;
                }
              })()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );

  const renderPublicPage = () => (
    <div className="min-h-screen bg-[#0a0c10]">
      <Navbar 
        currentView={view} 
        setView={setView} 
        isLoggedIn={!!user} 
        user={user}
        onAuthClick={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
      />
      
      {(() => {
        switch (view) {
          case 'landing': return <LandingPage onStart={() => user ? setView('builder') : setIsAuthOpen(true)} />;
          case 'features': return <FeaturesPage />;
          case 'pricing': return <PricingPage onStart={() => user ? setView('builder') : setIsAuthOpen(true)} />;
          case 'contact': return <ContactPage />;
          default: return <LandingPage onStart={() => setIsAuthOpen(true)} />;
        }
      })()}

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
