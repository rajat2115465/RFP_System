import React from 'react'
import { useState,useEffect } from 'react';
import './VendorList.css'
import { Link, useNavigate } from 'react-router-dom';
const RFPList = () => {
  const navigate=useNavigate();
 const [rfpList, setrfpList] = useState([]);
        /**
          * Get RFP list
          * authentication is required
          */
        const token=localStorage.getItem("Token");
         const fetchRFP = async () => {
           console.log(token);
           try {
             const response = await fetch("https://rfpdemo.velsof.com/api/rfp/all",
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
           fetchRFP();
         }, []);
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
            <Link style={{marginRight:'17px'}} to="/admin/RFPselectcategory">
            <button className='add'>+ Add RFP</button>
            </Link>
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
                 {rfp.status === "applied" && (
                  <>
                   <button className="approve-btn">close</button>
                   <Link to="/admin/RFPquotes">
                   <button className="approve-btn" onClick={()=>{localStorage.setItem("rfp_id_",rfp?.rfp_id);localStorage.setItem("quantity",rfp?.quantity)}} >quotes</button>
                   </Link>
                  </>
                 )}
               </td>
             </tr>
           )
         )) : (
           <tr>
             <td colSpan="7" style={{ textAlign: "center" }}>No RFP found</td>
           </tr>
         )}
       </tbody>
     </table>
     </div>
           </div>
         </div>
       );
}

export default RFPList
