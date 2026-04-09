import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ChevronDown, ChevronUp, Lightbulb, MessageCircle } from 'lucide-react';
import myths from '../data/myths.json';

const Myths: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto space-y-16 animate-in fade-in duration-500">
      <section className="text-center space-y-6 pt-12">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto shadow-sm">
           <HelpCircle size={40} />
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
          Questions & <span className="text-primary italic">Myths</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Common questions and misunderstandings about SRHR, answered with facts and supportive language.
        </p>
      </section>

      <div className="space-y-6">
        {myths.map((item, index) => (
          <div 
            key={item.id} 
            className={`rounded-3xl border-2 transition-all duration-300 overflow-hidden ${
              openIndex === index ? "border-primary bg-card shadow-xl scale-[1.02]" : "border-border/60 hover:border-border bg-slate-50"
            }`}
          >
            <button 
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-8 md:p-10 flex items-center justify-between text-left group"
            >
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 rounded-2xl bg-slate-200 group-hover:bg-primary/20 flex items-center justify-center text-slate-500 group-hover:text-primary transition-colors">
                    <HelpCircle size={24} />
                 </div>
                 <h3 className="text-xl md:text-2xl font-bold text-slate-800 leading-snug">{item.myth}</h3>
              </div>
              {openIndex === index ? <ChevronUp size={28} className="text-primary" /> : <ChevronDown size={28} className="text-slate-400 group-hover:text-slate-600" />}
            </button>
            
            {openIndex === index && (
              <div className="px-8 md:px-10 pb-10 animate-in slide-in-from-top duration-300">
                <div className="p-8 rounded-[2rem] bg-primary/5 border border-primary/20 space-y-4">
                   <div className="flex items-center gap-3 text-primary font-black uppercase tracking-widest text-xs">
                      <CheckCircle2 size={18} /> The Fact
                   </div>
                   <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
                     {item.fact}
                   </p>
                </div>
                <div className="mt-8 flex justify-end">
                   <button className="flex items-center gap-2 font-bold text-primary hover:underline group">
                     Found this helpful? <MessageCircle size={18} className="group-hover:scale-110 transition-transform" />
                   </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <section className="bg-slate-900 text-white rounded-[3rem] p-10 md:p-16 text-center space-y-8 relative overflow-hidden">
         <div className="absolute top-0 left-0 p-12 text-primary/10 rotate-12 -z-10">
            <Lightbulb size={240} />
         </div>
         <div className="space-y-4 relative z-10">
            <h2 className="text-4xl font-black">Anonymous Questions?</h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
               If you have a question that isn't answered here, you can submit it anonymously and our team will provide a supportive answer.
            </p>
         </div>
         <button className="btn btn-primary h-14 px-10 text-lg rounded-2xl relative z-10">Ask a Question</button>
      </section>
    </div>
  );
};

export default Myths;
