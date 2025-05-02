import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import { ReactNode } from 'react';
import Layout from '@/components/Layout';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
