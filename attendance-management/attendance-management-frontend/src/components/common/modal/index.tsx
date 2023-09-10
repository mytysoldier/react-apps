// Dialog.js
import React from "react";
import Modal from "react-modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const CommonModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="Modal"
      overlayClassName="Overlay"
    >
      <div className="modal-content">
        <h2>Hello, I am a Modal!</h2>
        <p>This is some content inside the modal.</p>
        <button onClick={onClose}>Close Modal</button>
      </div>
    </Modal>
  );
};

export default CommonModal;
