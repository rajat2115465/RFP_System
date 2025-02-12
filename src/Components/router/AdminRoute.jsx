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
                       
                    }
                >
                </Route>
        /**
                Display Vendor List page
                */
                <Route path='/admin/vendor-list' element=
                    {
                        <AdminLayout>
                            <VendorList className="vendor-list" />
                        </AdminLayout>
                       
                    }
                >
                </Route>
        /**
                Display category list
                */
                <Route path='/admin/category-list' element=
                    {
                        <AdminLayout>
                            <CategoriesList className="vendor-list" />
                        </AdminLayout>
                        
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
                        
                    }
                >
                </Route>
        /**
                display RFP list
                */
                <Route path='/admin/rfp-list' element=
                    {
                        <AdminLayout>
                            <RFPList className="vendor-list" />

                        </AdminLayout>
                       
                    }
                >
                </Route>
        /**
                Display RFP quotes for particular RFP
                */
                <Route path='/admin/rfp-quotes' element=
                    {
                        <AdminLayout>
                            <RFPQuotes className="vendor-list" />
                        </AdminLayout>
                        
                    }
                >
                </Route>
        /**
                select category for creating RFP page
                */
                <Route path='/admin/rfp-select-category' element=
                    {
                        <AdminLayout>
                            <SelectCategory className="vendor-list" />
                        </AdminLayout>
                       
                    }
                >
                </Route>

        /**
                ADD RFP page
                */
                <Route path='/admin/rfp-create' element=
                    {
                        <AdminLayout>
                            <RFPCreate className="vendor-list" />
                        </AdminLayout>
                       
                    }
                >
                </Route>
            </Routes>
        </Router>
    )
}

export default AdminRoute