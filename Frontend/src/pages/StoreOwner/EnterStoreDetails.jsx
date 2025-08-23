import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getToken } from "../../utils/authUtils.js";

export default function EnterStoreDetails() {
  const [storeData, setStoreData] = useState({
    storeName: "",
    storeLocation: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setStoreData({ ...storeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      toast.error("You are not logged in. Please login again.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/store/create-store`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": token   
        },
        body: JSON.stringify(storeData),
        credentials: "include"
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to save store details");
        return;
      }

      toast.success("Store details saved successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Store details error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Enter Store Details</h2>

        <input
          type="text"
          name="storeName"
          value={storeData.storeName}
          onChange={handleChange}
          placeholder="Store Name"
          required
          className="w-full mb-3 border px-3 py-2 rounded"
        />

        <input
          type="text"
          name="storeLocation"
          value={storeData.storeLocation}
          onChange={handleChange}
          placeholder="Store Location"
          required
          className="w-full mb-3 border px-3 py-2 rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Save Store
        </button>
      </form>
    </div>
  );
}
