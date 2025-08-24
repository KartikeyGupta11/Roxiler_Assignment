import { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import SystemAdminSidebar from "../../components/Sidebars/SystemAdminSidebar";

export default function UserDetails() {
  const [users, setUsers] = useState({
    normalUsers: [],
    systemAdmins: [],
    storeOwners: [],
  });
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/admin/get-all-users`)
      .then((res) => setUsers(res.data));
  }, []);

  const handleCardClick = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const renderOverallStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        );
      } else if (rating >= i - 0.5) {
        stars.push(
          <div key={i} className="relative w-5 h-5">
            <Star className="absolute top-0 left-0 w-5 h-5 text-gray-300" />
            <Star
              className="absolute top-0 left-0 w-5 h-5 text-yellow-400 fill-yellow-400"
              style={{ clipPath: "inset(0 50% 0 0)" }}
            />
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-5 h-5 text-gray-300" />
        );
      }
    }
    return <div className="flex gap-1">{stars}</div>;
  };

  const renderCards = (list) => (
  <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
    {list.map((user) => (
      <div
        key={user._id}
        className="border rounded-lg p-4 min-w-[220px] bg-white shadow cursor-pointer hover:shadow-md transition"
        onClick={() => handleCardClick(user)}
      >
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
    ))}
  </div>
);

  return (
    <div className="flex min-h-screen bg-white">
      <SystemAdminSidebar />

      <div className="p-6 flex flex-col gap-8 flex-1">
        <div className="text-center text-gray-600 font-medium mb-4">
          Click on a card to see full details
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Normal Users</h2>
          {renderCards(users.normalUsers)}
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">System Admins</h2>
          {renderCards(users.systemAdmins)}
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Store Owners</h2>
          {renderCards(users.storeOwners)}
        </div>

        <AnimatePresence>
          {selectedUser && (
            <motion.div
              className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4">{selectedUser.name}</h3>
                <p>
                  <strong>Email:</strong> {selectedUser.email}
                </p>
                <p>
                  <strong>Address:</strong> {selectedUser.address}
                </p>

                {selectedUser.role === "StoreOwner" && (
                  <>
                    <p>
                      <strong>Store Name:</strong> {selectedUser.storeName}
                    </p>
                    <p>
                      <strong>Store Location:</strong> {selectedUser.storeLocation}
                    </p>
                    <p className="flex items-center gap-2">
                      <strong>Rating:</strong> 
                      {renderOverallStars(selectedUser.storeRating || 0)}
                    </p>
                  </>
                )}

                <button
                  onClick={closeModal}
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
