import React from 'react';
import { Phone, MapPin, Globe, Clock, CheckCircle2, PhoneCall, ExternalLink, MessageSquare, Info } from 'lucide-react';
import support from '../data/support.json';

const Support: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      <section className="space-y-6">
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-2xl font-bold uppercase tracking-widest text-sm">
          <PhoneCall size={20} /> Get Support
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight">
          Safe & Trusted <span className="text-primary">Services</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Need professional care or someone to talk to? Use our directory to find youth-friendly, inclusive, and confidential services near you in Kenya.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {support.map((service) => (
          <div key={service.id} className="card group p-8 rounded-[3rem] bg-card border border-border shadow-sm hover:border-primary/50 hover:shadow-xl transition-all duration-300">
             <div className="flex items-start justify-between mb-8">
                <div className="w-16 h-16 rounded-3xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all transform duration-300">
                   {service.type === 'Mental Health' ? <MessageSquare size={32} /> : service.type === 'Emergency' ? <Phone size={32} /> : <MapPin size={32} />}
                </div>
                {service.inclusive && (
                  <div className="px-4 py-2 bg-sage-100 text-sage-800 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                     <CheckCircle2 size={14} /> Inclusive
                  </div>
                )}
             </div>
             <div className="space-y-4">
                <h3 className="text-2xl font-bold text-card-foreground leading-tight group-hover:text-primary transition-colors">
                  {service.name}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-medium">
                  {service.description}
                </p>
                <div className="pt-4 border-t border-border/60">
                   <div className="flex items-center gap-3 text-lg font-black text-card-foreground">
                      <Phone className="text-primary" size={24} />
                      {service.contact}
                   </div>
                   <div className="mt-6 flex flex-wrap gap-3">
                      <button className="flex-1 btn btn-primary h-12 rounded-xl text-sm font-bold gap-2">
                        Call Now <Phone size={16} />
                      </button>
                      <button className="flex-1 btn btn-secondary h-12 rounded-xl text-sm font-bold gap-2 border border-border hover:bg-secondary/50 text-secondary-foreground">
                         View Details <ExternalLink size={16} />
                      </button>
                   </div>
                </div>
             </div>
          </div>
        ))}
      </div>

      <section className="bg-secondary/20 rounded-[3rem] p-10 md:p-16 border border-border flex flex-col md:flex-row items-center gap-12 relative overflow-hidden shadow-sm">
         <div className="w-32 h-32 shrink-0 rounded-full bg-card border border-border flex items-center justify-center text-primary shadow-xl relative z-10">
            <Info size={56} />
         </div>
         <div className="space-y-6 relative z-10">
            <h2 className="text-3xl font-black text-foreground">Important safety note</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
               If you are in immediate danger or have a medical emergency, please call the Kenya National Helplines listed above immediately. These services are available 24/7.
            </p>
            <div className="p-4 rounded-2xl bg-secondary/50 border border-border inline-flex items-center gap-3 text-foreground font-bold">
               <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
               Always consult a professional for medical care.
            </div>
         </div>
      </section>
    </div>
  );
};

export default Support;
