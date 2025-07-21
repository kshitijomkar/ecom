import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">MediCart</h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      
      <footer className="bg-gray-800 text-white p-4 text-center">
        <div className="container mx-auto">
          © {new Date().getFullYear()} Medical Device Store - Healthcare Solutions
        </div>
      </footer>
    </div>
  );
};

export default Layout;