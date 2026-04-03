import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiBell, HiCheckCircle, HiUserCircle, HiHeart, HiChat, HiUserAdd, HiAtSymbol, HiShare, HiStar, HiPhotograph } from 'react-icons/hi';
import toast from 'react-hot-toast';

const initialNotifications = [
  { id: 1, user: 'Sarah Chen', action: 'liked your post', time: '2 minutes ago', type: 'like', read: false, avatar: <HiUserCircle className="text-3xl text-purple-500" /> },
  { id: 2, user: 'Mike Torres', action: 'commented on your post: "This is great!"', time: '15 minutes ago', type: 'comment', read: false, avatar: <HiUserCircle className="text-3xl text-blue-500" /> },
  { id: 3, user: 'Emma Wilson', action: 'started following you', time: '1 hour ago', type: 'follow', read: true, avatar: <HiUserCircle className="text-3xl text-green-500" /> },
  { id: 4, user: 'David Kim', action: 'mentioned you in a comment', time: '2 hours ago', type: 'mention', read: true, avatar: <HiUserCircle className="text-3xl text-orange-500" /> },
  { id: 5, user: 'Aisha Malik', action: 'liked your comment', time: '3 hours ago', type: 'like', read: false, avatar: <HiUserCircle className="text-3xl text-pink-500" /> },
  { id: 6, user: 'Omar Hassan', action: 'started following you', time: '5 hours ago', type: 'follow', read: false, avatar: <HiUserCircle className="text-3xl text-teal-500" /> },
  { id: 7, user: 'Fatima Zaidi', action: 'shared your post', time: '6 hours ago', type: 'share', read: false, avatar: <HiUserCircle className="text-3xl text-indigo-500" /> },
  { id: 8, user: 'Zayn Abbas', action: 'reacted with ❤️ to your story', time: '8 hours ago', type: 'reaction', read: true, avatar: <HiUserCircle className="text-3xl text-red-500" /> },
  { id: 9, user: 'Layla Mahmood', action: 'tagged you in a photo', time: '1 day ago', type: 'tag', read: false, avatar: <HiUserCircle className="text-3xl text-yellow-500" /> },
  { id: 10, user: 'Rayan Ahmed', action: 'mentioned you in a post', time: '2 days ago', type: 'mention', read: true, avatar: <HiUserCircle className="text-3xl text-cyan-500" /> },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => !n.read);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('All notifications marked as read');
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    toast.success('Notification marked as read');
  };

  const getActionIcon = (type) => {
    switch(type) {
      case 'like': return <HiHeart className="text-pink-500" />;
      case 'comment': return <HiChat className="text-blue-500" />;
      case 'follow': return <HiUserAdd className="text-green-500" />;
      case 'mention': return <HiAtSymbol className="text-orange-500" />;
      case 'share': return <HiShare className="text-indigo-500" />;
      case 'reaction': return <HiStar className="text-red-500" />;
      case 'tag': return <HiPhotograph className="text-yellow-500" />;
      default: return <HiBell className="text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full px-4 md:px-6 lg:px-8 py-6"
    >

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex space-x-2">
          <button onClick={() => setActiveTab('all')} className={`px-5 py-2 rounded-full text-sm font-medium transition ${activeTab === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>All</button>
          <button onClick={() => setActiveTab('unread')} className={`px-5 py-2 rounded-full text-sm font-medium transition flex items-center ${activeTab === 'unread' ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}>Unread {unreadCount > 0 && <span className="ml-2 bg-white text-purple-600 px-2 py-0.5 rounded-full text-xs">{unreadCount}</span>}</button>
        </div>
        <button onClick={markAllAsRead} className="flex items-center justify-center space-x-2 px-5 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold hover:shadow-lg transition"><HiCheckCircle className="text-lg" /><span>Mark all as read</span></button>
      </div>

      <div className="space-y-4">
        {filteredNotifications.map((notif) => (
          <motion.div key={notif.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`bg-white dark:bg-gray-800 rounded-xl shadow-md border ${!notif.read ? 'border-l-4 border-purple-500 shadow-lg' : 'border-gray-200 dark:border-gray-700'} p-4 hover:shadow-lg transition`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">{notif.avatar}</div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div><p className="text-gray-800 dark:text-white font-medium"><span className="font-bold">{notif.user}</span> {notif.action}</p><p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notif.time}</p></div>
                  <div className="flex items-center space-x-2"><span className="text-xl">{getActionIcon(notif.type)}</span>{!notif.read && <button onClick={() => markAsRead(notif.id)} className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition">Mark read</button>}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {filteredNotifications.length === 0 && <div className="text-center py-10 text-gray-500 dark:text-gray-400">No notifications to show.</div>}
      </div>
    </motion.div>
  );
};

export default Notifications;