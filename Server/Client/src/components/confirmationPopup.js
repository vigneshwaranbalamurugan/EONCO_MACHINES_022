import React from 'react';
import '../styles/ConfirmationPopup.css';

const ConfirmationPopup = ({ message,icon,custom,onCancel, onConfirm }) => {
  return (
    <div className="confirm-popup-overlay">
      <div className="confirm-popup-container">
        <button className="confirm-close-button" onClick={onCancel}>
          &times;
        </button>
        <div className="confirm-popup-icon">{icon}</div>
        <h2>Are you sure?</h2>
        <p>{message}</p>
        <div className="confirm-popup-buttons">
          <button className="confirm-cancel-button" onClick={onCancel}>
            No, Cancel
          </button>
          <button className={`confirm-${custom}-button`} onClick={onConfirm}>
            Yes, {custom}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
