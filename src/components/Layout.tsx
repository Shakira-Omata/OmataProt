import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Home,
  BookOpen,
  Shield,
  Users,
  HelpCircle,
  Phone,
  Download,
  Info,
  Menu,
  X,
  User,
  LogOut,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import logo4 from '../assets/logo4.png';
import topics from '../data/topics/index';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const NavItem = ({ to, icon: Icon, label, onClick }: { to: string, icon: any, label: string, onClick?: () => void }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => cn(
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
      isActive
        ? "bg-primary text-primary-foreground shadow-md"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    )}
  >
    <Icon size={20} className="shrink-0" />
    <span className="font-medium">{label}</span>
    <ChevronRight size={16} className={cn("ml-auto transition-transform group-hover:translate-x-1", "opacity-0 group-hover:opacity-100")} />
  </NavLink>
);

// Expandable Learn SRHR nav item with topic sub-links
const LearnNavItem = ({ onSubItemClick }: { onSubItemClick?: () => void }) => {
  const location = useLocation();
  const isLearnActive = location.pathname.startsWith('/learn');
  const [isOpen, setIsOpen] = useState(isLearnActive);

  // Topic icons mapping
  const getTopicIcon = (topicId: string) => {
    const iconMap: Record<string, string> = {
      'overview-rights': '🌍',
      'puberty-adolescent-health': '🌸',
      'menstrual-health': '🩸',
      'sexual-health-protection': '❤️',
      'pregnancy-parenthood': '🤰',
      'mental-health-wellbeing': '🧠',
      'relationships-support': '💑'
    };
    return iconMap[topicId] || '📚';
  };

  return (
    <div>
      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
          isLearnActive
            ? "bg-primary text-primary-foreground shadow-md"
            : "text-muted-foreground hover:bg-secondary hover:text-foreground"
        )}
      >
        <BookOpen size={20} className="shrink-0" />
        <span className="font-medium">Learn SRHR</span>
        <ChevronDown
          size={16}
          className={cn(
            "ml-auto transition-transform duration-300",
            isOpen ? "rotate-180" : ""
          )}
        />
      </button>

      {/* Section label and topic navigation cards */}
      {isOpen && (
        <div className="mt-3 ml-3">
          {/* Section label */}
          <div className="px-3 py-1 mb-3">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
              Learn Topics
            </span>
          </div>

          {/* Topic navigation cards */}
          <div className="space-y-2">
            {topics.map((topic) => {
              return (
                <NavLink
                  key={topic.id}
                  to={`/learn/${topic.id}`}
                  onClick={onSubItemClick}
                  className={({ isActive: linkActive }) => cn(
                    "flex items-center gap-3 p-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                    "bg-white border border-slate-100 shadow-sm hover:shadow-md",
                    linkActive
                      ? "bg-primary text-white shadow-lg border-primary"
                      : "text-slate-700 hover:bg-blue-50 hover:border-blue-200 hover:border-l-4 hover:border-l-primary"
                  )}
                >
                  <span className="text-lg flex-shrink-0">{getTopicIcon(topic.id)}</span>
                  <span className="flex-1 leading-tight font-semibold">{topic.title}</span>
                  <span className="text-slate-400 group-hover:text-slate-600 transition-colors text-lg">
                    ›
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const {
    textSize,
    setTextSize,
    contrastMode,
    setContrastMode,
    isEasyRead,
    setIsEasyRead,
    isAudioEnabled,
    setIsAudioEnabled
  } = useAccessibility();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Desktop */}
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-80 border-r bg-card sticky top-0 h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar space-y-8">
          <Link to="/" className="flex items-center gap-2 px-2">
            <img src={logo4} alt="SalamaHub Logo" className="h-12 w-auto object-contain" />
            <span className="text-xl font-bold tracking-tight text-primary">SalamaHub</span>
          </Link>

          <nav className="space-y-2">
            <NavItem to="/" icon={Home} label="Home" />
            <LearnNavItem />
            <NavItem to="/rights" icon={Shield} label="Know Your Rights" />
            <NavItem to="/diverse" icon={Users} label="Diverse Corner" />
            <NavItem to="/myths" icon={HelpCircle} label="Questions & Myths" />
            <NavItem to="/support" icon={Phone} label="Get Support" />
            <NavItem to="/guides" icon={Download} label="Guides & Tools" />
            <NavItem to="/about" icon={Info} label="About Us" />
          </nav>

          <div className="pt-4 border-t space-y-6">
            <div className="bg-secondary/50 rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Accessibility
              </div>
              <div className="flex flex-wrap gap-2">
                {(['sm', 'base', 'lg', 'xl'] as const).map(size => (
                  <button
                    key={size}
                    onClick={() => setTextSize(size)}
                    className={cn(
                      "w-10 h-10 flex items-center justify-center rounded-lg font-bold border transition-all",
                      textSize === size ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-secondary"
                    )}
                  >
                    <span className={
                      size === 'sm' ? 'text-sm' : 
                      size === 'base' ? 'text-base' : 
                      size === 'lg' ? 'text-lg' : 'text-xl'
                    }>A</span>
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contrast Mode</p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => setContrastMode('default')} className={cn("px-2 py-2 rounded border text-[10px] font-bold transition-all", contrastMode === 'default' ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-secondary")}>Default</button>
                  <button onClick={() => setContrastMode('yellow')} className={cn("px-2 py-2 rounded border text-[10px] font-bold transition-all", contrastMode === 'yellow' ? "bg-yellow-400 text-black border-yellow-400" : "bg-black text-yellow-400 border-black hover:bg-zinc-900")}>Yellow/Black</button>
                  <button onClick={() => setContrastMode('cyan')} className={cn("px-2 py-2 rounded border text-[10px] font-bold transition-all", contrastMode === 'cyan' ? "bg-cyan-400 text-black border-cyan-400" : "bg-black text-cyan-400 border-black hover:bg-zinc-900")}>Cyan/Black</button>
                  <button onClick={() => setContrastMode('sepia')} className={cn("px-2 py-2 rounded border text-[10px] font-bold transition-all", contrastMode === 'sepia' ? "bg-[#d4bca4] text-[#3b2a1a] border-[#3b2a1a]" : "bg-[#f4ebd8] text-[#5c4033] border-[#d4bca4] hover:bg-[#eadecc]")}>Reading Mode</button>
                </div>
              </div>
              <button
                onClick={() => setIsEasyRead(!isEasyRead)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm border transition-all",
                  isEasyRead ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-secondary"
                )}
              >
                Easy Read Mode
                <div className={cn("w-4 h-4 rounded-full border border-current", isEasyRead ? "bg-white" : "bg-black")} />
              </button>
              <button
                onClick={() => setIsAudioEnabled(!isAudioEnabled)}
                className={cn(
                  "w-full flex items-center justify-between px-3 py-3 rounded-xl text-sm border transition-all",
                  isAudioEnabled ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-secondary"
                )}
              >
                Audio Support
                <div className={cn("w-4 h-4 rounded-full border border-current", isAudioEnabled ? "bg-white" : "bg-black")} />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 bg-secondary/30 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <User size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate">Guest User</p>
                <p className="text-xs text-muted-foreground truncate">Welcome</p>
              </div>
              <Link to="/login" className="p-2 hover:bg-secondary rounded-lg text-muted-foreground">
                <LogOut size={18} />
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Navbar */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden h-16 border-b bg-card flex items-center justify-between px-4 sticky top-0 z-40">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo4} alt="SalamaHub Logo" className="h-10 w-auto object-contain" />
            <span className="text-lg font-bold tracking-tight text-primary">SalamaHub</span>
          </Link>
          <button onClick={toggleSidebar} className="p-2 hover:bg-secondary rounded-lg">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={toggleSidebar}
          >
            <div
              className="w-4/5 max-w-sm h-full bg-card p-4 flex flex-col animate-in slide-in-from-left duration-300"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-xl font-bold text-primary">Menu</span>
                <button onClick={toggleSidebar} className="p-2"><X size={24} /></button>
              </div>
              <nav className="flex-1 space-y-1 overflow-y-auto">
                <NavItem to="/" icon={Home} label="Home" onClick={toggleSidebar} />
                <LearnNavItem onSubItemClick={toggleSidebar} />
                <NavItem to="/rights" icon={Shield} label="Know Your Rights" onClick={toggleSidebar} />
                <NavItem to="/diverse" icon={Users} label="Diverse Corner" onClick={toggleSidebar} />
                <NavItem to="/myths" icon={HelpCircle} label="Questions & Myths" onClick={toggleSidebar} />
                <NavItem to="/support" icon={Phone} label="Get Support" onClick={toggleSidebar} />
                <NavItem to="/guides" icon={Download} label="Guides & Tools" onClick={toggleSidebar} />
                <NavItem to="/about" icon={Info} label="About Us" onClick={toggleSidebar} />
              </nav>
              <div className="mt-auto pt-4 border-t space-y-4">
                <div className="flex gap-2">
                  {(['sm', 'base', 'lg'] as const).map(size => (
                    <button
                      key={size}
                      onClick={() => setTextSize(size)}
                      className={cn(
                        "flex-1 h-10 flex items-center justify-center rounded-lg font-bold border",
                        textSize === size ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"
                      )}
                    >
                      <span className={
                        size === 'sm' ? 'text-sm' : 
                        size === 'base' ? 'text-base' : 
                        size === 'lg' ? 'text-lg' : 'text-xl'
                      }>A</span>
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-primary uppercase tracking-wider">Contrast Mode</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button onClick={() => setContrastMode('default')} className={cn("px-2 py-2 rounded-lg border text-sm font-bold transition-all", contrastMode === 'default' ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-secondary")}>Default</button>
                    <button onClick={() => setContrastMode('yellow')} className={cn("px-2 py-2 rounded-lg border text-sm font-bold transition-all", contrastMode === 'yellow' ? "bg-yellow-400 text-black border-yellow-400" : "bg-black text-yellow-400 border-black hover:bg-zinc-900")}>Yellow/Black</button>
                    <button onClick={() => setContrastMode('cyan')} className={cn("px-2 py-2 rounded-lg border text-sm font-bold transition-all", contrastMode === 'cyan' ? "bg-cyan-400 text-black border-cyan-400" : "bg-black text-cyan-400 border-black hover:bg-zinc-900")}>Cyan/Black</button>
                    <button onClick={() => setContrastMode('sepia')} className={cn("px-2 py-2 rounded-lg border text-sm font-bold transition-all", contrastMode === 'sepia' ? "bg-[#d4bca4] text-[#3b2a1a] border-[#3b2a1a]" : "bg-[#f4ebd8] text-[#5c4033] border-[#d4bca4] hover:bg-[#eadecc]")}>Reading Mode</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};