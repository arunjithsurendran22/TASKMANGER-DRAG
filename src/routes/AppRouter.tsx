import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import { ROUTE_PATHS } from './routePaths';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import NotFound from '../pages/NotFound/NotFound';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path={ROUTE_PATHS.LOGIN} element={<PublicRoute><Login /></PublicRoute>} />
        <Route path={ROUTE_PATHS.DASHBOARD} element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path={ROUTE_PATHS.NOT_FOUND} element={<NotFound />} />
        <Route path="*" element={<Navigate to={ROUTE_PATHS.NOT_FOUND} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
