import React from 'react';
import { Info, Heart, Shield, Accessibility, Users, Globe, Handshake, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-20 animate-in fade-in duration-700 py-12">
      <section className="text-center space-y-8">
        <div className="w-24 h-24 bg-primary/10 text-primary rounded-[2rem] flex items-center justify-center mx-auto shadow-sm rotate-3 group hover:rotate-0 transition-transform duration-500">
           <Info size={48} />
        </div>
        <div className="space-y-4">
           <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
             About <span className="text-primary italic">SalamaHub</span>
           </h1>
           <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-medium">
             Empowering Kenyan youth with accessible, inclusive, and judgment-free SRHR information.
           </p>
        </div>
      </section>

      <section className="grid lg:grid-cols-2 gap-12 items-center">
         <div className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900 leading-tight">Why We <span className="text-primary underline decoration-primary/20 underline-offset-8">Exist</span></h2>
            <div className="space-y-6 text-xl text-slate-600 leading-relaxed">
               <p>
                 Accessing sexual and reproductive health information shouldn't be difficult or scary. SalamaHub was created to fill the gap in youth-friendly health education in Kenya.
               </p>
               <p>
                 We believe every young person, regardless of their background or ability, has the right to accurate information that respects their dignity and autonomy.
               </p>
            </div>
            <div className="flex flex-wrap gap-4 pt-4">
               <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-border shadow-sm">
                  <Shield className="text-primary" size={24} />
                  <span className="font-bold text-slate-800">Safe Space</span>
               </div>
               <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-border shadow-sm">
                  <Heart className="text-pink-500" size={24} />
                  <span className="font-bold text-slate-800">No Judgment</span>
               </div>
               <div className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-border shadow-sm">
                  <Globe className="text-blue-500" size={24} />
                  <span className="font-bold text-slate-800">Open Access</span>
               </div>
            </div>
         </div>
         <div className="bg-primary/5 rounded-[3.5rem] p-4 relative group">
            <div className="absolute inset-0 bg-primary/20 rounded-[3.5rem] rotate-2 scale-105 group-hover:rotate-0 transition-transform duration-500" />
            <div className="relative rounded-[3rem] bg-white border border-primary/20 p-10 space-y-8 shadow-2xl">
               <h3 className="text-3xl font-black text-slate-900">Our Core Values</h3>
               <div className="space-y-6">
                  {[
                    { title: "Inclusion", icon: Users, desc: "Intentionally serving young people with disabilities and marginalized groups." },
                    { title: "Dignity", icon: Heart, desc: "Treating every user with the respect and safety they deserve." },
                    { title: "Empowerment", icon: Handshake, desc: "Providing the tools for youth to make their own informed choices." },
                    { title: "Accuracy", icon: CheckCircle2, desc: "Providing evidence-based, verified health information." }
                  ].map((value, i) => (
                    <div key={i} className="flex gap-4 group/item">
                       <div className="w-12 h-12 shrink-0 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover/item:scale-110 transition-all">
                          <value.icon size={24} />
                       </div>
                       <div className="space-y-1">
                          <h4 className="text-lg font-bold text-slate-800">{value.title}</h4>
                          <p className="text-slate-500 font-medium leading-relaxed">{value.desc}</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </section>

      <section className="bg-slate-900 text-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden text-center space-y-10">
         <div className="absolute top-0 right-0 p-12 text-primary/10 hidden md:block">
            <Accessibility size={320} className="rotate-12" />
         </div>
         <div className="space-y-4 max-w-2xl mx-auto relative z-10">
            <h2 className="text-4xl md:text-5xl font-black italic">Disclaimer</h2>
            <p className="text-xl text-slate-400 leading-relaxed font-black">
               SalamaHub is a platform for education and support, not a replacement for professional medical care. 
            </p>
         </div>
         <div className="p-10 rounded-[3rem] bg-slate-800/80 border border-slate-700 max-w-3xl mx-auto relative z-10">
            <p className="text-lg text-slate-300 leading-relaxed mb-6 font-medium">
               While we strive for accuracy, please ALWAYS consult with a healthcare professional for diagnosis, treatment, and medical advice.
            </p>
            <Link to="/support" className="btn btn-primary h-14 px-10 text-lg rounded-2xl">Find a Professional</Link>
         </div>
      </section>

      <section className="text-center py-10">
         <div className="bg-primary/5 rounded-[2.5rem] p-12 border border-border inline-block max-w-xl">
            <h3 className="text-2xl font-bold mb-4">Start your journey today</h3>
            <p className="text-slate-600 mb-8 font-medium">Ready to dive in and learn more about your health and rights?</p>
            <Link to="/learn" className="btn btn-primary h-14 px-12 rounded-2xl text-lg shadow-xl shadow-primary/20">Go to Dashboard</Link>
         </div>
      </section>
    </div>
  );
};

export default About;
