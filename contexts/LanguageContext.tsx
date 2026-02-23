import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ko';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

const translations: Record<Language, Record<string, string>> = {
    en: {
        'nav.home': 'Home',
        'nav.services': 'Services',
        'nav.portfolio': 'Portfolio',
        'nav.contact': 'Contact',
        'admin.button': 'Admin',
    },
    ko: {
        'nav.home': '홈',
        'nav.services': '서비스',
        'nav.portfolio': '포트폴리오',
        'nav.contact': '문의하기',
        'admin.button': '관리자',
    }
};

interface LanguageProviderProps {
    children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = (key: string): string => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
