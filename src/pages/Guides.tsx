import React from 'react';
import { Download, FileText, CheckCircle2, Accessibility, Info, FileStack, ArrowRight, Play } from 'lucide-react';
import guides from '../data/guides.json';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Guides: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      <section className="space-y-6">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-2xl font-bold uppercase tracking-widest text-sm">
          <FileStack size={20} /> Educational Toolkits
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
          Guides & <span className="text-primary italic">Downloads</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Download our youth-friendly SRHR resources for offline reading or sharing with others. Our guides are designed to be accessible and easy to understand.
        </p>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide) => (
          <div key={guide.id} className="group p-10 rounded-[3rem] bg-white border border-border shadow-sm hover:border-primary/50 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center">
             <div className="w-20 h-20 rounded-3xl bg-secondary flex items-center justify-center text-primary mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all transform duration-300 shadow-sm relative">
                <FileText size={40} />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-4 border-secondary flex items-center justify-center text-primary group-hover:bg-secondary group-hover:border-primary transition-all">
                  <Download size={14} />
                </div>
             </div>
             <h3 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-primary transition-colors">
               {guide.title}
             </h3>
             <p className="text-slate-600 leading-relaxed font-medium mb-10 flex-1">
               {guide.description}
             </p>
             <div className="space-y-4 w-full">
                {guide.accessible && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-sage-50 text-sage-800 rounded-lg text-xs font-bold uppercase tracking-widest border border-sage-100">
                     <Accessibility size={12} /> Accessible Format
                  </div>
                )}
                <button className="w-full btn btn-primary h-12 rounded-xl text-sm font-bold gap-2">
                   Download {guide.format} <Download size={16} />
                </button>
             </div>
          </div>
        ))}
      </div>

      <section className="space-y-8">
        <div className="flex items-end justify-between px-2">
          <div className="space-y-2">
            <h2 className="text-3xl font-black tracking-tight text-slate-900">Captioned Stories</h2>
            <p className="text-muted-foreground">Visual learning with full accessibility support.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
           {[
             { title: "Understanding Consent (Visual Story)", type: "Video", duration: "2:30", color: "bg-blue-500" },
             { title: "My Body, My Rights (Captioned)", type: "Video", duration: "3:45", color: "bg-purple-500" }
           ].map((video, i) => (
             <div key={i} className="group relative overflow-hidden rounded-[2.5rem] bg-slate-900 aspect-video flex items-center justify-center border-4 border-white shadow-xl">
               <div className={cn("absolute inset-0 opacity-40 transition-transform duration-700 group-hover:scale-110", video.color)} />
               <div className="relative z-10 flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                     <Play fill="currentColor" size={32} />
                  </div>
                  <div className="text-center">
                    <h4 className="text-xl font-bold text-white mb-1">{video.title}</h4>
                    <span className="text-sm font-bold text-white/60 uppercase tracking-widest">{video.duration} • CC Enabled</span>
                  </div>
               </div>
               <div className="absolute bottom-6 right-6 px-3 py-1 bg-white/10 backdrop-blur-lg rounded-lg text-[10px] font-black text-white uppercase tracking-widest border border-white/20">
                  Closed Captions
               </div>
             </div>
           ))}
        </div>
      </section>

      <section className="bg-primary overflow-hidden rounded-[3rem] text-white p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 relative">
         <div className="absolute top-0 right-0 p-12 text-white/10 -rotate-12 hidden md:block">
            <Info size={240} />
         </div>
         <div className="max-w-2xl space-y-8 relative z-10">
            <h2 className="text-4xl font-black">Need printed copies?</h2>
            <p className="text-lg text-primary-foreground/90 leading-relaxed">
               If you are a community worker or group leader and need physical copies of our toolkits for redistribution in schools or community spaces, contact our coordination team.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-black shadow-lg shadow-black/20 hover:scale-105 transition-all">
               Request Materials <ArrowRight size={20} />
            </button>
         </div>
      </section>
    </div>
  );
};

export default Guides;
