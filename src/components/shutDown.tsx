// components/PowerButton.tsx
import { useState, useEffect } from 'react';
import { translations } from '../locales';
import './styles_css/shutDown.css'; // Create this CSS file

const ShutDown = () => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [language, setLanguage] = useState<'en' | 'ja'>('en');

  useEffect(() => {
    if (isShuttingDown) {
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            // Perform actual shutdown here
            console.log('System shutting down...');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [isShuttingDown]);
//////////////////////////////////////////////////
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

  }, []);
////////////////////////////////////////////////////////////////

  const handleClick = () => {
    if (!isConfirming) {
      setIsConfirming(true);
    } else {
      setIsShuttingDown(true);
      setIsConfirming(false);
    }
  };
  const text = translations[language];
  return (
    <div className={`button ${isShuttingDown ? 'success' : ''}`} onClick={handleClick}>
      <span>{isConfirming ? 'Confirm Shutdown' : text.Power_off}</span>
      <div className="icon">
        {isShuttingDown ? (
          <svg className="check" viewBox="0 0 24 24">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        ) : (
          <svg className="cross" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        )}
      </div>
      
      {isShuttingDown && (
        <div className="countdown-overlay">
          Shutting down in: {countdown}s
          <button 
            className="cancel-button"
            onClick={(e) => {
              e.stopPropagation();
              setIsShuttingDown(false);
              setCountdown(5);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default ShutDown;