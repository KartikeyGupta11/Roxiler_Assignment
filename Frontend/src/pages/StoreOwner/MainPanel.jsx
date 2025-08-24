import { useEffect, useState } from "react";
import axios from "axios";
import StoreOwnerSidebar from "../../components/Sidebars/StoreOwnerSidebar";
import { getToken } from "../../utils/authUtils";

export default function StoreOwnerRatings() {
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [error, setError] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const token = getToken();
        if (!token) {
          setError("You must be logged in");
          return;
        }

        const res = await axios.get(`${API_URL}/store-owner/my-store-ratings`, {
          headers: { Authorization: token }
        });

        setRatings(res.data.ratings);
        setAvgRating(res.data.avgRating);
      } catch (err) {
        console.error(err);
        setError("Failed to load ratings");
      }
    };

    fetchRatings();
  }, []);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <StoreOwnerSidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4">My Store Ratings</h2>

        {error && <div className="text-red-600 mb-4">{error}</div>}

        <div className="mb-6">
          <p className="text-lg">
            Average Rating:{" "}
            <span className="font-bold text-yellow-500">{avgRating}</span> / 5
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Users who rated your store</h3>
          {ratings.length === 0 ? (
            <p className="text-gray-600">No ratings yet</p>
          ) : (
            <ul className="space-y-2">
              {ratings.map((r, idx) => (
                <li
                  key={idx}
                  className="flex justify-between border-b pb-2 text-gray-700"
                >
                  <span>{r.userName} ({r.userEmail})</span>
                  <span>{r.rating} ⭐</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
