import React from 'react';
import { Outlet } from 'react-router-dom'; // Add this import
import { useAuth } from '../context/AuthContext';

const Layout: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-bold">MediCart</a>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="/" className="hover:underline">Home</a>
              </li>
              
              {isAuthenticated ? (
                <>
                  <li>
                    <a href="/profile" className="hover:underline">Profile</a>
                  </li>
                  {user?.role === 'admin' && (
                    <li>
                      <a href="/admin" className="hover:underline">Admin</a>
                    </li>
                  )}
                  <li>
                    <button onClick={logout} className="hover:underline">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a href="/login" className="hover:underline">Login</a>
                  </li>
                  <li>
                    <a href="/register" className="hover:underline">Register</a>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4">
        {/* Use Outlet instead of children */}
        <Outlet />
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