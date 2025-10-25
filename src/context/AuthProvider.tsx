// src/context/AuthProvider.tsx
'use client'; // ✅ Add this at the top

import { createContext, useContext, useEffect, useState } from 'react';
import {
  getSession,
  setSession,
  clearSession,
  type Session,
  // User,
} from '@/lib/session';

interface AuthContextType {
  session: Session | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSessionState] = useState<Session | null>(null);

  useEffect(() => {
    const existing = getSession();
    if (existing) setSessionState(existing);
  }, []);

  const login = (token: string) => {
    setSession(token);
    setSessionState({ token });
  };

  const logout = () => {
    clearSession();
    setSessionState(null);
  };

  return (
    <AuthContext.Provider value={{ session, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
