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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-yellow-400 fill-yellow-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.951a1 1 0 00.95.69h4.148c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.951c.3.921-.755 1.688-1.538 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.783.57-1.838-.197-1.538-1.118l1.286-3.951a1 1 0 00-.364-1.118L2.027 9.378c-.783-.57-.38-1.81.588-1.81h4.148a1 1 0 00.95-.69l1.286-3.951z" />
          </svg>
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <div key={i} className="relative w-4 h-4 inline-block">
            <svg
              className="absolute top-0 left-0 w-4 h-4 text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.951a1 1 0 00.95.69h4.148c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.951c.3.921-.755 1.688-1.538 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.783.57-1.838-.197-1.538-1.118l1.286-3.951a1 1 0 00-.364-1.118L2.027 9.378c-.783-.57-.38-1.81.588-1.81h4.148a1 1 0 00.95-.69l1.286-3.951z" />
            </svg>
            <svg
              className="absolute top-0 left-0 w-4 h-4 text-yellow-400 fill-yellow-400"
              style={{ clipPath: "inset(0 50% 0 0)" }}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.951a1 1 0 00.95.69h4.148c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.951c.3.921-.755 1.688-1.538 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.783.57-1.838-.197-1.538-1.118l1.286-3.951a1 1 0 00-.364-1.118L2.027 9.378c-.783-.57-.38-1.81.588-1.81h4.148a1 1 0 00.95-.69l1.286-3.951z" />
            </svg>
          </div>
        );
      } else {
        stars.push(
          <svg
            key={i}
            className="w-4 h-4 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.951a1 1 0 00.95.69h4.148c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.951c.3.921-.755 1.688-1.538 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.783.57-1.838-.197-1.538-1.118l1.286-3.951a1 1 0 00-.364-1.118L2.027 9.378c-.783-.57-.38-1.81.588-1.81h4.148a1 1 0 00.95-.69l1.286-3.951z" />
          </svg>
        );
      }
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  return (
    <div className="flex min-h-screen bg-white">
      <SystemAdminSidebar />

      <div className="flex-1 p-6 flex gap-6">
        <div className="w-2/3 flex flex-col gap-6">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>
          )}

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


        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Stores</h2>
          <ul className="space-y-3 max-h-[500px] overflow-y-auto">
            {stores.map((s) => (
              <li
                key={s._id}
                className="border p-4 rounded-lg shadow-sm flex flex-col"
              >
              <p className="font-bold">{s.storeName}</p>
              <p className="text-sm text-gray-600">
                Owner: {s.userId.name} ({s.userId.email})
              </p>
              <p className="text-sm">{s.storeLocation}</p>
              <div className="mt-1">{renderStars(s.storeRating || 0)}</div>
            </li>
            ))}
          </ul>
        </div>

        </div>

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
