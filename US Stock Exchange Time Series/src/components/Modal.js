import './Modal.css';
import PortalContainer from "./PortalContainer";

const Modal = ({ onClose, children }) => {
  return (
    <PortalContainer>
      <div className="modal">
        <div className="modal-overlay" onClick={onClose}></div>
        <div className="modal-content">
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
          {children}
        </div>
      </div>
    </PortalContainer>
  );
};

export default Modal;
