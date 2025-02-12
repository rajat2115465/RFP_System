import React from 'react'
import { useState, useEffect } from 'react';
import "./Login.css"
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { clientSideValidation, EndPoints, Regex } from '../Constants/APIendpoints';
import { postFetch } from '../../Methods/FetchMethods';
const Admin = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
  });
  const navigate = useNavigate();

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
    if (!formData.fname.trim()) newErrors.fname = clientSideValidation?.firstName;
    if (!formData.lname.trim()) newErrors.lname = clientSideValidation?.lastName;
    if (!formData.cpassword.trim()) newErrors.cpassword = clientSideValidation?.cpassword;
    if (!formData.email.match(Regex.email)) newErrors.email = clientSideValidation?.email
    if (!formData.password.match(Regex.password)) newErrors.password = clientSideValidation.password;
    if (formData.password !== formData.cpassword) newErrors.cpassword = clientSideValidation.passwordMatch;
    if (!formData.phone.match(Regex.mobile)) newErrors.phone = clientSideValidation.mobile;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async(e) => {
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
    try {
      const fetch = await postFetch(EndPoints.registerAdmin, data)
      const res = await fetch.json();
      if (res?.response === "success") {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(res?.error);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }

  };

return (

  <div>
    <div className="container" style={{ height: '90vh', lineHeight: '12px' }} >
      <div className="box-1" style={{ height: '70px' }}  >
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