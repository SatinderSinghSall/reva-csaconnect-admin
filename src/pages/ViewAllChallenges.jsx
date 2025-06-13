import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewAllChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [updating, setUpdating] = useState(false);

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

  const deleteChallenge = async (id) => {
    setDeletingId(id);
    try {
      await axios.delete(
        `https://csaconnect-backend.onrender.com/api/challenges/${id}`
      );
      setChallenges((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Failed to delete challenge", error);
    } finally {
      setDeletingId(null);
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
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        All Challenges
      </h2>

      {challenges.length === 0 ? (
        <p className="text-center text-gray-500">No challenges found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow rounded-xl">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Title
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Content
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Link
                </th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">
                  Posted By
                </th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {challenges.map((challenge) => (
                <tr key={challenge._id} className="border-t hover:bg-gray-50">
                  <td className="py-3 px-4">{challenge.title}</td>
                  <td className="py-3 px-4">{challenge.content}</td>
                  <td className="py-3 px-4">
                    <a
                      href={challenge.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </a>
                  </td>
                  <td className="py-3 px-4">
                    {challenge.postedBy?.name || "Unknown"}
                  </td>
                  <td className="py-3 px-4 text-center space-x-2">
                    <button
                      onClick={() => handleEditClick(challenge)}
                      className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteChallenge(challenge._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 disabled:opacity-60"
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Challenge</h3>
            <div className="space-y-4">
              <input
                type="text"
                name="title"
                value={currentEdit.title}
                onChange={handleEditChange}
                placeholder="Title"
                className="w-full border p-2 rounded"
              />
              <textarea
                name="content"
                value={currentEdit.content}
                onChange={handleEditChange}
                placeholder="Content"
                className="w-full border p-2 rounded"
              />
              <input
                type="text"
                name="link"
                value={currentEdit.link}
                onChange={handleEditChange}
                placeholder="Link"
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setCurrentEdit(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                disabled={updating}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-60"
                disabled={updating}
              >
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewAllChallenges;
