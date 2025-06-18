import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const [adminName, setAdminName] = useState("Admin");
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("adminName") || "Admin";
    setAdminName(name);
  }, []);

  const handleClick = () => {
    navigate("/dashboard");
    toast.success(`Welcome to your dashboard, ${adminName}!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4 py-12 flex justify-center items-center">
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur-md border border-blue-100 rounded-3xl shadow-xl p-8 sm:p-12 transition-all duration-300">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700 mb-6">
          CSAConnect Admin
        </h1>

        <p className="text-lg sm:text-xl text-gray-800 mb-8 leading-relaxed">
          👋 Hello, <span className="font-semibold">{adminName}</span>. <br />
          Welcome back to the control center. Easily manage users, posts, and
          system settings — all in one place.
        </p>

        <button
          onClick={handleClick}
          className="group flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-xl shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          View your Dashboard
          <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Home;
