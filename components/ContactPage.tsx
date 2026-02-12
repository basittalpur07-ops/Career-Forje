
import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    
    // Updated with the provided Formspree endpoint ID
    const response = await fetch("https://formspree.io/f/mzdaeped", {
      method: "POST",
      body: data,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      setStatus("Message Sent Successfully!");
      form.reset();
    } else {
      setStatus("Oops! There was an issue.");
    }
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
      <div className="bg-[#151921] border border-white/10 rounded-[3rem] overflow-hidden grid md:grid-cols-5 shadow-2xl">
        <div className="md:col-span-2 bg-indigo-600 p-12 text-white flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-black mb-6">Let's Talk Career.</h2>
            <p className="text-indigo-100/70 text-sm leading-relaxed">Have a question about the forge? Our career architects are here to help.</p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-xl">📍</span>
              <span className="text-xs font-bold uppercase tracking-widest">Global Operations</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl">✉️</span>
              <span className="text-xs font-bold uppercase tracking-widest">support@careerforge.ai</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="md:col-span-3 p-12 space-y-6">
          {status && (
            <div className={`p-4 rounded-xl text-center text-xs font-bold uppercase tracking-widest ${
              status.includes("Successfully") ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
            }`}>
              {status}
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Name</label>
              <input name="name" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Email</label>
              <input name="email" type="email" required className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Subject</label>
            <select name="subject" className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 appearance-none">
              <option>Billing Inquiry</option>
              <option>Technical Support</option>
              <option>Career Strategy Help</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Message</label>
            <textarea name="message" required rows={4} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500" />
          </div>
          <button type="submit" className="w-full bg-white text-slate-900 font-black py-4 rounded-2xl hover:bg-indigo-400 hover:text-white transition-all uppercase tracking-widest text-xs">
            Submit Intelligence
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
