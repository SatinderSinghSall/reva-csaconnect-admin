import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { MessageCircleQuestion } from "lucide-react";
import toast from "react-hot-toast";

const AddChallenges = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    link: "",
    postedBy: "",
  });
  const [status, setStatus] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);
  const adminName = localStorage.getItem("adminName");

  useEffect(() => {
    const adminId = localStorage.getItem("adminId");
    if (adminId) {
      setFormData((prev) => ({ ...prev, postedBy: adminId }));
    }
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ message: "", type: "" });
    setLoading(true);

    try {
      const response = await axios.post(
        "https://csaconnect-backend.onrender.com/api/challenges",
        formData
      );
      setStatus({ message: response.data.message, type: "success" });
      toast.success(response.data.message || "Challenge submitted!");
      setFormData({
        title: "",
        content: "",
        link: "",
        postedBy: formData.postedBy,
      });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Submission failed.";
      setStatus({ message: errorMessage, type: "error" });
      toast.error(errorMessage);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-3xl shadow-xl border border-blue-100 p-10 w-full max-w-2xl"
      >
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 flex justify-center items-center gap-2">
            <MessageCircleQuestion size={28} className="text-blue-600" />
            Post a New Challenge
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Fill out the form below to add internship or quiz details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
              placeholder="e.g. Google Internship 2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="4"
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
              placeholder="Brief description about the opportunity..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              External Link
            </label>
            <input
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
              placeholder="https://official-link.com"
            />
          </div>

          {/* Display who is posting */}
          <div className="text-sm text-gray-500">
            Posting as: <span className="font-semibold">{adminName}</span> -
            Admin
          </div>

          {status.message && (
            <div
              className={`text-sm font-medium text-center ${
                status.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="pt-4 text-center">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddChallenges;
