// components/ui/RajioButton.tsx
import React from 'react';
import './rajio_button.css'; // Assuming you also saved the CSS

interface RajioButtonProps {
  selected: 'database' | 'file';
  onChange: (type: 'database' | 'file') => void;
}

const RajioButton: React.FC<RajioButtonProps> = ({ selected, onChange }) => {
  return (
    <div className="container">
      <div className="wrap">
        <input
          hidden
          className="rd-1"
          name="radio"
          id="rd-database"
          type="radio"
          checked={selected === 'database'}
          onChange={() => onChange('database')}
        />
        <label style={{ '--index': 0 } as React.CSSProperties} className="label" htmlFor="rd-database">
          <span>Database</span>
        </label>

        <input
          hidden
          className="rd-2"
          name="radio"
          id="rd-file"
          type="radio"
          checked={selected === 'file'}
          onChange={() => onChange('file')}
        />
        <label style={{ '--index': 1 } as React.CSSProperties} className="label" htmlFor="rd-file">
          <span>File</span>
        </label>

        <div className="bar"></div>
        <div className="slidebar"></div>
      </div>
    </div>
  );
};

export default RajioButton;
