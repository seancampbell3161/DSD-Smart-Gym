interface AdminDashboardProps {
  children: React.ReactElement;
}

const AdminDashboardLayout: React.FC<AdminDashboardProps> = ({children}) => {
  return (
    <>
    <h2>Dashboard</h2>
    {children}
    </>
  );
};

export default AdminDashboardLayout;
