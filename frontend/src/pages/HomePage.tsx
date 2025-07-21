import React from 'react';
import Layout from '../components/Layout';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Medical Equipment Marketplace</h2>
        <p className="text-lg">
          Welcome to our eCommerce platform for healthcare professionals
        </p>
      </div>
    </Layout>
  );
};

export default HomePage;