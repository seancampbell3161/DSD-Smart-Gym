import React, { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import ApiHandler from "../../utils/ApiHandler";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  gymId: string;
}

const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, gymId }) => {
  const [qrCodeValue, setQrCodeValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) return;

    const fetchQRCode = async () => {
      console.log("🌐 VITE_API_URL:", import.meta.env.VITE_API_URL);

      try {
        const data = await ApiHandler.post("/access/generateQRCode", {
          gym_id: gymId,
        });

        const rawQr = data.qrCode;

        if (typeof rawQr === "string") {
          setQrCodeValue(rawQr);
        } else if (typeof rawQr === "object" && rawQr.qr_code) {
          setQrCodeValue(rawQr.qr_code);
        } else {
          throw new Error("QR code missing or malformed.");
        }

        setLoading(false);
      } catch (err: any) {
        console.error("QR Code fetch error:", err);
        alert(err.message || "Error generating QR code.");
        setLoading(false);
      }
    };

    fetchQRCode();
  }, [isOpen, gymId]);

  const handleCheckInOut = async () => {
    try {
      const data = await ApiHandler.post("/access/checkInOut", {
        gym_id: gymId,
      });
      alert(data.message || "Check-in/out successful.");
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
        {!loading && qrCodeValue ? (
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
