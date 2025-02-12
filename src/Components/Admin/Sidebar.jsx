import React from 'react'
import './VendorList.css'
import { Link} from 'react-router-dom';
const Sidebar = () => {
    return (
        <div className="sidebar">
          <h2>Velocity</h2>
          <ul>
            <Link to="/admin"><li>Dashboard</li></Link>
            <Link to="/admin/vendor-list"><li>Vendors</li></Link>
            <Link to="/admin/rfp-list"><li>RFP Lists</li></Link>
            <Link to="/admin/rfp-quotes"><li>RFP Quotes</li></Link>
            <Link to="/admin/category-list"><li>Categories</li></Link>
          </ul>
        </div>
      );
}

export default Sidebar
