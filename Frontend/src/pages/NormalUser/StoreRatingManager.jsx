import { useEffect, useState } from "react";
import axios from "axios";
import NormalUserSidebar from "../../components/Sidebars/NormalUserSidebar";
import toast from "react-hot-toast";
import { getToken } from "../../utils/authUtils";
import { Star } from "lucide-react";

export default function StoreRatingManager() {
  const [stores, setStores] = useState([]);
  const [filter, setFilter] = useState({ storeName: "", storeLocation: "" });
  const [error, setError] = useState("");
  const [userRatings, setUserRatings] = useState({});
  const [showRatingCard, setShowRatingCard] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const [currentRating, setCurrentRating] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchStores = async () => {
    try {
      const params = new URLSearchParams(filter).toString();
      const res = await axios.get(`${API_URL}/normal-user/filter-stores?${params}`);
      setStores(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load stores");
    }
  };

  const fetchUserRatings = async (storeList) => {
    try {
      const token = getToken();
      if (!token) return;

      const ratings = {};
      for (const store of storeList) {
        const res = await axios.get(
          `${API_URL}/rating/store/${store._id}/user`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
        ratings[store._id] = res.data?.rating?.rating || 0;
      }
      setUserRatings(ratings);
    } catch (err) {
      console.error("Error fetching user ratings:", err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [filter]);

  useEffect(() => {
    if (stores.length > 0) fetchUserRatings(stores);
  }, [stores]);

  const handleRatingSubmit = async (storeId) => {
    try {
      const token = getToken();
      if (!token) {
        toast.error("You must be logged in to submit a rating.");
        return;
      }

      await axios.post(
        `${API_URL}/rating/rate`,
        { storeId, rating: currentRating },
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      toast.success("Rating submitted successfully");
      setUserRatings((prev) => ({ ...prev, [storeId]: currentRating }));
      setShowRatingCard(false);
      fetchStores();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit rating");
    }
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

  return (
    <div className="flex h-screen bg-white overflow-hidden relative">
      <NormalUserSidebar />
      <div className="flex-1 p-6 flex flex-col gap-6">
        <div className="w-full flex flex-col gap-6">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg">{error}</div>
          )}

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Filter Stores</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Filter by Store Name"
                value={filter.storeName}
                onChange={(e) =>
                  setFilter({ ...filter, storeName: e.target.value })
                }
                className="border p-2 rounded-lg"
              />
              <input
                type="text"
                placeholder="Filter by Location"
                value={filter.storeLocation}
                onChange={(e) =>
                  setFilter({ ...filter, storeLocation: e.target.value })
                }
                className="border p-2 rounded-lg"
              />
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col">
            <h2 className="text-2xl font-semibold mb-4">Stores</h2>
            <div className="flex-1 max-h-[calc(100vh-300px)] overflow-y-auto pr-2">
              <ul className="space-y-3">
                {stores.map((s) => (
                  <li
                    key={s._id}
                    className="border p-4 rounded-lg shadow-sm flex justify-between items-start"
                  >
                    <div className="flex flex-col gap-1">
                      <p className="font-bold text-lg mb-[-3px]">{s.storeName}</p>
                      <p className="text-sm text-gray-600">{s.storeLocation}</p>
                      <div className="flex items-center gap-1">
                        {renderOverallStars(s.storeRating || 0)}
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-end gap-2">
                      <p className="text-sm">
                        Your Rating: <span className="font-medium">{userRatings[s._id] || 0}</span>
                      </p>
                      <button
                        onClick={() => {
                          setSelectedStore(s);
                          setCurrentRating(userRatings[s._id] || 0);
                          setShowRatingCard(true);
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Rate
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {showRatingCard && selectedStore && (
        <div className="absolute inset-0 bg-opacity-40 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">
              {selectedStore.storeName}
            </h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <Star
                  key={num}
                  onClick={() => setCurrentRating(num)}
                  className={`w-8 h-8 cursor-pointer ${
                    num <= currentRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => handleRatingSubmit(selectedStore._id)}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 w-full mb-2"
            >
              Submit Rating
            </button>
            <button
              onClick={() => setShowRatingCard(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
