import { ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Login from '@/pages/login';

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Login />;
  }

  return <>{children}</>;
}