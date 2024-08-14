import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../../routes/routePaths';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate(ROUTE_PATHS.LOGIN);
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Task Manager</h1>
        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
