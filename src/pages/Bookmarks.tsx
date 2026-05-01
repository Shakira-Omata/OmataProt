import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, ArrowRight, BookOpen, Trash2 } from 'lucide-react';
import { useBookmarks } from '../context/BookmarkContext';
import topics from '../data/topics/index';
import { BaseCard, GridContainer } from '../components/DesignSystem';

const Bookmarks: React.FC = () => {
  const { bookmarks, toggleBookmark } = useBookmarks();
  
  const bookmarkedTopics = topics.filter(topic => bookmarks.includes(topic.id));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full font-bold text-sm">
          <Bookmark size={18} fill="currentColor" /> My Favorites
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900">Your Bookmarks</h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Quickly access the topics you've saved for later. Your bookmarks are saved locally on this device.
        </p>
      </div>

      {bookmarkedTopics.length > 0 ? (
        <GridContainer cols={2} gap="lg">
          {bookmarkedTopics.map((topic) => (
            <div key={topic.id} className="group relative">
              <Link 
                to={`/learn/${topic.id}`}
                className="block card hover:border-primary/50 transition-all hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-primary shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                    <BookOpen size={24} />
                  </div>
                  <div className="space-y-1 pr-8">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{topic.title}</h3>
                    <p className="text-sm text-slate-600 line-clamp-2">{topic.description}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                  Continue Reading <ArrowRight size={14} className="ml-1" />
                </div>
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleBookmark(topic.id);
                }}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="Remove from bookmarks"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </GridContainer>
      ) : (
        <BaseCard className="py-20 flex flex-col items-center justify-center text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
            <Bookmark size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900">No bookmarks yet</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              Topics you bookmark will appear here. Start exploring our learning materials to find your favorites!
            </p>
          </div>
          <Link to="/learn" className="btn btn-primary px-8 h-12 rounded-xl">
            Explore Topics
          </Link>
        </BaseCard>
      )}
    </div>
  );
};

export default Bookmarks;
