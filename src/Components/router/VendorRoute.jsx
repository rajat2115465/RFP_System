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
    
        >
        </Route>
        <Route
         path='/rfp-quotes' 
        element={
             <VendorLayout>
             <VendorRFPQuotes className="vendor-list" />
           </VendorLayout>
        }
        
        >
        </Route>
        <Route path='/rfp-create' 
        element={
            <VendorLayout>
            <RFPCreateVendor className="vendor-list" />
          </VendorLayout>
       }
        
        >
        </Route>
        </Routes>
        </Router>
  )
}

export default VendorRoute