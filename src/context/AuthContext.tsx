import React, { createContext, useContext, useState, useEffect } from 'react';

const ADMIN_SESSION_KEY = 'chemistry_dept_cup_admin_session';

interface AuthContextType {
  isAdmin: boolean;
  login: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  isLoginModalOpen: boolean;
  openLoginModal: (message?: string) => void;
  closeLoginModal: () => void;
  loginPromptMessage: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem(ADMIN_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [loginPromptMessage, setLoginPromptMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (isAdmin) {
        localStorage.setItem(ADMIN_SESSION_KEY, 'true');
      } else {
        localStorage.removeItem(ADMIN_SESSION_KEY);
      }
    } catch (e) {
      console.error('Failed to update admin session in localStorage:', e);
    }
  }, [isAdmin]);

  const login = (username: string, password: string) => {
    const cleanUser = username.trim().toLowerCase();
    // Username: admincup , Password: we06@departmentcup
    if (cleanUser === 'admincup' && password === 'we06@departmentcup') {
      setIsAdmin(true);
      setIsLoginModalOpen(false);
      setLoginPromptMessage(null);
      return { success: true };
    }
    return {
      success: false,
      error: 'Invalid username or password. Please check credentials and try again.',
    };
  };

  const logout = () => {
    setIsAdmin(false);
  };

  const openLoginModal = (message?: string) => {
    if (message) {
      setLoginPromptMessage(message);
    } else {
      setLoginPromptMessage(null);
    }
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setLoginPromptMessage(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        login,
        logout,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        loginPromptMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
