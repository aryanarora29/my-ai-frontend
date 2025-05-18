import React from 'react';
import './styles_css/DatabaseStatus.css';

interface Props {
  selectedDB: string;
  selectedFile: string;
}

const DatabaseStatus: React.FC<Props> = ({ selectedDB, selectedFile }) => {
  return (
    <div className="database-status">
      <p>Database: {selectedDB || 'No database selected'}</p>
      <p>File: {selectedFile || 'No file selected'}</p>
    </div>
  );
};

export default DatabaseStatus;