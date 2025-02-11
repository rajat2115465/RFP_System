import React from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Sidebar from '../Admin/Sidebar';
import VendorList from '../Admin/VendorList';
import Navbar from '../Admin/Navbar';
import CategoriesList from '../Admin/CategoriesList';
import RFPList from '../Admin/RFPList';
import RFPQuotes from '../Admin/RFPQuotes';
import SelectCategory from '../Admin/SelectCategory';
import RFPCreate from '../Admin/RFPCreate';
import Home from '../Admin/Home';
import AddCategory from '../Admin/AddCategory';
import AdminLayout from '../Admin/AdminLayout';
// import Admin from './Components/Auth/Admin';
// import Login from './Components/Auth/Login';
// import VendorRegistration from './Components/Auth/vendorRegistration';
// import SidebarVendor from './Components/Vendor/SidebarVendor';
// import VendorRFPQuotes from './Components/Vendor/VendorRFPList';
// import RFPCreateVendor from './Components/Vendor/RFPCreateVendor';
// import Forget from './Components/Auth/ForgetPassword';
// import Reset from './Components/Auth/ResetPassword';
const AdminRoute = () => {
    return (
        <Router>
            <Routes>
        /**
                admin home page
                */
                <Route path='/admin' element=
                    {
                        <AdminLayout>
                            <Home className="vendor-list" />
                        </AdminLayout>
                        // <>
                        //   <ProtectedRoute>
                        //     <div className="container">
                        //       <Sidebar className="sidebar" />
                        //       <div className="main">
                        //         <Navbar className="navbar" userType={"Admin"} />
                        //         <Home className="vendor-list" />
                        //       </div>
                        //     </div>
                        //   </ProtectedRoute>
                        // </>
                    }
                >
                </Route>
        /**
                Display Vendor List page
                */
                <Route path='/admin/vendorList' element=
                    {
                        <AdminLayout>
                            <VendorList className="vendor-list" />
                        </AdminLayout>
                        // <>
                        //   <ProtectedRoute>
                        //     <div className="container">
                        //       <Sidebar className="sidebar" />
                        //       <div className="main">
                        //         <Navbar className="navbar" userType={"Admin"} />

                        //       </div>
                        //     </div>
                        //   </ProtectedRoute>
                        // </>
                    }
                >
                </Route>
        /**
                Display category list
                */
                <Route path='/admin/categoryList' element=
                    {
                        <AdminLayout>
                            <CategoriesList className="vendor-list" />
                        </AdminLayout>
                        // <>
                        //   <ProtectedRoute>
                        //     <div className="container">
                        //       <Sidebar className="sidebar" />
                        //       <div className="main">
                        //         <Navbar className="navbar" userType={"Admin"} />
                        //         <CategoriesList className="vendor-list" />
                        //       </div>
                        //     </div>
                        //   </ProtectedRoute>
                        // </>
                    }
                >
                </Route>
        /**
                Add category page
                */
                <Route path='/admin/addcategory' element=
                    {
                        <AdminLayout>
                            <AddCategory className="vendor-list" />

                        </AdminLayout>
                        // <>
                        //   <ProtectedRoute>
                        //     <div className="container">
                        //       <Sidebar className="sidebar" />
                        //       <div className="main">
                        //         <Navbar className="navbar" userType={"Admin"} />
                        //         <AddCategory className="vendor-list" />
                        //       </div>
                        //     </div>
                        //   </ProtectedRoute>
                        // </>
                    }
                >
                </Route>
        /**
                display RFP list
                */
                <Route path='/admin/RFPList' element=
                    {
                        <AdminLayout>
                            <RFPList className="vendor-list" />

                        </AdminLayout>
                        // <>
                        //   <ProtectedRoute>
                        //     <div className="container">
                        //       <Sidebar className="sidebar" />
                        //       <div className="main">
                        //         <Navbar className="navbar" userType={"Admin"} />
                        //         <RFPList className="vendor-list" />
                        //       </div>
                        //     </div>
                        //   </ProtectedRoute>
                        // </>
                    }
                >
                </Route>
        /**
                Display RFP quotes for particular RFP
                */
                <Route path='/admin/RFPQuotes' element=
                    {
                        <AdminLayout>
                            <RFPQuotes className="vendor-list" />
                        </AdminLayout>
                        // <>
                        //   <ProtectedRoute>
                        //     <div className="container">
                        //       <Sidebar className="sidebar" />
                        //       <div className="main">
                        //         <Navbar className="navbar" userType={"Admin"} />
                        //         <RFPQuotes className="vendor-list" />
                        //       </div>
                        //     </div>
                        //   </ProtectedRoute>
                        // </>
                    }
                >
                </Route>
        /**
                select category for creating RFP page
                */
                <Route path='/admin/RFPselectcategory' element=
                    {
                        <AdminLayout>
                            <SelectCategory className="vendor-list" />
                        </AdminLayout>
                        // <>
                        //   <ProtectedRoute>
                        //     <div className="container">
                        //       <Sidebar className="sidebar" />
                        //       <div className="main">
                        //         <Navbar className="navbar" userType={"Admin"} />
                        //         <SelectCategory className="vendor-list" />
                        //       </div>
                        //     </div>
                        //   </ProtectedRoute>
                        // </>
                    }
                >
                </Route>

        /**
                ADD RFP page
                */
                <Route path='/admin/RFPCreate' element=
                    {
                        <AdminLayout>
                            <RFPCreate className="vendor-list" />
                        </AdminLayout>
                        // <>
                        //   <ProtectedRoute>
                        //     <div className="container">
                        //       <Sidebar className="sidebar" />
                        //       <div className="main">
                        //         <Navbar className="navbar" userType={"Admin"} />
                        //         <RFPCreate className="vendor-list" />
                        //       </div>
                        //     </div>
                        //   </ProtectedRoute>
                        // </>
                    }
                >
                </Route>
            </Routes>
        </Router>
    )
}

export default AdminRoute