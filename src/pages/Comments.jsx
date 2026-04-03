import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiChat } from 'react-icons/hi';
import toast from 'react-hot-toast';

const initialComments = [
  {
    id: 1,
    user: 'Sarah Chen',
    time: '2 minutes ago',
    text: 'This is absolutely amazing! Love the design choices you made here.',
    isMine: false,
    onMyPost: true,
  },
  {
    id: 2,
    user: 'Mike Torres',
    time: '15 minutes ago',
    text: 'Great work! Can you share the resources you used?',
    isMine: false,
    onMyPost: true,
  },
  {
    id: 3,
    user: 'You',
    time: '1 hour ago',
    text: 'Thank you everyone for the amazing support! 🥰',
    isMine: true,
    onMyPost: false,
  },
  {
    id: 4,
    user: 'Alex Johnson',
    time: '3 hours ago',
    text: 'This is really helpful, thanks for sharing!',
    isMine: false,
    onMyPost: true,
  },
  {
    id: 5,
    user: 'You',
    time: '5 hours ago',
    text: 'Glad you liked it! 😊',
    isMine: true,
    onMyPost: false,
  },
];

const Comments = () => {
  const [filter, setFilter] = useState('all'); // 'all', 'mine', 'onMyPosts'
  const [comments, setComments] = useState(initialComments);

  const filteredComments = comments.filter(comment => {
    if (filter === 'all') return true;
    if (filter === 'mine') return comment.isMine;
    if (filter === 'onMyPosts') return comment.onMyPost;
    return true;
  });

  const handleLike = (id) => {
    toast.success('Liked comment');
  };

  const handleReply = (id) => {
    toast.success('Reply feature coming soon!');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full px-4 md:px-6 lg:px-8 py-6"
    >

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter('all')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            filter === 'all'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          All Comments
        </button>
        <button
          onClick={() => setFilter('mine')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            filter === 'mine'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          My Comments
        </button>
        <button
          onClick={() => setFilter('onMyPosts')}
          className={`px-5 py-2 rounded-full text-sm font-medium transition ${
            filter === 'onMyPosts'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          Comments on My Posts
        </button>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition"
          >
            <div className="flex items-start space-x-3">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold">
                  {comment.user.charAt(0)}
                </div>
              </div>

              {/* Comment content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">{comment.user}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{comment.time}</p>
                  </div>
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.text}</p>
                <div className="mt-3 flex space-x-4 text-sm">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition"
                  >
                    Like
                  </button>
                  <button
                    onClick={() => handleReply(comment.id)}
                    className="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {filteredComments.length === 0 && (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            No comments to show.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Comments;