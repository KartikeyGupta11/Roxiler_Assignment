import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NewPassword from "./pages/NewPassword";
import VerifyOTP from "./pages/VerifyOTP";
import SystemAdminDashboard from "./pages/SystemAdmin/SystemAdminDashboard";
import SystemAdminPanel from "./pages/SystemAdmin/SystemAdminPanel";
import NormalUserDashboard from "./pages/NormalUser/NormalUserDashboard";
import StoreOwnerDashboard from "./pages/StoreOwner/StoreOwnerDashboard";


import EnterStoreDetails from "./pages/StoreOwner/EnterStoreDetails";
import AddUser from "./pages/SystemAdmin/AddUser";
import UserDetails from "./pages/SystemAdmin/UserDetails";
import StoreManager from "./pages/SystemAdmin/StoreManager";
import Logout from "./pages/Logout";
import UpdatePassword from "./pages/UpdatePassword";
import MainPanel from "./pages/StoreOwner/MainPanel";

import StoreRatingManager from "./pages/NormalUser/StoreRatingManager";


import "./index.css";
import { Toaster } from "react-hot-toast";


function AppWrapper() {
  const location = useLocation();

  return (
    <div className="w-full min-h-screen bg-black">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/forgot-password" element={<NewPassword/> }/>
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/update-password" element={<UpdatePassword/>}/>

        {/* System Admin Routes */}
        <Route path="/system-admin" element={<SystemAdminDashboard/>}/>
        <Route path="/admin/admin-panel" element={<SystemAdminPanel/>}/>
        <Route path="/admin/add-user" element={<AddUser/>}/>
        <Route path="/admin/user-details" element={<UserDetails/>}/>
        <Route path="/admin/store-manager" element={<StoreManager/>}/>

        {/* Store Owner Routes */}
        <Route path="/enter-store-details" element={<EnterStoreDetails/>}/>
        <Route path="/store-owner" element={<StoreOwnerDashboard/>}/>
        <Route path="/store-owner/main-panel" element={<MainPanel/>}/>

        {/* Normal User Routes */}
        <Route path="/normal-user" element={<NormalUserDashboard/>}/>
        <Route path="/normal-user/store" element={<StoreRatingManager/>}/>
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
