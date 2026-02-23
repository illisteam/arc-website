import React, { useState, useEffect } from 'react';
import { Settings } from 'lucide-react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import MediaHardware from './components/MediaHardware';
import Portfolio from './components/Portfolio';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticleNetwork from './components/ParticleNetwork';
import Admin from './components/Admin';
import { PORTFOLIO_DATA } from './data';
import { PortfolioItem } from './types';

const AppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'admin'>('home');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { t } = useLanguage();

  // Load data from localStorage or fallback to initial data
  useEffect(() => {
    const savedData = localStorage.getItem('arc_portfolio_data');
    if (savedData) {
      try {
        setPortfolioItems(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved portfolio data", e);
        setPortfolioItems(PORTFOLIO_DATA);
      }
    } else {
      setPortfolioItems(PORTFOLIO_DATA);
    }
    setIsDataLoaded(true);
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (isDataLoaded) {
      localStorage.setItem('arc_portfolio_data', JSON.stringify(portfolioItems));
    }
  }, [portfolioItems, isDataLoaded]);

  const handleUpdatePortfolio = (newData: PortfolioItem[]) => {
    setPortfolioItems(newData);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-arc-accent selection:text-white">
      {/* Fixed Global Background */}
      <ParticleNetwork />

      <Navbar
        onNavigate={setCurrentView}
        currentView={currentView}
      />

      <main className="relative z-10">
        {currentView === 'home' ? (
          <>
            <Hero />
            <About />
            <MediaHardware />
            <Portfolio items={portfolioItems} />
            <Contact />
          </>
        ) : (
          <Admin
            portfolioData={portfolioItems}
            onUpdate={handleUpdatePortfolio}
            onLogout={() => setCurrentView('home')}
          />
        )}
      </main>

      <Footer />

      {/* Fixed Admin Button */}
      {currentView === 'home' && (
        <button
          onClick={() => setCurrentView('admin')}
          className="fixed bottom-4 left-4 z-[9999] p-2 bg-black/50 hover:bg-black/80 text-white/30 hover:text-white/80 rounded-full transition-all duration-300 backdrop-blur-sm border border-white/5 hover:border-white/20"
          title={t('admin.button')}
        >
          <Settings size={16} />
        </button>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;