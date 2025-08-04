import React from "react";
import '../../styles/CalendarModal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  mode: "signup" | "waitlist";
  classTitle: string;
  waitlistLength?: number;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  classTitle,
  waitlistLength = 0,
}) => {
  const [name, setName] = React.useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (name.trim()) {
      onSubmit(name);
      setName("");
    }
  };

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

      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="modal-input"
      />

      <div className="modal-actions">
        <button onClick={onClose} className="modal-button modal-cancel">
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className="modal-button modal-submit"
        >
          {mode === "signup" ? "Sign Up" : "Join Waitlist"}
        </button>
      </div>
    </div>
  </div>
);
};

export default Modal;