interface AdminDashboardProps {
  children: React.ReactElement;
}

const AdminDashboardLayout: React.FC<AdminDashboardProps> = ({ children }) => {
  return (
    <>
      <h2 className="dashboard-header">Dashboard</h2>
      {children}
    </>
  );
};

export default AdminDashboardLayout;
