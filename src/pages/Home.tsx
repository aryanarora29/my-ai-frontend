// // src/pages/Home.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import LanguageSelector from '../components/LanguageSelector';
import { translations } from '../locales';
import ThemeToggle from '../components/ThemeToggler';
import CircleLoader from '../components/CircleLoader';
import SystemControls from '../components/SystemControls';

const Home: React.FC = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ja'>('en');
  const [isLangSwitching, setIsLangSwitching] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang === 'ja' || savedLang === 'en') {
      setLanguage(savedLang);
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const timer = setTimeout(() => {
      setIsInitialLoading(false);
      setIsPageVisible(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleStart = () => {
    setIsPageVisible(false);
    setTimeout(() => {
      setIsNavigating(true);
      navigate('/OptionsPage');
    }, 500);
  };

  const handleLanguageChange = (lang: 'en' | 'ja') => {
    setIsLangSwitching(true);
    setIsPageVisible(false);
    setTimeout(() => {
      setLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
      setIsLangSwitching(false);
      setIsPageVisible(true);
    }, 500);
  };
  
  const text = translations[language];
  const isLoading =  isLangSwitching || isNavigating ||isInitialLoading;
  return (
    <>
      {isLoading && <CircleLoader show={true } />}
      <div className={`home-container ${isPageVisible ? 'fade-in' : 'fade-out'}`}>
        {!isLoading && (
          <>
            <header className="home-header">
              <h2 className="company-name">PROJECT</h2>
              <div className="top-right-controls">
                <SystemControls />
                <LanguageSelector onLanguageChange={handleLanguageChange} currentLanguage={language} />
                <ThemeToggle />
              </div>
            </header>

            <main className="home-main">
              <h1 className="home-title">{text.welcome}</h1>
              <p className="subtitle">{text.subtitle}</p>
              <button className="start-button" onClick={handleStart}>
                {text.start}
              </button>
            </main>
          </>
        )}
      </div>
    </>
  );
};

export default Home;



