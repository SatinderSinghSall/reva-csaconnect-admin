import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewAllChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

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
    try {
      await axios.delete(
        `https://csaconnect-backend.onrender.com/api/challenges/${id}`
      );
      setChallenges((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Failed to delete challenge", error);
    }
  };

  const editChallenge = (id) => {
    alert(`Edit challenge ${id} — not implemented yet.`);
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
                      onClick={() => editChallenge(challenge._id)}
                      className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteChallenge(challenge._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ViewAllChallenges;
