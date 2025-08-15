import { useEffect, useState } from "react";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import Analytics from "../components/admin-dashboard/Analytics";
import SideNavBar from "../layout/SideNavBar";
import type { View } from "../types/AdminDashboard.interface";
import AccountManagement from "../components/admin-dashboard/AccountManagement";
import AdminClasses from "./AdminClasses";
import InventoryManagement from "../components/admin-dashboard/inventory-management/InventoryManagement";

type Role = "admin" | "trainer" | "member" | "";
import "../styles/AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [view, setView] = useState<View>("Analytics");
  const [content, setContent] = useState(<Analytics />);

  const role = (localStorage.getItem("role") || "").toLowerCase() as Role;
  const isAdmin = role === "admin";

  useEffect(() => {
    if (view === "Analytics") {
      setContent(<Analytics />);
    } else if (view === "Account Management") {
      setContent(<AccountManagement />);
    } else if (view === "Class Management") {
      setContent(<AdminClasses />);
    } else if (view === "Inventory Management") {
      setContent(<InventoryManagement />);
    }
  }, [view]);

  return (
    <div
      className={`admin-dashboard ${
        view === "Class Management" ? "admin-classes-view" : ""
      }`}
    >
      {isAdmin && (
        <AdminDashboardLayout
          main={content}
          sideBar={<SideNavBar view={view} setView={setView} />}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
