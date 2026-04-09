import React, { createContext, useContext, useState, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type TextSize = 'sm' | 'base' | 'lg' | 'xl' | '2xl';

interface AccessibilityContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  isHighContrast: boolean;
  setIsHighContrast: (isHigh: boolean) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDark: boolean) => void;
  isEasyRead: boolean;
  setIsEasyRead: (active: boolean) => void;
  isAudioEnabled: boolean;
  setIsAudioEnabled: (active: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textSize, setTextSize] = useState<TextSize>('base');
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEasyRead, setIsEasyRead] = useState(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

  useEffect(() => {
    // Apply text size to root element
    const sizes: TextSize[] = ['sm', 'base', 'lg', 'xl', '2xl'];
    sizes.forEach(size => {
      document.documentElement.classList.remove(`text-size-${size}`);
    });
    document.documentElement.classList.add(`text-size-${textSize}`);

    // Apply high contrast
    if (isHighContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    // Apply dark mode
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [textSize, isHighContrast, isDarkMode]);

  return (
    <AccessibilityContext.Provider value={{ 
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
    }}>
      <div className={cn(
        "min-h-screen transition-all duration-300",
        `text-size-${textSize}`,
        isEasyRead && "easy-read-mode"
      )}>
        {children}
      </div>
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
