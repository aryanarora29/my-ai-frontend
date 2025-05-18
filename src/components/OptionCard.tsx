// import React from 'react';
// import './styles_css/OptionCard.css';

// interface OptionCardProps {
//   id: string;
//   title: string;
//   icon: React.ReactNode;
//   onClick: () => void;
// }

// const OptionCard: React.FC<OptionCardProps> = ({ id, title, icon, onClick }) => {
//   return (
//     <div className="option-card" onClick={onClick}>
//       <div className="option-icon">{icon}</div>
//       <div className="option-title">{title}</div>
//     </div>
//   );
// };

// export default OptionCard;

// components/OptionCard.tsx
import { motion } from 'framer-motion';

const OptionCard = ({ title }: { title: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ 
      scale: 1.05,
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="option-card"
  >
    <h3>{title}</h3>
    <div className="hover-indicator" />
  </motion.div>
);

export default OptionCard;