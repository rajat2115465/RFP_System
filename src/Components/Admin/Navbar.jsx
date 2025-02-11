import React from 'react'
import './VendorList.css'
import { useNavigate } from 'react-router-dom'
const Navbar = ({userType}) => {
  const navigate=useNavigate();
  return (
    <div className='navbar' >
        <header>
            <span className='wel-admin' >Welcome {userType}</span>
            <a href="#" className="logout" onClick={()=>{localStorage.setItem("Token","0");navigate("/login")}}>Logout</a>
        </header>
    </div>
  )
}
export default Navbar
