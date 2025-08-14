import React from "react";
import '../../styles/CalendarModal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  onLeave?: () => void; // optional leave handler
  mode: "signup" | "waitlist";
  classTitle: string;
  waitlistLength?: number;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onLeave,
  mode,
  classTitle,
  waitlistLength = 0,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">
          {mode === "signup"
            ? `Sign Up for ${classTitle}`
            : `${classTitle} is Full — Join Waitlist`}
        </h2>

        {mode === "waitlist" && (
          <p className="modal-waitlist-text">
            Current waitlist length: <strong>{waitlistLength}</strong>
          </p>
        )}

        <p>You will be signed up using your account.</p>

        <div className="modal-actions">
          <button onClick={onClose} className="modal-button modal-cancel">
            Cancel
          </button>

          {/* Sign up or Join Waitlist */}
          <button onClick={onSubmit} className="modal-button modal-submit">
            {mode === "signup" ? "Sign Up" : "Join Waitlist"}
          </button>

          {/* Leave Class button only shows if user is signed up */}
          {mode === "signup" && onLeave && (
            <button
              onClick={onLeave}
              className="modal-button modal-leave"
              style={{ backgroundColor: "#f87171" }}
            >
              Leave Class
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;