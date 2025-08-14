import React from "react";
import { Link } from "react-router-dom";
import "../styles/AdminDashboard.css";

type Role = "admin" | "trainer" | "member" | "";

const cardStyle: React.CSSProperties = {
  border: "1px solid #e5e7eb",
  borderRadius: 12,
  padding: 16,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: 120,
};

const gridStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: 16,
};

const AdminDashboard: React.FC = () => {
  const role = (localStorage.getItem("role") || "").toLowerCase() as Role;
  const isAdmin = role === "admin";
  const isTrainer = role === "trainer";

  return (
    <div className="admin-dashboard" style={{ padding: 24 }}>
      <h2 style={{ marginBottom: 12 }}>Admin Dashboard</h2>
      <p style={{ marginBottom: 24, opacity: 0.9 }}>
        {isAdmin && "Full access to all modules."}
        {isTrainer && "Limited access: class management only."}
      </p>

      <div style={gridStyle}>
        {/* Class Management (admin + trainer) */}
        <div style={cardStyle}>
          <div>
            <h4 style={{ margin: 0 }}>Class Management</h4>
            <p style={{ marginTop: 8, opacity: 0.8 }}>
              Create, edit, cancel classes and manage schedules.
            </p>
          </div>
          <div>
            <Link to="/admin/classes" className="btn btn-primary">Open</Link>
          </div>
        </div>

        {/* Admin-only placeholders */}
        {isAdmin && (
          <>
            <div style={cardStyle}>
              <div>
                <h4 style={{ margin: 0 }}>Cafe Inventory</h4>
                <p style={{ marginTop: 8, opacity: 0.8 }}>
                  Track stock, suppliers, and purchase orders.
                </p>
              </div>
              <div>
                <span className="btn btn-disabled" aria-disabled="true">Coming soon</span>
              </div>
            </div>

            <div style={cardStyle}>
              <div>
                <h4 style={{ margin: 0 }}>Analytics</h4>
                <p style={{ marginTop: 8, opacity: 0.8 }}>
                  Member engagement, revenue, and class utilization.
                </p>
              </div>
              <div>
                <span className="btn btn-disabled" aria-disabled="true">Coming soon</span>
              </div>
            </div>

            <div style={cardStyle}>
              <div>
                <h4 style={{ margin: 0 }}>Account Management</h4>
                <p style={{ marginTop: 8, opacity: 0.8 }}>
                  Manage users, roles, and permissions.
                </p>
              </div>
              <div>
                <span className="btn btn-disabled" aria-disabled="true">Coming soon</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
