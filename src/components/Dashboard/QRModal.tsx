// components/Modals/QRModal.tsx
import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import "../../styles/QRModal.css";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrValue: string;
}

const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, qrValue }) => {
  if (!isOpen) return null;

  return (
    <div className="qr-modal-overlay" onClick={onClose}>
      <div className="qr-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="qr-close-button" onClick={onClose}>✕</button>
        <h2>Your Check-In QR Code</h2>
        <QRCodeCanvas value={qrValue} size={200} />
      </div>
    </div>
  );
};

export default QRModal;
