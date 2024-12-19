import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import { Doughnut } from 'react-chartjs-2'; // Doughnut grafiği için import
import '../../styles/ProductTable.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Chart.js modüllerini kaydediyoruz
ChartJS.register(ArcElement, Tooltip, Legend);

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
    <div>
      <a href="" className="profile-back-button" onClick={() => navigate('/admin')}>← Back</a>
      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Stock Chart</th>
              <th>Details</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              const remainingStock = 200 - product.stock; 

              const isCriticalStock = product.stock < 5;

              const doughnutData = {
                labels: ['Stock Q.', 'Empty Q.'],
                datasets: [
                  {
                    label: 'Stock Q.',
                    data: [product.stock, remainingStock], 
                    backgroundColor: [
                      isCriticalStock ? 'rgba(255, 0, 0, 1)' : 'rgba(153, 50, 204, 0.6)', 
                      isCriticalStock ? 'rgba(255, 99, 132, 0.6)' : 'rgba(75, 192, 192, 1)',
                    ], 
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 0,
                  },
                ],
              };

              const doughnutOptions = {
                responsive: true,
                plugins: {
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        if (tooltipItem.dataIndex === 0) {
                          return `${tooltipItem.raw} units in stock`;
                        } else {
                          return `Remaining: ${tooltipItem.raw} units`;
                        }
                      },
                    },
                  },
                },
                cutout: '1%',  
              };

              return (
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
                    <div style={{ width: '100px', height: '100px' }}>
                      <Doughnut data={doughnutData} options={doughnutOptions} />
                    </div>
                  </td>
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
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
