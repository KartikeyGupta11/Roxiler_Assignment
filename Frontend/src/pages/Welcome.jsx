import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-slate-900 overflow-hidden px-6 py-12 font-sans">
      <div className="absolute inset-0 bg-slate-900 pointer-events-none" />

      <div className="max-w-3xl text-center relative z-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-6">
          Rate and Manage Your Favorite Stores
        </h1>
        <p className="text-neutral-300 text-lg md:text-xl mb-8">
          Welcome to our Store Rating System — a platform where users can give
          ratings, view feedback, and store owners can manage and track their store
          performance.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/login")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-white border border-green-500 text-green-700 px-6 py-3 rounded-lg font-semibold hover:bg-green-50 transition"
          >
            Register Now
          </button>
        </div>

        <div className="mt-12 text-sm text-neutral-400 max-w-xl mx-auto">
          <p className="mb-2">
            Whether you’re a <strong>customer</strong> sharing feedback, 
            a <strong>store owner</strong> managing ratings,
            or an <strong>admin</strong> overseeing everything — 
            all features are available in one place.
          </p>
          <p>
            Join us to make store rating and feedback simple, structured, and effective.
          </p>
        </div>
      </div>
    </div>
  );
}
