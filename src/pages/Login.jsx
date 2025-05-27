import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../api";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await loginAdmin({ email, password });
      const { token, admin } = res.data;

      setToken(token);
      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminName", admin.name); // Save admin name here

      toast.success("Admin login successful!");
      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Branding Panel */}
      <div className="hidden md:flex items-center justify-center bg-blue-800 text-white p-10">
        <div className="max-w-md">
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            CSAConnect Admin
          </h1>
          <p className="text-blue-100 text-lg leading-relaxed">
            Welcome back to the control center. Manage users, posts, and
            settings all in one place.
          </p>
        </div>
      </div>

      {/* Login Panel */}
      <div className="flex items-center justify-center bg-gray-50 px-6 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">Sign in</h2>
            <p className="text-sm text-gray-500 mt-1">
              to continue to your admin dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
                <AlertCircle size={18} className="mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition ${
                loading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {loading && <Loader2 className="animate-spin h-5 w-5" />}
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400">
            &copy; {new Date().getFullYear()} CSAConnect. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
