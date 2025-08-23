import { useEffect, useState } from "react";
import axios from "axios";
import SystemAdminSidebar from "../../components/Sidebars/SystemAdminSidebar";
import toast from "react-hot-toast";

export default function SystemAdminStores() {
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    contactNumber: "",
    storeName: "",
    storeLocation: "",
  });
  const [error, setError] = useState("");

  const fetchStores = async () => {
    try {
      const params = new URLSearchParams(filter).toString();
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/store-manager/get-stores-list?${params}`
      );
      setStores(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load stores");
    }
  };

  useEffect(() => {
    fetchStores();
  }, [filter]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/store-manager/add-store`,
        formData
      );
      toast.success("Store added successfully");
      setFormData({
        name: "",
        email: "",
        address: "",
        contactNumber: "",
        storeName: "",
        storeLocation: "",
      });
      fetchStores();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Error adding store";
      if (errorMsg.toLowerCase().includes("already exists")) {
        toast.error("User already exists with this email");
      } else {
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <SystemAdminSidebar />

      <div className="flex-1 p-6 flex gap-6">
        {/* Left Section */}
        <div className="w-2/3 flex flex-col gap-6">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>
          )}

          {/* Filters */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Filter Stores</h2>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Filter by Name"
                value={filter.name}
                onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="Filter by Email"
                value={filter.email}
                onChange={(e) => setFilter({ ...filter, email: e.target.value })}
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="Filter by Address"
                value={filter.address}
                onChange={(e) =>
                  setFilter({ ...filter, address: e.target.value })
                }
                className="border p-2 rounded-lg"
              />
            </div>
          </div>

          {/* Store List */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Stores</h2>
            <ul className="space-y-3">
              {stores.map((s) => (
                <li
                  key={s._id}
                  className="border p-4 rounded-lg shadow-sm flex justify-between"
                >
                  <div>
                    <p className="font-bold">{s.storeName}</p>
                    <p className="text-sm text-gray-600">
                      Owner: {s.userId.name} ({s.userId.email})
                    </p>
                    <p className="text-sm">{s.storeLocation}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-1/3 bg-gray-50 p-4 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-3">Add New Store</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Owner Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Owner Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Owner Address"
              value={formData.address}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="contactNumber"
              placeholder="Owner Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="border p-2 rounded"
            />
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
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Add Store
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
