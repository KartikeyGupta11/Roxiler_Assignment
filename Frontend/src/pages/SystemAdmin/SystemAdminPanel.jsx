import { useEffect, useState } from "react";
import axios from "axios";
import SystemAdminSidebar from "../../components/Sidebars/SystemAdminSidebar";

export default function SystemAdminPanel() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStores: 0,
    totalRatings: 0,
  });

  const [users, setUsers] = useState({
    normalUsers: [],
    systemAdmins: [],
    storeOwners: [],
  });

  const [filter, setFilter] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

  const [error, setError] = useState("");

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/stats/count-users`
      );
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
      setError("Failed to load dashboard stats");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/admin/stats/get-users-list`
      );
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load user list");
    }
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  const applyFilters = (userList, role) => {
    return userList.filter((u) => {
      const matchesName = filter.name
        ? u.name.toLowerCase().includes(filter.name.toLowerCase())
        : true;
      const matchesEmail = filter.email
        ? u.email.toLowerCase().includes(filter.email.toLowerCase())
        : true;
      const matchesAddress = filter.address
        ? u.address?.toLowerCase().includes(filter.address.toLowerCase())
        : true;
      const matchesRole = filter.role ? role === filter.role : true;

      return matchesName && matchesEmail && matchesAddress && matchesRole;
    });
  };

  return (
    <div className="flex min-h-screen">
      <SystemAdminSidebar />

      <div className="p-6 space-y-6 flex-1 bg-white">
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>
        )}

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white shadow-md p-6 rounded-2xl text-center">
            <h2 className="text-xl font-bold">Total Users</h2>
            <p className="text-3xl mt-2">{stats.totalUsers}</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-2xl text-center">
            <h2 className="text-xl font-bold">Total Stores</h2>
            <p className="text-3xl mt-2">{stats.totalStores}</p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-2xl text-center">
            <h2 className="text-xl font-bold">Total Ratings</h2>
            <p className="text-3xl mt-2">{stats.totalRatings}</p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-xl font-semibold mb-3">Filter Users</h2>
          <div className="grid grid-cols-4 gap-4">
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
              onChange={(e) => setFilter({ ...filter, address: e.target.value })}
              className="border p-2 rounded-lg"
            />
            <select
              value={filter.role}
              onChange={(e) => setFilter({ ...filter, role: e.target.value })}
              className="border p-2 rounded-lg"
            >
              <option value="">All Roles</option>
              <option value="NormalUser">Normal User</option>
              <option value="SystemAdmin">Admin User</option>
              <option value="StoreOwner">Store Owner</option>
            </select>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Users</h2>
          <div className="flex space-x-6">
            <div className="flex-1 border rounded-lg p-4 shadow-sm">
              <h3 className="font-bold text-center mb-2">Normal Users</h3>
              <ul className="list-disc ml-6">
                {applyFilters(users.normalUsers, "NormalUser").map((u) => (
                  <li key={u._id}>
                    {u.name} ({u.email}) {u.address && `- ${u.address}`}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 border rounded-lg p-4 shadow-sm">
              <h3 className="font-bold text-center mb-2">Admin Users</h3>
              <ul className="list-disc ml-6">
                {applyFilters(users.systemAdmins, "SystemAdmin").map((u) => (
                  <li key={u._id}>
                    {u.name} ({u.email}) {u.address && `- ${u.address}`}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 border rounded-lg p-4 shadow-sm">
              <h3 className="font-bold text-center mb-2">Store Owners</h3>
              <ul className="list-disc ml-6">
                {applyFilters(users.storeOwners, "StoreOwner").map((u) => (
                  <li key={u._id}>
                    {u.name} ({u.email}) {u.address && `- ${u.address}`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
