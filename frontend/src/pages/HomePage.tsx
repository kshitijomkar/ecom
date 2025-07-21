import React from 'react';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-8 bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Medical Equipment Marketplace
        </h2>
        
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-8">
          <p className="text-blue-700">
            Welcome to our eCommerce platform for healthcare professionals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-700 mb-3">For Medical Professionals</h3>
            <p className="text-gray-600">
              Discover the latest medical devices and equipment with verified quality standards.
            </p>
          </div>
          
          <div className="bg-emerald-50 p-6 rounded-lg border border-emerald-200">
            <h3 className="text-xl font-semibold text-emerald-800 mb-3">Coming Soon</h3>
            <ul className="list-disc pl-5 space-y-2 text-emerald-700">
              <li>User authentication system</li>
              <li>Product catalog management</li>
              <li>Shopping cart functionality</li>
              <li>Secure checkout process</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;