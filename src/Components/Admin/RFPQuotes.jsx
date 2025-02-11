import React from 'react'
import { useEffect,useState } from 'react';
const RFPQuotes = () => {
  const [rfpQuotes, setrfpQuotes] = useState([]);
  const token=localStorage.getItem("Token");
  const quanity=localStorage.getItem("quantity");
  const rfp_id=localStorage.getItem("rfp_id_");
        const fetchRFPQuotes = async () => {

          /**
           * Get Quotes for Particular RFP_Id
           * Authentication is Reuired(Token)
           */
                   console.log(token);
                   try {
                     const response = await fetch(`https://rfpdemo.velsof.com/api/rfp/quotes/${rfp_id}`,
                       {
                         method: "GET", 
                         headers: {
                           "Content-Type": "application/json",
                           "Authorization": `Bearer ${token}` 
                         }
                       }
                     );
                     const data = await response.json();
                     console.log(data);
                     setrfpQuotes(Object.values(data?.quotes));
                   } catch (error) {
                     console.error("Error fetching vendor data:", error);
                     setrfpQuotes([]);
                   }
                 };
                 useEffect(() => {
                   fetchRFPQuotes();
                 }, []);
      return (
          <div className="main-content">
            <div className="path">
              <a href="#" className="Home">Home</a>
              <span style={{ marginBottom: '6px', position: 'relative', bottom: '4px' }}>/</span>
              <a href="#" className="Vendor">RFP Quotes</a>
            </div>
            <h2 className="vendor-list">RFP Quotes</h2>
            <div className="Table">
             <div className="table-head">
              <h3 style={{ marginLeft: '20px' }}>RFP</h3>
              {/* <button className='add' >+ Add RFP</button> */}
             </div>
              <table>
        <thead>
          <tr>
          <th>Sr No.</th>
            <th>RFP No.</th>
            <th>Item Name</th>
            <th>Vendor Id</th>
            <th>Vendor Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {rfpQuotes.length > 0 ? (
            rfpQuotes.map((quotes, index) => (
              <tr key={quotes.id || index}>
                <td>{index + 1}</td>
                <td>{rfp_id}</td>
                <td>{quotes.name}</td>
                <td>{quotes.vendor_id}</td>
                <td>{quotes.item_price}</td>
                <td>
                  {quanity}
                </td>
                <td>
                  {quotes.total_cost}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>No Category found</td>
            </tr>
          )}
        </tbody>
      </table>
            </div>
          </div>
        );
 }

export default RFPQuotes
