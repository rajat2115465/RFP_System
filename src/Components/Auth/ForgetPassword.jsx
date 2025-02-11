import React from 'react'
import { useState,useEffect } from 'react';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Forget = () => {
const navigate=useNavigate();

    const [formData, setFormData] = useState({
        email: "",
      });
      const [error, setError] = useState({ email: "", password: "" });
    
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        let isValid = true;
        let newErrors = { email: "", password: "" };
        
        if (!emailRegex.test(formData.email)) {
          newErrors.email = "*Invalid Email";
          isValid = false;
        }
       
    
        if (!isValid) {
          setError(newErrors);
          return;
        }
    
        setError({ email: "", password: "" });
        
        fetch("https://rfpdemo.velsof.com/api/forgetPassword", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.response === "success") {
              console.log("Success:", data);
              alert("OTP Send successful!");
                navigate("/reset");
              
            } else {
              alert("Incorrect Email!");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Please try again.");
          });
      };
   
  return (
   <div  >
    <div className="container">
    <div className="box-1">
      <h1>Welcome to RFP System!</h1>
      <h3>Sign in to Continue</h3>
    </div>
    <div className="box-2">
      <form onSubmit={handleSubmit}>
        <label>Email*</label>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={formData.email}
          onChange={handleChange} 
        />
        <br />
        {error.email && <div className="error">{error.email}</div>}
        
        <br />
        <div className="btn">
          <button type="submit" id="btn-1">Send OTP</button>
        </div>
        <br />
        <div className="b">
        <Link to="/vendorRegistration" className="vendor" >Register as Vendor</Link>
        </div>
      </form>
    </div>
    
  </div>
  </div>
  )
}

export default Forget