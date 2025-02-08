import React from 'react'
import { useEffect,useState } from 'react';
import './VendorList.css'
import { Link } from 'react-router-dom';
const CategoriesList = () => {
    
    const token=localStorage.getItem("Token");
    const [Categories, setCategories] = useState([]);
    const [showCard, setShowCard] = useState();
    const fetchCategory=() => {
       /**
   * get category list
   * @param {*} id 
   */
      fetch("https://rfpdemo.velsof.com/api/categories")
        .then((response) => response.json())
        .then((data) => {
          if (data.categories) {
              const activeCategories = Object.values(data.categories);
              setCategories(activeCategories);
            }
        })
        .catch((error) => console.error("Error fetching categories:", error));
    }
      useEffect(fetchCategory, []);
            const [categoryName, setCategoryName] = useState("");
            const handleUpdate = async (id) => {
              if (!categoryName.trim()) {
                alert("Please enter a category name.");
                return;
              }
              /**
               * Handle update category
               * name is Required
               * method:"post"
               */
              try {
                const response = await fetch(`https://rfpdemo.velsof.com/api/categories/${id}`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` 
                  },
                  body: JSON.stringify({ name: categoryName,_method:'put' }) 
                });
                const result = await response.json();
                console.log("Update Response:", result);
                if (result.response === "success") {
                  alert("Category updated successfully!");
              } else {
                  alert(result.error);
              }
                setCategoryName(null);
                setShowCard(false);
                fetchCategory();
              } catch (error) {
                console.error("Error updating category:", error);
              }
            };
    return (
        <div className="main-content">
          <div className="path">
            <a href="#" className="Home">Home</a>
            <span style={{ marginBottom: '6px', position: 'relative', bottom: '4px' }}>/</span>
            <a href="#" className="Vendor">Categories</a>
          </div>
          <h2 className="vendor-list">Categories List</h2>
          <div className="Table  ">
            <div className="table-head">
             <h3 style={{ marginLeft: '20px' }}>Categories</h3>
             <Link style={{marginRight:'110px',width:"50px"}} to="/admin/addcategory">
            <button className='add' style={{width:"120px"}} >+ Add Category</button>
            </Link>
             {/* <button className='add' >+ Add Category</button> */}
            </div>
            <div className="table-container">
            <table>
      <thead>
        <tr>
          <th>S. No.</th>
          <th>Categories Name</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {Categories.length > 0 ? (
          Categories.map((category, index) => (
            <tr key={category.id || index}>
              <td className='td-v' >{index + 1}</td>
              <td className='td-v' >{category.name}</td>
              <td className='td-v' >
                <span className={`status ${category.status?.toLowerCase()}`}>
                  {category.status?.toUpperCase()}
                </span>
              </td>
              <td className='td-v' >
                {/* {category.status === "Active" && (
                  <button className="approve-btn">Update</button>
                )}
                {category.status === "Inactive" && (
                  <button className="approve-btn">Update</button>
                )} */}
                  <button className="approve-btn" onClick={()=>setShowCard(category?.id)} >Update</button>{(showCard &&
        <div className="rfp-card">
          <input
            type="text"
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <button className="approve-btn" onClick={()=>handleUpdate(showCard)}>Update</button>
          {/* <button onClick={() => setSelectedRfp(null)}>Close</button> */}
        </div>
      )}

              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" style={{ textAlign: "center" }}>No Category found</td>
          </tr>
        )}
      </tbody>
    </table>
    </div>
          </div>
        </div>
      );
}

export default CategoriesList
