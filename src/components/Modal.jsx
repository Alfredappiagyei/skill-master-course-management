// Modal.js
import React from 'react';
import './Modal.css'; // Add your modal styles here

const Modal = ({ show, handleClose, children }) => {
  return (
    show && (
      <div className="modal-backdrop">
        <div className="modal-content">
          <button className="close-button" onClick={handleClose}>X</button>
          {children}
        </div>
      </div>
    )
  );
};

export default Modal;
