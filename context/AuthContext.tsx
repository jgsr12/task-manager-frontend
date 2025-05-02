'use client';
import { createContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/api';
import { UserDTO } from '../types/dto';

interface AuthContextType {
  user: UserDTO | null;
  login: (u: string, p: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType|undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDTO|null>(null);
  const router = useRouter();

  const login = async(username: string, password: string) => {
    const res = await api.post('/auth/signin', { username, password });
    localStorage.setItem('token', res.data.token);
    router.push('/tasks');
  };
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
