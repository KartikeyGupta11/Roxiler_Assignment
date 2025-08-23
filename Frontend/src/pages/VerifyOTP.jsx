import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem("resetEmail");

  const handleOtpVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/otp/verify-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "OTP Verification failed");
        return;
      }

      toast.success("OTP verified successfully");
      setIsOtpVerified(true);
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while verifying OTP");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/otp/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Password reset failed");
        return;
      }

      toast.success("Password reset successful");
      localStorage.removeItem("resetEmail");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while resetting password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f4f4]">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-green-700">
          {isOtpVerified ? "Reset Password" : "Verify OTP"}
        </h2>

        <p className="text-gray-500 text-sm text-center mb-3 mt-[-15px]">OTP might come on spam or Junk folder...</p>

        <form
          onSubmit={isOtpVerified ? handlePasswordReset : handleOtpVerify}
          className="space-y-4"
        >
          {!isOtpVerified && (
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              inputMode="numeric"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}

          {isOtpVerified && (
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          )}

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
          >
            {isOtpVerified ? "Reset Password" : "Verify OTP"}
          </button>
        </form>
      </div>
    </div>
  );
}
