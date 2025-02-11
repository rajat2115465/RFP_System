import React from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ProtectedRoute from '../Auth/ProtectedRoute';
const AdminLayout = ({children}) => {
    return (
        <ProtectedRoute>
          <div className="container">
            <Sidebar className="sidebar" />
            <div className="main">
              <Navbar className="navbar" userType="Admin" />
              {children}
            </div>
          </div>
        </ProtectedRoute>
      );
}

export default AdminLayout