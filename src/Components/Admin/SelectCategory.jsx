import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import RFPCreate from './RFPCreate';
import { EndPoints, storage } from '../Constants/APIendpoints';
import { getFetch } from '../../Methods/FetchMethods';
const SelectCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
  });
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});
  const fetchCategory=async() => {
     /**
     * get category list
     * @param {*} id 
     */
    try {
        const response = await getFetch(EndPoints.categoryList);
        const data = await response.json();
        if (data.categories) {
        const activeCategories = Object.values(data.categories);
        setCategories(activeCategories);
      }
      }catch (error) {
      console.error("Error fetching categories:", error)
      }
      }
      useEffect(() => {
        fetchCategory()
      }, []);
  const handleChange = (e)=>{
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const validate = () => {
    let newErrors = {};
    if (!formData.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    localStorage.setItem(storage.category_id, formData["category"]);
    navigate('/admin/rfp-create');
  };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/admin/rfp-list');
  };
  return (
    <div className="main-content">
      <div className="path">
        <a href="#" className="Home">Home</a>
        <span style={{ marginBottom: '6px', position: 'relative', bottom: '4px' }}>/</span>
        <a href="#" className="Vendor">RFP </a>
        <span style={{ marginBottom: '6px', position: 'relative', bottom: '4px' }}>/</span>
        <a href="#" className="Vendor">RFP Select Category</a>
      </div>
      <h2 className="vendor-list">RFP Select Category</h2>
      <div className="Table box-sc ">
        <div className="box-2">
          <form id="vendorForm" onSubmit={handleSubmit} >
            <label for="Categories">Categories*</label>
            <br />
            <select id='select-cat' style={{ width: '50%' }} name="category" onChange={handleChange}>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.category && <div className="error">{errors.category}</div>}
            <br />
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

export default SelectCategory
