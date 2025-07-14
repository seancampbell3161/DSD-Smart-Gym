import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import DashboardTile from "../components/Dashboard/DashboardTile";
import { useNavigate } from "react-router-dom";

// Tile Images
import ProfileImage from "../assets/SG_Profile.png";
import CheckInImage from "../assets/SG_CheckIn.png";
import QRImage from "../assets/SG_QR.png";
import MetricsImage from "../assets/SG_Metrics.png";
import HeroImage from "../assets/SG_MP_Hero.png";

// import the CSS below
import "../styles/DashboardTile.css";

const MemberPortal: React.FC = () => {
  const navigate = useNavigate();
  const [showQRModal, setShowQRModal] = useState(false);

  const scrollToTiles = () => {
    document
      .getElementById("tile-grid")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="member-dashboard">
      {/* Fullscreen Hero Section */}
      <div className="hero-container">
        <img className="hero-image" src={HeroImage} alt="Banner" />
        <div className="hero-overlay" />
        <div className="hero-text">
          <h1>MEMBERSHIP PORTAL</h1>
          <p>Empower your journey, track your progress, own your results.</p>
          <button className="hero-button" onClick={scrollToTiles}>
            Explore
          </button>
        </div>
      </div>

      {/* Tile Grid */}
      <div id="tile-grid" className="tile-grid">
        <DashboardTile
          title="Profile"
          onClick={() => navigate("/member/profile")}
          backgroundImage={ProfileImage}
        />
        
        <DashboardTile
          title="Check-In"
          onClick={() => setShowQRModal(true)}
          backgroundImage={QRImage}
        />
        <DashboardTile
          title="Check-in Status"
          onClick={() => navigate("/member/checkinstatus")}
          backgroundImage={CheckInImage}
        />
        <DashboardTile
          title="Metrics"
          onClick={() => navigate("/member/metrics")}
          backgroundImage={MetricsImage}
        />
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
