import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../api";
import { Trash2, X, FileText } from "lucide-react";

const Posts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [token]);

  const fetchPosts = async () => {
    try {
      const res = await getPosts(token);
      setPosts(res.data);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deletePost(id, token);
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      alert("Failed to delete post.");
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <FileText size={28} className="text-blue-600" />
          Posts
        </h2>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">No posts found.</p>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition"
            >
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-700 mb-2 line-clamp-3">
                  {post.content}
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  By{" "}
                  <span className="font-medium">
                    {post.author?.name || "Unknown"}
                  </span>{" "}
                  | {new Date(post.createdAt).toLocaleString()}
                </p>

                {post.skills?.length > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">Skills:</span>{" "}
                    {post.skills.join(", ")}
                  </p>
                )}

                {post.link && (
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline text-sm mt-2 inline-block hover:text-blue-700 transition"
                  >
                    View Link
                  </a>
                )}
              </div>

              <button
                onClick={() => setConfirmDeleteId(post._id)}
                className="mt-4 md:mt-0 text-red-600 hover:text-red-800 transition rounded-full p-2 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-500"
                aria-label={`Delete post titled ${post.title}`}
                disabled={deletingId === post._id}
              >
                {deletingId === post._id ? (
                  <svg
                    className="animate-spin h-5 w-5 text-red-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                ) : (
                  <Trash2 size={24} />
                )}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg relative">
            <button
              onClick={() => setConfirmDeleteId(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close confirmation modal"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-semibold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this post?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition flex items-center justify-center gap-2"
                disabled={deletingId === confirmDeleteId}
              >
                {deletingId === confirmDeleteId ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
