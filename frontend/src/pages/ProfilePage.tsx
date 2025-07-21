import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Profile</h2>

      <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
        <div className="flex items-center space-x-6 mb-6">
          <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-700">
              {user?.name.charAt(0)}
            </span>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">
              {user?.name}
            </h3>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm font-medium mt-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full inline-block">
              {user?.role === 'admin' ? 'Administrator' : 'Customer'}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <h4 className="text-lg font-medium text-gray-800 mb-3">
            Account Actions
          </h4>

          <button
            onClick={logout}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition duration-300"
          >
            Logout
          </button>

          {user?.role === 'admin' && (
            <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <h5 className="font-medium text-yellow-800">Admin Privileges</h5>
              <p className="text-yellow-700 text-sm mt-1">
                You have access to the admin dashboard and can manage products,
                orders, and users.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
