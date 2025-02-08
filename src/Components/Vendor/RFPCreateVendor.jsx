import React, { useState,useEffect } from 'react'
import '../Admin/RFPCreate.css'
const RFPCreateVendor = () => {
    const token=localStorage.getItem("Token");
    const id=localStorage.getItem("rfp_id");
    const quantity=localStorage.getItem("quantity");
    const [formData, setFormData] = useState({
        vendorprice: "",
        quantity:quantity,
        // cost:"",
    });
    
    const [errors, setErrors] = useState({});
        const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        };
       /**
        * Validate mandatory field.
        * @returns 
        */
        const validate = () => {
            let newErrors = {};
            if (!formData.vendorprice.trim()) newErrors.vendorprice = "Vendor Price is required";
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
          };
    
const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const data={
      item_price:parseFloat(formData['vendorprice']),
      total_cost:parseFloat(formData['vendorprice']*quantity),
      _method:'put'
    }
    /**
     * Apply Quotes from vendor side
     * Vendor price is mandotary field
     * Total price calculated automatically
     * Quantity read from particular RFP 
     */
    fetch(`https://rfpdemo.velsof.com/api/rfp/apply/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
        if (data.response === "success") {
            alert("Create successful!");
        } else {
            alert(data.error);
        }
        })
        .catch(() => alert("An error occurred. Please try again."));
    };
    const handleCancel = (e) => {
    e.preventDefault(); 
    alert("Form reset or redirect logic here");
    };

   return (
    <div className="main-content">
    <div className="path">
      <a href="#" className="Home">Home</a>
      <span style={{ marginBottom: '6px', position: 'relative', bottom: '4px' }}>/</span>
      <a href="#" className="Vendor">RFP </a>
      <span style={{ marginBottom: '6px', position: 'relative', bottom: '4px' }}>/</span>
      <a href="#" className="Vendor">Quotes Create</a>
    </div>
    <h2 className="vendor-list">RFP Create</h2>
    <div className="Table box-cr ">
    <div className="box-2">
    <form id="vendorForm"  onSubmit={handleSubmit} >
    {/* <div className="item"> */}
        <div className="item-box">
        <label>Vendor Price*</label>
        <br />
        <input
          type="number"
          name="vendorprice"
          placeholder="Enter Vendor Price"
          value={formData.vendorprice}
          onChange={handleChange} 
        />{errors.vendorprice && <div className="error">{errors.vendorprice}</div>}
        </div>
        {/* <div className="item-box">
        <label>Item Description*</label>
        <br />
        <input
          type="text"
          name="description"
          placeholder="Enter Item Description"
          value={formData.description}
          onChange={handleChange} 
        />{errors.description && <div className="error">{errors.description}</div>}
        </div> */}
        
    {/* </div> */}
    <div className="item">
        <div className="item-box row2">
        <label>Quantity*</label>
        <br />
        <input
          type="number"
          name="quantity"
          placeholder="Enter Quantity"
          value={formData.quantity}
          // onChange={handleChange} 
        />
        </div>
        <div className="item-box row2">
        <label>Total Cost*</label>
        <br />
        <input
          type="number"
          name="cost"
          placeholder="Enter Total Cost"
          value={formData.vendorprice*quantity}
          // onChange={handleChange} 
        />
        </div>
    </div>
    
    <div className="btn btn-box rfp-cr ">
      <button id='btn-submit' type='submit' >Submit</button>
      <button id='btn-2' type="button" onClick={handleCancel}>Cancel</button>
    </div>
    </form>
    </div>
    </div>
    </div>
  )
}

export default RFPCreateVendor
