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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isOpen) return;

    const fetchQRCode = async () => {
      try {
        console.log("📤 Sending token:", token);
        console.log("📤 Sending gym ID:", gymId);

        const res = await fetch(`${import.meta.env.VITE_API_URL}/access/generateQRCode`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ gym_id: gymId }),
        });

        const data = await res.json();
        console.log("📦 QR FETCH RESPONSE:", data);

        if (!res.ok) {
          throw new Error(data.error || "Failed to generate QR code.");
        }

        const rawQr = data.qrCode;

        if (typeof rawQr === "string") {
          setQrCodeValue(rawQr); // case: qrCode is string
        } else if (typeof rawQr === "object" && rawQr.qr_code) {
          setQrCodeValue(rawQr.qr_code); // case: qrCode.qr_code
        } else {
          console.error("❌ Unexpected QR structure:", data);
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
        alert(data.message || "Check-in/out successful.");
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
