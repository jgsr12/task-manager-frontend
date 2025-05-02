'use client';
import { AuthContext } from '@/context/AuthContext';
import { ReactNode, useEffect, useState, useContext } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

export default function Layout({ children }: { children: ReactNode }) {
  const { logout } = useContext(AuthContext)!;
  const [theme, setTheme] = useState<'light'|'dark'>('light');
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem('token'));
  }, []);

  const handleLogout = () => {
    logout();
    setIsAuth(false);
  };

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-bg dark:bg-gray-900 font-sans transition-colors">
      <nav className="bg-card dark:bg-card-dark shadow p-4 flex justify-between items-center">
        <span className="text-2xl font-bold text-primary dark:text-secondary">
          TaskManager
        </span>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          >
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>

          {isAuth && (
            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      </nav>
      <main className="p-6 max-w-4xl mx-auto">{children}</main>
    </div>
  );
}
