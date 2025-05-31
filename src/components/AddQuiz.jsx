import React from "react";
import { motion } from "framer-motion";
import { MessageCircleQuestion } from "lucide-react";

const AddQuiz = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20 md:pt-6 flex flex-col">
      {/* Header aligned like in Posts */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <MessageCircleQuestion size={28} className="text-blue-600" />
          Add a Quiz
        </h2>
      </div>

      {/* Center the card in the remaining space */}
      <div className="flex-grow flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full text-center"
        >
          <motion.div
            className="mb-6"
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <svg
              className="mx-auto h-16 w-16 text-yellow-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </motion.div>

          <h1 className="text-2xl font-semibold text-gray-800 mb-2">
            Page Under Maintenance
          </h1>
          <p className="text-gray-600 mb-4">
            The admin interface to add quizzes is currently being updated.
            Please check back later.
          </p>
          <div className="text-sm text-gray-400 mb-2">
            We appreciate your patience.
          </div>
          <motion.div
            className="text-xs text-gray-400 mt-6 pt-4 border-t border-gray-200 font-mono tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            by{" "}
            <span className="text-gray-600 font-semibold">
              Developer – Satinder Singh Sall
            </span>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AddQuiz;
