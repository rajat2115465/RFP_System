import React, { useState, useEffect } from 'react'
import '../Admin/RFPCreate.css'
import { useNavigate } from 'react-router-dom'
import { alertMessage, clientSideValidation, EndPoints, storage } from '../Constants/APIendpoints';
import { postFetch } from '../../Methods/FetchMethods';
const RFPCreateVendor = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem(storage.token);
  const id = localStorage.getItem(storage.rfp_id);
  const quantity = localStorage.getItem(storage.quantity);
  const [formData, setFormData] = useState({
    vendorprice: "",
    quantity: quantity,
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
    if (!formData.vendorprice.trim() || formData.vendorprice < 0) newErrors.vendorprice =clientSideValidation.vendorPrice ;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const data = {
      item_price: parseFloat(formData['vendorprice']),
      total_cost: parseFloat(formData['vendorprice'] * quantity),
      _method: 'put'
    }
    /**
     * Apply Quotes from vendor side
     * Vendor price is mandotary field
     * Total price calculated automatically
     * Quantity read from particular RFP 
     */
    try {
      const fetch = await postFetch(`${EndPoints.rfpapply}${id}`, data)
      const res = await fetch.json();
      if (res?.response === "success") {
        alert(alertMessage.quotation);
        navigate("/rfp-quotes");
      } else {
        alert(res?.error);
      }
    } catch (error) {
      alert(alertMessage.tryAgain);
    }
   
  };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/rfp-quotes");
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
          <form id="vendorForm" onSubmit={handleSubmit} >
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
                  value={formData.vendorprice * quantity}
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
