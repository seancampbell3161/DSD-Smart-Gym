import { useEffect, useState } from "react";
import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import Analytics from "../components/admin-dashboard/analytics/Analytics";
import "../styles/AdminDashboard.css";
import SideNavBar from "../layout/SideNavBar";
import type { View } from "../types/AdminDashboard.interface";
import AccountManagment from "../components/admin-dashboard/AccountManagement";

const AdminDashboard: React.FC = () => {
  const [view, setView] = useState<View>("Analytics");
  const [content, setContent] = useState(<Analytics />);
  useEffect(() => {
    if (view === "Analytics") {
      setContent(<Analytics />);
    } else if (view === "Account Management") {
      setContent(<AccountManagment />);
    }
  }, [view]);

  return (
    <div className="admin-dashboard">
      <AdminDashboardLayout
        main={content}
        sideBar={<SideNavBar view={view} setView={setView} />}
      />
    </div>
  );
};

export default AdminDashboard;
