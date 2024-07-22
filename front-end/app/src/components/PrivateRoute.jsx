import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  console.log('PrivateRoute: Token:', token); // Debug log

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
