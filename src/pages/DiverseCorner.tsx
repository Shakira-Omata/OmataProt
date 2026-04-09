import React from 'react';
import { Users, Accessibility, Heart, MessageCircle, Info, Sparkles, Smile, Star } from 'lucide-react';
import diverseData from '../data/diverse.json';

const DiverseCorner: React.FC = () => {
  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      <section className="relative overflow-hidden rounded-[3rem] bg-sage-50 p-10 md:p-16 border border-sage-100">
        <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-200/50 text-sage-800 rounded-2xl font-bold uppercase tracking-widest text-xs">
              <Accessibility size={18} /> Inclusive Learning
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
              The <span className="text-sage-600">Diverse</span> Corner
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
              A dedicated space for young people with disabilities and marginalized groups. Everyone's SRHR journey is unique, and everyone deserves accurate, affirming information.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4">
             <div className="p-6 rounded-3xl bg-white border border-sage-100 shadow-sm flex flex-col items-center text-center gap-3">
                <Heart className="text-pink-500" size={32} />
                <span className="font-bold text-sm text-slate-700">Dignity</span>
             </div>
             <div className="p-6 rounded-3xl bg-white border border-sage-100 shadow-sm flex flex-col items-center text-center gap-3 mt-8">
                <Smile className="text-yellow-500" size={32} />
                <span className="font-bold text-sm text-slate-700">Inclusion</span>
             </div>
             <div className="p-6 rounded-3xl bg-white border border-sage-100 shadow-sm flex flex-col items-center text-center gap-3 -mt-8">
                <Accessibility className="text-blue-500" size={32} />
                <span className="font-bold text-sm text-slate-700">Access</span>
             </div>
             <div className="p-6 rounded-3xl bg-white border border-sage-100 shadow-sm flex flex-col items-center text-center gap-3">
                <Star className="text-purple-500" size={32} />
                <span className="font-bold text-sm text-slate-700">Empowerment</span>
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 p-12 text-sage-100 hidden md:block">
           <Users size={300} />
        </div>
      </section>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {diverseData.map((item) => (
          <div key={item.id} className="group p-10 rounded-[3rem] bg-white border border-border shadow-sm hover:border-sage-400 hover:shadow-xl transition-all duration-300">
             <div className="w-16 h-16 rounded-3xl bg-sage-50 text-sage-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sage-600 group-hover:text-white transition-all transform duration-300">
                <Sparkles size={32} />
             </div>
             <h3 className="text-2xl font-bold mb-4 text-slate-900 leading-tight">
               {item.title}
             </h3>
             <p className="text-slate-600 leading-relaxed text-lg mb-8">
               {item.content}
             </p>
             <button className="flex items-center gap-2 font-black text-sage-600 uppercase tracking-widest text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <MessageCircle size={14} />
             </button>
          </div>
        ))}
      </div>

      <section className="bg-primary/5 rounded-[3rem] p-10 md:p-16 border border-primary/10 flex flex-col md:flex-row items-center gap-12">
         <div className="w-24 h-24 shrink-0 rounded-3xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
            <Info size={48} />
         </div>
         <div className="space-y-4">
            <h2 className="text-3xl font-black text-slate-900">Need specific accessibility features?</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
               If you can't find what you need or require content in a specific format (e.g., braille ready, audio only), let us know through our support channels.
            </p>
            <button className="btn btn-primary h-12 px-8 rounded-xl font-bold">Contact Support</button>
         </div>
      </section>
    </div>
  );
};

export default DiverseCorner;
