import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { postFetch } from '../../Methods/FetchMethods';
import { alertMessage, clientSideValidation, EndPoints } from '../Constants/APIendpoints';
/**
 * Add category module
 * @returns 
 */
const AddCategory = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        name: "", 
    });
    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    };
    /**
     * handle form validation for add category
     * Name is Required
     * @returns 
     */
    const validate = () => {
        let newErrors = {};
        if (!formData.name.trim()) newErrors.name = clientSideValidation.category;
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
        };
        
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        const data={
            name:formData['name']
        }
        /**
         * Add Category
         * @param{name:text}
         * return{success/error}
         */try{
            const fetch=await postFetch(EndPoints?.addCategory,data)
            const res=await fetch.json();
            if (res?.response === "success") {
                alert(alertMessage.category);
                navigate("/admin/category-list");
            } else {
                alert(res?.error);
            }
          }catch(error){
          alert(alertMessage.tryAgain);
          }
        };
        const handleCancel = (e) => {
        e.preventDefault(); 
        navigate("/admin/category-list");
        };
    return ( <div className="main-content">
    <div className="path">
      <a href="#" className="Home">Home</a>
      <span style={{ marginBottom: '6px', position: 'relative', bottom: '4px' }}>/</span>
      <a href="#" className="Vendor">Category </a>
      <span style={{ marginBottom: '6px', position: 'relative', bottom: '4px' }}>/</span>
      <a href="#" className="Vendor">Add Category</a>
    </div>
    <h2 className="vendor-list">Add Category</h2>
    <div className="Table box-sc ">
    <div className="box-2">
    <form id="vendorForm"  onSubmit={handleSubmit} >
    <label for="Categories">Category Name*</label>
    <br/>
          <input
        style={{
            width:'50%'
        }}
          type="text"
          name="name"
          placeholder="Enter Category Name"
          value={formData.name}
          onChange={handleChange} 
        />
      {errors.name && <div className="error">{errors.name}</div>}
      <br/>
    <div className="btn btn-box">
      <button id='btn-submit' type='submit' >Submit</button>
      <button id='btn-2' type="button" onClick={handleCancel}>Cancel</button>
    </div>
    </form>
    </div>
    </div>
    </div>
  )
}

export default AddCategory
