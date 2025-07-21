import React from 'react';
import { Routes, Route } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Admin cards will go here */}
      </div>
    </div>
  );
};

const AdminPage: React.FC = () => {
  return (
    <Routes>
      <Route index element={<AdminDashboard />} />
      {/* Add more admin routes later */}
    </Routes>
  );
};

export default AdminPage;