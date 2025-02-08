import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
const AddCategory = () => {
    const token=localStorage.getItem("Token");
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
        if (!formData.name.trim()) newErrors.name = "Category name is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
        };
        
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const data={
            name:formData['name']
        }
        /**
         * Add Category
         * @param{name:text}
         * return{success/error}
         */
        fetch("https://rfpdemo.velsof.com/api/categories", {
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
                alert("Category Add successfully!");
                navigate("/admin/categoryList");
            } else {
                alert(data.error);
            }
            })
            .catch(() => alert("An error occurred. Please try again."));
        };
        const handleCancel = (e) => {
        e.preventDefault(); 
        navigate("/admin/categoryList");
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
