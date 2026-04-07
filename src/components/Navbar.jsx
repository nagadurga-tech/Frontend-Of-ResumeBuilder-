import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../app/features/authSlice";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="shadow-sm top-0 z-50 bg-white ">
      <nav className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="logo" className="h-10 w-auto" />
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
            <User className="w-4 h-4" />
            <span>
              Hi,{" "}
              <span className="font-semibold text-gray-900">
                {user?.name || "User"}
              </span>
            </span>
          </div>
          <button
            onClick={logoutUser}
            className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full
            border border-gray-300 text-gray-700 text-sm
            hover:bg-gray-100 hover:text-gray-900
            active:scale-95 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
