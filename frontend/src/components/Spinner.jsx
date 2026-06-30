import React from 'react';

const Spinner = ({ text = 'Sending...' }) => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <span>{text}</span>
    </div>
  );
};

export default Spinner;
