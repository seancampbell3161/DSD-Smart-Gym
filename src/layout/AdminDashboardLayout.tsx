interface AdminDashboardProps {
  main: React.ReactElement;
  sideBar: React.ReactElement;
}

const AdminDashboardLayout: React.FC<AdminDashboardProps> = ({
  main,
  sideBar,
}) => {
  return (
    <>
      <div className="admin-layout-main">
        <h2 className="dashboard-header">Dashboard</h2>
        {main}
      </div>
      {sideBar}
    </>
  );
};

export default AdminDashboardLayout;
