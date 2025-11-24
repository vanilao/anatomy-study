import React, { createContext, useContext, useState } from 'react';
import type { LanguageState } from '../types';

// Temporary local type definition to resolve import issue
type Language = 'en' | 'th' | 'both';

const LanguageContext = createContext<LanguageState | undefined>(undefined);

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('phoneticards-language') as Language;
    return (savedLanguage && ['en', 'th', 'both'].includes(savedLanguage)) ? savedLanguage : 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('phoneticards-language', lang);
  };

  const value: LanguageState = {
    language,
    setLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageState => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
