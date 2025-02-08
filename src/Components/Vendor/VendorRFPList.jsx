import React from 'react'
import { useState,useEffect } from 'react';
import '../Admin/VendorList.css'
import { Link } from 'react-router-dom';
const VendorRFPQuotes = () => {
  const user_id=localStorage.getItem("user_id")
  const token=localStorage.getItem("Token")

 const [rfpList, setrfpList] = useState([]);
       const fetchrfpList = async () => {
        /**
         * RFP List for particular Vendor
         * Authorization is Required(token)
         */
         try {
           const response = await fetch(`https://rfpdemo.velsof.com/api/rfp/getrfp/${user_id}`,
            {
              method: "GET", 
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
              }
            }
           );
           const data = await response.json();
           setrfpList(Object.values(data?.rfps));
         } catch (error) {
           console.error("Error fetching vendor data:", error);
           setrfpList([]);
         }
       };
       useEffect(() => {
         fetchrfpList();
       }, []);
       const [selectedRfp, setSelectedRfp] = useState(null);

  const handleViewClick = async (rfpId,quantity) => {
    try {
      /**
       * View the Quotes if Quotes is already applied
       * Get the Detail for particular RFP_ID
       */
      const response = await fetch(`https://rfpdemo.velsof.com/api/rfp/quotes/${rfpId}`,{
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        }
      }); 
      const data = await response.json();
      setSelectedRfp({ ...data?.quote, quantity });
      console.log(selectedRfp);
    } catch (error) {
      console.error("Error fetching RFP details:", error);
    }
  };
     return (
         <div className="main-content">
           <div className="path">
             <a href="#" className="Home">Home</a>
             <span style={{ marginBottom: '6px', position: 'relative', bottom: '4px' }}>/</span>
             <a href="#" className="Vendor">RFP List</a>
           </div>
           <h2 className="vendor-list">RFP List</h2>
           <div className="Table">
            <div className="table-head">
             <h3 style={{ marginLeft: '20px' }}>RFP</h3>
             {/* <button className='add' >+ Add RFP</button> */}
            </div>
            <div className="table-container">
             <table>
       <thead>
         <tr>
           <th>RFP No.</th>
           <th>RFP Title</th>
           <th>RFP Last Date</th>
           <th>Min Amount</th>
           <th>Max Amount</th>
           <th>Status</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>
         {rfpList.length > 0 ? (
           rfpList.map((rfp, index) => (
            <tr key={rfp.id || index}>
            <td className='td-v' >{rfp?.rfp_no}</td>
            <td className='td-v' >{rfp?.item_description}</td>
            <td className='td-v' >{rfp?.last_date}</td>
            <td className='td-v' >{rfp?.minimum_price}</td>
            <td className='td-v' >{rfp?.maximum_price}</td>
            <td className='td-v' >
              <span className={`status ${rfp.status?.toLowerCase()}`}>
                {rfp.status?.toUpperCase()}
              </span>
            </td>
            <td className='td-v' >
              {rfp.status === "open" && (
               <>
                {/* <button className="approve-btn">close</button> */}
                <Link to="/RFPCreate">
                <button className="approve-btn" onClick={()=>{localStorage.setItem('rfp_id',rfp?.rfp_id);localStorage.setItem('quantity',rfp?.quantity)}}>apply</button>
                </Link>
                </>
              )}
              {rfp.status === "applied" && (
               <>
                <button className="approve-btn" onClick={() => handleViewClick(rfp?.rfp_id,rfp?.quantity)} >view</button>
                </>
              )}
            </td>
          </tr>
         ))):(
           <tr>
             <td colSpan="7" style={{ textAlign: "center" }}>No Category found</td>
           </tr>
         )}
       </tbody>
     </table>
     {selectedRfp && (
        <div className="rfp-card" style={{ display: selectedRfp ? "block" : "none" }}>
        <h3>RFP Details</h3>
        <p><strong>Name:</strong> {selectedRfp?.name}</p>
        <p><strong>RFP ID:</strong> {selectedRfp?.rfp_id}</p>
        <p><strong>Item Price:</strong> {selectedRfp?.item_price}</p>
        <p><strong>Total Cost:</strong> {selectedRfp?.total_cost}</p>
        <p><strong>Quantity:</strong> {selectedRfp?.quantity}</p>
        <button onClick={() => setSelectedRfp(null)}>Close</button>
      </div>
      )}
     </div>
           </div>
         </div>
       );
}
export default VendorRFPQuotes
