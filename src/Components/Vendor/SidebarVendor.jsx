import React from 'react'
import '../Admin/VendorList.css'
import { Link } from 'react-router-dom';
const SidebarVendor = () => {
    return (
        <div className="sidebar">
          <h2>Velocity</h2>
          <ul>
            <Link to="/"><li>Dashboard</li></Link>
            <Link to="/rfp-quotes"><li>RFP Quotes</li></Link>
          </ul>
        </div>
      );
}
export default SidebarVendor