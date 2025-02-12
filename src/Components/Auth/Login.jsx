import React from 'react'
import { useState, useEffect } from 'react';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { alertMessage, clientSideValidation, EndPoints, Regex, storage } from '../Constants/APIendpoints';
import { baseUrl, postFetch } from '../../Methods/FetchMethods';
const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    if (!formData.password.trim()) {
      newErrors.password = clientSideValidation.password;
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
    fetch(`${baseUrl}${EndPoints.login}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.response === "success") {
          alert(alertMessage.login);
          if (data.type === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
          localStorage.setItem(storage.userName, data['name'])
          localStorage.setItem(storage.token, data["token"]);
          localStorage.setItem(storage.user_id, data["user_id"]);
        } else {
          alert(alertMessage.Incorrect);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(alertMessage.tryAgain);
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
              <Link to="/vendor-registration" className="vendor" >Register as Vendor</Link>
              <br />
              <Link to="/admin-registration" className="vendor" >Register as Admin</Link>
              <br />

              <Link to="/forget" className="Forget" >Forget your password</Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Login