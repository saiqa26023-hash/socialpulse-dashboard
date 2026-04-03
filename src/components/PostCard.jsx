import React, { useState } from "react";
import { motion } from "framer-motion";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="bg-white rounded-xl shadow-md p-5 mb-4 border border-gray-100"
    >
      <p className="text-gray-800 text-lg">{post.content}</p>
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <div className="flex space-x-4">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center space-x-1 transition ${
              liked ? "text-red-500" : "hover:text-red-500"
            }`}
          >
            <span>❤️</span>
            <span>{post.likes + (liked ? 1 : 0)}</span>
          </button>
          <button className="flex items-center space-x-1 hover:text-blue-500">
            <span>💬</span>
            <span>{post.comments}</span>
          </button>
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className={`transition ${saved ? "text-yellow-500" : "hover:text-yellow-500"}`}
        >
          {saved ? "🔖" : "📌"}
        </button>
      </div>
      <p className="text-xs text-gray-400 mt-2">{post.time}</p>
    </motion.div>
  );
};

export default PostCard;