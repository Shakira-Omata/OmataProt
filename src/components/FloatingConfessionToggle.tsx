import React, { useState } from 'react';
import { Feather, X } from 'lucide-react';
import Confessions from '../pages/Confessions';

const FloatingConfessionToggle: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 
        bg-[#A78BFA] hover:bg-[#8B5CF6] 
        text-white rounded-full shadow-xl hover:shadow-2xl 
        hover:-translate-y-1 transition-all duration-200 
        flex items-center gap-3 px-6 py-3 
        border-[6px] border-[#E9D5FF]"
        aria-label="Open Raw & Real space"
      >
        <div className="flex items-center justify-center bg-white/20 p-2 rounded-full">
          <Feather size={22} />
        </div>

        <div className="flex flex-col text-left leading-tight">
          <span className="font-bold text-[13px] tracking-wide">
            Raw & Real
          </span>
          <span className="text-[11px] text-white/80 font-medium">
            No judgment
          </span>
        </div>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-over / Bottom Sheet Panel */}
      <div
        className={`fixed 
        bottom-0 right-0 sm:top-0 sm:bottom-auto
        h-[85%] sm:h-full 
        w-full sm:w-[500px] 
        bg-white z-[70] shadow-2xl 
        transform transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] 
        ${isOpen ? 'translate-y-0 sm:translate-x-0' : 'translate-y-full sm:translate-x-full'}
        flex flex-col rounded-t-2xl sm:rounded-none`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Feather size={20} />
            </div>
            <div>
              <h2 className="font-bold text-slate-900 text-lg">
                Raw & Real
              </h2>
              <p className="text-xs text-slate-500">
                No judgment. Just a safe space to be honest.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Reassurance Block */}
        <div className="px-4 pt-4">
          <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-sm text-purple-700">
            This is a safe, anonymous space. Share anything on your mind — big or small.
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <Confessions />
        </div>
      </div>
    </>
  );
};

export default FloatingConfessionToggle;