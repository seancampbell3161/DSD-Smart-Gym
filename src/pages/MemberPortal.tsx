import React, { useEffect, useState } from "react";

const MemberPortal: React.FC = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleGenerateQRCode = async () => {
    const token = localStorage.getItem("token");
    const gym_id = localStorage.getItem("gym_id");

    if (!token || !gym_id) {
      setMessage("Missing login token or gym ID.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/access/generateQRCode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // backend expects Bearer
        },
        body: JSON.stringify({ gym_id }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate QR code");
      }

      setQrCode(data.qrCode.qr_code);
      setMessage("✅ QR Code generated!");
    } catch (err: any) {
      console.error(err);
      setMessage(`❌ ${err.message}`);
    }
  };

  useEffect(() => {
    handleGenerateQRCode();
  }, []);

  return (
    <div className="member-portal">
      <h2>Welcome to the Member Portal</h2>
      {message && <p>{message}</p>}
      {qrCode ? (
        <div>
          <p>Scan this QR Code to check in:</p>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrCode}&size=200x200`}
            alt="QR Code"
          />
        </div>
      ) : (
        <p>Loading QR code...</p>
      )}
    </div>
  );
};

export default MemberPortal;
