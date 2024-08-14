import React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTE_PATHS } from './routePaths';

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('accessToken');
};

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to={ROUTE_PATHS.LOGIN} />;
};

export default PrivateRoute;
