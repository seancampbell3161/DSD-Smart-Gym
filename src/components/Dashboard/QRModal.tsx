// components/Modals/QRModal.tsx
import React, { useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Logo from "../../assets/SG_Icon2.png";
import "../../styles/QRModal.css";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  memberId: string;                
}

const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, memberId }) => {
  // derive origin dynamically
  const origin = window.location.origin;
  const checkInUrl = `${origin}/api/checkin?memberId=${memberId}`;

  // record check-in on open
  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      try {
        await fetch(`${origin}/api/checkin`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          // memberId in query string already
        });
      } catch (err) {
        console.error("Check-in failed:", err);
      }
    })();
  }, [isOpen, origin]);

  if (!isOpen) return null;

  const qrSize = 200;
  const logoSize = 50;

  return (
    <div className="qr-modal-overlay" onClick={onClose}>
      <div className="qr-modal-content" onClick={e => e.stopPropagation()}>
        <button className="qr-close-button" onClick={onClose}>✕</button>
        <h2>Your Check-In QR Code</h2>

        <div className="qr-code-wrapper" style={{ width: qrSize, height: qrSize }}>
          <QRCodeCanvas
            value={checkInUrl}
            size={qrSize}
          />
          <img
            src={Logo}
            alt="logo"
            className="qr-logo"
            style={{ width: logoSize, height: logoSize }}
          />
        </div>
      </div>
    </div>
  );
};

export default QRModal;
