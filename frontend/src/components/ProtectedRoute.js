import { useContext, } from 'react';
import {  Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useContext(AuthContext);

  

  return (
    isLoggedIn ? element : null
  );
};

export default ProtectedRoute;
