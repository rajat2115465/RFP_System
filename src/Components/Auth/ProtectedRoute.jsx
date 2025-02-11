import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (!token) {
      navigate('/login');  
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
