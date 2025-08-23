import SystemAdminSidebar from "../../components/Sidebars/SystemAdminSidebar";

const SystemAdminDashboard = () => {
    return (
    <div className="flex min-h-screen">
      <SystemAdminSidebar/>
      <div className="flex-1 bg-gray-50"></div>
    </div>
  );
}

export default SystemAdminDashboard;