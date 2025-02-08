import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
function App() {
 const userName=localStorage.getItem("userName");
  return (
    <Router>
      <Routes>
       <Route path='/admin' element=
        {
          <>
          <div className="container">
            <Sidebar className="sidebar" />
            <div className="main">
            <Navbar className="navbar" userType={"Admin"} />
            <Home className="vendor-list" />
            </div>
          </div>
          </>
        }
        >
        </Route>
        <Route path='/' element=
        {
          <>
          <div className="container">
            <SidebarVendor className="sidebar" />
            <div className="main">
            <Navbar className="navbar" userType={userName} />
            <Home className="vendor-list" />
            </div>
          </div>
          </>
        }
        >
        </Route>
        <Route path='/RFPQuotes' element=
        {
          <>
          <div className="container">
            <SidebarVendor className="sidebar" />
            <div className="main">
            <Navbar className="navbar" userType={userName}  />
            <VendorRFPQuotes className="vendor-list" />
            </div>
          </div>
          </>
        }
        >
        </Route>
        <Route path='/RFPCreate' element=
        {
          <>
          <div className="container">
            <SidebarVendor className="sidebar" />
            <div className="main">
            <Navbar className="navbar" userType={userName}   />
            <RFPCreateVendor className="vendor-list" />
            </div>
          </div>
          </>
        }
        >
        </Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='vendorRegistration' element={<VendorRegistration/>}></Route>
        <Route path='adminRegistration' element={<Admin/>}></Route>

        <Route path='/admin/vendorList' element=
        {
          <>
          <div className="container">
            <Sidebar className="sidebar" />
            <div className="main">
            <Navbar className="navbar" userType={"Admin"}  />
            <VendorList className="vendor-list" />
            </div>
          </div>
          </>
        }
        >
        </Route>
        <Route path='/admin/categoryList' element=
        {
          <>
          <div className="container">
            <Sidebar className="sidebar" />
            <div className="main">
            <Navbar className="navbar" userType={"Admin"} />
            <CategoriesList className="vendor-list" />
            </div>
          </div>
          </>
        }
        >
        </Route>
        <Route path='/admin/addcategory' element=
        {
          <>
          <div className="container">
            <Sidebar className="sidebar" />
            <div className="main">
            <Navbar className="navbar" userType={"Admin"}/>
            <AddCategory className="vendor-list" />
            </div>
          </div>
          </>
        }
        >
        </Route>
        <Route path='/admin/RFPList' element=
        {
          <>
          <div className="container">
            <Sidebar className="sidebar" />
            <div className="main">
            <Navbar className="navbar" userType={"Admin"} />
            <RFPList className="vendor-list" />
            </div>
          </div>
          </>
        }
        >
        </Route>
        <Route path='/admin/RFPQuotes' element=
        {
          <>
          <div className="container">
            <Sidebar className="sidebar" />
            <div className="main">
            <Navbar className="navbar" userType={"Admin"} />
            <RFPQuotes className="vendor-list" />
            </div>
          </div>
          </>
        }
        >
        </Route>
        <Route path='/admin/RFPselectcategory' element=
        {
          <>
          <div className="container">
            <Sidebar className="sidebar" />
            <div className="main">
            <Navbar className="navbar" userType={"Admin"} />
            <SelectCategory className="vendor-list" />
            </div>
          </div>
          </>
        }
        >
        </Route>
        <Route path='/admin/RFPCreate' element=
        {
          <>
          <div className="container">
            <Sidebar className="sidebar" />
            <div className="main">
            <Navbar className="navbar" userType={"Admin"} />
            <RFPCreate className="vendor-list" />
            </div>
          </div>
          </>
        }
        >
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
