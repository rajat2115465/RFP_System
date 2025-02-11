import React from 'react'
import '../Admin/VendorList.css'
import { Link } from 'react-router-dom';
const SidebarVendor = () => {
    return (
        <div className="sidebar">
          <h2>Velocity</h2>
          <ul>
            <Link to="/"><li><a href="#">Dashboard</a></li></Link>
            <Link to="/RFPQuotes"><li><a href="#">RFP Quotes</a></li></Link>
          </ul>
        </div>
      );
}
export default SidebarVendor