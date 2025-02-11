import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Navbar from '../Admin/Navbar';
import Home from '../Admin/Home';
import ProtectedRoute from '../Auth/ProtectedRoute';
import SidebarVendor from '../Vendor/SidebarVendor';
import VendorRFPQuotes from '../Vendor/VendorRFPList';
import RFPCreateVendor from '../Vendor/RFPCreateVendor';
import VendorLayout from '../Vendor/VendorLayout';

const VendorRoute = () => {
  return (
    <Router>
      <Routes>
    <Route
     path='/'
     element={
        <VendorLayout>
          <Home className="vendor-list" />
        </VendorLayout>
      }
        //   {
        //     <>
        //       <ProtectedRoute>
        //         <div className="container">
        //           <SidebarVendor className="sidebar" />
        //           <div className="main">
        //             <Navbar className="navbar" userType={userName} />
        //             <Home className="vendor-list" />
        //           </div>
        //         </div>
        //       </ProtectedRoute>
        //     </>
        //   }
        >
        </Route>
        <Route
         path='/RFPQuotes' 
        element={
             <VendorLayout>
             <VendorRFPQuotes className="vendor-list" />
           </VendorLayout>
        }
        //   {
        //     <>
        //       <ProtectedRoute>
        //         <div className="container">
        //           <SidebarVendor className="sidebar" />
        //           <div className="main">
        //             <Navbar className="navbar" userType={userName} />
        //             <VendorRFPQuotes className="vendor-list" />
        //           </div>
        //         </div>
        //       </ProtectedRoute>
        //     </>
        //   }
        >
        </Route>
        <Route path='/RFPCreate' 
        element={
            <VendorLayout>
            <RFPCreateVendor className="vendor-list" />
          </VendorLayout>
       }
        // element=
        //   {
        //     <>
        //       <ProtectedRoute>
        //         <div className="container">
        //           <SidebarVendor className="sidebar" />
        //           <div className="main">
        //             <Navbar className="navbar" userType={userName} />
        //             <RFPCreateVendor className="vendor-list" />
        //           </div>
        //         </div>
        //       </ProtectedRoute>
        //     </>
        //   }
        >
        </Route>
        </Routes>
        </Router>
  )
}

export default VendorRoute