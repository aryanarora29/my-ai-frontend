import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SystemControls from '../components/SystemControls';
//import DateTimeWidget from '../components/DateTimeWidget';
import DatabaseStatus from '../components/DatabaseStatus';
import LanguageSelector from '../components/LanguageSelector';
import { translations } from '../locales';
import ThemeToggle from '../components/ThemeToggler';
import CircleLoader from '../components/CircleLoader';
import './menu.css';

const Menu = () => {
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'en' | 'ja'>('en');
  const [isLangSwitching, setIsLangSwitching] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const text = translations[language];

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

    const handleDBchange = () => {
      setIsPageVisible(false);
      setTimeout(() => {
        setIsNavigating(true);
        navigate('/');
      }, 500);
    };

    const handleCameraTest1 = () => {
      setIsPageVisible(false);
      setTimeout(() => {
        setIsNavigating(true);
        navigate('/');
      }, 500);
    };

    const handleCameraTest2 = () => {
      setIsPageVisible(false);
      setTimeout(() => {
        setIsNavigating(true);
        navigate('/');
      }, 500);
    };

    const handleTakePhotos = () => {
      setIsPageVisible(false);
      setTimeout(() => {
        setIsNavigating(true);
        navigate('/');
      }, 500);
    };

    const handleModelLearn = () => {
      setIsPageVisible(false);
      setTimeout(() => {
        setIsNavigating(true);
        navigate('/');
      }, 500);
    };

    const handleDiagnosis = () => {
      setIsPageVisible(false);
      setTimeout(() => {
        setIsNavigating(true);
        navigate('/');
      }, 500);
    };

    const handlePreviousResult = () => {
      setIsPageVisible(false);
      setTimeout(() => {
        setIsNavigating(true);
        navigate('/');
      }, 500);
    };

    const handleNASmanage = () => {
      setIsPageVisible(false);
      setTimeout(() => {
        setIsNavigating(true);
        navigate('/');
      }, 500);
    };



   const isLoading =  isLangSwitching ||isInitialLoading || isNavigating;
  return (
    <>
    {isLoading && <CircleLoader show={true } />}
    <div className={`menu-container ${isPageVisible ? 'fade-in' : 'fade-out'}`}>
      {isLoading && <CircleLoader show={true} />}

      {/* <div className="top-right-controls">
        <SystemControls />
        <LanguageSelector onLanguageChange={handleLanguageChange} currentLanguage={language} />
        <ThemeToggle />
      </div> */}
      <header className="home-header">
        <h2 className="company-name">PROJECT</h2>
        <div className="top-right-controls">
          <SystemControls />
          <LanguageSelector onLanguageChange={handleLanguageChange} currentLanguage={language} />
          <ThemeToggle />
        </div>
      </header>
      {/* <header className="menu-header">
        <DateTimeWidget currentTime={new Date()} onEdit={function (): void {
                  throw new Error('Function not implemented.');
              } } />
      </header> */}
        <div className="buttons-container">
          <div className='cam-buttons'>
            <button
              className="camera-test-1-button"
              onClick={() => {
                handleCameraTest1();
              }}
            >
              {text.Camera_test_1}
            </button>

            <button
              className="camera-test-2-button"
              onClick={() => {
                handleCameraTest2();
              }}
            >
              {text.Camera_test_2}
            </button>
          </div>
          

          <button
            className="take-photos-button"
            onClick={() => {
              handleTakePhotos();
            }}
          >
            {text.Take_Photos}
          </button>

  
          <button
            className="model-learn-button"
            onClick={() => {
              handleModelLearn();
            }}
          >
            {text.Model_learning}
          </button>

          <button
            className="diagnosis-button"
            onClick={() => {
              handleDiagnosis();
            }}
          >
            {text.Diagnosis}
          </button>
          <div className="result-nas-buttons">
            <button
              className="previous-result-button"
              onClick={() => {
                handlePreviousResult();
              }}
            >
              {text.previous_results}
            </button>

            <button
              className="NAS-manage-button"
              onClick={() => {
                handleNASmanage();
              }}
            >
              {text.NAS_management}
            </button>
          </div>
          <div className='db-buttons'>
          <button
            className="DB-chnage-button"
            onClick={() => {
              handleDBchange();
            }}
          >
            {text.Change_Database}
          </button>
          </div>
        </div>
      <div className="db-details">
        <DatabaseStatus selectedDB={''} selectedFile={''} />
      </div>

      
    </div>
    </>
  );
};

export default Menu;
