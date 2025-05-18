// src/components/LanguageSelector.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LanguageSelector.css';

interface Props {
  onLanguageChange: (lang: 'en' | 'ja') => void;
  currentLanguage: 'en' | 'ja';
}

const LanguageSelector: React.FC<Props> = ({ onLanguageChange, currentLanguage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (lang: 'en' | 'ja') => {
    setIsOpen(false);
    onLanguageChange(lang);
  };

  return (
    <div className="language-selector">
      <button onClick={() => setIsOpen(!isOpen)} className="lang-button">
        🌐 {currentLanguage === 'en' ? 'English' : '日本語'}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul 
          className="dropdown-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          >
            <li onClick={() => handleSelect('en')}>English</li>
            <li onClick={() => handleSelect('ja')}>日本語</li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
