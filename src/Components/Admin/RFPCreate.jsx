import React, { useState,useEffect } from 'react'
import './RFPCreate.css'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
const RFPCreate = () => {
  const token=localStorage.getItem("Token");
    const category=localStorage.getItem("category_id");
    const user_id=localStorage.getItem("user_id");
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description:"",
        quantity:"",
        minprice:"",
        maxprice:"",
        date:"",
        vendor:"",
        selectedoption:"",
        rfp_no:""
    });
    const filterVendorsByCategory=(vendors, categoryId)=> {
      return vendors.filter(vendor => {
        console.log(vendor);
          const categories = vendor.categories.split(',').map(id => parseInt(id));  
          console.log(categories);
          return categories.includes(categoryId);  
      });
  }
     const [Vendors, setVendor] = useState([]);
     /**
      * Fetch VendorList
      */
     const fetchVendors = async () => {
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
        setVendor(Object.values(data.vendors));
        const filteredVendors = await filterVendorsByCategory(data.vendors,parseInt(category));
        setVendor(filteredVendors);
        console.log("This"+Vendors);
      } catch (error) {
        console.error("Error fetching vendor data:", error);
        setVendor([]);
      }}
    useEffect(() => {
      fetchVendors();
    }, []);
    const [errors, setErrors] = useState({});
        const handleChange = (e) => {
         
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        };
       /**
        * validate form Value of each column
        * show errors if user try to submit empty column
        * @returns 
        */
        const validate = () => {
            let newErrors = {};
            if (!formData.rfp_no.trim()) newErrors.rfp_no = "RFP No. is required";
            if (!formData.name.trim()) newErrors.name = "Item name is required";
            if (!formData.description.trim()) newErrors.description = "Item description is required";
            if (!formData.quantity.trim() || formData.quantity<0 ) newErrors.quantity = "Quantity is required";
            if (!formData.date.trim()) newErrors.date = "Last date is required";
            if (!formData.minprice.trim() || formData.minprice<0) newErrors.minprice = "Minimum price is required";
            if (!formData.maxprice.trim() || formData.maxprice<0) newErrors.maxprice = "Maximum price is required";
            if (selectedVendors.length === 0)  newErrors.selectedoption = "Vendor is required";
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
          };
    /**
     * Handles the form submission for creating an RFP .
     * It validates the form, prepares the data, and sends a POST request to the server.
     * @param {user_id:int,item_name:text,ref_no:text,quanity:number,last_date:text
     * minimum_price:number,categories:number,vendors:number,item_description:text}  
     *
     * @returns 
     */
const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    const data = {
      user_id: user_id,
      item_name: formData["name"],
      rfp_no: formData["rfp_no"],
      quantity: formData["quantity"],
      last_date: formData["date"],
      minimum_price: formData["minprice"],
      maximum_price: formData["maxprice"],
      categories: category,
      vendors: formData["vendor"],
      item_description: formData["description"]
  };
 
    fetch("https://rfpdemo.velsof.com/api/createrfp", {
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
            alert("RFP Create successful!");
            navigate("/admin/RFPList");
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
  const [selectedVendors, setSelectedVendors] = useState([]);
  
    const handleSelect = (selectedOptions) => {
      const selectedVendorIds = selectedOptions ? selectedOptions.map(option => option.value).join(",") : "";
        setSelectedVendors(selectedVendorIds);
        setFormData({ ...formData, vendor: selectedVendorIds });
    }
    const options = Vendors.map(vendor => ({
      value: vendor.user_id, 
      label: vendor.name
  }));
   return (
    <div className="main-content">
    <div className="path">
      <a href="#" className="Home">Home</a>
      <span style={{ marginBottom: '6px', position: 'relative', bottom: '4px' }}>/</span>
      <a href="#" className="Vendor">RFP </a>
      <span style={{ marginBottom: '6px', position: 'relative', bottom: '4px' }}>/</span>
      <a href="#" className="Vendor">RFP Create</a>
    </div>
    <h2 className="vendor-list">RFP Create</h2>
    <div className="Table box-cr ">
    <div className="box-2">
    <form id="vendorForm"  onSubmit={handleSubmit} >
      <div className="item">
        <div className="item-box ">
    <label>RFP No.*</label>
        <br />
        <input
          style={{width:'145%'}}
          type="text"
          name="rfp_no"
          placeholder="Enter RFP No."
          value={formData.rfp_no}
          onChange={handleChange} 
        />{errors.rfp_no && <div className="error">{errors.rfp_no}</div>}
        </div>
        </div>
    <div className="item">
        <div className="item-box">
        <label>Item Name*</label>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Enter Item Name"
          value={formData.name}
          onChange={handleChange} 
        />{errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="item-box">
        <label>Item Description*</label>
        <br />
        <input
          type="text"
          name="description"
          placeholder="Enter Item Description"
          value={formData.description}
          onChange={handleChange} 
        />{errors.description && <div className="error">{errors.description}</div>}
        </div>
        <div className="item-box">
        <label>Quantity*</label>
        <br />
        <input
          type="number"
          name="quantity"
          placeholder="Enter Quantity"
          value={formData.quantity}
          onChange={handleChange} 
        />{errors.quantity && <div className="error">{errors.quantity}</div>}
        </div>
    </div>
    <div className="item">
        <div className="item-box row2">
        <label>Last Date*</label>
        <br />
        <input
          type="date"
          name="date"
          placeholder="Enter Last Date"
          value={formData.date}
          onChange={handleChange} 
        />{errors.date && <div className="error">{errors.date}</div>}
        </div>
        <div className="item-box row2">
        <label>Minimum Price*</label>
        <br />
        <input
          type="number"
          name="minprice"
          placeholder="Enter Minimum Price"
          value={formData.minprice}
          onChange={handleChange} 
        />{errors.minprice && <div className="error">{errors.minprice}</div>}
        </div>
    </div>
    <div className="item">
        <div className="item-box row2">
        <label>Maximum Price*</label>
        <br />
        <input
          type="number"
          name="maxprice"
          placeholder="Enter Maximum Price"
          value={formData.maxprice}
          onChange={handleChange} 
        />{errors.maxprice && <div className="error">{errors.maxprice}</div>}
        </div>
        <div className="item-box row2">
        <label>Vendor*</label>
        <br />
        <div>
            <Select
                isMulti
                options={options}
                value={options.filter(option => selectedVendors.includes(option.value))}
                onChange={handleSelect}
                placeholder="Select Vendors"
                name="selectedoption"
            />
        </div>
       
    {errors.selectedoption && <div className="error">{errors.selectedoption}</div>}
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

export default RFPCreate
