import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Search, ArrowRight, BookOpenCheck } from 'lucide-react';
import topics from '../data/topics.json';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Learn: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">Learn About SRHR</h1>
        <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
          Explore our range of topics to find the information you need. Our content is accurate, judgment-free, and specifically tailored for young people in Kenya.
        </p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
        <input
          type="text"
          placeholder="Search topics..."
          className="w-full h-14 pl-12 pr-4 rounded-2xl border border-border bg-card focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => (
          <Link 
            key={topic.id} 
            to={`/learn/${topic.id}`} 
            className="group flex flex-col p-8 rounded-[2rem] bg-card border border-border hover:border-primary/50 transition-all hover:shadow-xl hover:-translate-y-1"
          >
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <BookOpen size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{topic.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
              {topic.description}
            </p>
            <div className="flex items-center gap-2 text-primary font-bold">
               Read Guide <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {filteredTopics.length === 0 && (
        <div className="text-center py-20 bg-secondary/30 rounded-[2.5rem] border border-dashed border-border/60">
           <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-muted-foreground mx-auto mb-4">
              <Search size={32} />
           </div>
           <p className="text-lg font-medium text-slate-500">No topics found matching your search.</p>
           <button 
             onClick={() => setSearchTerm('')}
             className="mt-4 text-primary font-bold hover:underline"
           >
             Clear search
           </button>
        </div>
      )}

      {/* Diversity Callout */}
      <section className="bg-primary overflow-hidden rounded-[2.5rem] text-white p-8 md:p-12 relative">
         <div className="absolute top-0 right-0 h-full p-12 text-white/10 -rotate-12 hidden md:block">
            <BookOpenCheck size={200} />
         </div>
         <div className="max-w-xl space-y-6 relative z-10">
            <h2 className="text-3xl font-bold">Looking for disability-specific info?</h2>
            <p className="text-primary-foreground/90 text-lg leading-relaxed">
               Our Diverse Corner features SRHR information specifically curated for young people with disabilities and other marginalized groups.
            </p>
            <Link to="/diverse" className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary rounded-xl font-bold hover:bg-slate-100 transition-colors">
               Go to Diverse Corner
            </Link>
         </div>
      </section>
    </div>
  );
};

export default Learn;
