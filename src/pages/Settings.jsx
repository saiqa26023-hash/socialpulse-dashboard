// src/pages/Settings.jsx – Beautiful Redesign
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiLockClosed,
  HiShieldCheck,
  HiBell,
  HiDesktopComputer,
  HiTranslate,
  HiSave,
  HiSun,
  HiMoon,
  HiEyeOff,
  HiEye,
  HiUser,
  HiKey,
} from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const Settings = () => {
  const { darkMode, toggleTheme } = useTheme();

  const [settings, setSettings] = useState({
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    twoFactor: false,
    privateAccount: false,
    activityStatus: true,
    emailNotifications: true,
    pushNotifications: true,
    inAppNotifications: true,
    fontSize: 'medium',
    language: 'en',
  });

  useEffect(() => {
    const saved = localStorage.getItem('user_settings');
    if (saved) setSettings(JSON.parse(saved));
  }, []);

  const handleAccountChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field) => {
    setSettings(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const saveSettings = () => {
    localStorage.setItem('user_settings', JSON.stringify(settings));
    toast.success('Settings saved successfully!');
  };

  const handleChangePassword = () => {
    toast.success('Password change functionality coming soon!');
  };

  // Reusable toggle component with icon
  const Toggle = ({ checked, onChange, label, description, icon: Icon }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
      <div className="flex items-start space-x-3">
        {Icon && <Icon className="w-5 h-5 mt-0.5 text-gray-400" />}
        <div>
          <p className="font-medium text-gray-800 dark:text-white">{label}</p>
          {description && (
            <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
          )}
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ${
          checked ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 text-center md:text-left">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Settings
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Customize your experience and manage your account.
          </p>
        </div>

        {/* Two-column layout for first two cards */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Account Settings */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <HiUser className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Account Settings
                </h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleAccountChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <HiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={settings.phone}
                      onChange={(e) => handleAccountChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <HiLocationMarker className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={settings.location}
                      onChange={(e) => handleAccountChange('location', e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Security */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <HiLockClosed className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Privacy & Security
                </h2>
              </div>
              <div className="space-y-2">
                <Toggle
                  checked={settings.twoFactor}
                  onChange={(val) => handleToggle('twoFactor')}
                  label="Two-Factor Authentication"
                  description="Add extra security to your account"
                  icon={HiShieldCheck}
                />
                <Toggle
                  checked={settings.privateAccount}
                  onChange={(val) => handleToggle('privateAccount')}
                  label="Private Account"
                  description="Make your profile private"
                  icon={HiEyeOff}
                />
                <Toggle
                  checked={settings.activityStatus}
                  onChange={(val) => handleToggle('activityStatus')}
                  label="Activity Status"
                  description="Show when you're online"
                  icon={HiEye}
                />
                <div className="pt-4">
                  <button
                    onClick={handleChangePassword}
                    className="inline-flex items-center space-x-2 px-4 py-2 border border-purple-500 text-purple-600 dark:text-purple-400 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors duration-200"
                  >
                    <HiKey className="w-5 h-5" />
                    <span>Change Password</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications, Display, Language – Full width cards */}
        <div className="mt-8 space-y-8">
          {/* Notifications */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <HiBell className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Notifications
                </h2>
              </div>
              <div className="space-y-2">
                <Toggle
                  checked={settings.emailNotifications}
                  onChange={(val) => handleToggle('emailNotifications')}
                  label="Email Notifications"
                  icon={HiMail}
                />
                <Toggle
                  checked={settings.pushNotifications}
                  onChange={(val) => handleToggle('pushNotifications')}
                  label="Push Notifications"
                  icon={HiBell}
                />
                <Toggle
                  checked={settings.inAppNotifications}
                  onChange={(val) => handleToggle('inAppNotifications')}
                  label="In-App Notifications"
                  icon={HiDesktopComputer}
                />
              </div>
            </div>
          </div>

          {/* Display Settings */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <HiDesktopComputer className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Display Settings
                </h2>
              </div>
              <div className="space-y-5">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    {darkMode ? <HiMoon className="w-5 h-5" /> : <HiSun className="w-5 h-5" />}
                    <span className="font-medium text-gray-800 dark:text-white">Dark Mode</span>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ${
                      darkMode ? 'bg-purple-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-200 ${
                        darkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="font-medium text-gray-800 dark:text-white">Font Size</span>
                  <select
                    value={settings.fontSize}
                    onChange={(e) => handleAccountChange('fontSize', e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <HiTranslate className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  Language
                </h2>
              </div>
              <div className="space-y-3">
                {[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Español (demo)' },
                  { value: 'fr', label: 'Français (demo)' },
                ].map((lang) => (
                  <label key={lang.value} className="flex items-center space-x-3 py-2">
                    <input
                      type="radio"
                      name="language"
                      value={lang.value}
                      checked={settings.language === lang.value}
                      onChange={() => handleAccountChange('language', lang.value)}
                      className="text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{lang.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-10 flex justify-end">
          <button
            onClick={saveSettings}
            className="inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
          >
            <HiSave className="w-5 h-5" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;