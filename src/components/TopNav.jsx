import React from 'react';
import { motion } from 'framer-motion';
import { HiSearch, HiBell, HiUser, HiSun, HiMoon, HiMenu } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';

const TopNav = ({ toggleSidebar }) => {
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Dashboard';
    if (path === '/analytics') return 'Analytics';
    if (path === '/comments') return 'Comments';
    if (path === '/notifications') return 'Notifications';
    if (path === '/profile') return 'Profile';
    if (path === '/setting') return 'settng';
    return 'SocialPulse';
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10"
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        {/* Left side: Menu button + Title */}
        <div className="flex items-center space-x-3">
          {/* Menu button – always visible, toggles sidebar */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <HiMenu className="text-2xl" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white">
              {getPageTitle()}
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
              Welcome back! Here's what's happening.
            </p>
          </div>
        </div>

        {/* Right side: Search, Notifications, Theme, Profile */}
        <div className="flex items-center space-x-3 md:space-x-5">
          {/* Search Bar (hidden on mobile, visible md+) */}
          <div className="hidden md:block relative">
            <HiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search posts, users..."
              className="w-64 lg:w-72 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Notifications */}
          <button className="relative text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
            <HiBell className="text-2xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
          >
            {darkMode ? <HiSun className="text-2xl" /> : <HiMoon className="text-2xl" />}
          </button>

          {/* Profile Link */}
          <Link
            to="/profile"
            className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
          >
            <HiUser className="text-2xl" />
          </Link>
        </div>
      </div>
    </motion.header>
  );
};

export default TopNav;