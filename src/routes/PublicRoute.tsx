import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('accessToken');
};

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  return isAuthenticated() ? <Navigate to={ROUTE_PATHS.DASHBOARD} /> : children;
};

export default PublicRoute;
