import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import './App.css';
import Login from './Components/Auth/Login';
import VendorRegistration from './Components/Auth/vendorRegistration';
import Sidebar from './Components/Admin/Sidebar';
import VendorList from './Components/Admin/VendorList';
import Navbar from './Components/Admin/Navbar';
import CategoriesList from './Components/Admin/CategoriesList';
import RFPList from './Components/Admin/RFPList';
import RFPQuotes from './Components/Admin/RFPQuotes';
import SelectCategory from './Components/Admin/SelectCategory';
import RFPCreate from './Components/Admin/RFPCreate';
import Home from './Components/Admin/Home';
import SidebarVendor from './Components/Vendor/SidebarVendor';
import VendorRFPQuotes from './Components/Vendor/VendorRFPList';
import RFPCreateVendor from './Components/Vendor/RFPCreateVendor';
import AddCategory from './Components/Admin/AddCategory';
import Admin from './Components/Auth/Admin';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import Forget from './Components/Auth/ForgetPassword';
import Reset from './Components/Auth/ResetPassword';
import AdminRoute from './Components/router/AdminRoute';
import VendorRoute from './Components/router/VendorRoute';
import AuthRoute from './Components/router/AuthRoute';
function App() {
 
  
  // const userName = localStorage.getItem("userName");
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path='/admin' element=
  //         {
  //           <>
  //             <ProtectedRoute>
  //               <div className="container">
  //                 <Sidebar className="sidebar" />
  //                 <div className="main">
  //                   <Navbar className="navbar" userType={"Admin"} />
  //                   <Home className="vendor-list" />
  //                 </div>
  //               </div>
  //             </ProtectedRoute>
  //           </>
  //         }
  //       >
  //       </Route>
  //       <Route path='/' element=
  //         {
  //           <>
  //             <ProtectedRoute>
  //               <div className="container">
  //                 <SidebarVendor className="sidebar" />
  //                 <div className="main">
  //                   <Navbar className="navbar" userType={userName} />
  //                   <Home className="vendor-list" />
  //                 </div>
  //               </div>
  //             </ProtectedRoute>
  //           </>
  //         }
  //       >
  //       </Route>
  //       <Route path='/RFPQuotes' element=
  //         {
  //           <>
  //             <ProtectedRoute>
  //               <div className="container">
  //                 <SidebarVendor className="sidebar" />
  //                 <div className="main">
  //                   <Navbar className="navbar" userType={userName} />
  //                   <VendorRFPQuotes className="vendor-list" />
  //                 </div>
  //               </div>
  //             </ProtectedRoute>
  //           </>
  //         }
  //       >
  //       </Route>
  //       <Route path='/RFPCreate' element=
  //         {
  //           <>
  //             <ProtectedRoute>
  //               <div className="container">
  //                 <SidebarVendor className="sidebar" />
  //                 <div className="main">
  //                   <Navbar className="navbar" userType={userName} />
  //                   <RFPCreateVendor className="vendor-list" />
  //                 </div>
  //               </div>
  //             </ProtectedRoute>
  //           </>
  //         }
  //       >
  //       </Route>
  //       <Route path='/login' element={<Login />}></Route>
  //       <Route path='/vendorRegistration' element={<VendorRegistration />}></Route>
  //       <Route path='/adminRegistration' element={<Admin />}></Route>
  //       <Route path='/forget' element={<Forget />}></Route>
  //       <Route path='/reset' element={<Reset />}></Route>


  //       <Route path='/admin/vendorList' element=
  //         {
  //           <>
  //             <ProtectedRoute>
  //               <div className="container">
  //                 <Sidebar className="sidebar" />
  //                 <div className="main">
  //                   <Navbar className="navbar" userType={"Admin"} />
  //                   <VendorList className="vendor-list" />
  //                 </div>
  //               </div>
  //             </ProtectedRoute>
  //           </>
  //         }
  //       >
  //       </Route>
  //       <Route path='/admin/categoryList' element=
  //         {
  //           <>
  //             <ProtectedRoute>
  //               <div className="container">
  //                 <Sidebar className="sidebar" />
  //                 <div className="main">
  //                   <Navbar className="navbar" userType={"Admin"} />
  //                   <CategoriesList className="vendor-list" />
  //                 </div>
  //               </div>
  //             </ProtectedRoute>
  //           </>
  //         }
  //       >
  //       </Route>
  //       <Route path='/admin/addcategory' element=
  //         {
  //           <>
  //             <ProtectedRoute>
  //               <div className="container">
  //                 <Sidebar className="sidebar" />
  //                 <div className="main">
  //                   <Navbar className="navbar" userType={"Admin"} />
  //                   <AddCategory className="vendor-list" />
  //                 </div>
  //               </div>
  //             </ProtectedRoute>
  //           </>
  //         }
  //       >
  //       </Route>
  //       <Route path='/admin/RFPList' element=
  //         {
  //           <>
  //             <ProtectedRoute>
  //               <div className="container">
  //                 <Sidebar className="sidebar" />
  //                 <div className="main">
  //                   <Navbar className="navbar" userType={"Admin"} />
  //                   <RFPList className="vendor-list" />
  //                 </div>
  //               </div>
  //             </ProtectedRoute>
  //           </>
  //         }
  //       >
  //       </Route>
  //       <Route path='/admin/RFPQuotes' element=
  //         {
  //           <>
  //             <ProtectedRoute>
  //               <div className="container">
  //                 <Sidebar className="sidebar" />
  //                 <div className="main">
  //                   <Navbar className="navbar" userType={"Admin"} />
  //                   <RFPQuotes className="vendor-list" />
  //                 </div>
  //               </div>
  //             </ProtectedRoute>
  //           </>
  //         }
  //       >
  //       </Route>
  //       <Route path='/admin/RFPselectcategory' element=
  //         {
  //           <>
  //             <ProtectedRoute>
  //               <div className="container">
  //                 <Sidebar className="sidebar" />
  //                 <div className="main">
  //                   <Navbar className="navbar" userType={"Admin"} />
  //                   <SelectCategory className="vendor-list" />
  //                 </div>
  //               </div>
  //             </ProtectedRoute>
  //           </>
  //         }
  //       >
  //       </Route>
  //       <Route path='/admin/RFPCreate' element=
  //         {
  //           <>
  //             <ProtectedRoute>
  //               <div className="container">
  //                 <Sidebar className="sidebar" />
  //                 <div className="main">
  //                   <Navbar className="navbar" userType={"Admin"} />
  //                   <RFPCreate className="vendor-list" />
  //                 </div>
  //               </div>
  //             </ProtectedRoute>
  //           </>
  //         }
  //       >
  //       </Route>
  //     </Routes>
  //   </Router>
  // )
  return(
    <>
    <AdminRoute/>
    <VendorRoute/>
    <AuthRoute/>
    </>
  )
}

export default App;
