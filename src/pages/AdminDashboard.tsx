import { useEffect, useState } from "react";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import Analytics from "../components/admin-dashboard/Analytics";
import SideNavBar from "../layout/SideNavBar";
import type { View } from "../types/AdminDashboard.interface";
import AccountManagement from "../components/admin-dashboard/AccountManagement";
import InventoryManagement from "../components/admin-dashboard/inventory-management/InventoryManagement";

type Role = "admin" | "trainer" | "member" | "";
import "../styles/AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  const [view, setView] = useState<View>("Analytics");
  const [content, setContent] = useState(<Analytics />);
  useEffect(() => {
    if (view === "Analytics") {
      setContent(<Analytics />);
    } else if (view === "Account Management") {
      setContent(<AccountManagement />);
    } else if (view === "Class Management") {
      // TODO:  setContent(inset class management component)
    } else if (view === "Inventory Management") {
      setContent(<InventoryManagement />);
    }
  }, [view]);

  const role = (localStorage.getItem("role") || "").toLowerCase() as Role;
  const isAdmin = role === "admin";
  const isTrainer = role === "trainer";

  return (
    { isAdmin && (
      <div className="admin-dashboard">
        <AdminDashboardLayout
          main={content}
          sideBar={<SideNavBar view={view} setView={setView} />}
        />
      </div>
  )}
)};

export default AdminDashboard;
