import { useEffect, useState } from "react";
import { Users, FileText, ShieldUser, Trophy } from "lucide-react";
import { getUsers, getPosts, getAdmins, getChallengeCount } from "../api";

const Dashboard = ({ token }) => {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [adminCount, setAdminCount] = useState(0);
  const [challengeCount, setChallengeCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const name = localStorage.getItem("adminName") || "Admin";
    setAdminName(name);

    const fetchCounts = async () => {
      try {
        const [usersRes, postsRes, adminRes, challengeRes] = await Promise.all([
          getUsers(token),
          getPosts(token),
          getAdmins(token),
          getChallengeCount(token),
        ]);
        setUserCount(usersRes.data.length);
        setPostCount(postsRes.data.length);
        setAdminCount(adminRes.data.length);
        setChallengeCount(challengeRes.data.count);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCounts();
  }, [token]);

  // Skeleton card component
  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 animate-pulse">
      <div className="rounded-full bg-gray-200 p-6"></div>
      <div className="flex-1">
        <div className="h-6 bg-gray-200 rounded w-16 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50 pt-20 md:pt-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

      {/* Greeting Message */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-sm">
        <p className="text-gray-700 text-base sm:text-lg break-words">
          👋 Hello, <span className="font-semibold">{adminName}</span> —{" "}
          {new Date().toLocaleString(undefined, {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
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

          {/* Admins Card */}
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition">
            <div className="bg-green-100 text-green-600 rounded-full p-3">
              <ShieldUser size={32} />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {adminCount}
              </p>
              <p className="text-gray-500">Total Admins</p>
            </div>
          </div>

          {/* Challenges Card */}
          <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-4 hover:shadow-lg transition">
            <div className="bg-purple-100 text-purple-600 rounded-full p-3">
              <Trophy size={32} />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-800">
                {challengeCount}
              </p>
              <p className="text-gray-500">Total Challenges</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
