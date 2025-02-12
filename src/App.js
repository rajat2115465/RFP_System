import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';

import AdminRoute from './Components/router/AdminRoute';
import VendorRoute from './Components/router/VendorRoute';
import AuthRoute from './Components/router/AuthRoute';
function App() {
 

  return(
    <>
    
    <AdminRoute/>
    <VendorRoute/>
    <AuthRoute/>
    </>
  )
}

export default App;
