import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Dashboard from "./pages/Dashboard";
import Admins from "./pages/Admins";
import Sidebar from "./components/Sidebar";

function App() {
  const [token, setToken] = useState(localStorage.getItem("adminToken"));

  return (
    <BrowserRouter>
      {!token ? (
        <Login setToken={setToken} />
      ) : (
        <div className="flex">
          <Sidebar setToken={setToken} />
          <div className="flex-1 p-6 bg-gray-100 min-h-screen">
            <Routes>
              <Route path="/users" element={<Users token={token} />} />
              <Route path="/posts" element={<Posts token={token} />} />
              <Route path="/dashboard" element={<Dashboard token={token} />} />
              <Route path="/admins" element={<Admins token={token} />} />
            </Routes>
          </div>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
