// components/Modals/QRModal.tsx
import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  gymId: string;
  token: string;
}

const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, gymId, token }) => {
  const [qrCodeValue, setQrCodeValue] = useState<string>("");

  useEffect(() => {
    if (!isOpen) return;

    const fetchQRCode = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/access/generateQRCode`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ gym_id: gymId }),
        });

        const data = await res.json();
        if (res.ok && data.qrCode) {
          setQrCodeValue(data.qrCode.qr_code); // from backend structure
        } else {
          alert(data.error || "Failed to generate QR code.");
        }
      } catch (err) {
        console.error("QR Code fetch error:", err);
        alert("Error generating QR code.");
      }
    };

    fetchQRCode();
  }, [isOpen, gymId, token]);

  const handleCheckInOut = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/access/checkInOut`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ gym_id: gymId }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
      } else {
        alert(data.error || "Check-in/out failed.");
      }
    } catch (err) {
      console.error("Check-in/out error:", err);
      alert("Error during check-in/out.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Check-In</h2>
        {qrCodeValue ? (
          <>
            <QRCodeCanvas value={qrCodeValue} size={200} />
            <button className="checkin-btn" onClick={handleCheckInOut}>Check In/Out</button>
          </>
        ) : (
          <p>Loading QR Code...</p>
        )}
      </div>
    </div>
  );
};

export default QRModal;
