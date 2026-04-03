import React from "react";
import { motion } from "framer-motion";

const StatCard = ({ title, value, icon, trend }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
          {trend && <p className="text-xs text-green-600 mt-1">{trend}</p>}
        </div>
        <div className="text-3xl text-purple-600">{icon}</div>
      </div>
    </motion.div>
  );
};

export default StatCard;