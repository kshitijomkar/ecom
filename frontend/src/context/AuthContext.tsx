import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  token?: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const { data } = await axios.get<AuthResponse>('/api/auth/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error checking auth status', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<AuthResponse>('/api/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const { data } = await axios.post<AuthResponse>('/api/auth/register', {
        name,
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      navigate('/');
    } catch (error) {
      console.error('Registration failed', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
