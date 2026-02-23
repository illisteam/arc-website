import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import Logo from './Logo';

interface NavbarProps {
  onNavigate: (view: 'home' | 'admin') => void;
  currentView: 'home' | 'admin';
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);

    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (currentView === 'home' && element) {
      // Already home, scroll immediately
      const yOffset = -80; // Offset for fixed header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      // Switch to home then scroll
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 300); // Increased delay to ensure rendering
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'MEDIA HW', href: '#media-hw' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${scrolled || isOpen || currentView === 'admin' ? 'bg-arc-black/90 backdrop-blur-md py-3 border-b border-white/5' : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo with Tooltip */}
          <div className="relative group z-[101]">
            <button
              onClick={() => handleLinkClick('#home')}
              className="transition-opacity duration-300 opacity-100 focus:outline-none block"
              aria-label="arc Home"
            >
              <Logo className="h-10 md:h-16 w-auto mix-blend-screen" />
            </button>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] px-2 py-1 rounded tracking-widest uppercase font-mono shadow-lg">
                arc
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 lg:space-x-12 ml-auto">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-xs uppercase tracking-widest transition-colors duration-300 text-gray-400 hover:text-white"
              >
                {link.name}
              </button>
            ))}

            {/* Language Switcher */}
            <div className="flex items-center space-x-2 text-xs font-mono ml-4 border-l border-white/20 pl-6">
              <button
                onClick={() => setLanguage('ko')}
                className={`transition-colors ${language === 'ko' ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-300'}`}
              >
                KOR
              </button>
              <span className="text-gray-600">/</span>
              <button
                onClick={() => setLanguage('en')}
                className={`transition-colors ${language === 'en' ? 'text-white font-bold' : 'text-gray-500 hover:text-gray-300'}`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white z-[101] ml-auto p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-arc-black z-[90] flex flex-col items-center justify-center space-y-8 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.href)}
                className="text-3xl font-light text-white hover:text-arc-accent transition-colors"
              >
                {link.name}
              </button>
            ))}

            {/* Mobile Language Switcher */}
            <div className="flex items-center space-x-6 text-xl mt-8 pt-8 border-t border-white/10 w-full justify-center">
              <button
                onClick={() => setLanguage('ko')}
                className={`${language === 'ko' ? 'text-white font-bold' : 'text-gray-500'}`}
              >
                KOREAN
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`${language === 'en' ? 'text-white font-bold' : 'text-gray-500'}`}
              >
                ENGLISH
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;