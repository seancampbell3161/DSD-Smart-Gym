import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import Analytics from "../components/admin-dashboard/analytics/Analytics";
import "../styles/AdminDashboard.css";

const AdminDashboard: React.FC = () => {
  return (
    <div className="admin-dashboard">
      <AdminDashboardLayout>
        <Analytics />
      </AdminDashboardLayout>
    </div>
  );
};

export default AdminDashboard;
