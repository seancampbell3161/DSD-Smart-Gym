import React from "react";
import { QRCodeCanvas } from "qrcode.react";
import "../../styles/QRModal.css";
import "../../styles/DashboardTile.css";

interface DashboardTileProps {
  title: string;
  onClick?: () => void;
  backgroundImage?: string;
  showQRCode?: boolean;
  qrValue?: string;
}

const DashboardTile: React.FC<DashboardTileProps> = ({
  title,
  onClick,
  backgroundImage,
  showQRCode,
  qrValue,
}) => {
  return (
    <div
      className="dashboard-tile"
      onClick={onClick}
      style={{
        backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
        backgroundColor: backgroundImage ? "transparent" : "#444",
      }}
    >
      {showQRCode && qrValue ? (
        <QRCodeCanvas value={qrValue} size={100} />
      ) : (
        <span className="tile-title">{title}</span>
      )}
    </div>
  );
};

export default DashboardTile;
