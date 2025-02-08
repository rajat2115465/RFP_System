import React from 'react'
import { useState,useEffect } from 'react';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Admin = () => {
const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        cpassword: "",
        phone: "",
      });
    const navigate=useNavigate();
  
      const [errors, setErrors] = useState({});
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      /**
       * 
       * @returns admin form validation
       * First name is required
       * Last Name is Required
       * Password is Required must be 8 digit contain(letter,number ,symbol)
       * Confirm Password is required
       * Email is Required
       * Mobile is Required
       */
      const validate = () => {
        let newErrors = {};
        if (!formData.fname.trim()) newErrors.fname = "First name is required";
        if (!formData.lname.trim()) newErrors.lname = "Last name is required";
        if (!formData.cpassword.trim()) newErrors.cpassword = "Confirm Password is required";
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email address";
        if (!formData.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
          newErrors.password = "Enter a valid Password.(e.g., Pass@123)";
        if (formData.password !== formData.cpassword) newErrors.cpassword = "Passwords do not match";
       
        if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Phone must be 10 digits";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
          firstname: formData["fname"],
          lastname: formData["lname"],
          email: formData["email"],
          password: formData["password"],
          mobile: formData["phone"]
      };
        if (!validate()) return;
        /**
         * Admin Register API call
         * firstname,lastname,email,password,mobile is the parameter required.
         */
        fetch("https://rfpdemo.velsof.com/api/registeradmin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.response === "success") {
              alert("Registration successful!");
              navigate("/login");
            } else {
              alert(data.error);
            }
          })
          .catch(() => alert("An error occurred. Please try again."));
      };
   
  return (
   
  <div>
    <div className="container" style={{height:'90vh',lineHeight:'12px'}} >
    <div className="box-1" style={{height:'70px'}}  >
      <h1>Welcome to RFP System!</h1>
      <h3>Sign up to Continue</h3>
    </div>
    <div className="box-2">
      <form id="vendorForm" onSubmit={handleSubmit}>
      <table>
                        <tr>
                            <td><label htmlFor="Fname">First Name*</label></td>
                            </tr>
                            <tr>
                            <td>
                                <input type="text" id="Fname" name="fname" placeholder="Enter Firstname"
                                value={formData.fname}
                                onChange={handleChange} 
                                />
                                {errors.fname && <div className="error">{errors.fname}</div>}
                            </td>
                            </tr>
                            <tr>
                            <td><label htmlFor="Lname">Last Name*</label></td>
                        </tr>
                        <tr>
                            
                            <td>
                            <input
                                type="text"
                                name="lname"
                                placeholder="Enter Lastname"
                                value={formData.lname}
                                onChange={handleChange} 
                                />
                                {errors.lname && <div className="error">{errors.lname}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td ><label htmlFor="Email">Email*</label></td>
                        </tr>
                        <tr>
                            <td >
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={formData.email}
                                onChange={handleChange} 
                                />
                                {errors.email && <div className="error">{errors.email}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td ><label htmlFor="Email">Mobile*</label></td>
                        </tr>
                        <tr>
                            <td >
                            <input
                                type="number"
                                name="phone"
                                placeholder="Enter Mobile NO."
                                value={formData.phone}
                                onChange={handleChange} 
                                />
                                {errors.phone && <div className="error">{errors.phone}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="Password">Password*</label></td>
                        </tr>
                        <tr>
                        <td>
                                <input type="password" id="Password" name="password" placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleChange} 
                                />
                                {errors.password && <div className="error">{errors.password}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="CPassword">Confirm Password*</label></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" id="CPassword" name="cpassword" placeholder="Enter Confirm Password"
                                value={formData.cpassword}
                                onChange={handleChange} 
                                />
                                {errors.cpassword && <div className="error">{errors.cpassword}</div>}
                            </td>
                        </tr>
                        </table>
          <div className="btn register">
          <button type="submit" id="btn-1">Register</button>
        </div>
      </form>
    </div>
    
  </div>
  </div>
  )
}

export default Admin