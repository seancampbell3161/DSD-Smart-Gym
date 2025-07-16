import AdminDashboardLayout from "../layout/AdminDashboardLayout";
import Analytics from "../components/admin-dashboard/analytics";

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
