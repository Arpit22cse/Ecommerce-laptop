import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change?: number;
  changeType?: 'increase' | 'decrease';
  index?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  changeType = 'increase',
  index = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <motion.p 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
            className="text-3xl font-bold text-gray-900"
          >
            {typeof value === 'number' ? value.toLocaleString() : value}
          </motion.p>
          {change !== undefined && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              className={`flex items-center mt-2 text-sm ${
                changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}
            >
              <span className={`mr-1 ${changeType === 'increase' ? '↗' : '↘'}`}>
                {changeType === 'increase' ? '↗' : '↘'}
              </span>
              {Math.abs(change)}% from last month
            </motion.div>
          )}
        </div>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
          className="bg-blue-100 p-3 rounded-full"
        >
          <Icon className="h-8 w-8 text-blue-600" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatCard;