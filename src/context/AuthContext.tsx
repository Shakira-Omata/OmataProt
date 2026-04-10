import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of our user object
export interface User {
  id: string;
  name?: string;
  emailOrPhone?: string;
  avatarUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, password?: string) => Promise<void>;
  signup: (name: string, emailOrPhone: string, password?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Simulated login with email/phone
  const login = async (emailOrPhone: string) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create a mock user
    setUser({
      id: Math.random().toString(36).substring(7),
      name: 'Salama User',
      emailOrPhone,
    });
    setIsLoading(false);
  };

  // Simulated signup with email/phone
  const signup = async (name: string, emailOrPhone: string) => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create a mock user
    setUser({
      id: Math.random().toString(36).substring(7),
      name,
      emailOrPhone,
    });
    setIsLoading(false);
  };

  // Simulated Google login
  const loginWithGoogle = async () => {
    setIsLoading(true);
    // Simulate OAuth popup delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    setUser({
      id: 'google-user-' + Math.random().toString(36).substring(7),
      name: 'Google User',
      emailOrPhone: 'user.' + Math.random().toString(36).substring(7) + '@gmail.com',
      avatarUrl: 'https://ui-avatars.com/api/?name=Google+User&background=random',
    });
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, loginWithGoogle, logout, isLoading }}>
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
