import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import DashboardTile from "../components/Dashboard/DashboardTile";
import { useNavigate } from "react-router-dom";
import ApiHandler from "../utils/ApiHandler";

// Tile Images
import QRImage from "../assets/SG_QR.png";
import HeroImage from "../assets/SG_MP_Hero.png";
import ClassesImage from "../assets/SG_Classes.png";

import "../styles/DashboardTile.css";

const MemberPortal: React.FC = () => {
  const navigate = useNavigate();
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [checkInMessage, setCheckInMessage] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  const gym_id = localStorage.getItem("gym_id");

  const handleCheckIn = async () => {
    try {
      // Step 1: Generate QR
      const qrRes = await ApiHandler.post("/access/generateQRCode", { gym_id });
      const qr = qrRes?.qrCode;
      if (typeof qr === "string") {
        setQrCode(qr);
      } else if (qr && typeof qr.qr_code === "string") {
        setQrCode(qr.qr_code);
      }

      // Step 2: Mark check-in
      const checkInRes = await ApiHandler.post("/access/checkInOut", { gym_id });
      if (checkInRes?.success) {
        setCheckInMessage("✅ You are checked in!");
      } else {
        setCheckInMessage("⚠️ Could not check in.");
      }

      // Close modal after 2s and toggle tile
      setTimeout(() => {
        setIsCheckedIn(true);
        setShowQRModal(false);
        setCheckInMessage("");
      }, 2000);
    } catch (err: any) {
      console.error("Check-in error:", err);
      setCheckInMessage(`❌ ${err.message || "Unknown error"}`);
    }
  };

  const handleCheckOut = async () => {
    try {
      const res = await ApiHandler.post("/access/checkInOut", { gym_id });
      if (res?.success) {
        setIsCheckedIn(false);
        alert("✅ You are checked out.");
      } else {
        alert("⚠️ Could not check out.");
      }
    } catch (err: any) {
      console.error("Check-out error:", err);
      alert(`❌ ${err.message || "Unknown error"}`);
    }
  };

  // Auto-trigger QR + Check-In when modal opens
  useEffect(() => {
    if (showQRModal) {
      handleCheckIn();
    }
  }, [showQRModal]);

  return (
    <div className="member-dashboard">

      {/* Fullscreen Hero Section */}
      <div className="hero-container">
        <img className="hero-image" src={HeroImage} alt="Banner" />
        <div className="hero-overlay" />
        <div className="hero-text">
          <h1>MEMBER PORTAL</h1>
          <div id="tile-grid" className="tile-grid">
            <DashboardTile
              title={isCheckedIn ? "Check-Out" : "Check-In"}
              onClick={isCheckedIn ? handleCheckOut : () => setShowQRModal(true)}
              backgroundImage={QRImage}
            />
            <DashboardTile
              title="My Classes"
              onClick={() => navigate("/member/classes")}
              backgroundImage={ClassesImage}
            />
          </div>
        </div>
      </div>

      {/* QR Modal (Check-In only) */}
      {showQRModal && (
        <div className="modal-overlay" onClick={() => setShowQRModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Check-In</h2>
            {qrCode ? (
              <>
                <QRCodeCanvas value={qrCode} size={200} />
                <p>{checkInMessage}</p>
              </>
            ) : (
              <p>Loading QR Code...</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberPortal;
