import { useNavigate } from "react-router-dom";
import { clearAuthData } from "../utils/authUtils";
import toast from "react-hot-toast";

export default function UpdatePassword() {
  const navigate = useNavigate();

  const handleYes = () => {
    navigate("/forgot-password");
  };

  const handleNo = () => {
    navigate(-1); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Do you want to Update Your Password?
        </h2>
        
        <p className="text-gray-600 mb-6">
          You will need to login again to access your account.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={handleYes}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          >
            Yes
          </button>
          <button
            onClick={handleNo}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
