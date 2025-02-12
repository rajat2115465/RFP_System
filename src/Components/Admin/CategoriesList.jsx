import React from 'react'
import { useEffect,useState } from 'react';
import './VendorList.css'
import { Link } from 'react-router-dom';
import { getFetch, postFetch } from '../../Methods/FetchMethods';
import { alertMessage, clientSideValidation, EndPoints } from '../Constants/APIendpoints';
/**
 * Display Category List Method
 * @returns 
 */
const CategoriesList = () => {
    const [Categories, setCategories] = useState([]);
    const [showCard, setShowCard] = useState();
    const fetchCategory=async() => {
       /**
       * get category list
       * @param {*} id 
       */
     try {
        const response = await getFetch(EndPoints.categoryList);
        const data = await response.json();
        if (data.categories) {
          const activeCategories = Object.values(data.categories);
          setCategories(activeCategories);
        }
        }
        catch (error) {
          console.error("Error fetching categories:", error)
        }
    }
      useEffect(() => {
        fetchCategory()
      }, []);
            const [categoryName, setCategoryName] = useState("");
            const handleUpdate = async (id) => {
              if (!categoryName.trim()) {
                alert(clientSideValidation.category);
                return;
              }
              /**
               * Handle update category
               * name is Required
               * method:"post"
               */
              try {
                const response=await postFetch(`${EndPoints.categoryById}${id}`,{ name: categoryName,_method:'put' })
                const result = await response.json();
                if (result.response === "success") {
                  alert(alertMessage.updatecategory);
              } else {
                  alert(result.error);
              }
                setCategoryName(null);
                setShowCard(false);
                fetchCategory();
              } catch (error) {
                alert(alertMessage.tryAgain)
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
