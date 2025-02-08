import React from 'react'
import { useState,useEffect } from 'react';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Login = () => {
const navigate=useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
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
        if (!formData.password.trim()) {
          newErrors.password = "*Invalid Password";
          isValid = false;
        }
    
        if (!isValid) {
          setError(newErrors);
          return;
        }
    
        setError({ email: "", password: "" });
        /**
         * Login API
         * Email and Password is Mandatory Field.
         */
        fetch("https://rfpdemo.velsof.com/api/login", {
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
              alert("Login successful!");
              if (data.type === "admin") {
                navigate("/admin");
              } else {
                navigate("/");
              }
              localStorage.setItem("userName",data['name'])
              localStorage.setItem("Token", data["token"]);
              localStorage.setItem("user_id", data["user_id"]);

            } else {
              alert("Incorrect Email/Password!");
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
        <label>Password*</label>
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange} 
        />
        <br />
        {error.password && <div className="error">{error.password}</div>}
        <br />
        <div className="btn">
          <button type="submit" id="btn-1">Log in</button>
        </div>
        <br />
        <div className="b">
        <Link to="/vendorRegistration" className="vendor" >Register as Vendor</Link>
          <br />
        <Link to="/adminRegistration" className="vendor" >Register as Admin</Link>
<br/>
         <a href="#" className="Forget">Forget your password</a>
        </div>
      </form>
    </div>
    
  </div>
  </div>
  )
}

export default Login