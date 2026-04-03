import React from "react";

const CommentItem = ({ comment }) => {
  return (
    <div className="flex items-start space-x-3 p-3 bg-white rounded-lg shadow-sm mb-3">
      <img src={comment.avatar} alt={comment.user} className="w-8 h-8 rounded-full" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-sm">{comment.user}</h4>
          <span className="text-xs text-gray-400">{comment.time}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{comment.text}</p>
        <span className="inline-block mt-2 text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
          {comment.type}
        </span>
      </div>
    </div>
  );
};

export default CommentItem;