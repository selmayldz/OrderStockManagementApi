import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../../styles/ProductTable.css';


const ProductTable = ({ products }) => {
  const navigate = useNavigate();

  const handleDelete = async (productId) => {
    const token = localStorage.getItem('authToken');
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5048/api/Products/${productId}`, {
          method: 'DELETE',
          headers: {
              accept: '*/*',
              Authorization: `Bearer ${token}`,
          },
        });   
  
        if (response.ok) {
          alert("Product successfully deleted.");
          window.location.reload();
        } else if (response.status === 404) {
          alert("Product not found.");
        } else {
          alert("An error occurred while deleting the product.");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };
  
  return (
    <div className="products-table">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Details</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>
                <img
                  src={product.productPhoto}
                  alt={product.productName}
                  style={{ width: '100px', height: 'auto' }}
                />
              </td>
              <td>{product.productName}</td>
              <td>{product.description}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  className="details-button"
                  onClick={() => navigate(`/product-details/${product.productId}`)}
                >
                  Details
                </button>
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => navigate(`/product-edit/${product.productId}`)}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(product.productId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
