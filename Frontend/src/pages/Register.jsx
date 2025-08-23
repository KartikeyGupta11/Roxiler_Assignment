import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { saveAuthData, clearAuthData } from "../utils/authUtils";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    contactNumber: "",
    address: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {

    if (!formData.name || formData.name.length < 2 || formData.name.length > 60) {
      toast.error("Name must be between 3 and 60 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Enter a valid email address");
      return false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must be 8–16 chars, include at least 1 uppercase letter and 1 special character"
      );
      return false;
    }

    if (!formData.role) {
      toast.error("Please select a role");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.contactNumber)) {
      toast.error("Contact number must be exactly 10 digits");
      return false;
    }

    if (!formData.address || formData.address.length > 400) {
      toast.error("Address cannot exceed 400 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; 

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      clearAuthData();
      saveAuthData(data.token, data.user);

      toast.success(data.message || "Registered successfully!");
      if(formData.role === "StoreOwner") {
        navigate("/enter-store-details");
      }
      else{
        navigate("/login");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-black p-0">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover rounded-r-none rounded-l-lg">
          <source src="/Registeration.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white">
        <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white border border-gray-200">
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Create your account
            </h2>
            <p className="text-gray-500 text-sm text-center">
              Join us and start your journey with us...
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create Password" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            <select name="role" value={formData.role} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500">
              <option value="">Select Role</option>
              <option value="SystemAdmin">System Administrator</option>
              <option value="NormalUser">Normal User</option>
              <option value="StoreOwner">Store Owner</option>
            </select>
            <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" required className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition">
              Register
            </button>
          </form>

          <p className="text-sm text-center text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
