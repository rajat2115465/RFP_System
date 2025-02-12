import React from 'react'
import { useState, useEffect } from 'react';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { clientSideValidation, EndPoints, Regex } from '../Constants/APIendpoints';
import { postFetch } from '../../Methods/FetchMethods';
const Forget = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
  });
  const [error, setError] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;
    let newErrors = { email: "", password: "" };

    if (!Regex.email.test(formData.email)) {
      newErrors.email = clientSideValidation.email;
      isValid = false;
    }
    if (!isValid) {
      setError(newErrors);
      return;
    }
    setError({ email: "", password: "" });
    try {
      const fetch = await postFetch(EndPoints.forgetPassword, formData)
      const res = await fetch.json();
      if (res?.response === "success") {
        alert("OTP Send successful!");
        navigate("/reset");
      } else {
        alert("Incorrect Email!");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
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
              <Link to="/vendor-registration" className="vendor" >Register as Vendor</Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Forget
