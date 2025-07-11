import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import logo from "../images/bn.png";
import { AuthContext } from '../context/AuthContext';

const Navbar2 = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);
  const [showLogout, setShowLogout] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowLogout(false);
    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/" },
  ];

  return (
    <nav className="navbar h-20 px-6 lg:px-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-between shadow-lg">
      {/* Left Section: Logo + Nav */}
      <div className="flex items-center space-x-6">
        <img
          src={logo}
          alt="Logo"
          className="h-12 w-36 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => navigate("/")}
        />

        <ul className="hidden md:flex space-x-8 text-lg font-semibold">
          {navItems.map((item) => (
            <li 
              key={item.name}
              className="cursor-pointer hover:underline hover:text-white transition-all transform hover:scale-105"
              onClick={() => navigate(item.path)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section: Auth / Avatar / Mobile menu */}
      <div className="flex items-center space-x-6">
        {user ? (
          <div className="relative">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setShowLogout(!showLogout)}
            >
              <div className="hidden md:block text-right">
                <div className="font-bold">{user.name}</div>
                <div className="text-xs opacity-80">Member</div>
              </div>
              <Avatar
                name={user.name}
                size="45"
                round="50%"
                className="border-2 border-white"
              />
            </div>

            {showLogout && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 shadow-lg rounded-lg z-10">
                <div className="py-2 border-b border-gray-200">
                  <div className="px-4 font-medium text-gray-800">{user.name}</div>
                  <div className="px-4 text-sm text-gray-500">{user.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-red-500 hover:bg-red-50 rounded-b-lg text-left border-t border-gray-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center space-x-3">
            <button
              className="hidden md:block px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-purple-600 transition duration-300"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
            <button
              className="flex items-center space-x-2 bg-white text-purple-600 py-2 px-4 rounded-lg hover:bg-opacity-90 transition duration-300 font-semibold"
              onClick={() => navigate("/login")}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd"></path>
              </svg>
              <span>Login</span>
            </button>
          </div>
        )}

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden flex items-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-blue-600 md:hidden z-10">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
              >
                {item.name}
              </div>
            ))}

            <div className="pt-4 pb-3 border-t border-blue-700">
              <div className="flex items-center px-3">
                {user ? (
                  <div className="ml-3">
                    <div className="text-base font-medium">{user.name}</div>
                    <button
                      onClick={handleLogout}
                      className="mt-2 w-full text-sm text-white bg-red-500 px-3 py-1 rounded"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      className="bg-white text-blue-600 px-3 py-1 rounded text-sm"
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Login
                    </button>
                    <button
                      className="border border-white text-white px-3 py-1 rounded text-sm"
                      onClick={() => {
                        navigate("/register"); // ✅ fixed here
                        setMobileMenuOpen(false);
                      }}
                    >
                      Register
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar2;
