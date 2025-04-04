// src/Components/ProtectedRouteAdmin.js
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../../context/AdminAuthContext';

const ProtectedRouteAdmin = ({ children }) => {
  const { isAdminAuthenticated } = useAdminAuth();

  if (!isAdminAuthenticated) {
    return <Navigate to="/AdminViews/LoginAdmin" replace />;
  }

  return children;
};

export default ProtectedRouteAdmin;
