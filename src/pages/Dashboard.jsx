import { useEffect, useState } from "react";
import { Users, FileText } from "lucide-react";
import { getUsers, getPosts } from "../api"; // Ensure these endpoints exist

const Dashboard = ({ token }) => {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const usersRes = await getUsers(token);
        const postsRes = await getPosts(token);
        setUserCount(usersRes.data.length);
        setPostCount(postsRes.data.length);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, [token]);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

      {loading ? (
        <p className="text-gray-500">Loading dashboard...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Users Card */}
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition">
            <div className="bg-blue-100 text-blue-600 rounded-full p-3">
              <Users size={32} />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800">{userCount}</p>
              <p className="text-gray-500">Total Users</p>
            </div>
          </div>

          {/* Posts Card */}
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition">
            <div className="bg-green-100 text-green-600 rounded-full p-3">
              <FileText size={32} />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800">{postCount}</p>
              <p className="text-gray-500">Total Posts</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
