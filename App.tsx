
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
import JobScout from './components/JobScout';
import Navbar from './components/Navbar';
import AuthModal from './components/AuthModal';
import CustomStyleEditor from './components/CustomStyleEditor';
import Footer from './components/Footer';
import { authService } from './services/firebase';

type ViewState = 'landing' | 'features' | 'pricing' | 'faq' | 'contact' | 'builder';

const App: React.FC = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(INITIAL_RESUME_DATA);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateId>(TemplateId.MODERN);
  const [subView, setSubView] = useState<'editor' | 'preview' | 'ats' | 'letters' | 'architect' | 'jobs'>('editor');
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [view, setView] = useState<ViewState>('landing');
  const [uiTheme, setUiTheme] = useState<UITheme>('light');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [mobileMode, setMobileMode] = useState<'edit' | 'preview'>('edit');

  // Trigger Lucide icon refresh whenever relevant state changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (typeof (window as any).lucide !== 'undefined') {
        (window as any).lucide.createIcons();
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [view, subView, isAuthOpen, uiTheme, mobileMode]);

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

  const toggleTheme = () => {
    setUiTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const renderDashboard = () => (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${
      uiTheme === 'light' ? 'bg-slate-50 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      {/* Professional Dashboard Header */}
      <header className={`fixed top-0 left-0 w-full z-50 h-16 border-b transition-all no-print flex items-center justify-between px-4 md:px-8 ${
        uiTheme === 'light' ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800 shadow-xl'
      }`}>
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('landing')}>
            <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center font-bold text-white">CF</div>
            <span className="font-bold tracking-tight text-sm hidden sm:block">Career Forge</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-1">
            {['editor', 'ats', 'letters', 'jobs'].map((v: any) => (
              <button 
                key={v}
                onClick={() => setSubView(v)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${
                  subView === v 
                    ? (uiTheme === 'light' ? 'bg-slate-100 text-indigo-600' : 'bg-slate-800 text-white') 
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
              >
                {v}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* Professional Theme Toggle: Icon represents the CURRENT state */}
          <button 
            onClick={toggleTheme}
            key={`theme-btn-${uiTheme}`} // Force re-render for Lucide
            className={`p-2.5 rounded-lg border transition-all flex items-center justify-center ${
              uiTheme === 'light' 
                ? 'bg-slate-100 border-slate-200 text-slate-600 hover:bg-slate-200' 
                : 'bg-slate-800 border-slate-700 text-indigo-400 hover:bg-slate-700'
            }`}
          >
            {uiTheme === 'light' ? (
              <i data-lucide="sun" className="w-4 h-4"></i>
            ) : (
              <i data-lucide="moon" className="w-4 h-4"></i>
            )}
          </button>
          
          <button 
            onClick={handleDownloadPDF}
            className="hidden sm:flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold text-xs transition-all shadow-sm active:scale-95"
          >
            <i data-lucide="download" className="w-3.5 h-3.5"></i>
            Download PDF
          </button>

          <button 
            onClick={handleLogout}
            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
              uiTheme === 'light' ? 'bg-slate-100 border-slate-200' : 'bg-slate-800 border-slate-700'
            }`}
          >
            <i data-lucide="log-out" className="w-4 h-4 text-slate-500 hover:text-rose-500"></i>
          </button>
        </div>
      </header>

      {/* Workspace Split View */}
      <main className="flex-1 flex flex-col lg:flex-row pt-16 h-screen overflow-hidden">
        {/* Editor (Left) */}
        <section className={`flex-1 lg:flex-[0.45] xl:flex-[0.4] border-r transition-colors duration-300 overflow-y-auto no-scrollbar no-print ${
          uiTheme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
        } ${mobileMode === 'preview' ? 'hidden' : 'flex'}`}>
          <div className="w-full max-w-2xl mx-auto p-4 md:p-8">
            {subView === 'ats' ? <ATSChecker data={resumeData} onChange={setResumeData} onNavigateToEditor={() => setSubView('editor')} /> :
             subView === 'letters' ? <LetterGenerator data={resumeData} letter={generatedLetter} onLetterUpdate={setGeneratedLetter} /> :
             subView === 'jobs' ? <JobScout data={resumeData} /> :
             <ResumeForm data={resumeData} onChange={setResumeData} />}
            <div className="h-20 lg:hidden"></div>
          </div>
        </section>

        {/* Live Preview (Right) */}
        <section className={`flex-1 lg:flex-[0.55] xl:flex-[0.6] overflow-y-auto p-4 md:p-12 relative flex flex-col items-center transition-colors duration-300 ${
          uiTheme === 'light' ? 'bg-slate-100' : 'bg-slate-950'
        } ${mobileMode === 'edit' ? 'hidden lg:flex' : 'flex'}`}>
          <div className="no-print w-full max-w-3xl mb-6">
             <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Template Selection</span>
             </div>
             <TemplateSwitcher selected={selectedTemplate} onSelect={setSelectedTemplate} />
          </div>

          <div className="w-full max-w-[850px] bg-white rounded-lg shadow-2xl origin-top transition-transform duration-500 scale-[0.85] lg:scale-100 print:scale-100 print:shadow-none print:rounded-none">
            {(() => {
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
          <div className="h-24 lg:hidden"></div>
        </section>
      </main>

      {/* Standard Mobile Bottom Navigation */}
      <div className={`lg:hidden fixed bottom-0 left-0 w-full z-[60] border-t px-4 py-2 flex items-center justify-around no-print shadow-2xl ${
        uiTheme === 'light' ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-800'
      }`}>
        {['editor', 'ats', 'letters'].map((v: any) => (
          <button 
            key={v}
            onClick={() => { setSubView(v); setMobileMode('edit'); }}
            className={`flex flex-col items-center gap-1 transition-all py-1 ${
              subView === v && mobileMode === 'edit' ? 'text-indigo-600 font-bold' : 'text-slate-400'
            }`}
          >
            {v === 'editor' && <i data-lucide="edit-3" className="w-5 h-5"></i>}
            {v === 'ats' && <i data-lucide="search" className="w-5 h-5"></i>}
            {v === 'letters' && <i data-lucide="mail" className="w-5 h-5"></i>}
            <span className="text-[9px] uppercase tracking-tighter">{v}</span>
          </button>
        ))}
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1"></div>
        <button 
          onClick={() => setMobileMode(mobileMode === 'edit' ? 'preview' : 'edit')}
          className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${
            mobileMode === 'preview' 
              ? 'bg-indigo-600 text-white' 
              : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          {mobileMode === 'preview' ? 'Edit Mode' : 'View Mode'}
        </button>
      </div>
    </div>
  );

  return (
    <div className={`selection:bg-indigo-600 selection:text-white ${uiTheme}`}>
      <AIAssistant />
      {view === 'builder' && user ? renderDashboard() : (
        <div className="min-h-screen flex flex-col">
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
          {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} onSuccess={() => { setIsAuthOpen(false); setView('builder'); }} />}
        </div>
      )}
    </div>
  );
};

export default App;
