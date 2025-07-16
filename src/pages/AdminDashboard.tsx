import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import Analytics from "../components/admin-dashboard/Analytics";

const AdminDashboard: React.FC = () => {
  return (
    <>
      <AdminDashboardLayout>
        <Analytics />
      </AdminDashboardLayout>
    </>
  );
};

export default AdminDashboard;
