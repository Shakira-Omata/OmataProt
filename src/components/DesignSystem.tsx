import React, { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { Volume2, VolumeX } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/* ==================== TYPOGRAPHY COMPONENTS ==================== */

export const SectionTitle: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <h2 className={cn(
    "text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight",
    className
  )}>
    {children}
  </h2>
);

export const SectionSubtitle: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <p className={cn(
    "text-lg md:text-xl text-slate-600 leading-relaxed",
    className
  )}>
    {children}
  </p>
);

export const CardTitle: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <h3 className={cn(
    "text-xl md:text-2xl font-bold text-slate-900",
    className
  )}>
    {children}
  </h3>
);

export const CardSubtitle: React.FC<{ children: ReactNode; className?: string }> = ({ 
  children, 
  className 
}) => (
  <p className={cn(
    "text-base text-slate-600 leading-relaxed",
    className
  )}>
    {children}
  </p>
);

/* ==================== CARD COMPONENTS ==================== */

interface BaseCardProps {
  children: ReactNode;
  className?: string;
  withGradient?: boolean;
  colorScheme?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
}

export const BaseCard: React.FC<BaseCardProps> = ({ 
  children, 
  className,
  withGradient = false,
  colorScheme = 'primary'
}) => {
  const gradientMap = {
    primary: 'from-blue-50 to-blue-50/50',
    secondary: 'from-purple-50 to-purple-50/50',
    success: 'from-green-50 to-green-50/50',
    warning: 'from-amber-50 to-amber-50/50',
    danger: 'from-red-50 to-red-50/50',
    info: 'from-cyan-50 to-cyan-50/50'
  };

  return (
    <div className={cn(
      "rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300",
      "bg-white/80 backdrop-blur-sm",
      withGradient && `bg-gradient-to-br ${gradientMap[colorScheme]}`,
      className
    )}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{
  children: ReactNode;
  icon?: React.ReactNode;
  iconColor?: string;
  className?: string;
}> = ({ children, icon, iconColor = 'text-blue-600', className }) => (
  <div className={cn("p-6 md:p-8 border-b border-slate-200/50", className)}>
    <div className="flex items-center gap-4">
      {icon && (
        <div className={cn(
          "flex-shrink-0 w-12 h-12 rounded-xl",
          "bg-blue-100 flex items-center justify-center",
          iconColor
        )}>
          {icon}
        </div>
      )}
      <div className="flex-1">
        {children}
      </div>
    </div>
  </div>
);

export const CardContent: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div className={cn("p-6 md:p-8", className)}>
    {children}
  </div>
);

/* ==================== SECTION CARD ==================== */

interface SectionCardProps {
  title: string;
  icon?: React.ReactNode;
  children: ReactNode;
  colorScheme?: 'blue' | 'purple' | 'green' | 'red' | 'amber' | 'cyan';
  className?: string;
}

const colorMap = {
  blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'bg-blue-100 text-blue-600' },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'bg-purple-100 text-purple-600' },
  green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'bg-green-100 text-green-600' },
  red: { bg: 'bg-red-50', border: 'border-red-200', icon: 'bg-red-100 text-red-600' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'bg-amber-100 text-amber-600' },
  cyan: { bg: 'bg-cyan-50', border: 'border-cyan-200', icon: 'bg-cyan-100 text-cyan-600' }
};

export const SectionCard: React.FC<SectionCardProps> = ({
  title,
  icon,
  children,
  colorScheme = 'blue',
  className
}) => {
  const colors = colorMap[colorScheme];

  return (
    <BaseCard
      className={cn(
        "overflow-hidden",
        colors.bg,
        className
      )}
      withGradient
      colorScheme={colorScheme === 'blue' ? 'primary' : colorScheme === 'purple' ? 'secondary' : 'success'}
    >
      <div className={cn(
        "p-6 md:p-8 border-b",
        colors.border
      )}>
        <div className="flex items-center gap-4">
          {icon && (
            <div className={cn(
              "flex-shrink-0 w-12 h-12 rounded-xl",
              "flex items-center justify-center",
              colors.icon
            )}>
              {icon}
            </div>
          )}
          <CardTitle>{title}</CardTitle>
        </div>
      </div>
      <div className="p-6 md:p-8">
        {children}
      </div>
    </BaseCard>
  );
};

/* ==================== INFO BOX VARIANTS ==================== */

interface InfoBoxProps {
  children: ReactNode;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  icon?: React.ReactNode;
  title?: string;
}

const variantMap = {
  info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-900', icon: 'text-blue-600' },
  success: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-900', icon: 'text-green-600' },
  warning: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-900', icon: 'text-amber-600' },
  danger: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-900', icon: 'text-red-600' }
};

export const InfoBox: React.FC<InfoBoxProps> = ({
  children,
  variant = 'info',
  icon,
  title
}) => {
  const style = variantMap[variant];

  return (
    <div className={cn(
      "p-6 rounded-xl border-l-4",
      style.bg,
      style.border,
      style.text
    )}>
      <div className="flex gap-4">
        {icon && (
          <div className={cn("flex-shrink-0 mt-0.5", style.icon)}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          {title && <h4 className="font-bold mb-2">{title}</h4>}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

/* ==================== STAT CARD ==================== */

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
  colorScheme?: 'blue' | 'purple' | 'green' | 'red' | 'amber' | 'cyan';
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  colorScheme = 'blue'
}) => {
  const colors = colorMap[colorScheme];

  return (
    <BaseCard className={cn(
      "p-6 text-center",
      colors.bg
    )}>
      {icon && (
        <div className={cn(
          "flex justify-center mb-4",
          colors.icon
        )}>
          {icon}
        </div>
      )}
      <div className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
        {value}
      </div>
      <p className="text-sm md:text-base text-slate-600 font-medium">
        {label}
      </p>
    </BaseCard>
  );
};

/* ==================== COLLAPSIBLE ITEM ==================== */

interface CollapsibleItemProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  icon?: React.ReactNode;
}

export const CollapsibleItem: React.FC<CollapsibleItemProps> = ({
  title,
  isOpen,
  onToggle,
  children,
  icon
}) => (
  <div className="border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-slate-50 transition-colors"
    >
      <div className="flex items-center gap-4">
        {icon && (
          <div className="flex-shrink-0 text-blue-600">
            {icon}
          </div>
        )}
        <span className="font-semibold text-slate-900 text-left">{title}</span>
      </div>
      <svg
        className={cn(
          "w-5 h-5 text-slate-600 transition-transform duration-300",
          isOpen && "rotate-180"
        )}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </button>

    {isOpen && (
      <div className="border-t border-slate-200 p-5 md:p-6 bg-slate-50/50">
        {children}
      </div>
    )}
  </div>
);

/* ==================== GRID HELPERS ==================== */

export const GridContainer: React.FC<{
  children: ReactNode;
  cols?: 1 | 2 | 3;
  gap?: 'sm' | 'md' | 'lg';
}> = ({ children, cols = 2, gap = 'md' }) => {
  const colMap = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3'
  };

  const gapMap = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  return (
    <div className={cn('grid', colMap[cols], gapMap[gap])}>
      {children}
    </div>
  );
};

/* ==================== DECORATIVE ELEMENTS ==================== */

export const DecorativeBlob: React.FC<{
  className?: string;
  color?: string;
}> = ({ className, color = 'from-blue-200 to-blue-100' }) => (
  <div className={cn(
    "absolute rounded-full opacity-20 blur-3xl pointer-events-none",
    `bg-gradient-to-br ${color}`,
    className
  )} />
);

export const DecorativeLine: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn(
    "h-1 w-16 bg-gradient-to-r from-blue-400 to-transparent rounded-full",
    className
  )} />
);

/* ==================== HERO SUMMARY CARD ==================== */

interface HeroSummaryCardProps {
  keyFacts: string[];
  keyRights: string[];
  className?: string;
}

export const HeroSummaryCard: React.FC<HeroSummaryCardProps> = ({
  keyFacts,
  keyRights,
  className
}) => (
  <BaseCard
    className={cn(
      "bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200/50",
      className
    )}
    withGradient
    colorScheme="info"
  >
    <div className="grid md:grid-cols-2 gap-8 p-8">
      {/* Key Facts Column */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <span className="text-xl">📊</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
            Key Facts
          </h3>
        </div>
        <ul className="space-y-4">
          {keyFacts.map((fact, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-blue-600 text-lg mt-0.5">📌</span>
              <span className="text-slate-700 leading-relaxed">{fact}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Key Rights Column */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <span className="text-xl">⚖️</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 uppercase tracking-wide">
            Your Rights
          </h3>
        </div>
        <ul className="space-y-4">
          {keyRights.map((right, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-green-600 text-lg mt-0.5">✅</span>
              <span className="text-slate-700 leading-relaxed">{right}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </BaseCard>
);

/* ==================== CONTENT SECTION CARD ==================== */

interface ContentSectionCardProps {
  title: string;
  icon?: string;
  children: ReactNode;
  className?: string;
  didYouKnow?: string;
  speechText?: string;
}

export const ContentSectionCard: React.FC<ContentSectionCardProps> = ({
  title,
  icon,
  children,
  className,
  didYouKnow,
  speechText
}) => {
  const { isAudioEnabled } = useAccessibility();
  const [isReading, setIsReading] = React.useState(false);

  const handleSpeak = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }

    const textToRead = speechText || `${title}. ${didYouKnow || ""}`;
    // Fallback to title if no speechText provided, though we could try to extract from children
    
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.onend = () => setIsReading(false);
    utterance.onerror = () => setIsReading(false);
    
    window.speechSynthesis.cancel(); // Stop anything else
    window.speechSynthesis.speak(utterance);
    setIsReading(true);
  };

  React.useEffect(() => {
    return () => {
      if (isReading) window.speechSynthesis.cancel();
    };
  }, [isReading]);

  return (
    <BaseCard className={cn("bg-white border-slate-200 shadow-sm relative group", className)}>
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {icon && <span className="text-2xl">{icon}</span>}
            <h3 className="text-xl md:text-2xl font-bold text-slate-900">
              {title}
            </h3>
          </div>
          
          {isAudioEnabled && (
            <button
              onClick={handleSpeak}
              className={cn(
                "p-2 rounded-full transition-all",
                isReading 
                  ? "bg-blue-600 text-white shadow-lg scale-110" 
                  : "bg-blue-50 text-blue-600 hover:bg-blue-100"
              )}
              title={isReading ? "Stop Reading" : "Listen to Section"}
            >
              {isReading ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          )}
        </div>

        <div className="space-y-6">
          {children}

          {didYouKnow && (
            <InfoBox
              variant="warning"
              icon={<span className="text-xl">💡</span>}
              title="Did You Know?"
              className="mt-6"
            >
              {didYouKnow}
            </InfoBox>
          )}
        </div>
      </div>
    </BaseCard>
  );
};

/* ==================== TRIMESTER CARD ==================== */

interface TrimesterCardProps {
  title: string;
  icon?: string;
  milestones: string[];
  symptoms: string[];
  care: string[];
}

export const TrimesterCard: React.FC<TrimesterCardProps> = ({
  title,
  icon,
  milestones,
  symptoms,
  care
}) => (
  <BaseCard className="bg-white border-slate-200 shadow-sm h-full">
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        {icon && <span className="text-2xl">{icon}</span>}
        <h4 className="text-lg font-bold text-slate-900">{title}</h4>
      </div>

      <div className="space-y-6">
        <div>
          <h5 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">
            Key Milestones
          </h5>
          <ul className="space-y-2">
            {milestones.map((milestone, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">•</span>
                <span className="text-sm text-slate-700">{milestone}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">
            Common Symptoms
          </h5>
          <ul className="space-y-2">
            {symptoms.map((symptom, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5">⚠️</span>
                <span className="text-sm text-slate-700">{symptom}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-3">
            Recommended Care
          </h5>
          <ul className="space-y-2">
            {care.map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-600 mt-0.5">💊</span>
                <span className="text-sm text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </BaseCard>
);

/* ==================== ICON LIST ==================== */

interface IconListProps {
  items: string[];
  icon?: string;
  className?: string;
}

export const IconList: React.FC<IconListProps> = ({
  items,
  icon = "✅",
  className
}) => (
  <ul className={cn("space-y-3", className)}>
    {items.map((item, index) => (
      <li key={index} className="flex items-start gap-3">
        <span className="text-lg mt-0.5 flex-shrink-0">{icon}</span>
        <span className="text-slate-700 leading-relaxed">{item}</span>
      </li>
    ))}
  </ul>
);

/* ==================== SPACING UTILITIES ==================== */

export const SectionSpacing: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="space-y-12">
    {children}
  </div>
);

export const ContentSpacing: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="space-y-8">
    {children}
  </div>
);
