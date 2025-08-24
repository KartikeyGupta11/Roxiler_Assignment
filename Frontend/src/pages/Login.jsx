import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { saveAuthData, clearAuthData } from "../utils/authUtils"; 

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      clearAuthData();

      saveAuthData(data.token, data.user, rememberMe);
      toast.success("Login successful!");

      const role = data.user.role;
      if (role === "SystemAdmin") navigate("/admin/admin-panel");
      else if (role === "StoreOwner") navigate("/store-owner/main-panel");
      else if (role === "NormalUser") navigate("/normal-user/store");
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg border border-gray-200">
          <div className="flex flex-col items-center mb-6">
            <div className="text-blue-600 text-4xl font-extrabold mb-2">Roxiler</div>
            <h2 className="text-2xl font-semibold text-gray-800">Welcome back!</h2>
            <p className="text-gray-500 text-sm">
              Don’t have an account?{" "}
              <a href="/register" className="text-blue-600 font-medium hover:underline">
                Sign up
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Log in
            </button>
          </form>

        </div>
      </div>

      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-black p-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover rounded-l-none rounded-r-lg"
        >
          <source src="/Login.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
