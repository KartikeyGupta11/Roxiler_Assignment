import StoreOwnerSidebar from "../../components/Sidebars/StoreOwnerSidebar";

const StoreOwnerDashboard = () => {
    return (
    <div className="flex min-h-screen">
      <StoreOwnerSidebar/>
      <div className="flex-1 bg-gray-50"></div>
    </div>
  );
}

export default StoreOwnerDashboard;