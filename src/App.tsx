import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CircleLoader from './components/CircleLoader';
import Home from './pages/Home';
import OptionsPage from './pages/OptionsPage';
import Menu from './pages/menu';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <CircleLoader show={true} />;

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/optionsPage" element={<OptionsPage />} />
      <Route path="/menu" element={<Menu />} />

    </Routes>
  );
};

export default App;

