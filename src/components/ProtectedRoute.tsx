// components/ProtectedRoute.tsx
import { Navigate, Outlet } from '@umijs/max';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const isAuthenticated = (): boolean => {
  const user = localStorage.getItem('token');
  return !user; // Returns true if token exists in localStorage, false otherwise
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {
    if (isAuthenticated()) {
        return <Outlet />;
      } else{
        return <Navigate to="/login" />;
      }
};

export default ProtectedRoute;
