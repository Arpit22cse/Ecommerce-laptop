import React from 'react';
import { motion } from 'framer-motion';
import { LogOut } from 'lucide-react';

interface ProfileProps {
  user: {id:string,
     name:string, 
     email:string
    },
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center space-y-6"
      >
        <h2 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h2>
        <p className="text-gray-600">You are successfully logged in.</p>
        
        <div className="text-left bg-gray-50 p-6 rounded-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-700">Name: <span className="text-gray-900 font-normal">{user.name}</span></p>
          <p className="text-sm font-medium text-gray-700">Email: <span className="text-gray-900 font-normal">{user.email}</span></p>
        </div>

        <motion.button
          onClick={onLogout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors duration-200"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Log Out
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Profile;