import React from 'react'
import { useState ,useEffect } from 'react';
import './VendorList.css'
const VendorList = () => {
  const [vendors, setVendors] = useState([]);
  const token=localStorage.getItem("Token");
  /**
   * Get Vendor List
   * Authentication Is required
   */
  const fetchVendors = async () => {
    console.log(token);

    try {
      const response = await fetch("https://rfpdemo.velsof.com/api/vendorlist",
        {
          method: "GET", 
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          }
        }
      );
      const data = await response.json();
      setVendors(Object.values(data.vendors));
    } catch (error) {
      console.error("Error fetching vendor data:", error);
      setVendors([]);
    }
  };
  useEffect(() => {
    fetchVendors();
  }, []);
  /**
   * Vendor Approval API
   * user_id is required.
   * parameters:{ user_id:id,status: "approved",_method:"put" }
   * @param {*} id 
   */
  const handleApprove=async(id)=>{
    try {
      const response = await fetch("https://rfpdemo.velsof.com/api/approveVendor",
        {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` 
          },
          body:JSON.stringify({ user_id:id,status: "approved",_method:"put" })
        }
      );
      const data = await response.json();
      if(data.response==="success"){
      alert("Vendor approved successfully!");
      fetchVendors();
      }
      else{
        alert("Try Again!");
      }
       
    } catch (error) {
      console.error("Error fetching vendor data:", error);
    }
  }
  console.log(vendors);
    return (
        <div className="main-content">
          <div className="path">
            <a href="#" className="Home">Home</a>
            <span style={{ marginBottom: '6px', position: 'relative', bottom: '4px' }}>/</span>
            <a href="#" className="Vendor">Vendor</a>
          </div>
          <h2 className="vendor-list">Vendors List</h2>
          <div className="Table">
            <h3 style={{ marginLeft: '20px' }}>Vendors</h3>
            <div className="table-container">
            <table>
      <thead>
        <tr>
          <th>S. No.</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th style={{width:"240px"}} >Email</th>
          <th>Contact No</th>
          <th>Vendor Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {vendors.length > 0 ? (
          vendors.map((vendor, index) => (
            <tr key={vendor.id || index}>
              <td className='td-v'>{index + 1}</td>
              <td className='td-v'>{vendor.name}</td>
              <td className='td-v'>{vendor.name}</td>
              <td className='td-v' style={{width:"6px"}}>{vendor.email}</td>
              <td className='td-v'>{vendor.mobile}</td>
              <td className='td-v'>
                <span className={`status ${vendor.status?.toLowerCase()}`}>
                  {vendor.status?.toUpperCase()}
                </span>
              </td  >
              <td className='td-v' >
                {vendor.status === "Approved" && (
                  <button className="approve-btn">View</button>
                )}
                {vendor.status === "Pending" && (
                  <button className="approve-btn" onClick={() => handleApprove(vendor.user_id)} >Approve</button>
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" style={{ textAlign: "center" }}>No vendors found</td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
          </div>
        </div>
      );
}

export default VendorList
