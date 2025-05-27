import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  Users,
  FileText,
  LayoutDashboard,
  UserCheck,
} from "lucide-react";
import { toast } from "react-toastify";

const Sidebar = ({ setToken }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    toast.info("Admin logout successful!");
    navigate("/login");
  };

  const navItemClasses = (path) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
      pathname === path
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <div className="w-64 h-screen bg-gray-900 p-6 shadow-xl flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Admin Panel</h1>
        <nav className="space-y-2">
          <Link to="/dashboard" className={navItemClasses("/dashboard")}>
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link to="/admins" className={navItemClasses("/admins")}>
            <UserCheck size={20} />
            Admins
          </Link>
          <Link to="/users" className={navItemClasses("/users")}>
            <Users size={20} />
            Users
          </Link>
          <Link to="/posts" className={navItemClasses("/posts")}>
            <FileText size={20} />
            Posts
          </Link>
        </nav>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:text-white hover:bg-red-600 transition"
      >
        <LogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
