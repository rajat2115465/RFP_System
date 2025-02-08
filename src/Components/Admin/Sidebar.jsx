import React from 'react'
import './VendorList.css'
import { Link} from 'react-router-dom';
const Sidebar = () => {
    return (
        <div className="sidebar">
          <h2>Velocity</h2>
          <ul>
            <Link to="/admin"><li><a href="#">Dashboard</a></li></Link>
            <Link to="/admin/vendorList"><li><a href="#">Vendors</a></li></Link>
            <Link to="/admin/RFPList"><li><a href="#">RFP Lists</a></li></Link>
            <Link to="/admin/RFPQuotes"><li><a href="#">RFP Quotes</a></li></Link>
            <Link to="/admin/categoryList"><li><a href="#">Categories</a></li></Link>
          </ul>
        </div>
      );
}

export default Sidebar
