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
        <Route path='/vendor-registration' element={<VendorRegistration />}></Route>
        <Route path='/admin-registration' element={<Admin />}></Route>
        <Route path='/forget' element={<Forget />}></Route>
        <Route path='/reset' element={<Reset />}></Route>
        </Routes>
        </Router>
  )
}

export default AuthRoute