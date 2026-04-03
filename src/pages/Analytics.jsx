import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiChartBar,
  HiUser,
  HiHeart,
  HiShare,
  HiChat,
  HiEye,
  HiCamera,
  HiPlay,
  HiGlobe,
  HiUsers,
  HiDownload,
} from 'react-icons/hi';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import toast from 'react-hot-toast';

const Analytics = () => {
  const [activeFilter, setActiveFilter] = useState('overview'); // 'overview', 'today', 'week', 'month'

  // Platform data for top cards
  const platformCards = [
    { platform: '@saiqa.social', icon: HiCamera, borderColor: 'border-pink-200', textColor: 'text-pink-600', bgLight: 'bg-pink-50' },
    { platform: 'Saiqa Official', icon: HiPlay, borderColor: 'border-red-200', textColor: 'text-red-600', bgLight: 'bg-red-50' },
    { platform: '@saiqa_x', icon: HiGlobe, borderColor: 'border-blue-200', textColor: 'text-blue-600', bgLight: 'bg-blue-50' },
    { platform: 'Saiqa Channel', icon: HiUsers, borderColor: 'border-green-200', textColor: 'text-green-600', bgLight: 'bg-green-50' },
  ];

  // Data for each filter
  const data = {
    overview: {
      stats: [
        { value: '8,200', today: 82 },
        { value: '5,400', today: 32 },
        { value: '4,200', today: 12 },
        { value: '5,204', today: 104 },
      ],
      metrics: [
        { name: 'Likes', value: '5,462', change: '+12%', icon: HiHeart, color: 'text-pink-500' },
        { name: 'Shares', value: '1,830', change: '+8%', icon: HiShare, color: 'text-green-500' },
        { name: 'Comments', value: '2,105', change: '+3%', icon: HiChat, color: 'text-blue-500' },
        { name: 'Page Views', value: '14,920', change: '+22%', icon: HiEye, color: 'text-purple-500' },
      ],
    },
    today: {
      stats: [
        { value: '8,350', today: 92 },
        { value: '5,480', today: 41 },
        { value: '4,230', today: 18 },
        { value: '5,280', today: 112 },
      ],
      metrics: [
        { name: 'Likes', value: '5,612', change: '+15%', icon: HiHeart, color: 'text-pink-500' },
        { name: 'Shares', value: '1,890', change: '+10%', icon: HiShare, color: 'text-green-500' },
        { name: 'Comments', value: '2,150', change: '+5%', icon: HiChat, color: 'text-blue-500' },
        { name: 'Page Views', value: '15,200', change: '+25%', icon: HiEye, color: 'text-purple-500' },
      ],
    },
    week: {
      stats: [
        { value: '8,700', today: 120 },
        { value: '5,600', today: 55 },
        { value: '4,350', today: 25 },
        { value: '5,500', today: 135 },
      ],
      metrics: [
        { name: 'Likes', value: '5,900', change: '+18%', icon: HiHeart, color: 'text-pink-500' },
        { name: 'Shares', value: '2,100', change: '+12%', icon: HiShare, color: 'text-green-500' },
        { name: 'Comments', value: '2,300', change: '+7%', icon: HiChat, color: 'text-blue-500' },
        { name: 'Page Views', value: '16,500', change: '+30%', icon: HiEye, color: 'text-purple-500' },
      ],
    },
    month: {
      stats: [
        { value: '9,500', today: 210 },
        { value: '6,200', today: 95 },
        { value: '4,800', today: 48 },
        { value: '6,000', today: 180 },
      ],
      metrics: [
        { name: 'Likes', value: '6,800', change: '+25%', icon: HiHeart, color: 'text-pink-500' },
        { name: 'Shares', value: '2,500', change: '+18%', icon: HiShare, color: 'text-green-500' },
        { name: 'Comments', value: '2,800', change: '+12%', icon: HiChat, color: 'text-blue-500' },
        { name: 'Page Views', value: '19,200', change: '+40%', icon: HiEye, color: 'text-purple-500' },
      ],
    },
  };

  const currentData = data[activeFilter];
  const filterDisplayName = activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1); // "Overview", "Today", etc.

  // Chart data (static for this demo, but you could make them dynamic per filter)
  const followerGrowthData = [
    { month: 'Jan', followers: 5000 },
    { month: 'Feb', followers: 7500 },
    { month: 'Mar', followers: 10000 },
    { month: 'Apr', followers: 12000 },
    { month: 'May', followers: 15000 },
    { month: 'Jun', followers: 18000 },
    { month: 'Jul', followers: 20000 },
  ];

  const platformComparisonData = [
    { platform: 'Instagram', value: 8200 },
    { platform: 'Facebook', value: 5400 },
    { platform: 'X', value: 4200 },
    { platform: 'YouTube', value: 5204 },
  ];

  const engagementData = [
    { name: 'Red', value: 75 },
    { name: 'Blue', value: 25 },
  ];
  const COLORS = ['#FF6384', '#36A2EB'];

  const exportToCSV = () => {
    // Prepare data rows
    const rows = [];

    // Title and timestamp
    rows.push(['SocialPulse Analytics Report']);
    rows.push(['Generated:', new Date().toLocaleString()]);
    rows.push(['Period:', filterDisplayName]);
    rows.push([]); // empty row

    // Stats (Platforms)
    rows.push(['Platform Followers']);
    rows.push(['Platform', 'Followers', 'Today\'s Increase']);
    platformCards.forEach((card, idx) => {
      const stats = currentData.stats[idx];
      rows.push([card.platform, stats.value, stats.today]);
    });
    rows.push([]);

    // Engagement Metrics
    rows.push(['Engagement Metrics']);
    rows.push(['Metric', 'Value', 'Change vs Last Period']);
    currentData.metrics.forEach((metric) => {
      rows.push([metric.name, metric.value, metric.change]);
    });

    // Convert to CSV string
    const csvContent = rows.map(row => row.join(',')).join('\n');

    // Create a blob and download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `socialpulse_analytics_${activeFilter}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('CSV exported successfully!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full px-4 md:px-6 lg:px-8 py-6"
    >

      

      {/* Four stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {currentData.stats.map((card, idx) => {
          const platform = platformCards[idx];
          const Icon = platform.icon;
          return (
            <div
              key={idx}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-l-4 ${platform.borderColor} border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center`}
            >
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Icon className={`text-2xl ${platform.textColor}`} />
                <span className="font-medium text-gray-700 dark:text-gray-300">{platform.platform}</span>
              </div>
              <div className="mb-3">
                <p className="text-4xl font-bold text-gray-800 dark:text-white">{card.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">FOLLOWERS</p>
              </div>
              <p className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold ${platform.textColor} ${platform.bgLight}`}>
                {card.today} Today
              </p>
            </div>
          );
        })}
      </div>

      {/* Filter tabs and Export button */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {['Overview', 'Today', 'This Week', 'This Month'].map((tab) => {
            const filterKey = tab.toLowerCase().replace(' ', '').replace('this', '');
            return (
              <button
                key={tab}
                onClick={() => setActiveFilter(filterKey)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                  activeFilter === filterKey
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
        <button
          onClick={exportToCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full text-sm font-semibold transition"
        >
          <HiDownload className="text-lg" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Metrics cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {currentData.metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{metric.name}</h3>
                <Icon className={`text-2xl ${metric.color}`} />
              </div>
              <p className="text-3xl font-bold text-gray-800 dark:text-white">{metric.value}</p>
              <p className={`text-sm font-semibold mt-2 ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change} from last period
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Follower Growth Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">FOLLOWER GROWTH</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={followerGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="month" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Line type="monotone" dataKey="followers" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Platform Comparison Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">PLATFORM COMPARISON</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={platformComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="platform" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Engagement Distribution */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">ENGAGEMENT DISTRIBUTION</h3>
          <div className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-2">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-[#FF6384] mr-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">Red 75%</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-[#36A2EB] mr-2"></span>
                <span className="text-sm text-gray-700 dark:text-gray-300">Blue 25%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;