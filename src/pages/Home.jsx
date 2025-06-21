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
    <div className="min-h-screen bg-gradient-to-br from-[#e0f2fe] via-white to-[#e0e7ff] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.08)] p-8 md:p-14 border border-gray-200 transition duration-300 ease-in-out">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 tracking-tight mb-4">
            Welcome, Admin ✨
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10">
            👋 Hello,{" "}
            <span className="font-semibold text-gray-800">{adminName}</span>.{" "}
            <br />
            You’ve entered the control hub — manage users, posts, challenges,
            and more from one intuitive dashboard.
          </p>
          <button
            onClick={handleClick}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-medium rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            View Dashboard
            <svg
              className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1"
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
    </div>
  );
};

export default Home;
