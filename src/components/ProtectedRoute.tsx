// components/ProtectedRoute.tsx
import { getTokenFromLocalStorage } from '@/services/request';
import { history, Navigate, Outlet } from '@umijs/max';
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const isAuthenticated = (): boolean => {
  return !!getTokenFromLocalStorage();
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = () => {

  if (isAuthenticated()) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
