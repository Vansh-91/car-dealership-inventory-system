import { FaCarSide, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/"); // Change to "/" if you haven't switched to /login route
  };

  return (
    <nav className="bg-card border border-border rounded-2xl shadow-lg px-8 py-5 mb-8 flex items-center justify-between">

      {/* Left Side */}
      <div className="flex items-center gap-4">

        <div className="bg-primary p-3 rounded-xl shadow-lg">
          <FaCarSide className="text-background text-2xl" />
        </div>

        <div>
          <h1 className="text-text text-2xl font-bold">
            Car Dealership
          </h1>

          <p className="text-text-secondary text-sm">
            Inventory Management System
          </p>
        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* User Info */}
        <div className="flex items-center gap-3">

          <FaUserCircle className="text-primary text-4xl" />

          <div className="text-right">

            <p className="text-text font-semibold">
              {user?.name}
            </p>

            <div className="flex items-center justify-end gap-2">

             
              {user?.role === "admin" && (
                <span className="bg-primary text-background text-xs font-bold px-2 py-1 rounded-full">
                  ADMIN
                </span>
              )}

            </div>

          </div>

        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-surface border border-border hover:border-primary hover:bg-primary hover:text-background transition-all duration-300 px-5 py-3 rounded-xl font-medium"
        >
          <FaSignOutAlt />
          Logout
        </button>

      </div>

    </nav>
  );
};

export default Navbar;