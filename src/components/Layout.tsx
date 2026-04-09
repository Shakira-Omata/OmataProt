import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
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
  ChevronRight
} from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { 
    textSize, 
    setTextSize, 
    isHighContrast, 
    setIsHighContrast, 
    isDarkMode, 
    setIsDarkMode,
    isEasyRead,
    setIsEasyRead,
    isAudioEnabled,
    setIsAudioEnabled
  } = useAccessibility();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 border-r bg-card sticky top-0 h-screen p-4">
        <Link to="/" className="flex items-center gap-2 px-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold italic">S</div>
          <span className="text-xl font-bold tracking-tight text-primary">SalamaHub</span>
        </Link>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
          <NavItem to="/" icon={Home} label="Home" />
          <NavItem to="/learn" icon={BookOpen} label="Learn SRHR" />
          <NavItem to="/rights" icon={Shield} label="Know Your Rights" />
          <NavItem to="/diverse" icon={Users} label="Diverse Corner" />
          <NavItem to="/myths" icon={HelpCircle} label="Questions & Myths" />
          <NavItem to="/support" icon={Phone} label="Get Support" />
          <NavItem to="/guides" icon={Download} label="Guides & Tools" />
          <NavItem to="/about" icon={Info} label="About Us" />
        </nav>

        <div className="mt-auto pt-4 border-t space-y-4">
          <div className="bg-secondary/50 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Accessibility
            </div>
            <div className="flex flex-wrap gap-2">
              {(['sm', 'base', 'lg', 'xl'] as const).map(size => (
                <button
                  key={size}
                  onClick={() => setTextSize(size)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-xs font-bold border transition-all",
                    textSize === size ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-secondary"
                  )}
                >
                  A{size === 'sm' ? '' : size.toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsHighContrast(!isHighContrast)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm border transition-all",
                isHighContrast ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-secondary"
              )}
            >
              Contrast Mode
              <div className={cn("w-4 h-4 rounded-full border border-current", isHighContrast ? "bg-white" : "bg-black")} />
            </button>
            <button
              onClick={() => setIsEasyRead(!isEasyRead)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm border transition-all",
                isEasyRead ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-secondary"
              )}
            >
              Easy Read Mode
              <div className={cn("w-4 h-4 rounded-full border border-current", isEasyRead ? "bg-white" : "bg-black")} />
            </button>
            <button
              onClick={() => setIsAudioEnabled(!isAudioEnabled)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm border transition-all",
                isAudioEnabled ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border hover:bg-secondary"
              )}
            >
              Audio Support
              <div className={cn("w-4 h-4 rounded-full border border-current", isAudioEnabled ? "bg-white" : "bg-black")} />
            </button>
          </div>

          <div className="flex items-center gap-3 p-2 bg-secondary/30 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
              <User size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate">Guest User</p>
              <p className="text-xs text-muted-foreground truncate">Welcome</p>
            </div>
            <Link to="/login" className="p-2 hover:bg-secondary rounded-lg text-muted-foreground">
              <LogOut size={18} />
            </Link>
          </div>
        </div>
      </aside>

      {/* Mobile Navbar */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden h-16 border-b bg-card flex items-center justify-between px-4 sticky top-0 z-40">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold italic">S</div>
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
                <NavItem to="/learn" icon={BookOpen} label="Learn SRHR" onClick={toggleSidebar} />
                <NavItem to="/rights" icon={Shield} label="Know Your Rights" onClick={toggleSidebar} />
                <NavItem to="/diverse" icon={Users} label="Diverse Corner" onClick={toggleSidebar} />
                <NavItem to="/myths" icon={HelpCircle} label="Questions & Myths" onClick={toggleSidebar} />
                <NavItem to="/support" icon={Phone} label="Get Support" onClick={toggleSidebar} />
                <NavItem to="/guides" icon={Download} label="Guides & Tools" onClick={toggleSidebar} />
                <NavItem to="/about" icon={Info} label="About Us" onClick={toggleSidebar} />
              </nav>
              <div className="mt-auto pt-4 border-t space-y-4">
                <div className="flex gap-2">
                  {(['sm', 'base', 'lg', 'xl'] as const).map(size => (
                    <button
                      key={size}
                      onClick={() => setTextSize(size)}
                      className={cn(
                        "flex-1 h-10 rounded-lg text-sm font-bold border",
                        textSize === size ? "bg-primary text-primary-foreground border-primary" : "bg-card border-border"
                      )}
                    >
                      A
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setIsHighContrast(!isHighContrast)}
                  className="w-full flex items-center justify-between h-12 px-4 rounded-xl font-medium bg-secondary"
                >
                  High Contrast Mode
                  <div className={cn("w-5 h-5 rounded-full border border-black", isHighContrast ? "bg-yellow-400" : "bg-white")} />
                </button>
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
