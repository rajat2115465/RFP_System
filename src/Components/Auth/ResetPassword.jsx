import React from 'react'
import { useState,useEffect } from 'react';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { alertMessage, clientSideValidation, EndPoints, Regex } from '../Constants/APIendpoints';
import { postFetch } from '../../Methods/FetchMethods';
const Reset = () => {
const navigate=useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        new_password:"",
        otp:""
      });
      const [error, setError] = useState({ email: "", password: "",otp:"" });
    
      const handleChange = async(e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
      const handleSubmit =async (e) => {
        e.preventDefault();
        let isValid = true;
        let newErrors = { email: "", password: "",otp:"" };
        if (!Regex.email.test(formData.email)) {
          newErrors.email = clientSideValidation.email;
          isValid = false;
        }
        if (!Regex.password.test(formData.new_password)) {
            newErrors.password = clientSideValidation.password;
            isValid = false;
          }
        if (formData.otp.length != 4) {
          newErrors.otp = clientSideValidation.otp;
          isValid = false;
        }
        if (!isValid) {
          setError(newErrors);
          return;
        }
        setError({ email: "", password: "" });
         try {
              const fetch = await postFetch(EndPoints.reset,formData)
              const res = await fetch.json();
              if (res?.response === "success") {
                alert(alertMessage.reset);
                navigate("/login");
              } else {
                alert(res?.message);
              }
            } catch (error) {
              alert(alertMessage.tryAgain);
            }
          }
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
        <label>Password*</label>
        <br />
        <input
          type="text"
          name="new_password"
          placeholder="Enter New Password"
          value={formData.new_password}
          onChange={handleChange} 
        />
        <br />
        {error.password && <div className="error">{error.password}</div>}
        <label>OTP*</label>
        <br />
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={formData.otp}
          onChange={handleChange} 
        />
        <br />
        {error.otp && <div className="error">{error.otp}</div>}
        
        <br />
        <div className="btn">
          <button type="submit" id="btn-1">Submit</button>
        </div>
        <br />
        <div className="b">
        <Link to="/vendor-registration" className="vendor" >Register as Vendor</Link>
        </div>
      </form>
    </div>
    
  </div>
  </div>
  )
}

export default Reset