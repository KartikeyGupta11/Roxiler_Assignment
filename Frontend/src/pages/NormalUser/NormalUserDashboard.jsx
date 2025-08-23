import NormalUserSidebar from "../../components/Sidebars/NormalUserSidebar";

const NormalUserDashboard = () => {
    return (
    <div className="flex min-h-screen">
      <NormalUserSidebar/>
      <div className="flex-1 bg-gray-50"></div>
    </div>
  );
}

export default NormalUserDashboard;