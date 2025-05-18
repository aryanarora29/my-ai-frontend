import React from 'react';
import './styles_css/CircleLoader.css'; // Adjust the path as necessary

interface CircleLoaderProps {
  show: boolean;
}

const CircleLoader: React.FC<CircleLoaderProps> = ({ show }) => {
  return (
    <div className={`circle-loader-container ${show ? 'visible' : ''}`}>
      <svg className="circle-loader" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" />
      </svg>
    </div>
  );
};

export default CircleLoader;