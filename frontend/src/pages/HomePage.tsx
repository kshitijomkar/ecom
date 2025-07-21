import React from 'react';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Medical Equipment Marketplace
        </h2>
        <p className="text-lg text-gray-600 mb-4">
          Welcome to our eCommerce platform for healthcare professionals
        </p>
        <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
          <h3 className="text-xl font-medium text-blue-800 mb-2">Next Steps:</h3>
          <ul className="list-disc pl-5 space-y-1 text-blue-700">
            <li>User authentication system</li>
            <li>Product catalog management</li>
            <li>Shopping cart functionality</li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;