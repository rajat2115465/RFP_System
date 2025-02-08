import React from 'react'
import { useState,useEffect} from 'react'
import './vendorRegistration.css'
import { useNavigate } from 'react-router-dom';

const VendorRegistration = () => {
  const navigate=useNavigate();
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        password: "",
        cpassword: "",
        revenue: "",
        employees: "",
        gst: "",
        pan: "",
        phone: "",
        category: "",
      });
    
      const [categories, setCategories] = useState([]);
      const [errors, setErrors] = useState({});
    /**
     * Get all CAtegories for selecting category at the time of registration
     */
      useEffect(() => {
        fetch("https://rfpdemo.velsof.com/api/categories")
          .then((response) => response.json())
          .then((data) => {
            if (data.categories) {
                const activeCategories = Object.values(data.categories).filter((cat) => cat.status === "Active");
                setCategories(activeCategories);
              }
          })
          .catch((error) => console.error("Error fetching categories:", error));
      }, []);
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      /**
       * Validate form Field Value
       * ALL the field is Mandatory.
       * otherwise display error.
       * Prevent incomplete Submission
       * @returns 
       */
      const validate = () => {
        let newErrors = {};
        if (!formData.fname.trim()) newErrors.fname = "First name is required";
        if (!formData.lname.trim()) newErrors.lname = "Last name is required";
        if (!formData.revenue.trim()) newErrors.revenue = "Revenue is required";
        if (!formData.employees.trim()) newErrors.employees = "Number of Employees is required";
        if (!formData.cpassword.trim()) newErrors.cpassword = "Confirm Password is required";
        if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = "Enter a valid email address";
        if (!formData.password.match(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/))
          newErrors.password = "Enter a valid Password.(e.g., Pass@123)";
        if (formData.password !== formData.cpassword) newErrors.cpassword = "Passwords do not match";
        if (!formData.gst.match(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/)) newErrors.gst = "Enter a valid GST No.(e.g., 22AAAAA1234A1Z5)";
        if (!formData.pan.match(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)) newErrors.pan = "Enter a valid PAN No. (e.g., AAAAA1234A)";
        if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = "Phone must be 10 digits";
        if (!formData.category) newErrors.category = "Category is required";
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
          revenue: formData["revenue"],
          no_of_employees: formData["employees"],
          category: formData["category"],
          pancard_no: formData["pan"],
          gst_no: formData["gst"],
          mobile: formData["phone"]
      };
        if (!validate()) return;
        /**
         * Register Vendor API
         * firstname,lastname,email,password,revenue,revenue(last 3 yaers),no_of_employes,category,pancard_no,gst_no,mobile
         * this field is mandatory for successfully hit the API
         */
        fetch("https://rfpdemo.velsof.com/api/registervendor", {
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
   
    <div className="vendorContainer">
      <div className="box-1">
        <h1>Welcome to RFP System!</h1>
        <h3>Sign in to Continue</h3>
      </div>
      <div className="box-2">
      <form id="vendorForm"  onSubmit={handleSubmit} >
                    <table>
                        <tr>
                            <td><label htmlFor="Fname">First Name*</label></td>
                            <td><label htmlFor="Lname">Last Name*</label></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" id="Fname" name="fname" placeholder="Enter Firstname"
                                value={formData.fname}
                                onChange={handleChange} 
                                />
                                {errors.fname && <div className="error">{errors.fname}</div>}
                            </td>
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
                            <td colSpan="2"><label htmlFor="Email">Email*</label></td>
                        </tr>
                        <tr>
                            <td colSpan="2">
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
                            <td><label htmlFor="Password">Password*</label></td>
                            <td><label htmlFor="CPassword">Confirm Password*</label></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="password" id="Password" name="password" placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleChange} 
                                />
                                {errors.password && <div className="error">{errors.password}</div>}
                            </td>
                            <td>
                                <input type="password" id="CPassword" name="cpassword" placeholder="Enter Confirm Password"
                                value={formData.cpassword}
                                onChange={handleChange} 
                                />
                                {errors.cpassword && <div className="error">{errors.cpassword}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="Revenue">Revenue*(last 3 years in Lakh)</label></td>
                            <td><label htmlFor="NoEmployees">No of Employees*</label></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" id="Revenue" name="revenue" placeholder="Enter Revenue"
                                value={formData.revenue}
                                onChange={handleChange} 
                                />
                                {errors.revenue && <div className="error">{errors.revenue}</div>}
                            </td>
                            <td>
                                <input type="number" id="NoEmployees" name="employees" placeholder="Enter No of Employees"
                                value={formData.employees}
                                onChange={handleChange} 
                                />
                                {errors.employees && <div className="error">{errors.employees}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="GST">GST No.*</label></td>
                            <td><label htmlFor="Pan">Pan No.*</label></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" id="GST" name="gst" placeholder="Enter GST No."
                                value={formData.gst}
                                onChange={handleChange} 
                                />
                                {errors.gst && <div className="error">{errors.gst}</div>}
                            </td>
                            <td>
                                <input type="text" id="Pan" name="pan" placeholder="Enter Pan No."
                                value={formData.pan}
                                onChange={handleChange} 
                                />
                                {errors.pan && <div className="error">{errors.pan}</div>}
                            </td>
                        </tr>
                        <tr>
                            <td><label htmlFor="Phone">Phone No.*</label></td>
                            <td><label htmlFor="Categories">Categories*</label></td>
                        </tr>
                        <tr>
                            <td>
                                <input type="tel" id="Phone" name="phone" placeholder="Enter Phone No."
                                value={formData.phone}
                                onChange={handleChange} 
                                />
                                {errors.phone && <div className="error">{errors.phone}</div>}
                            </td>
                            <td>
                                <select name="category" onChange={handleChange}>
                                <option value="">Select Category</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                </select>
                                {errors.category && <div className="error">{errors.category}</div>}
                            </td>
                        </tr>
                    </table>
          <div className="btn register">
          <button type="submit" id="btn-1">Register</button>
        </div>
        </form>
      </div>
    </div>
 
  );
};



export default VendorRegistration;
