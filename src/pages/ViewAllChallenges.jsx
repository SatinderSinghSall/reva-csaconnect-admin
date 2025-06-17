import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ViewAllChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [challengeToDelete, setChallengeToDelete] = useState(null);

  const fetchChallenges = async () => {
    try {
      const res = await axios.get(
        "https://csaconnect-backend.onrender.com/api/challenges"
      );
      setChallenges(res.data);
    } catch (error) {
      console.error("Failed to fetch challenges", error);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = (challenge) => {
    setChallengeToDelete(challenge);
    setShowDeleteConfirm(true);
  };

  const handleConfirmedDelete = async () => {
    if (!challengeToDelete) return;
    setDeletingId(challengeToDelete._id);
    try {
      await axios.delete(
        `https://csaconnect-backend.onrender.com/api/challenges/${challengeToDelete._id}`
      );
      setChallenges((prev) =>
        prev.filter((c) => c._id !== challengeToDelete._id)
      );
      toast.success("Challenge is Deleted Successfully!");
    } catch (error) {
      console.error("Failed to delete challenge", error);
    } finally {
      setDeletingId(null);
      setShowDeleteConfirm(false);
      setChallengeToDelete(null);
    }
  };

  const handleEditClick = (challenge) => {
    setCurrentEdit(challenge);
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setCurrentEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await axios.put(
        `https://csaconnect-backend.onrender.com/api/challenges/${currentEdit._id}`,
        currentEdit
      );
      setChallenges((prev) =>
        prev.map((c) => (c._id === currentEdit._id ? currentEdit : c))
      );
      toast.success("Challenge is Updated Successfully!");
      setIsEditModalOpen(false);
      setCurrentEdit(null);
    } catch (error) {
      console.error("Failed to update challenge", error);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  if (loading) return <h1 className="text-center text-xl mt-10">Loading...</h1>;

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
        All Challenges
      </h2>

      {challenges.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No challenges found.
        </p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-xl bg-white">
          <table className="min-w-full text-sm text-left text-gray-800 border border-gray-200">
            <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Content</th>
                <th className="px-6 py-4">Link</th>
                <th className="px-6 py-4">Posted By</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {challenges.map((challenge) => (
                <tr key={challenge._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium">{challenge.title}</td>
                  <td className="px-6 py-4">{challenge.content}</td>
                  <td className="px-6 py-4">
                    <a
                      href={challenge.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    {challenge.postedBy?.name || "Unknown"}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(challenge.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleEditClick(challenge)}
                      className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-1.5 rounded-md transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(challenge)}
                      className="bg-red-600 hover:bg-red-500 text-white font-semibold px-4 py-1.5 rounded-md transition disabled:opacity-50"
                      disabled={deletingId === challenge._id}
                    >
                      {deletingId === challenge._id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && currentEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Edit Challenge
            </h3>
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                value={currentEdit.title}
                onChange={handleEditChange}
                placeholder="Title"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="content"
                value={currentEdit.content}
                onChange={handleEditChange}
                placeholder="Content"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="text"
                name="link"
                value={currentEdit.link}
                onChange={handleEditChange}
                placeholder="Link"
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setCurrentEdit(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
                disabled={updating}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition disabled:opacity-50"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && challengeToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-red-600">
              Confirm Deletion
            </h3>
            <p className="mb-6">
              Are you sure you want to delete "
              <strong>{challengeToDelete.title}</strong>"?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setChallengeToDelete(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmedDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition disabled:opacity-50"
                disabled={deletingId === challengeToDelete._id}
              >
                {deletingId === challengeToDelete._id
                  ? "Deleting..."
                  : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewAllChallenges;
