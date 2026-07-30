import { FaCarSide, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-card border border-border rounded-2xl px-8 py-5 flex justify-between items-center mb-8 shadow-lg">

      <div className="flex items-center gap-3">
        <div className="bg-primary p-3 rounded-xl">
          <FaCarSide className="text-background text-xl" />
        </div>

        <div>
          <h1 className="text-text text-xl font-bold">
            Car Dealership
          </h1>

          <p className="text-text-secondary text-sm">
            Inventory System
          </p>
        </div>
      </div>

      <button
        onClick={logout}
        className="flex items-center gap-2 bg-surface px-5 py-3 rounded-xl border border-border hover:border-primary transition"
      >
        <FaSignOutAlt />
        Logout
      </button>

    </nav>
  );
};

export default Navbar;