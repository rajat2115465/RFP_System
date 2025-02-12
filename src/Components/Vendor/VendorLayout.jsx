import React from 'react'
import SidebarVendor from './SidebarVendor';
import Navbar from '../Admin/Navbar';
import ProtectedRoute from '../Auth/ProtectedRoute';
const VendorLayout = ({children}) => {
const userName = localStorage.getItem("userName");
    return (
        <ProtectedRoute>
          <div className="container">
            <SidebarVendor className="sidebar" />
            <div className="main">
            <Navbar className="navbar" userType={userName} />
              {children}
            </div>
          </div>
        </ProtectedRoute>
      );
}

export default VendorLayout