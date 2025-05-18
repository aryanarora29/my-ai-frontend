import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import './styles_css/SystemControls.css';
import { useNavigate } from 'react-router-dom';

const SystemControls = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'shutdown' | 'reboot' | null>(null);
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  const powerActions = {
    shutdown: {
      label: 'Shutting Down',
      text: 'Shutdown',
      color: 'bg-red-500',
    },
    reboot: {
      label: 'Rebooting',
      text: 'Reboot',
      color: 'bg-blue-500',
    },
  };

  useEffect(() => {
    if (countdown === 0 && selectedAction) {
      navigate('/OptionsPage');
    }
  }, [countdown, selectedAction, navigate]);

  useEffect(() => {
    if (!selectedAction) return;

    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedAction]);

  const handleActionSelection = (type: 'shutdown' | 'reboot') => {
    setSelectedAction(type);
    setCountdown(10);
  };

  const handleCancel = () => {
    setSelectedAction(null);
    setIsOverlayOpen(false);
    setCountdown(10);
  };

  return (
    <div className="fixed bottom-8 right-8">
      {/* Main Power Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="power-button"
        onClick={() => setIsOverlayOpen(true)}
      >
        <span>Power</span>
        <div className="icon">
          <svg className="power-icon" viewBox="0 0 24 24">
            <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
          </svg>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            className="action-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="overlay-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              {/* Close Button */}
                <motion.button
                className="close-button"
                onClick={() => {
                  if (selectedAction) {
                  handleCancel();
                  } else {
                  setIsOverlayOpen(false);
                  }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                >
                <svg viewBox="0 -2 24 24" width="24" height="24">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
                </motion.button>

              {/* Action Selection Screen */}
              <AnimatePresence>
                {!selectedAction ? (
                  <motion.div
                    className="action-buttons-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {(['shutdown', 'reboot'] as const).map((type) => (
                      <motion.button
                        key={type}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`action-button ${powerActions[type].color}`}
                        onClick={() => handleActionSelection(type)}
                      >
                        {type === 'shutdown' ? (
                          <svg className="power-icon" viewBox="0 0 24 24">
                            <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"/>
                          </svg>
                        ) : (
                          <svg className="reboot-icon" viewBox="0 0 24 24">
                            <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                          </svg>
                        )}
                        <span>{powerActions[type].text}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                ) : (
                  /* Countdown Screen */
                  <motion.div
                    className="countdown-screen"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h2 className="overlay-heading">
                      {powerActions[selectedAction].label}
                    </h2>

                    <div className="countdown-container">
                      <div className="countdown-progress">
                        <div className="progress-bar" />
                        <div className="glow-effect" />
                      </div>
                    </div>

                    <motion.button
                      className="cancel-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SystemControls;