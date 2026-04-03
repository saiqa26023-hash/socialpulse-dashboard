import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiLocationMarker, HiLink, HiCalendar, HiHeart, HiUser } from 'react-icons/hi';
import toast from 'react-hot-toast';

const Profile = () => {
  // Load user data from localStorage or use default (your details)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('socialpulse_user');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      name: 'Saiqa',
      username: '@saiqa',
      role: 'React Developer',
      bio: 'React Engineer skilled in building modern, responsive web apps with React, Tailwind, and interactive dashboards. Focused on clean code, performance, and great user experiences.',
      location: 'Pakistan',
      website: 'socialpulse.dev',
      joined: 'March 2026',
      cover: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      stats: {
        posts: 142,
        followers: '23K',
        following: 385,
        engagement: '8.5%',
      },
      recentActivity: [
        { id: 1, text: 'Published a new post about React architecture', time: '2 hours ago' },
        { id: 2, text: 'Gained 82 new followers on Instagram', time: '5 hours ago' },
        { id: 3, text: 'Started following @techcommunity', time: '1 day ago' },
        { id: 4, text: 'Your post reached 10K views', time: '2 days ago' },
      ],
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSave = () => {
    setUser(editedUser);
    localStorage.setItem('socialpulse_user', JSON.stringify(editedUser));
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const initial = user.name.charAt(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full px-4 md:px-6 lg:px-8 py-6"
    >
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Cover Image */}
        <div className="h-48 md:h-64 relative">
          <img src={user.cover} alt="Cover" className="w-full h-full object-cover" />
          <div className="absolute -bottom-12 left-6 md:-bottom-16 md:left-8">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl md:text-5xl font-bold border-4 border-white dark:border-gray-800 shadow-xl">
              {initial}
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20 px-4 md:px-6 pb-6 md:pb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Name, Username, Role (editable) */}
            <div className="space-y-2">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleChange}
                    className="text-3xl md:text-4xl font-bold bg-transparent border-b-2 border-purple-500 focus:outline-none text-gray-800 dark:text-white w-full"
                    placeholder="Name"
                  />
                  <div className="flex items-center flex-wrap gap-2">
                    <input
                      type="text"
                      name="username"
                      value={editedUser.username}
                      onChange={handleChange}
                      className="text-lg md:text-xl bg-transparent border-b border-purple-500 focus:outline-none text-gray-600 dark:text-gray-400"
                      placeholder="Username"
                    />
                    <span className="text-gray-400 dark:text-gray-500">·</span>
                    <input
                      type="text"
                      name="role"
                      value={editedUser.role}
                      onChange={handleChange}
                      className="text-base md:text-lg bg-transparent border-b border-purple-500 focus:outline-none text-gray-600 dark:text-gray-400"
                      placeholder="Role"
                    />
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{user.name}</h2>
                  <div className="flex items-center flex-wrap gap-2 mt-1">
                    <span className="text-lg md:text-xl text-gray-600 dark:text-gray-400">{user.username}</span>
                    <span className="text-gray-400 dark:text-gray-500 text-lg">·</span>
                    <span className="text-base md:text-lg text-gray-600 dark:text-gray-400">{user.role}</span>
                  </div>
                </>
              )}
            </div>

            {/* Edit / Save Cancel buttons */}
            {!isEditing ? (
              <button
                onClick={handleEditClick}
                className="px-6 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm md:text-base font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 self-start md:self-auto"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2 self-start md:self-auto">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded-full text-sm font-semibold hover:shadow-lg transition"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-500 text-white rounded-full text-sm font-semibold hover:shadow-lg transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Bio */}
          <div className="mt-4">
            {isEditing ? (
              <textarea
                name="bio"
                value={editedUser.bio}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            ) : (
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">{user.bio}</p>
            )}
          </div>

          {/* Location, Website, Join Date */}
          <div className="mt-6 flex flex-wrap gap-6 text-base md:text-lg text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <HiLocationMarker className="text-xl md:text-2xl text-gray-400 dark:text-gray-500" />
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={editedUser.location}
                  onChange={handleChange}
                  className="bg-transparent border-b border-gray-300 focus:border-purple-500 focus:outline-none"
                />
              ) : (
                <span>{user.location}</span>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <HiLink className="text-xl md:text-2xl text-gray-400 dark:text-gray-500" />
              {isEditing ? (
                <input
                  type="text"
                  name="website"
                  value={editedUser.website}
                  onChange={handleChange}
                  className="bg-transparent border-b border-gray-300 focus:border-purple-500 focus:outline-none"
                />
              ) : (
                <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="text-purple-600 dark:text-purple-400 hover:underline">
                  {user.website}
                </a>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <HiCalendar className="text-xl md:text-2xl text-gray-400 dark:text-gray-500" />
              <span>Joined {user.joined}</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8">
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 text-center hover:shadow-md transition flex flex-col items-center justify-center h-32 md:h-36">
              <p className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{user.stats.posts}</p>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">POSTS</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 text-center hover:shadow-md transition flex flex-col items-center justify-center h-32 md:h-36">
              <p className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{user.stats.followers}</p>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">FOLLOWERS</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 text-center hover:shadow-md transition flex flex-col items-center justify-center h-32 md:h-36">
              <p className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{user.stats.following}</p>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">FOLLOWING</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-6 text-center hover:shadow-md transition flex flex-col items-center justify-center h-32 md:h-36">
              <p className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">{user.stats.engagement}</p>
              <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mt-1">ENGAGEMENT</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-10">
            <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {user.recentActivity.map((item) => (
                <div key={item.id} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition">
                  <HiHeart className="text-pink-500 mt-1 text-2xl md:text-3xl" />
                  <div>
                    <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">{item.text}</p>
                    <p className="text-sm md:text-base text-gray-400 dark:text-gray-500 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;