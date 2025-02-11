import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import VendorRegistration from '../Auth/vendorRegistration';
import Admin from '../Auth/Admin';
import Login from '../Auth/Login';
import Forget from '../Auth/ForgetPassword';
import Reset from '../Auth/ResetPassword';
const AuthRoute = () => {
  return (
    <Router>
      <Routes>
       <Route path='/login' element={<Login />}></Route>
        <Route path='/vendorRegistration' element={<VendorRegistration />}></Route>
        <Route path='/adminRegistration' element={<Admin />}></Route>
        <Route path='/forget' element={<Forget />}></Route>
        <Route path='/reset' element={<Reset />}></Route>
        </Routes>
        </Router>
  )
}

export default AuthRoute