import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  LogOut,
  Users,
  FileText,
  LayoutDashboard,
  UserCheck,
  Menu,
  X,
  MessageCircleQuestion,
  Eye,
} from "lucide-react";
import { toast } from "react-toastify";

const Sidebar = ({ setToken }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    toast.info("Admin logout successful!");
    navigate("/login");
  };

  const navItemClasses = (path) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      pathname === path
        ? "bg-blue-600 text-white shadow"
        : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;

  // Handle ESC key and focus trap for mobile sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden p-3 text-white fixed top-4 left-4 z-50 bg-gray-800 rounded-full shadow-lg active:scale-95 transition-transform"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={28} />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-64 bg-gray-950/90 backdrop-blur-md border-r border-gray-800 shadow-xl z-50 transform transition-transform ease-in-out duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:h-screen`}
      >
        {/* Header */}
        <div className="flex items-center justify-between md:justify-center p-5 border-b border-gray-800">
          <h1 className="text-3xl font-semibold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
            Admin Panel
          </h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-400 hover:text-white transition"
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col h-full overflow-y-auto">
          <div className="p-4 space-y-2">
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
            <Link
              to="/add-challenges"
              className={navItemClasses("/add-challenges")}
            >
              <MessageCircleQuestion size={20} />
              Add Challenges
            </Link>
            <Link
              to="/all-challenges"
              className={navItemClasses("/all-challenges")}
            >
              <Eye size={20} />
              View All Challenges
            </Link>
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-gray-800 mt-auto bg-gray-950/90">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:text-white hover:bg-red-600 transition-all duration-200"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
