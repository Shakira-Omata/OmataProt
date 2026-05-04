import React, { useState } from 'react';
import { Heart, Send, Shield, Info, AlertTriangle } from 'lucide-react';
import { BaseCard } from '../components/DesignSystem';

interface Confession {
  id: string;
  text: string;
  timestamp: Date;
  likes: number;
}

const initialConfessions: Confession[] = [
  {
    id: '1',
    text: "I've been feeling really overwhelmed with school and my body changing. Sometimes I feel like I'm the only one struggling, but coming here makes me feel less alone.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    likes: 24,
  },
  {
    id: '2',
    text: "I was so scared to ask my parents about periods, but I finally did today. It went better than I expected. If you're scared, just take a deep breath. You can do it.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    likes: 56,
  },
  {
    id: '3',
    text: "I feel confused about my feelings lately. It's hard to talk about it with my friends because I don't want them to judge me.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
    likes: 42,
  }
];

const Confessions: React.FC = () => {
  const [confessions, setConfessions] = useState<Confession[]>(initialConfessions);
  const [newConfession, setNewConfession] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newConfession.trim()) return;

    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      const confession: Confession = {
        id: Date.now().toString(),
        text: newConfession,
        timestamp: new Date(),
        likes: 0,
      };
      
      setConfessions([confession, ...confessions]);
      setNewConfession('');
      setIsSubmitting(false);
    }, 600);
  };

  const handleLike = (id: string) => {
    if (likedIds.has(id)) return; // Already liked

    setConfessions(confessions.map(c => 
      c.id === id ? { ...c, likes: c.likes + 1 } : c
    ));
    
    const newLikedIds = new Set(likedIds);
    newLikedIds.add(id);
    setLikedIds(newLikedIds);
  };

  const formatTime = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-purple-100 rounded-full mb-2">
          <Shield className="w-10 h-10 text-purple-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Safe Confessions
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          An anonymous, judgment-free space to share your thoughts, fears, and experiences. You are not alone.
        </p>
      </div>

      {/* Guidelines Banner */}
      <BaseCard className="bg-blue-50 border-blue-200 p-6 flex gap-4 items-start">
        <Info className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
        <div className="space-y-2">
          <h3 className="font-bold text-slate-900">Community Guidelines</h3>
          <ul className="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>Keep it anonymous - don't share personal names or locations.</li>
            <li>Be kind and supportive - hate speech or bullying will be removed.</li>
            <li>This is a safe space for SRHR, mental health, and general well-being topics.</li>
          </ul>
        </div>
      </BaseCard>

      {/* Submission Form */}
      <BaseCard className="p-6 md:p-8 bg-white border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="confession" className="block text-sm font-semibold text-slate-700">
              Share your story anonymously...
            </label>
            <textarea
              id="confession"
              value={newConfession}
              onChange={(e) => setNewConfession(e.target.value)}
              placeholder="What's on your mind? It's safe to share here."
              className="w-full h-32 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all resize-none"
              maxLength={500}
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>Your identity remains completely hidden</span>
              <span>{newConfession.length}/500</span>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newConfession.trim() || isSubmitting}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Posting...' : 'Post Anonymously'}
              {!isSubmitting && <Send size={18} />}
            </button>
          </div>
        </form>
      </BaseCard>

      {/* Confessions Feed */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b pb-2">
          <h2 className="text-2xl font-bold text-slate-900">Recent Confessions</h2>
        </div>

        <div className="space-y-4">
          {confessions.map((confession) => (
            <BaseCard key={confession.id} className="p-6 bg-white border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex flex-col gap-4">
                <p className="text-slate-800 text-lg leading-relaxed whitespace-pre-wrap">
                  "{confession.text}"
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                    <span className="bg-slate-100 px-3 py-1 rounded-full text-xs">Anonymous</span>
                    <span>•</span>
                    <span>{formatTime(confession.timestamp)}</span>
                  </div>
                  <button 
                    onClick={() => handleLike(confession.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-colors ${
                      likedIds.has(confession.id) 
                        ? 'text-red-600 bg-red-50' 
                        : 'text-slate-500 hover:text-red-500 hover:bg-red-50'
                    }`}
                  >
                    <Heart 
                      size={18} 
                      className={likedIds.has(confession.id) ? "fill-current" : ""} 
                    />
                    <span>{confession.likes}</span>
                  </button>
                </div>
              </div>
            </BaseCard>
          ))}
        </div>
      </div>
      
      {/* Support Disclaimer */}
      <div className="mt-8 p-4 bg-amber-50 rounded-xl flex items-start gap-3 border border-amber-200 text-sm text-amber-900">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <p>
          <strong>Need immediate help?</strong> If you are in distress or experiencing an emergency, please visit our <a href="/support" className="underline font-bold text-amber-700">Support Page</a> or contact a helpline. This space is not monitored 24/7 for emergencies.
        </p>
      </div>

    </div>
  );
};

export default Confessions;
