import { useState } from "react";
import axios from "axios";
import SystemAdminSidebar from "../../components/Sidebars/SystemAdminSidebar";

export default function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    role: "NormalUser",
    storeName: "",
    storeLocation: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/add-user`,
        formData
      );
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error adding user");
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <SystemAdminSidebar />

      <div className="min-h-screen flex items-center justify-center ml-[550px]">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-4 border rounded-lg w-96 bg-white"
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="NormalUser">Normal User</option>
            <option value="SystemAdmin">System Admin</option>
            <option value="StoreOwner">Store Owner</option>
          </select>

          {formData.role === "StoreOwner" && (
            <>
              <input
                type="text"
                name="storeName"
                placeholder="Store Name"
                value={formData.storeName}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />

              <input
                type="text"
                name="storeLocation"
                placeholder="Store Location"
                value={formData.storeLocation}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
            </>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
}
