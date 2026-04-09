import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  Download, 
  Bookmark, 
  Clock, 
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  MessageCircle,
  HelpCircle,
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowRight
} from 'lucide-react';
import topics from '../data/topics.json';
import { useAccessibility } from '../context/AccessibilityContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const LearnDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isEasyRead, isAudioEnabled } = useAccessibility();
  const [isPlaying, setIsPlaying] = useState(false);
  
  const topic = topics.find(t => t.id === id) as any;

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      const textToSpeak = isEasyRead && topic.easyReadContent 
        ? topic.easyReadContent 
        : topic.content;
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.onend = () => setIsPlaying(false);
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  if (!topic) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-in fade-in">
        <h2 className="text-3xl font-bold mb-4">Topic not found</h2>
        <Link to="/learn" className="btn btn-primary">Back to all topics</Link>
      </div>
    );
  }

  const nextTopic = topics[topics.indexOf(topic) + 1] || topics[0];

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-bottom duration-700">
      <nav className="flex items-center gap-4 text-sm text-muted-foreground font-semibold uppercase tracking-widest px-2">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:text-primary transition-colors">
          <ArrowLeft size={18} /> Back
        </button>
        <span className="opacity-30">/</span>
        <Link to="/learn" className="hover:text-primary transition-colors">Learn SRHR</Link>
        <span className="opacity-30">/</span>
        <span className="text-foreground truncate">{topic.title}</span>
      </nav>

      <section className="space-y-8">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 text-primary rounded-2xl font-bold">
            <CheckCircle2 size={20} /> Verified Content
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight">
            {topic.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl">
            {topic.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 py-4 border-y border-border/60">
           <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
              <Clock size={16} /> 5 min read
           </div>
           <div className="flex items-center gap-2 text-sm font-bold text-slate-500">
              <ShieldCheck size={16} /> Youth-Friendly
           </div>

           {isAudioEnabled && (
             <button 
               onClick={toggleAudio}
               className={cn(
                 "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all animate-in zoom-in",
                 isPlaying ? "bg-primary text-primary-foreground" : "bg-secondary text-primary hover:bg-primary/20"
               )}
             >
               {isPlaying ? <Pause size={18} /> : <Play size={18} />}
               {isPlaying ? "Stop Listening" : "Listen to Lesson"}
             </button>
           )}

           <div className="ml-auto flex gap-2">
              <button className="p-2 hover:bg-secondary rounded-xl text-muted-foreground transition-all">
                <Bookmark size={20} />
              </button>
              <button className="p-2 hover:bg-secondary rounded-xl text-muted-foreground transition-all">
                <Share2 size={20} />
              </button>
           </div>
        </div>

        <div className="prose prose-lg prose-slate max-w-none">
           <div className={cn(
             "bg-card border border-border/80 rounded-[2rem] p-8 md:p-12 shadow-sm transition-all duration-500",
             isEasyRead && "bg-blue-50/30 border-blue-200"
           )}>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                   {isEasyRead ? "Easy-Read Summary" : "What You Need To Know"}
                   <span className="w-12 h-1 bg-primary/20 rounded-full" />
                </h2>
                {isEasyRead && (
                  <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-bold uppercase tracking-widest">
                    Simplified
                  </div>
                )}
              </div>

              <div className={cn(
                "text-lg text-slate-700 leading-[1.8] space-y-6",
                isEasyRead && "text-xl font-medium"
              )}>
                {isEasyRead && topic.easyReadContent ? (
                  <div className="whitespace-pre-line bg-white/50 p-6 rounded-2xl border border-blue-100">
                    {topic.easyReadContent}
                  </div>
                ) : (
                  <>
                    <p>{topic.content}</p>
                    <p> 
                      Understanding your options and rights is the first step toward making empowered choices about your health. 
                      In Kenya, you have access to a variety of services and information designed to support your unique journey. 
                    </p>
                  </>
                )}
              </div>
           </div>

           <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className="p-8 rounded-[2rem] bg-secondary/30 border border-border/40 space-y-4">
                 <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <MessageCircle className="text-primary" /> Key Takeaways
                 </h3>
                 <ul className="space-y-3">
                    {["Accuracy and respect", "Bodily autonomy", "Local support available"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 font-semibold text-slate-700">
                         <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs">
                            {i+1}
                         </div>
                         {item}
                      </li>
                    ))}
                 </ul>
              </div>

              <div className="p-8 rounded-[2rem] bg-sage-50 border border-sage-100 space-y-4">
                 <h3 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <HelpCircle className="text-sage-600" /> Need Support?
                 </h3>
                 <p className="font-medium text-slate-600 leading-relaxed">
                    If you have more questions or need clinical care, we can help you find a trusted youth-friendly service in your area.
                 </p>
                 <Link to="/support" className="btn btn-secondary bg-white border border-border w-full h-12 text-sm font-bold rounded-xl flex items-center justify-center gap-2">
                    Find Support Directory <ChevronRight size={16} />
                 </Link>
              </div>
           </div>
        </div>

        <div className="pt-12 border-t border-border/60">
           <Link to={`/learn/${nextTopic.id}`} className="group block p-10 rounded-[2.5rem] bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all text-center">
              <span className="text-sm font-black text-primary uppercase tracking-widest mb-4 block">Next Topic</span>
              <h4 className="text-3xl md:text-4xl font-black text-slate-900 group-hover:text-primary transition-colors">
                {nextTopic.title}
              </h4>
              <p className="text-slate-600 font-medium max-w-lg mx-auto mb-6 mt-4">
                {nextTopic.description}
              </p>
              <div className="btn btn-primary h-12 px-8 rounded-xl font-bold inline-flex items-center gap-2">
                Continue Learning <ArrowRight size={18} />
              </div>
           </Link>
        </div>
      </section>
    </div>
  );
};

export default LearnDetail;
