// components/Modals/QRModal.tsx
import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Logo from "../../assets/SG_Icon2.png";
import "../../styles/QRModal.css";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  gymId: string;
}

const QRModal: React.FC<QRModalProps> = ({
  isOpen,
  onClose,
  userId,
  gymId,
  
}) => {
  const [qrToken, setQrToken] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      try {
        const res = await fetch(
          `${window.location.origin}/api/qr-token`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: userId,
              gym_id: gymId,
            }),
          }
        );
        if (res.ok) {
          const { qr_token, expires_at } = await res.json();
          setQrToken(qr_token);
          setExpiresAt(expires_at);
        } else {
          console.error("QR token generation failed:", await res.text());
        }
      } catch (err) {
        console.error("Error generating QR token:", err);
      }
    })();
  }, [isOpen, userId, gymId]);

  if (!isOpen) return null;

  const qrSize = 200;
  const logoSize = 50;

  return (
    <div className="qr-modal-overlay" onClick={onClose}>
      <div
        className="qr-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="qr-close-button"
          onClick={onClose}
        >
          ✕
        </button>
        <h2>Your Access QR Code</h2>

        {qrToken ? (
          <>
            <div
              className="qr-code-wrapper"
              style={{ width: qrSize, height: qrSize }}
            >
              <QRCodeCanvas
                value={qrToken}
                size={qrSize}
              />
              <img
                src={Logo}
                alt="logo"
                className="qr-logo"
                style={{
                  width: logoSize,
                  height: logoSize,
                }}
              />
            </div>
            <p>
              Expires at:{" "}
              {new Date(expiresAt).toLocaleString()}
            </p>
          </>
        ) : (
          <p>Generating QR code…</p>
        )}
      </div>
    </div>
  );
};

export default QRModal;
