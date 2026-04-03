import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { HiCog } from 'react-icons/hi';
import { 
  HiHome, 
  HiChartBar, 
  HiChat, 
  HiBell, 
  HiUser,
  HiOutlineSparkles,
  HiX
} from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ onClose }) => {
  const { logout } = useAuth();

  const links = [
    { to: "/", label: "Home", icon: <HiHome className="text-2xl" /> },
    { to: "/analytics", label: "Analytics", icon: <HiChartBar className="text-2xl" /> },
    { to: "/comments", label: "Comments", icon: <HiChat className="text-2xl" /> },
    { to: "/notifications", label: "Notifications", icon: <HiBell className="text-2xl" /> },
    { to: "/profile", label: "Profile", icon: <HiUser className="text-2xl" /> },
    { to: "/settings", label: "Settings", icon: <HiCog className="text-2xl" /> },
  ];

  return (
    <motion.aside
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      className="bg-gradient-to-b from-purple-500 to-pink-500 text-white shadow-2xl h-full flex flex-col overflow-y-auto relative"
    >
      {/* Close button for mobile */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1 rounded-full bg-white/20 hover:bg-white/30 transition md:hidden"
      >
        <HiX className="text-xl" />
      </button>

      {/* Logo & Brand */}
      <div className="p-6 pb-4">
        <div className="flex items-center space-x-2">
          <HiOutlineSparkles className="text-3xl" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
            SocialPulse
          </h2>
        </div>
        <p className="text-xs text-white/70 mt-1 pl-1">Dashboard Pro</p>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2 flex-1 px-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center space-x-3 p-2.5 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-white/30 text-white shadow-md"
                  : "hover:bg-white/20 text-white/90"
              }`
            }
          >
            {link.icon}
            <span className="font-medium text-base">{link.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Section with Logout */}
      <div className="mt-auto p-4 border-t border-white/20">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl">
            Y
          </div>
          <div>
            <p className="font-semibold text-white text-sm">You</p>
            <p className="text-xs text-white/70">Premium User</p>
          </div>
        </div>
        <button
          onClick={() => { logout(); onClose?.(); }}
          className="mt-2 w-full text-left text-sm text-white/80 hover:text-white transition"
        >
          Logout
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;