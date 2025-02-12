import React from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import ProtectedRoute from '../Auth/ProtectedRoute';
/**
 * Common Layout for all the pages of admin
 * @param {*} param0 
 * @returns 
 */
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