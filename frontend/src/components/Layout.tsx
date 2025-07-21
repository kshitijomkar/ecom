import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">MediCart</Link>
          
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/" className="hover:underline">Home</Link>
              </li>
              
              {isAuthenticated ? (
                <>
                  <li>
                    <Link to="/profile" className="hover:underline">Profile</Link>
                  </li>
                  {user?.role === 'admin' && (
                    <li>
                      <Link to="/admin" className="hover:underline">Admin</Link>
                    </li>
                  )}
                  <li>
                    <button onClick={handleLogout} className="hover:underline">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="hover:underline">Login</Link>
                  </li>
                  <li>
                    <Link to="/register" className="hover:underline">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
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