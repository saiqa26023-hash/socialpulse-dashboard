import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  HiOutlineSparkles,
  HiUserGroup, 
  HiTrendingUp, 
  HiEye,
  HiHeart,
  HiChat,
  HiSearch,
  HiArrowRight,
  HiBookmark
} from 'react-icons/hi';
import toast from 'react-hot-toast';

const defaultPosts = [
  {
    id: 1,
    content: "Just launched SocialPulse! 💬 Excited to share this project with everyone. Built with React and Tailwind CSS.",
    time: "2 hours ago",
    liked: false,
    saved: false,
    stats: { heart: 124, eye: 18, chat: 32 }
  },
  {
    id: 2,
    content: "Dashboard management is all about presenting complex data in simple, beautiful ways. What tools do you use? 📊",
    time: "3 hours ago",
    liked: false,
    saved: false,
    stats: { heart: 98, eye: 12, chat: 27 }
  },
  {
    id: 3,
    content: "React component architecture makes building scalable UIs so much easier. Love the reusability! 💜",
    time: "5 hours ago",
    liked: false,
    saved: false,
    stats: { heart: 156, eye: 24, chat: 41 }
  }
];

const Home = () => {
  const user = {
    name: 'Saiqa',
    avatar: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png'
  };

  const [allPosts, setAllPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load posts from localStorage or default
  useEffect(() => {
    const saved = localStorage.getItem('socialpulse_posts');
    if (saved) {
      setAllPosts(JSON.parse(saved));
    } else {
      setAllPosts(defaultPosts);
      localStorage.setItem('socialpulse_posts', JSON.stringify(defaultPosts));
    }
  }, []);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    if (allPosts.length) {
      localStorage.setItem('socialpulse_posts', JSON.stringify(allPosts));
    }
  }, [allPosts]);

  // Listen for new posts from modal
  useEffect(() => {
    const handleNewPost = (event) => {
      const newPost = event.detail;
      setAllPosts(prev => [newPost, ...prev]);
      toast.success('New post added!');
    };
    window.addEventListener('newPost', handleNewPost);
    return () => window.removeEventListener('newPost', handleNewPost);
  }, []);

  // Filter posts based on search term
  const filteredPosts = allPosts.filter(post =>
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleLike = (postId) => {
    setAllPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, stats: { ...post.stats, heart: post.liked ? post.stats.heart - 1 : post.stats.heart + 1 } }
        : post
    ));
    const post = allPosts.find(p => p.id === postId);
    toast.success(post?.liked ? 'Unliked' : 'Liked!');
  };

  const toggleSave = (postId) => {
    setAllPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, saved: !post.saved }
        : post
    ));
    const post = allPosts.find(p => p.id === postId);
    toast.success(post?.saved ? 'Removed from bookmarks' : 'Saved to bookmarks');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full px-6 md:px-8 lg:px-10 py-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl p-8 text-white mb-10 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center space-x-4">
            <HiOutlineSparkles className="text-5xl" />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Welcome, {user.name}!</h1>
              <p className="mt-2 text-lg md:text-xl opacity-90">
                Here's what's happening with your social media today.
              </p>
            </div>
          </div>
          <Link 
            to="/analytics" 
            className="mt-6 lg:mt-0 flex items-center space-x-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full hover:bg-white/30 transition group text-lg"
          >
            <span className="font-medium">View Analytics</span>
            <HiArrowRight className="group-hover:translate-x-1 transition-transform text-xl" />
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition flex flex-col items-center justify-center p-3 h-32">
          <HiUserGroup className="text-4xl text-purple-500 mb-2" />
          <p className="text-3xl font-bold text-gray-800 dark:text-white">23K</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">FOLLOWERS</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition flex flex-col items-center justify-center p-3 h-32">
          <HiTrendingUp className="text-4xl text-green-500 mb-2" />
          <p className="text-3xl font-bold text-gray-800 dark:text-white">8.5%</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ENGAGEMENT</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition flex flex-col items-center justify-center p-3 h-32">
          <HiEye className="text-4xl text-blue-500 mb-2" />
          <p className="text-3xl font-bold text-gray-800 dark:text-white">14.9K</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">VIEWS</p>
        </div>
      </div>

      {/* Search Bar - now with live filtering */}
      <div className="relative mb-6">
        <HiSearch className="absolute left-4 top-3 text-gray-400 text-xl" />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-600 shadow-sm"
        />
      </div>

      {/* Posts Section */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <div key={post.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="flex items-start mb-4">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-14 h-14 rounded-full mr-4 border-4 border-purple-200 object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{user.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{post.time}</p>
                </div>
                <button 
                  onClick={() => toggleSave(post.id)}
                  className={`text-2xl transition ${post.saved ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500 dark:text-gray-500 dark:hover:text-yellow-500'}`}
                >
                  <HiBookmark />
                </button>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-4 leading-relaxed">
                {post.content}
              </p>
              <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
                <button 
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center space-x-2 transition ${post.liked ? 'text-pink-500' : 'hover:text-pink-500'}`}
                >
                  <HiHeart className={`text-2xl ${post.liked ? 'text-pink-500' : ''}`} />
                  <span className="text-lg font-medium">{post.stats.heart}</span>
                </button>
                <div className="flex items-center space-x-2">
                  <HiEye className="text-2xl text-blue-500" />
                  <span className="text-lg font-medium">{post.stats.eye}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <HiChat className="text-2xl text-green-500" />
                  <span className="text-lg font-medium">{post.stats.chat}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-md">
            <p className="text-gray-500 dark:text-gray-400">No posts match your search.</p>
          </div>
        )}
      </div>

      <p className="text-center text-gray-400 dark:text-gray-500 text-sm mt-8">
        Developed by <span className="font-semibold text-gray-600 dark:text-gray-300">Saiqa</span>
      </p>
    </motion.div>
  );
};

export default Home;