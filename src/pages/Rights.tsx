import React from 'react';
import { Shield, ShieldAlert, ShieldCheck, Scale, Lock, Users, Gavel } from 'lucide-react';
import rights from '../data/rights.json';

const Rights: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <section className="space-y-6">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-2xl font-bold uppercase tracking-widest text-sm">
          <Gavel size={20} /> Legal Protection
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight">
          Know Your <span className="text-primary">Rights</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          In Kenya, you have specific legal and human rights regarding your sexual and reproductive health. Understanding these rights empowers you to make safe and informed choices.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-6">
        {rights.map((right) => (
          <div key={right.id} className="card group hover:border-primary/50 flex flex-col p-8 rounded-[2.5rem]">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
               <ShieldCheck size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-card-foreground leading-snug">{right.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-lg flex-1">
              {right.content}
            </p>
          </div>
        ))}
      </div>

      <section className="bg-slate-900 text-white rounded-[3rem] p-10 md:p-16 relative overflow-hidden">
         <div className="absolute top-0 right-0 p-12 text-primary/10 hidden md:block">
            <ShieldAlert size={200} className="rotate-12" />
         </div>
         <div className="max-w-2xl space-y-8 relative z-10">
            <h2 className="text-4xl font-black leading-tight">Your Privacy is <br/><span className="text-primary italic">Protected</span></h2>
            <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
               <p>
                 Clinical workers in Kenya are legally required to maintain patient confidentiality. This includes your health records, treatments, and conversations.
               </p>
               <div className="grid sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800 border border-slate-700">
                     <Lock className="text-primary shrink-0" size={20} />
                     <span className="font-bold text-sm">Strict Privacy</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-800 border border-slate-700">
                     <Shield className="text-primary shrink-0" size={20} />
                     <span className="font-bold text-sm">Legal Safety</span>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Rights;
