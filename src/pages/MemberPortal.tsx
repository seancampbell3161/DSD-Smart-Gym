import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import DashboardTile from "../components/Dashboard/DashboardTile";
import { useNavigate } from "react-router-dom";

// Tile Images
import QRImage from "../assets/SG_QR.png";
import HeroImage from "../assets/SG_MP_Hero.png";
import ClassesImage from "../assets/SG_Classes.png";

import "../styles/DashboardTile.css";

const MemberPortal: React.FC = () => {
  const navigate = useNavigate();
  const [showQRModal, setShowQRModal] = useState(false);



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
        title="Check-In"
        onClick={() => setShowQRModal(true)}
        backgroundImage={QRImage}
       />
       <DashboardTile
       title=" My Classes"
       onClick={() => navigate("/member/classes")}
       backgroundImage={ClassesImage}
       />
          
        </div>
      </div>
      </div>
      {/* QR Modal */}
      {showQRModal && (
        <div className="modal-overlay" onClick={() => setShowQRModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="close-btn"
              onClick={() => setShowQRModal(false)}
            >
              ✕
            </button>
            <h2>Your Check-In QR Code</h2>
            <QRCodeCanvas
              value="https://smartgym.com/api/checkin?token=12345"
              size={200}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberPortal;
