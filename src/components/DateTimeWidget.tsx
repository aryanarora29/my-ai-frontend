import React, { useEffect, useState } from 'react';
import './styles_css/DateTimeWidget.css';

interface Props {
  currentTime: Date;
  onEdit: () => void;
}

const DateTimeWidget: React.FC<Props> = ({ currentTime, onEdit }) => {
  const [time, setTime] = useState(currentTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="datetime-widget">
      <span>{time.toLocaleString()}</span>
      <button onClick={onEdit}>Edit</button>
    </div>
  );
};

export default DateTimeWidget;