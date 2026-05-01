import React from 'react';
import { Play, Pause, Bookmark, Share2, Clock, ShieldCheck } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { useBookmarks } from '../context/BookmarkContext';
import { useSpeech } from '../hooks/useSpeech';

interface PageActionsProps {
  id: string;
  title: string;
  description: string;
  contentToSpeak: string;
  readTime?: string;
}

const PageActions: React.FC<PageActionsProps> = ({ id, title, description, contentToSpeak, readTime = "5 min read" }) => {
  const { isAudioEnabled } = useAccessibility();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { speak, stop, isSpeaking } = useSpeech();
  const [isShared, setIsShared] = React.useState(false);

  const toggleAudio = () => {
    if (isSpeaking) {
      stop();
    } else {
      speak(contentToSpeak);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: `SalamaHub - ${title}`,
      text: description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-6 py-6 border-y-2 border-slate-200">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
        <Clock size={18} className="text-blue-600" /> {readTime}
      </div>
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
        <ShieldCheck size={18} className="text-green-600" /> Evidence-Based
      </div>

      {isAudioEnabled && (
        <button 
          onClick={toggleAudio}
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${
            isSpeaking 
              ? "bg-blue-600 text-white" 
              : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }`}
        >
          {isSpeaking ? <Pause size={18} /> : <Play size={18} />}
          {isSpeaking ? "Stop" : "Listen"}
        </button>
      )}

      <div className="ml-auto flex gap-2">
        <button 
          onClick={() => toggleBookmark(id)}
          className={`p-3 rounded-lg transition-all ${
            isBookmarked(id) 
              ? "bg-amber-50 text-amber-600" 
              : "hover:bg-slate-100 text-slate-500 hover:text-slate-700"
          }`} 
          title={isBookmarked(id) ? "Remove Bookmark" : "Bookmark Page"}
        >
          <Bookmark size={20} fill={isBookmarked(id) ? "currentColor" : "none"} />
        </button>
        <div className="relative">
          <button 
            onClick={handleShare}
            className={`p-3 rounded-lg transition-all ${
              isShared 
                ? "bg-green-50 text-green-600" 
                : "hover:bg-slate-100 text-slate-500 hover:text-slate-700"
            }`} 
            title="Share Page"
          >
            <Share2 size={20} />
          </button>
          {isShared && (
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-slate-900 text-white text-xs rounded-lg animate-in fade-in slide-in-from-bottom-1 whitespace-nowrap">
              Link Copied!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageActions;
