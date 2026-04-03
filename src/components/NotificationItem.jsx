import React from 'react';
import { motion } from 'framer-motion';
import { HiBell } from 'react-icons/hi';

const notifications = [
  { id: 1, user: 'Ali Khan', action: 'liked your post', time: '5 min ago', read: false },
  { id: 2, user: 'Fatima Noor', action: 'commented on your post', time: '15 min ago', read: false },
  { id: 3, user: 'Ahmed Raza', action: 'started following you', time: '30 min ago', read: false },
  { id: 4, user: 'Zara Shah', action: 'shared your post', time: '1 hour ago', read: false },
  { id: 5, user: 'Hassan Ali', action: 'liked your comment', time: '2 hours ago', read: false },
  { id: 6, user: 'Maryam Khan', action: 'started following you', time: '3 hours ago', read: false },
];

const Notifications = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
        <HiBell className="mr-2" /> Notifications
      </h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-5 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition ${
              !notif.read ? 'bg-purple-50/50 dark:bg-purple-900/10' : ''
            }`}
          >
            <p className="text-gray-800 dark:text-gray-200">
              <span className="font-semibold">{notif.user}</span> {notif.action}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Notifications;